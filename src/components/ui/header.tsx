"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "./icons";
import { Container, Monogram, buttonClass, cn } from "./primitives";
import { ThemeToggle } from "./theme-toggle";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Header({ name, initials }: { name: string; initials: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 print:hidden",
        scrolled || open
          ? "border-b border-border bg-bg/75 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5 text-sm font-medium" onClick={() => setOpen(false)}>
          <Monogram initials={initials} />
          <span className="hidden sm:inline">{name}</span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-3 py-2 text-sm text-muted transition-colors hover:text-fg"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Link href="/resume" className={buttonClass("secondary", "hidden h-9 px-4 sm:inline-flex")}>
            Résumé
          </Link>
          <button
            type="button"
            className="inline-grid size-9 place-items-center rounded-full text-muted hover:bg-surface hover:text-fg md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </Container>

      {open ? (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border md:hidden">
          <Container className="flex flex-col py-3">
            {[...NAV, { href: "/resume", label: "Résumé" }].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-base text-muted hover:bg-surface hover:text-fg"
              >
                {item.label}
              </a>
            ))}
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
