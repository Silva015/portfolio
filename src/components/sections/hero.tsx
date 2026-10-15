import type { CSSProperties } from "react";
import { OpenChatButton } from "@/components/chat/open-chat-button";
import { ArrowRight, Download, GitHub, LinkedIn, Mail, MapPin, Sparkles } from "@/components/ui/icons";
import { Avatar, ButtonLink, Container, buttonClass } from "@/components/ui/primitives";
import type { Profile } from "@/content/profile";

const delay = (i: number) => ({ "--i": i }) as CSSProperties;

export function Hero({ profile, chatEnabled }: { profile: Profile; chatEnabled: boolean }) {
  const current = profile.experience[0];
  const previous = profile.experience[1];

  return (
    <section id="top" className="grain relative isolate overflow-hidden">
      <div aria-hidden="true" className="bg-glow absolute inset-0 -z-10" />
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10" />

      <Container className="grid grid-cols-1 items-center gap-14 pt-14 pb-20 sm:pt-20 sm:pb-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="min-w-0">
          <p
            className="rise inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-border bg-surface/60 py-1.5 pr-4 pl-2.5 text-xs text-muted backdrop-blur"
            style={delay(0)}
          >
            <span className="flex items-center gap-2 text-fg">
              <span className="pulse-dot size-2 rounded-full bg-accent" />
              Open to remote roles
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={13} />
              {profile.location} · {profile.timezone}
            </span>
          </p>

          <h1 className="mt-7">
            <span
              className="rise flex items-center gap-3 font-mono text-sm tracking-wide text-muted sm:text-base"
              style={delay(1)}
            >
              <Avatar src={profile.avatar} initials={profile.initials} size={48} priority className="size-12" />
              Hi, I&apos;m {profile.name}
            </span>
            <span
              className="rise mt-3 block text-5xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-7xl"
              style={delay(2)}
            >
              Full-Stack &amp;{" "}
              <span className="font-serif font-normal tracking-[-0.01em] text-accent italic">AI Engineer</span>
            </span>
          </h1>

          <p
            className="rise mt-6 max-w-xl text-lg text-pretty text-muted sm:text-xl"
            style={delay(3)}
          >
            {profile.tagline} TypeScript, React, Next.js and NestJS, with LLMs where they actually help.
          </p>

          <div className="rise mt-9 flex flex-wrap items-center gap-3" style={delay(4)}>
            {chatEnabled ? (
              <OpenChatButton className={buttonClass("primary")}>
                <Sparkles size={17} />
                Ask my AI about me
              </OpenChatButton>
            ) : (
              <ButtonLink variant="primary" href="#work">
                See my work
                <ArrowRight size={17} />
              </ButtonLink>
            )}
            <ButtonLink href={`mailto:${profile.email}`}>
              <Mail size={17} />
              Get in touch
            </ButtonLink>
            <div className="flex items-center gap-1">
              <ButtonLink
                variant="ghost"
                href={profile.resumePdf}
                download={profile.resumePdfName}
                className="px-4"
              >
                <Download size={17} />
                Résumé
              </ButtonLink>
              <ButtonLink
                variant="ghost"
                href={profile.socials.github}
                external
                className="w-11 px-0"
                aria-label="GitHub"
              >
                <GitHub />
              </ButtonLink>
              <ButtonLink
                variant="ghost"
                href={profile.socials.linkedin}
                external
                className="w-11 px-0"
                aria-label="LinkedIn"
              >
                <LinkedIn />
              </ButtonLink>
            </div>
          </div>

          <p className="rise mt-10 text-sm text-subtle" style={delay(5)}>
            Now: <span className="text-muted">{current.roles[0].title.split(" & ")[0]} at {current.company}</span>
            <span className="mx-2">·</span>
            Before: <span className="text-muted">{previous.roles[0].title} at {previous.company}</span>
          </p>
        </div>

        <div className="rise min-w-0" style={delay(3)}>
          <CodeCard />
        </div>
      </Container>
    </section>
  );
}

function CodeCard() {
  const k = "text-[color:var(--code-key)]";
  const s = "text-[color:var(--code-str)]";
  const kw = "text-[color:var(--code-kw)]";
  const p = "text-subtle";

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(closest-side,var(--glow),transparent)] blur-2xl"
      />
      <figure className="overflow-hidden rounded-2xl border border-border-strong bg-bg-elev/85 shadow-2xl shadow-black/20 backdrop-blur">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-subtle">arthur.ts</span>
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-6 sm:text-[13px]">
          <code>
            <span className={kw}>export const</span> arthur <span className={p}>=</span> {"{"}
            {"\n"}  <span className={k}>role</span>
            <span className={p}>:</span> <span className={s}>&quot;Full-Stack &amp; AI Engineer&quot;</span>,
            {"\n"}  <span className={k}>stack</span>
            <span className={p}>:</span> [<span className={s}>&quot;TypeScript&quot;</span>, <span className={s}>&quot;React&quot;</span>,{" "}
            <span className={s}>&quot;Next.js&quot;</span>, <span className={s}>&quot;NestJS&quot;</span>],
            {"\n"}  <span className={k}>ai</span>
            <span className={p}>:</span> [<span className={s}>&quot;LLM integration&quot;</span>, <span className={s}>&quot;agents&quot;</span>],
            {"\n"}  <span className={k}>shipped</span>
            <span className={p}>:</span> {"{"} <span className={k}>users</span>
            <span className={p}>:</span> <span className={s}>&quot;1,100+&quot;</span>, <span className={k}>rating</span>
            <span className={p}>:</span> <span className={s}>&quot;5★&quot;</span> {"}"},
            {"\n"}  <span className={k}>mvpIn</span>
            <span className={p}>:</span> <span className={s}>&quot;1 week&quot;</span>,
            {"\n"}  <span className={k}>openTo</span>
            <span className={p}>:</span> <span className={s}>&quot;remote · international teams&quot;</span>,
            {"\n"}
            {"}"} <span className={kw}>satisfies</span> Engineer<span className={p}>;</span>
            <span className="caret ml-0.5 inline-block h-4 w-[7px] translate-y-[3px] bg-accent" />
          </code>
        </pre>
      </figure>
      <div className="absolute -bottom-5 left-4 flex items-center gap-2 rounded-full border border-border-strong bg-bg-elev px-3.5 py-2 text-xs shadow-lg sm:left-8">
        <Sparkles size={14} className="text-accent" />
        <span className="font-medium">Tier 1 &ldquo;AI Trailblazer&rdquo;</span>
        <span className="text-subtle">PM Accelerator</span>
      </div>
    </div>
  );
}
