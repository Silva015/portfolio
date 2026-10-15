"use client";

import { Moon, Sun } from "./icons";

export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className="inline-grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-fg"
    >
      <Sun className="hidden dark:block" />
      <Moon className="hidden light:block" />
    </button>
  );
}
