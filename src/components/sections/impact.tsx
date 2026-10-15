import { Container } from "@/components/ui/primitives";
import type { Profile } from "@/content/profile";

export function Impact({ items }: { items: Profile["impact"] }) {
  return (
    <section aria-label="Impact highlights" className="border-y border-border bg-bg-elev/50">
      <Container>
        <dl className="grid grid-cols-2 divide-border md:grid-cols-3 lg:grid-cols-6 lg:divide-x">
          {items.map((item) => (
            <div key={item.label} className="reveal px-1 py-8 lg:px-5 lg:first:pl-0">
              <dt className="sr-only">{item.label}</dt>
              <dd>
                <span className="block text-3xl font-semibold tracking-tight sm:text-4xl">{item.value}</span>
                <span className="mt-2 block text-sm text-pretty text-muted">{item.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
