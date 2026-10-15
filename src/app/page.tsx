import { AskAI } from "@/components/chat/ask-ai";
import { About } from "@/components/sections/about";
import { Contact, Footer } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Impact } from "@/components/sections/impact";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Header } from "@/components/ui/header";
import { profile } from "@/content/profile";
import { SUGGESTED_QUESTIONS } from "@/lib/ai/system-prompt";

// Read at build time: adding the key in Vercel and redeploying turns the assistant on.
const chatEnabled = Boolean(process.env.ANTHROPIC_API_KEY);

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
      >
        Skip to content
      </a>
      <Header name={profile.name} initials={profile.initials} />
      <main id="main">
        <Hero profile={profile} chatEnabled={chatEnabled} />
        <Impact items={profile.impact} />
        <About profile={profile} />
        <Experience items={profile.experience} />
        <Projects items={profile.projects} />
        <Skills groups={profile.skills} />
        <Education profile={profile} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
      {chatEnabled ? <AskAI name={profile.name} email={profile.email} suggestions={SUGGESTED_QUESTIONS} /> : null}
    </>
  );
}
