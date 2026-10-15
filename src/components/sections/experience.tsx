import { Chip, Section, SectionHeading } from "@/components/ui/primitives";
import type { Experience as ExperienceItem, Role } from "@/content/profile";

const VISIBLE_HIGHLIGHTS = 3;

function period(start: string, end: string | null) {
  return `${start} – ${end ?? "Present"}`;
}

export function Experience({ items }: { items: ExperienceItem[] }) {
  return (
    <Section id="experience" className="bg-bg-elev/40">
      <SectionHeading
        eyebrow="Experience"
        title="Five years of shipping, from startups to a national bank."
        description="Full-stack products, AI features, mobile apps and the people side of engineering teams."
      />

      <ol className="relative space-y-6">
        {items.map((item) => {
          const first = item.roles[0];
          const last = item.roles[item.roles.length - 1];
          const isCurrent = first.end === null;

          return (
            <li key={item.company} className="reveal">
              <article className="group grid gap-4 rounded-2xl border border-border bg-bg/60 p-5 transition-colors hover:border-border-strong sm:p-7 md:grid-cols-[13rem_1fr] md:gap-8">
                <div className="flex flex-col gap-1.5">
                  <p className="font-mono text-xs text-subtle">{period(last.start, first.end)}</p>
                  {item.duration ? <p className="font-mono text-xs text-subtle">{item.duration}</p> : null}
                  <p className="text-xs text-subtle">{item.location}</p>
                  {isCurrent ? (
                    <span className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-medium text-accent">
                      <span className="size-1.5 rounded-full bg-accent" />
                      Current
                    </span>
                  ) : null}
                </div>

                <div>
                  <h3 className="text-xl font-semibold tracking-tight">
                    {item.company}
                    {item.companyNote ? (
                      <span className="ml-2 align-middle text-sm font-normal text-subtle">{item.companyNote}</span>
                    ) : null}
                  </h3>

                  {item.roles.length === 1 ? (
                    <RoleBody role={first} />
                  ) : (
                    <ol className="mt-4 space-y-5 border-l border-border pl-5">
                      {item.roles.map((role) => (
                        <li key={role.title} className="relative">
                          <span className="absolute top-2 -left-[1.42rem] size-2 rounded-full border border-border-strong bg-bg" />
                          <p className="font-mono text-xs text-subtle">{period(role.start, role.end)}</p>
                          <RoleBody role={role} />
                        </li>
                      ))}
                    </ol>
                  )}

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {item.stack.map((tech) => (
                      <Chip key={tech}>{tech}</Chip>
                    ))}
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

function RoleBody({ role }: { role: Role }) {
  const shown = role.highlights.slice(0, VISIBLE_HIGHLIGHTS);
  const hidden = role.highlights.slice(VISIBLE_HIGHLIGHTS);

  return (
    <div className="mt-1">
      <p className="font-medium text-accent">{role.title}</p>
      {role.summary ? <p className="mt-3 text-pretty text-muted">{role.summary}</p> : null}
      <Highlights items={shown} />
      {hidden.length > 0 ? (
        <details className="group/details mt-1">
          <summary className="mt-2 inline-flex cursor-pointer list-none items-center gap-1 text-sm text-subtle transition-colors hover:text-fg [&::-webkit-details-marker]:hidden">
            <span className="group-open/details:hidden">Show {hidden.length} more</span>
            <span className="hidden group-open/details:inline">Show less</span>
          </summary>
          <Highlights items={hidden} />
        </details>
      ) : null}
    </div>
  );
}

function Highlights({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2.5">
      {items.map((h) => (
        <li key={h.slice(0, 32)} className="flex gap-3 text-sm leading-relaxed text-pretty text-muted sm:text-[15px]">
          <span aria-hidden="true" className="mt-[0.6rem] h-px w-3 shrink-0 bg-accent" />
          <span>{h}</span>
        </li>
      ))}
    </ul>
  );
}
