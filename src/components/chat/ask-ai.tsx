"use client";

import { Fragment, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Send, Sparkles, X } from "@/components/ui/icons";
import { cn } from "@/components/ui/primitives";
import { OPEN_CHAT_EVENT } from "./open-chat-button";

type Message = { role: "user" | "assistant"; content: string };

const MAX_CHARS = 500;

export function AskAI({
  name,
  email,
  suggestions,
}: {
  name: string;
  email: string;
  suggestions: string[];
}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const messagesRef = useRef<Message[]>([]);

  useEffect(() => {
    messagesRef.current = messages;
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  const send = useCallback(
    async (text: string) => {
      const question = text.trim().slice(0, MAX_CHARS);
      if (!question || busy) return;

      const history: Message[] = [...messagesRef.current, { role: "user", content: question }];
      setMessages([...history, { role: "assistant", content: "" }]);
      setInput("");
      setError(null);
      setBusy(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          const data = (await res.json().catch(() => null)) as { error?: string } | null;
          throw new Error(data?.error ?? "The assistant is unavailable right now.");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let answer = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          answer += decoder.decode(value, { stream: true });
          setMessages([...history, { role: "assistant", content: answer }]);
        }
        if (!answer.trim()) throw new Error("The assistant didn't return an answer. Please try again.");
      } catch (err) {
        if (controller.signal.aborted) return;
        setMessages(history.slice(0, -1));
        setInput(question);
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        if (abortRef.current === controller) abortRef.current = null;
        setBusy(false);
      }
    },
    [busy],
  );

  useEffect(() => {
    function onOpen(e: Event) {
      setOpen(true);
      const question = (e as CustomEvent<{ question?: string }>).detail?.question;
      if (question) void send(question);
    }
    window.addEventListener(OPEN_CHAT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, onOpen);
  }, [send]);

  useEffect(() => {
    if (!open) return;
    // Wait a frame so the panel is visible (and focusable) before moving focus into it.
    const focusTimer = setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => () => abortRef.current?.abort(), []);

  return (
    <div className="print:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn(
          "fixed right-4 bottom-4 z-50 inline-flex h-12 items-center gap-2 rounded-full bg-accent pr-5 pl-4 text-sm font-medium text-accent-fg shadow-[0_10px_40px_-10px_var(--glow),0_0_0_1px_var(--accent)] transition-all hover:bg-accent-strong sm:right-6 sm:bottom-6",
          open && "pointer-events-none translate-y-2 opacity-0",
        )}
      >
        <Sparkles size={18} />
        Ask my AI
      </button>

      <div
        role="dialog"
        aria-modal="false"
        aria-label={`Ask questions about ${name}`}
        className={cn(
          "fixed inset-x-2 bottom-2 z-50 flex h-[min(38rem,calc(100dvh-1rem))] flex-col overflow-hidden rounded-2xl border border-border-strong bg-bg-elev shadow-2xl shadow-black/30 transition-all duration-200 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[26rem]",
          open ? "translate-y-0 opacity-100" : "pointer-events-none invisible translate-y-4 opacity-0",
        )}
      >
        <header className="flex items-start gap-3 border-b border-border px-4 py-3.5">
          <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
            <Sparkles size={16} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">Ask about {name}</p>
            <p className="text-xs text-subtle">Answers from {name.split(" ")[0]}&apos;s résumé · powered by Claude</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="grid size-8 place-items-center rounded-full text-muted hover:bg-surface hover:text-fg"
          >
            <X size={17} />
          </button>
        </header>

        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4" aria-live="polite">
          {messages.length === 0 ? (
            <div>
              <p className="text-sm text-pretty text-muted">
                Hi! I&apos;m an AI assistant that knows {name}&apos;s experience, projects and skills. Ask me anything a
                recruiter would.
              </p>
              <div className="mt-4 flex flex-col items-start gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void send(s)}
                    className="rounded-xl border border-border bg-bg/60 px-3 py-2 text-left text-sm text-fg transition-colors hover:border-accent/50 hover:bg-accent-soft"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((m, i) => (
              <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    m.role === "user"
                      ? "rounded-br-md bg-accent text-accent-fg"
                      : "rounded-bl-md border border-border bg-bg/60 text-fg",
                  )}
                >
                  {m.role === "assistant" && !m.content ? <TypingDots /> : <RichText text={m.content} />}
                </div>
              </div>
            ))
          )}
          {error ? (
            <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-fg">
              {error} You can also email{" "}
              <a className="underline" href={`mailto:${email}`}>
                {email}
              </a>
              .
            </p>
          ) : null}
        </div>

        <form
          className="border-t border-border p-3"
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
        >
          <div className="flex items-end gap-2 rounded-xl border border-border bg-bg/60 p-1.5 focus-within:border-accent/60">
            <label htmlFor="ask-ai-input" className="sr-only">
              Your question
            </label>
            <textarea
              id="ask-ai-input"
              ref={inputRef}
              rows={1}
              maxLength={MAX_CHARS}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                  e.preventDefault();
                  void send(input);
                }
              }}
              placeholder={`Ask about ${name.split(" ")[0]}'s experience…`}
              className="max-h-28 min-h-9 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-fg outline-none placeholder:text-subtle [field-sizing:content]"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send question"
              className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-accent-fg transition-opacity disabled:opacity-40"
            >
              <Send size={16} />
            </button>
          </div>
          <p className="mt-2 px-1 text-[11px] text-subtle">AI answers can be imperfect. Confirm details with {name.split(" ")[0]}.</p>
        </form>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <span className="flex h-5 items-center gap-1" aria-label="Thinking">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-1.5 animate-bounce rounded-full bg-muted"
          style={{ animationDelay: `${i * 120}ms` }}
        />
      ))}
    </span>
  );
}

/** Tiny, safe renderer for the only formatting the assistant uses: **bold** and "- " bullets. */
function RichText({ text }: { text: string }) {
  const blocks: ReactNode[] = [];
  let list: string[] = [];

  const flush = () => {
    if (!list.length) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="my-1 list-disc space-y-1 pl-4">
        {list.map((item, i) => (
          <li key={i}>{inline(item)}</li>
        ))}
      </ul>,
    );
    list = [];
  };

  for (const line of text.split("\n")) {
    const bullet = line.match(/^\s*[-*•]\s+(.*)$/);
    if (bullet) {
      list.push(bullet[1]);
      continue;
    }
    flush();
    if (line.trim()) blocks.push(<p key={`p-${blocks.length}`}>{inline(line)}</p>);
  }
  flush();

  return <div className="space-y-2">{blocks}</div>;
}

function inline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
