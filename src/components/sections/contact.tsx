import Link from "next/link";
import { CopyEmail } from "@/components/ui/copy-email";
import { Download, GitHub, LinkedIn, Mail } from "@/components/ui/icons";
import { ButtonLink, Container, buttonClass } from "@/components/ui/primitives";
import type { Profile } from "@/content/profile";

export function Contact({ profile }: { profile: Profile }) {
  return (
    <section id="contact" className="py-20 sm:py-28">
      <Container>
        <div className="reveal grain relative isolate overflow-hidden rounded-3xl border border-border-strong bg-bg-elev px-6 py-14 text-center sm:px-12 sm:py-20">
          <div aria-hidden="true" className="bg-glow absolute inset-0 -z-10" />
          <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">Contact</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Let&apos;s build something <span className="font-serif font-normal italic">useful</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-muted sm:text-lg">
            I&apos;m open to remote Full-Stack and AI Engineering roles with international teams. The fastest way to
            reach me is email.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink variant="primary" href={`mailto:${profile.email}`}>
              <Mail size={17} />
              {profile.email}
            </ButtonLink>
            <CopyEmail email={profile.email} />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <ButtonLink variant="ghost" href={profile.socials.linkedin} external>
              <LinkedIn size={16} />
              LinkedIn
            </ButtonLink>
            <ButtonLink variant="ghost" href={profile.socials.github} external>
              <GitHub size={16} />
              GitHub
            </ButtonLink>
            <Link href="/resume" className={buttonClass("ghost")}>
              <Download size={16} />
              Résumé
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export async function Footer({ profile }: { profile: Profile }) {
  "use cache";
  return (
    <footer className="border-t border-border py-8 print:hidden">
      <Container className="flex flex-col items-center justify-between gap-3 text-sm text-subtle sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>
          Built with Next.js, TypeScript, Tailwind &amp; Claude ·{" "}
          <a href={profile.repoUrl} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-fg">
            View source
          </a>
        </p>
      </Container>
    </footer>
  );
}
