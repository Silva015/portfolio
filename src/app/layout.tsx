import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { profile } from "@/content/profile";
import { THEME_SCRIPT } from "@/lib/theme";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const title = `${profile.name} · ${profile.headline}`;
const description = `${profile.tagline} Full-stack engineer (TypeScript, React, Next.js, NestJS) and AI engineer (LLM integration, agents) based in Brazil, open to remote roles.`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: title, template: `%s · ${profile.name}` },
  description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  keywords: [
    "Arthur Carneiro",
    "Full-Stack Engineer",
    "Full-Stack Developer",
    "AI Engineer",
    "LLM",
    "TypeScript",
    "React",
    "Next.js",
    "NestJS",
    "React Native",
    "Remote",
    "Brazil",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title,
    description,
    locale: "en_US",
    firstName: profile.firstName,
    lastName: profile.name.split(" ").slice(1).join(" "),
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08090a" },
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: profile.fullName,
  ...(profile.avatar ? { image: `${profile.siteUrl}${profile.avatar}` } : {}),
  jobTitle: profile.headline,
  description: profile.tagline,
  url: profile.siteUrl,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Brasília", addressCountry: "BR" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Universidade de Brasília" },
  knowsLanguage: ["pt-BR", "en"],
  knowsAbout: profile.skills.flatMap((g) => g.items).slice(0, 24),
  sameAs: [profile.socials.linkedin, profile.socials.github],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
