import { Avatar, Section, SectionHeading } from "@/components/ui/primitives";
import type { Profile } from "@/content/profile";

export function About({ profile }: { profile: Profile }) {
  const [lead, ...rest] = profile.about;

  return (
    <Section id="about">
      <SectionHeading
        eyebrow="About"
        title={
          <>
            Engineer by training, <span className="font-serif font-normal italic">builder</span> by habit.
          </>
        }
      />
      <div className="grid gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
        <div className="reveal space-y-5 text-pretty text-muted">
          <p className="text-lg text-fg sm:text-xl sm:leading-relaxed">{lead}</p>
          {rest.map((p) => (
            <p key={p.slice(0, 24)} className="leading-relaxed sm:text-lg">
              {p}
            </p>
          ))}
        </div>

        <aside className="reveal">
          <div className="overflow-hidden rounded-2xl border border-border bg-bg-elev/60">
            <div className="flex items-center gap-4 border-b border-border px-5 py-5">
              <Avatar
                src={profile.avatar}
                initials={profile.initials}
                size={72}
                alt={`Portrait of ${profile.name}`}
                className="size-[72px]"
              />
              <div className="min-w-0">
                <p className="font-semibold">{profile.name}</p>
                <p className="text-sm text-accent">{profile.headline}</p>
              </div>
            </div>
            <dl className="divide-y divide-border">
              {profile.facts.map((fact) => (
                <div key={fact.label} className="flex flex-col gap-1 px-5 py-4">
                  <dt className="font-mono text-[11px] tracking-[0.16em] text-subtle uppercase">{fact.label}</dt>
                  <dd className="text-sm text-fg">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
    </Section>
  );
}
