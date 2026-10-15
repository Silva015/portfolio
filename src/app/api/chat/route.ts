import Anthropic from "@anthropic-ai/sdk";
import { profile } from "@/content/profile";
import { SYSTEM_PROMPT } from "@/lib/ai/system-prompt";
import { rateLimit } from "@/lib/rate-limit";

const MODEL = "claude-haiku-5-5";
const MAX_USER_CHARS = 500;
const MAX_ASSISTANT_CHARS = 2_000;
const MAX_MESSAGES = 6;
const RATE_LIMIT = { limit: 10, windowMs: 10 * 60 * 1000 };

const client = process.env.ANTHROPIC_API_KEY ? new Anthropic() : null;

type ChatMessage = { role: "user" | "assistant"; content: string };

function parseMessages(body: unknown): Anthropic.MessageParam[] | null {
  if (!body || typeof body !== "object" || !Array.isArray((body as { messages?: unknown }).messages)) {
    return null;
  }

  const raw = (body as { messages: unknown[] }).messages;
  const valid = raw.every(
    (m): m is ChatMessage =>
      !!m &&
      typeof m === "object" &&
      ((m as ChatMessage).role === "user" || (m as ChatMessage).role === "assistant") &&
      typeof (m as ChatMessage).content === "string",
  );
  if (!valid) return null;

  // Keep the most recent turns, starting on a user message.
  let recent = (raw as ChatMessage[]).slice(-MAX_MESSAGES);
  while (recent.length && recent[0].role !== "user") recent = recent.slice(1);

  const last = recent.at(-1);
  if (!last || last.role !== "user" || !last.content.trim()) return null;
  if (last.content.length > MAX_USER_CHARS) return null;

  return recent.map((m) => ({
    role: m.role,
    content: m.content.slice(0, m.role === "user" ? MAX_USER_CHARS : MAX_ASSISTANT_CHARS),
  }));
}

function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "anon";
}

const json = (status: number, error: string, headers?: HeadersInit) =>
  Response.json({ error }, { status, headers });

export async function POST(request: Request) {
  if (!client) return json(503, "The AI assistant isn't configured yet.");

  const limited = rateLimit(clientIp(request), RATE_LIMIT);
  if (!limited.ok) {
    return json(429, "Too many questions in a short time. Please try again in a few minutes.", {
      "Retry-After": String(limited.retryAfter),
    });
  }

  let messages: Anthropic.MessageParam[] | null = null;
  try {
    messages = parseMessages(await request.json());
  } catch {
    messages = null;
  }
  if (!messages) return json(400, `Please send a question of up to ${MAX_USER_CHARS} characters.`);

  const stream = client.messages.stream(
    {
      model: MODEL,
      max_tokens: 1024,
      output_config: { effort: "low" },
      system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
      messages,
    },
    { signal: request.signal },
  );

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      let sent = false;
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
            sent = true;
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") {
          controller.enqueue(
            encoder.encode(`I can't help with that one, but I'm happy to answer questions about ${profile.firstName}'s work.`),
          );
        }
      } catch (error) {
        if (!request.signal.aborted) {
          console.error("chat stream failed", error instanceof Anthropic.APIError ? error.status : error);
          const notice = "Sorry, something went wrong. Please try again in a moment.";
          controller.enqueue(encoder.encode(sent ? `\n\n${notice}` : notice));
        }
      } finally {
        try {
          controller.close();
        } catch {
          // Already closed because the visitor cancelled the request.
        }
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
