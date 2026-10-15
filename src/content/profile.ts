/**
 * Single source of truth for the portfolio.
 * The home page, the /resume page and the "Ask my AI" system prompt all read from here.
 */

export type Link = { label: string; href: string };

export type Role = {
  title: string;
  start: string;
  end: string | null;
  summary?: string;
  highlights: string[];
};

export type Experience = {
  company: string;
  companyNote?: string;
  location: string;
  duration?: string;
  roles: Role[];
  stack: string[];
};

export type ProjectVisual =
  | "tempo"
  | "meueduca"
  | "gymgames"
  | "platform"
  | "leaderboard"
  | "research";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  context: string;
  category: "AI" | "Full-Stack" | "Mobile" | "Research";
  problem: string;
  built: string[];
  outcome: string[];
  stack: string[];
  visual: ProjectVisual;
  /** Short status note shown next to the category, e.g. "Retired 2026". */
  status?: string;
  /** Optional screenshot in /public, e.g. "/projects/tempo.png". Replaces the generated visual. */
  image?: string;
  links?: Link[];
};

export type SkillGroup = { name: string; items: string[] };

export type Certification = { name: string; issuer?: string; note?: string };

/** Typed list with checked, widened elements. */
const list = <T>(items: T[]) => items;

export const profile = {
  name: "Arthur Carneiro",
  fullName: "Arthur Silva Carneiro",
  firstName: "Arthur",
  initials: "AC",
  headline: "Full-Stack & AI Engineer",
  tagline:
    "I build products that replace slow, manual workflows with robust code and practical AI.",
  location: "Brasília, Brazil",
  timezone: "UTC−3",
  availability: "Open to remote Full-Stack & AI Engineering roles",
  email: "tutuscarneiro@gmail.com",
  /** Optional, e.g. "he/him". When unset, the AI assistant refers to Arthur by name only. */
  pronouns: undefined as string | undefined,
  /** Photo in /public; remove to fall back to the monogram. */
  avatar: "/avatar.jpg" as string | undefined,
  siteUrl: "https://arthurcarneiro.vercel.app",
  repoUrl: "https://github.com/Silva015/portfolio",
  resumePdf: "/arthur-carneiro-resume.pdf",
  resumePdfName: "Arthur-Carneiro-Resume.pdf",
  socials: {
    linkedin: "https://www.linkedin.com/in/arthur-carneiro-dev",
    github: "https://github.com/Silva015",
  },

  about: [
    "I'm a Full-Stack & AI Engineer finishing my Computer Science degree at the University of Brasília (UnB, December 2026). Since 2021 I've been shipping real products: a gamified fitness app that reached 1,100+ users and a 5-star rating on both stores, LLM features that turn hours of teacher paperwork into seconds, and internal platforms that replace expensive third-party SaaS.",
    "At PM Accelerator I was the Lead AI Engineer intern for two cohorts, leading the engineering launch of Tempo, an AI planning assistant, with a fully remote, multinational team, and I received the Tier 1 “AI Trailblazer” award. Today I'm building the platform that is replacing a gym's management SaaS, end to end.",
    "I work async-first, write specs before code, and use AI coding agents every day without giving up code quality or ownership. I'm looking for a remote role on an international team where I can own features from the database to the prompt.",
  ],

  facts: [
    { label: "Based in", value: "Brasília, Brazil (UTC−3)" },
    { label: "Looking for", value: "Remote Full-Stack / AI Engineer roles" },
    { label: "Education", value: "B.Sc. Computer Science, UnB (Dec 2026)" },
    { label: "English", value: "Advanced, C1 (Cambridge CAE)" },
    { label: "Works best", value: "Async, docs-driven, remote teams" },
  ],

  impact: [
    { value: "1,100+", label: "organic users on GymGames, ~50% active" },
    { value: "5★", label: "rating reached on the App Store and Google Play" },
    { value: "3", label: "B2B deals closed as a co-founder" },
    { value: "1 week", label: "to a working MVP with a remote team" },
    { value: "Tier 1", label: "“AI Trailblazer” award, PM Accelerator" },
    { value: "−80%", label: "API payload on a 24/7 lobby TV app" },
  ],

  experience: list<Experience>([
    {
      company: "Quattor Academia",
      location: "Brasília, Brazil",
      roles: [
        {
          title: "Full-Stack Developer & Front Desk Coordinator",
          start: "Jan 2026",
          end: null,
          summary:
            "A hybrid engineering and leadership role: I build the internal platform that is replacing the gym's third-party management SaaS (EVO), coordinate the front desk sales team and work with the directors on strategy.",
          highlights: [
            "Building the gym's management platform with React 19, React Router 7 (SSR), TypeScript, Node.js, Prisma and MongoDB, covering trial classes, cancellations with fee calculation, member retention, sales, reports and class schedules.",
            "Integrated the EVO REST API and the WhatsApp API (Evolution API) to automate trial-class booking and notifications for students, instructors and staff, plus an n8n-scheduled retention bot for inactive members.",
            "Built an attendance leaderboard for the lobby TV from facial-recognition turnstile logs, then cut image weight by 75% and API payload by 80% so it runs 24/7 on a low-end TV box.",
            "Set up a pnpm monorepo with Docker and GitHub Actions CI/CD and automated redeploys: ~125 commits and 25+ merged pull requests.",
            "Built a data pipeline (MongoDB aggregations + Python, matplotlib, ReportLab) behind a 2023–2026 revenue analysis for the directors, covering churn, renewals, receivables and seasonality.",
            "Write agent-ready specs (project conventions, CLAUDE.md, step-by-step prompts) for the EVO migration roadmap, and coach the sales consultants with monthly goals and weekly pace reports.",
          ],
        },
      ],
      stack: [
        "React 19",
        "React Router 7",
        "TypeScript",
        "Node.js",
        "Prisma",
        "MongoDB",
        "n8n",
        "Docker",
        "GitHub Actions",
        "Python",
      ],
    },
    {
      company: "Product Manager Accelerator",
      location: "Remote · United States",
      roles: [
        {
          title: "Lead AI Engineer Intern",
          start: "Apr 2026",
          end: "Sep 2026",
          summary:
            "Lead Engineer for two consecutive cohorts of the 11-week AI Product Management Bootcamp. Led the engineering launch of Tempo, an AI planning assistant, with a fully remote, multinational team.",
          highlights: [
            "Guided the engineering team on Tempo, which turns a weekly “brain dump” (typed or dictated) into a realistic calendar plan by fitting tasks into the user's free time.",
            "Designed the solution with Domain-Driven Design, translating the PM's product vision into a clear domain model before writing code, with a documentation-driven workflow: specs and decisions first, implementation second.",
            "Used AI agents throughout the development workflow to speed up delivery without giving up code quality or ownership.",
            "Collaborated asynchronously across nationalities and time zones; delivered a working MVP in 1 week and took the product to a launch-ready state.",
            "Recognized with the Tier 1 “AI Trailblazer” award, two letters of recommendation from Dr. Nancy Li (Founder, PM Accelerator), one per cohort, and the Certified AI Engineer certification.",
          ],
        },
      ],
      stack: ["LLM integration", "AI agents", "TypeScript", "DDD", "Remote async"],
    },
    {
      company: "MeuEduca",
      location: "Brasília, Brazil",
      roles: [
        {
          title: "Full-Stack Developer & AI Integrator",
          start: "Aug 2025",
          end: "Jul 2026",
          summary:
            "Took the product from a fragmented codebase to a market-ready MVP that automates administrative work for public school teachers (K–5).",
          highlights: [
            "Architected the web platform with Next.js and NestJS to automate high-volume administrative workflows for primary education teachers.",
            "Built Generative AI features that turn structured student data into personalized pedagogical reports, cutting manual documentation time from hours to seconds.",
            "Led a full UI/UX redesign, refactoring legacy code and resolving critical bottlenecks to reach a production-ready MVP with seamless navigation.",
            "Developed student performance tracking with AI-powered intervention suggestions, preparing the platform for its commercial launch.",
          ],
        },
      ],
      stack: ["Next.js", "NestJS", "TypeScript", "LLM integration", "UI/UX"],
    },
    {
      company: "GymGames",
      companyNote: "Startup",
      location: "Brasília, Brazil",
      roles: [
        {
          title: "Co-founder & Mobile Developer",
          start: "Jan 2024",
          end: "May 2026",
          summary:
            "Built a gamified fitness platform from the ground up, from a WhatsApp-based prototype and Figma designs to an app on the App Store and Google Play that reached 1,100+ organic users, a ~50% active-user rate and a 5-star rating on both stores.",
          highlights: [
            "Architected a scalable gamification engine with React Native (Expo) and NestJS, including “Squad vs. Squad” competitions that significantly boosted daily engagement and retention.",
            "Directed the end-to-end product lifecycle, from Figma prototypes to the deployment pipeline on Expo EAS and AWS, through a successful store launch.",
            "Sold and implemented the B2B MVP for three junior enterprises, validating the product as a tool for collective engagement and physical activity.",
            "Reached 5★ on the App Store and Google Play by iterating on direct community feedback, and bridged digital and physical rewards with 3D-printed trophies for season winners.",
          ],
        },
      ],
      stack: ["React Native", "Expo", "NestJS", "TypeScript", "AWS", "Expo EAS", "Figma"],
    },
    {
      company: "Banco do Brasil",
      location: "Brasília, Brazil",
      roles: [
        {
          title: "IT Intern, People Directorate (DIPES)",
          start: "May 2024",
          end: "Dec 2024",
          summary:
            "Modernized the internal systems that manage corporate employee expatriation, reducing manual data handling through SQL integrations and enabling data-driven decisions with custom BI.",
          highlights: [
            "Engineered the expatriation management platform with Java (JSP) and MVC, bringing modern development practices to a legacy environment while keeping it stable.",
            "Connected and synchronized the platform with dozens of internal corporate databases via SQL to ensure data integrity across the expatriation workflow.",
            "Prototyped and implemented new interfaces that streamlined administrative tasks for bank employees.",
            "Delivered Power BI dashboards that automated the extraction and formatting of complex datasets for real-time reporting.",
          ],
        },
      ],
      stack: ["Java", "JSP", "MVC", "SQL", "Power BI"],
    },
    {
      company: "CJR",
      companyNote: "UnB's Junior Enterprise software factory",
      location: "Brasília, Brazil",
      duration: "2 yrs 10 mos",
      roles: [
        {
          title: "Talent Leader (Elected)",
          start: "Jan 2023",
          end: "Dec 2023",
          highlights: [
            "Elected to lead the 14-person Talent department and ran the largest recruitment drive in the company's history (86 candidates) with data-backed selection criteria.",
            "Worked on the frontend of Selo Social, a modernization of a national certification system aligned with UN guidelines and the main driver of the company's record revenue.",
          ],
        },
        {
          title: "Member Management Coordinator",
          start: "Jan 2022",
          end: "Dec 2022",
          highlights: [
            "Led a team of 3 and introduced Individual Development Plans (IDPs), improving member retention and career-path clarity.",
          ],
        },
        {
          title: "Junior Full-Stack Developer & Talent Associate",
          start: "Mar 2021",
          end: "Dec 2021",
          highlights: [
            "Joined through a highly competitive selection process and delivered production code for real client projects with React, Ruby on Rails, Node.js and TypeScript.",
          ],
        },
      ],
      stack: ["React", "Ruby on Rails", "Node.js", "TypeScript", "Leadership"],
    },
  ]),

  projects: list<Project>([
    {
      slug: "tempo",
      name: "Tempo",
      tagline: "An AI planning assistant that turns a brain dump into a real week.",
      context: "PM Accelerator · Lead AI Engineer · 2026",
      category: "AI",
      problem:
        "To-do lists ignore how much free time you actually have, so weekly plans fall apart by Tuesday.",
      built: [
        "Turns a weekly “brain dump”, typed or dictated, into a realistic plan by scheduling each task into the gaps in the user's calendar.",
        "Private by design: reads only busy times from the calendars the user picks, and writes nothing until each block is approved.",
        "Domain model and specs written before any code (DDD), then delivered by a fully remote, multinational team using AI agents throughout.",
      ],
      outcome: [
        "Working MVP in 1 week",
        "Launch-ready product",
        "Tier 1 “AI Trailblazer” award",
      ],
      stack: ["LLMs", "AI agents", "Calendar integration", "DDD"],
      visual: "tempo",
      status: "Live",
      links: [{ label: "Live app", href: "https://tempo-web-two.vercel.app/" }],
    },
    {
      slug: "meueduca",
      name: "MeuEduca",
      tagline: "Generative AI that gives public school teachers their evenings back.",
      context: "Full-Stack Developer & AI Integrator · 2025–2026",
      category: "AI",
      problem:
        "Primary school teachers spend hours writing individual student progress reports by hand.",
      built: [
        "LLM features that turn structured student data into personalized pedagogical reports.",
        "Student performance tracking with AI-powered intervention suggestions.",
        "Next.js + NestJS platform rebuilt from a fragmented codebase, with a full UI/UX redesign.",
      ],
      outcome: ["Reports in seconds instead of hours", "Market-ready MVP", "Ready for commercial launch"],
      stack: ["Next.js", "NestJS", "TypeScript", "LLMs"],
      visual: "meueduca",
    },
    {
      slug: "gymgames",
      name: "GymGames",
      tagline: "A gamified fitness app where squads compete to show up.",
      context: "Co-founder & Mobile Developer · 2024–2026",
      category: "Mobile",
      problem:
        "Staying consistent at the gym is hard alone. We made it a team game, with seasons, rankings and real trophies.",
      built: [
        "React Native (Expo) app and NestJS backend with a gamification engine and “Squad vs. Squad” seasons.",
        "Took it from a WhatsApp-based prototype to both app stores via Expo EAS and AWS.",
        "Ran the product end to end: Figma prototypes, releases, community feedback and B2B sales to three junior enterprises.",
      ],
      outcome: ["1,100+ organic users, ~50% active", "5★ on both stores", "3 B2B deals"],
      stack: ["React Native", "Expo", "NestJS", "AWS"],
      visual: "gymgames",
      status: "Retired 2026",
      links: [{ label: "Instagram", href: "https://www.instagram.com/gymgames.app/" }],
    },
    {
      slug: "quattor-platform",
      name: "Quattor Platform",
      tagline: "An in-house platform replacing a gym's third-party management SaaS.",
      context: "Quattor Academia · Full-Stack Developer · 2026",
      category: "Full-Stack",
      problem:
        "The gym depended on an external SaaS (EVO) and manual WhatsApp follow-ups for bookings and retention.",
      built: [
        "React 19 + React Router 7 (SSR) app on Node.js, Prisma and MongoDB: trials, cancellations with fee calculation, retention, sales, reports and schedules.",
        "EVO REST API and WhatsApp (Evolution API) integrations that automate trial-class booking and notifications.",
        "n8n-scheduled retention bot for inactive members, shipped through Docker and GitHub Actions CI/CD.",
      ],
      outcome: ["Booking flow automated end to end", "~125 commits, 25+ merged PRs", "Automated redeploys"],
      stack: ["React Router 7", "Prisma", "MongoDB", "n8n", "Docker"],
      visual: "platform",
    },
    {
      slug: "lobby-leaderboard",
      name: "Lobby TV Leaderboard",
      tagline: "Weekly attendance rankings from facial-recognition turnstile logs.",
      context: "Quattor Academia · 2026",
      category: "Full-Stack",
      problem:
        "Turn raw turnstile logs into something members actually look at, on hardware that can barely run a browser.",
      built: [
        "Weekly rankings, season champions and a winners' mode on the lobby TV.",
        "Aggressive optimization so it runs 24/7 on a low-end TV box.",
      ],
      outcome: ["−75% image weight", "−80% API payload", "Runs 24/7"],
      stack: ["JavaScript", "Node.js", "Performance"],
      visual: "leaderboard",
    },
    {
      slug: "transferkan",
      name: "TransferKAN",
      tagline: "Deep learning to classify gunshot wounds for forensic analysis.",
      context: "Undergraduate thesis · UnB · 2026",
      category: "Research",
      problem:
        "Forensic experts need consistent ways to classify ballistic wounds and estimate shooting distance.",
      built: [
        "Machine learning models applied to a forensic ballistics dataset to classify gunshot entry/exit wounds and estimate shooting distance.",
        "Transfer learning with ResNet152 combined with Kolmogorov–Arnold Networks (ConvKAN, PureKAN, TransferKAN) in PyTorch.",
      ],
      outcome: ["Accepted at SIBGRAPI 2026", "Workshop of Undergraduate Works"],
      stack: ["Python", "PyTorch", "ResNet152", "KAN"],
      visual: "research",
      links: [{ label: "Research repo", href: "https://github.com/Silva015/tcc-2026" }],
    },
  ]),

  skills: list<SkillGroup>([
    { name: "Languages", items: ["TypeScript", "JavaScript", "Python", "Java", "C/C++", "SQL", "Ruby"] },
    {
      name: "Frontend & Mobile",
      items: ["React 19", "Next.js", "React Router 7 (SSR)", "React Native", "Expo / EAS", "Tailwind CSS"],
    },
    { name: "Backend", items: ["Node.js", "NestJS", "Ruby on Rails", "REST APIs", "Webhooks & integrations"] },
    {
      name: "Data",
      items: ["MongoDB", "PostgreSQL", "Prisma", "DBeaver", "Power BI", "Python (matplotlib, ReportLab)"],
    },
    {
      name: "AI",
      items: [
        "LLM integration",
        "AI agents",
        "Generative AI & prompt engineering",
        "NLP",
        "Machine learning",
        "n8n automations",
      ],
    },
    {
      name: "DevOps & Cloud",
      items: ["Docker", "GitHub Actions (CI/CD)", "AWS", "pnpm monorepos", "Git", "Vercel"],
    },
    {
      name: "Ways of working",
      items: [
        "Domain-Driven Design",
        "Documentation-driven",
        "AI-assisted engineering (agent-ready specs)",
        "Scrum / Kanban",
        "Figma prototyping",
        "Async remote",
      ],
    },
  ]),

  education: {
    school: "Universidade de Brasília (UnB)",
    degree: "Bachelor's degree, Computer Science",
    period: "2021 – Dec 2026 (expected)",
    coursework: "Natural Language Processing, Data Structures & Algorithms, Software Architecture",
    thesis:
      "TransferKAN: ballistic wound classification via transfer learning and Kolmogorov–Arnold Networks. Accepted as a poster at SIBGRAPI 2026 (Workshop of Undergraduate Works).",
  },

  certifications: list<Certification>([
    { name: "C1 Advanced (CAE)", issuer: "Cambridge English", note: "Advanced English" },
    { name: "Certified AI Engineer", issuer: "PM Accelerator" },
    { name: "NLW Expert, React Native track", issuer: "Rocketseat" },
    { name: "React Native: Interfaces, Navigation & Local Storage" },
    { name: "React Native Fundamentals" },
  ]),

  languages: [
    { name: "Portuguese", level: "Native" },
    { name: "English", level: "Advanced, C1 (Cambridge CAE)" },
  ],
};

export type Profile = typeof profile;
