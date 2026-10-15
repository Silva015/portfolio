import Image from "next/image";
import { ArrowUpRight } from "@/components/ui/icons";
import { Chip, Section, SectionHeading } from "@/components/ui/primitives";
import { ProjectVisual } from "@/components/visuals/project-visual";
import type { Project } from "@/content/profile";

export function Projects({ items }: { items: Project[] }) {
  return (
    <Section id="work">
      <SectionHeading
        eyebrow="Selected work"
        title={
          <>
            Products that <span className="font-serif font-normal italic">replace</span> manual work.
          </>
        }
        description="Real users, real constraints. Each one started with a problem someone had every week."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {items.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="reveal group flex min-w-0 flex-col rounded-2xl border border-border bg-bg-elev/60 p-3 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-border-strong">
      {project.image ? (
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border">
          <Image
            src={project.image}
            alt={`${project.name} screenshot`}
            fill
            sizes="(min-width: 768px) 560px, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <ProjectVisual kind={project.visual} />
      )}

      <div className="flex flex-1 flex-col px-2 pt-5 pb-3 sm:px-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <span className="rounded-full bg-accent-soft px-2 py-0.5 font-medium text-accent">{project.category}</span>
          <span className="text-subtle">{project.context}</span>
        </div>

        <h3 className="mt-3 text-2xl font-semibold tracking-tight">{project.name}</h3>
        <p className="mt-1.5 text-pretty text-fg/85">{project.tagline}</p>

        <p className="mt-4 text-sm text-pretty text-muted">
          <span className="font-medium text-fg">Problem. </span>
          {project.problem}
        </p>

        <ul className="mt-3 space-y-2">
          {project.built.map((b) => (
            <li key={b.slice(0, 32)} className="flex gap-3 text-sm leading-relaxed text-pretty text-muted">
              <span aria-hidden="true" className="mt-[0.55rem] h-px w-3 shrink-0 bg-accent" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <ul aria-label="Outcomes" className="mt-5 flex flex-wrap gap-2">
          {project.outcome.map((o) => (
            <li
              key={o}
              className="rounded-lg border border-border-strong bg-surface/60 px-2.5 py-1.5 text-xs font-medium text-fg"
            >
              {o}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-6">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <Chip key={tech}>{tech}</Chip>
            ))}
          </div>
          {project.links?.length ? (
            <div className="flex gap-3">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                >
                  {link.label}
                  <ArrowUpRight size={15} />
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
