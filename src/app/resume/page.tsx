import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import { buttonClass } from "@/components/ui/primitives";
import { profile } from "@/content/profile";
import { PrintButton } from "./print-button";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${profile.name}, ${profile.headline}.`,
  alternates: { canonical: "/resume" },
};

const display = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");

export default function ResumePage() {
  return (
    <div className="min-h-dvh bg-surface py-6 print:bg-white print:py-0 sm:py-10">
      <div className="mx-auto mb-4 flex max-w-[52rem] flex-wrap items-center justify-between gap-3 px-4 print:hidden">
        <Link href="/" className="text-sm text-muted hover:text-fg">
          ← Back to portfolio
        </Link>
        <div className="flex gap-2">
          <PrintButton />
          <a href={`mailto:${profile.email}`} className={buttonClass("primary", "h-10")}>
            Contact
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* The CV sheet always renders light, on screen and on paper. */}
      <article
        data-theme="light"
        className="mx-auto max-w-[52rem] bg-white px-6 py-10 text-[13.5px] leading-relaxed text-fg shadow-xl shadow-black/10 print:max-w-none print:px-0 print:py-0 print:text-[11px] print:shadow-none sm:px-12 sm:py-12"
      >
        <header className="border-b border-border pb-5">
          <h1 className="text-3xl font-semibold tracking-tight print:text-2xl">{profile.name}</h1>
          <p className="mt-1 text-base font-medium text-accent print:text-sm">
            {profile.headline} · TypeScript, React, Next.js, NestJS, LLMs
          </p>
          <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-muted">
            <span>
              {profile.location} ({profile.timezone}) · Open to remote
            </span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.socials.linkedin}>{display(profile.socials.linkedin)}</a>
            <a href={profile.socials.github}>{display(profile.socials.github)}</a>
            <a href={profile.siteUrl}>{display(profile.siteUrl)}</a>
          </p>
        </header>

        <ResumeSection title="Summary">
          <p className="text-pretty">
            {profile.about[0]} English: C1 (Cambridge CAE).
          </p>
        </ResumeSection>

        <ResumeSection title="Experience">
          <div className="space-y-5">
            {profile.experience.map((exp) => (
              <div key={exp.company} className="break-inside-avoid-page">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-semibold">
                    {exp.company}
                    {exp.companyNote ? <span className="font-normal text-muted"> · {exp.companyNote}</span> : null}
                  </h3>
                  <span className="text-muted">{exp.location}</span>
                </div>
                {exp.roles.map((role) => (
                  <div key={role.title} className="mt-1.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <p className="font-medium text-accent">{role.title}</p>
                      <p className="font-mono text-xs text-muted">
                        {role.start} – {role.end ?? "Present"}
                      </p>
                    </div>
                    <ul className="mt-1 list-disc space-y-0.5 pl-4 marker:text-subtle">
                      {role.highlights.slice(0, exp.roles.length > 1 ? 2 : 4).map((h) => (
                        <li key={h.slice(0, 32)} className="text-pretty">
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <p className="mt-1 text-xs text-muted">{exp.stack.join(" · ")}</p>
              </div>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection title="Skills">
          <dl className="grid gap-1 sm:grid-cols-[9rem_1fr] print:grid-cols-[9rem_1fr]">
            {profile.skills.map((g) => (
              <div key={g.name} className="contents">
                <dt className="font-medium">{g.name}</dt>
                <dd className="text-muted">{g.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </ResumeSection>

        <ResumeSection title="Education">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <p className="font-semibold">{profile.education.school}</p>
            <p className="font-mono text-xs text-muted">{profile.education.period}</p>
          </div>
          <p>{profile.education.degree}</p>
          <p className="mt-1 text-pretty text-muted">{profile.education.thesis}</p>
        </ResumeSection>

        <ResumeSection title="Certifications & languages">
          <p className="text-pretty">
            {profile.certifications.map((c) => (c.issuer ? `${c.name} (${c.issuer})` : c.name)).join(" · ")}
          </p>
          <p className="mt-1 text-muted">{profile.languages.map((l) => `${l.name}: ${l.level}`).join(" · ")}</p>
        </ResumeSection>
      </article>
    </div>
  );
}

function ResumeSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-6 print:mt-4">
      <h2 className="mb-2 font-mono text-[11px] font-medium tracking-[0.18em] text-subtle uppercase">{title}</h2>
      {children}
    </section>
  );
}
