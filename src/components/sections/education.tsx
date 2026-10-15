import { ArrowUpRight } from "@/components/ui/icons";
import { Section, SectionHeading } from "@/components/ui/primitives";
import type { Profile } from "@/content/profile";

export function Education({ profile }: { profile: Profile }) {
  const { education, certifications, languages } = profile;
  const research = profile.projects.find((p) => p.category === "Research");

  return (
    <Section id="education">
      <SectionHeading eyebrow="Education & research" title="Computer Science at UnB, with ML research accepted at SIBGRAPI." />

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <article className="reveal rounded-2xl border border-border bg-bg-elev/60 p-6 sm:p-8">
          <p className="font-mono text-xs text-subtle">{education.period}</p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight">{education.school}</h3>
          <p className="text-accent">{education.degree}</p>
          <p className="mt-3 text-sm text-muted">
            <span className="text-fg">Key coursework:</span> {education.coursework}
          </p>

          <div className="mt-6 rounded-xl border border-border bg-bg/60 p-5">
            <p className="font-mono text-[11px] tracking-[0.16em] text-subtle uppercase">Thesis · SIBGRAPI 2026</p>
            <p className="mt-2 text-pretty text-muted">{education.thesis}</p>
            {research?.links?.[0] ? (
              <a
                href={research.links[0].href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
              >
                Read the code & paper sources
                <ArrowUpRight size={15} />
              </a>
            ) : null}
          </div>
        </article>

        <div className="grid gap-6">
          <article className="reveal rounded-2xl border border-border bg-bg-elev/60 p-6">
            <h3 className="font-mono text-xs tracking-[0.16em] text-subtle uppercase">Certifications</h3>
            <ul className="mt-4 space-y-3">
              {certifications.map((c) => (
                <li key={c.name} className="flex flex-col">
                  <span className="text-sm font-medium text-fg">{c.name}</span>
                  {c.issuer || c.note ? (
                    <span className="text-xs text-subtle">{[c.issuer, c.note].filter(Boolean).join(" · ")}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </article>

          <article className="reveal rounded-2xl border border-border bg-bg-elev/60 p-6">
            <h3 className="font-mono text-xs tracking-[0.16em] text-subtle uppercase">Languages</h3>
            <ul className="mt-4 space-y-2">
              {languages.map((l) => (
                <li key={l.name} className="flex items-baseline justify-between gap-4 text-sm">
                  <span className="font-medium text-fg">{l.name}</span>
                  <span className="text-right text-muted">{l.level}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </Section>
  );
}
