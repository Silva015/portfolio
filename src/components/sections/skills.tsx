import { Section, SectionHeading, cn } from "@/components/ui/primitives";
import type { SkillGroup } from "@/content/profile";

export function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <Section id="skills" className="bg-bg-elev/40">
      <SectionHeading
        eyebrow="Toolbox"
        title="The stack I reach for, and how I work with a team."
        description="TypeScript end to end, Python for data and ML, and AI wired into both the product and the workflow."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => {
          const highlight = group.name === "AI";
          return (
            <div
              key={group.name}
              className={cn(
                "reveal rounded-2xl border p-5",
                highlight ? "border-accent/40 bg-accent-soft" : "border-border bg-bg/60",
              )}
            >
              <h3 className={cn("font-mono text-xs tracking-[0.16em] uppercase", highlight ? "text-accent" : "text-subtle")}>
                {group.name}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-border bg-bg-elev/80 px-3 py-1.5 text-sm text-fg"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
