# Arthur Carneiro: Portfolio

Personal portfolio for **Arthur Carneiro**, Full-Stack & AI Engineer.
It's built for recruiters hiring for remote Full-Stack and AI Engineering roles.

**Live:** https://arthurcarneiro.vercel.app

## Highlights

- **Ask my AI:** a streaming chat that answers recruiters' questions about Arthur's experience. It's grounded only in the profile data and runs on Claude Haiku with prompt caching.
- **One source of truth:** [`src/content/profile.ts`](src/content/profile.ts) feeds the home page, the printable `/resume` page and the AI system prompt.
- **Static by default:** every page is prerendered. The only server code is the chat endpoint.
- **Polish:**
  - Dark and light themes with no flash on load
  - CSS-only scroll reveals that respect `prefers-reduced-motion`
  - Generated Open Graph image, JSON-LD `Person` data, sitemap and robots

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Anthropic SDK · Vercel · GitHub Actions

## Run locally

```bash
pnpm install
cp .env.example .env.local   # optional: add ANTHROPIC_API_KEY to enable the chat
pnpm dev
```

Open http://localhost:3000.

| Command          | What it does            |
| ---------------- | ----------------------- |
| `pnpm dev`       | Start the dev server    |
| `pnpm lint`      | ESLint                  |
| `pnpm typecheck` | TypeScript, no emit     |
| `pnpm build`     | Production build        |

## How the AI assistant works

- **Server:** [`src/app/api/chat/route.ts`](src/app/api/chat/route.ts) validates the conversation and calls `claude-haiku-5-5`, then streams the text back as plain text.
  - Only the last 6 messages are kept, each capped at 500 characters.
  - Rate limit: 10 requests per 10 minutes per IP.
- **System prompt:** [`src/lib/ai/system-prompt.ts`](src/lib/ai/system-prompt.ts) renders the profile into a frozen system prompt, cached with `cache_control`. The rules keep answers short, factual and on-topic.
- **No key, no chat:** without `ANTHROPIC_API_KEY` the endpoint returns `503` and the chat UI isn't rendered at all.

### Enable it in production

1. Create a key at [console.anthropic.com](https://console.anthropic.com) and set a monthly spend limit.
2. In Vercel, go to **Project → Settings → Environment Variables** and add `ANTHROPIC_API_KEY` for Production.
3. Redeploy. The flag is read at build time.

## Updating content

Edit [`src/content/profile.ts`](src/content/profile.ts).

- **Photo:** add `public/avatar.jpg` and set `avatar: "/avatar.jpg"`.
- **Project screenshots:** add them under `public/projects/` and set `image` on the project.
- **Links:** add App Store, Play Store or live URLs under `links`.

## Deploy

Every push to `main` deploys to production on Vercel through the GitHub integration. CI runs lint, the typecheck and the build on every push and pull request.
