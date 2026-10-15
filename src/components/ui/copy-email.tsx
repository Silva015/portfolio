"use client";

import { useState } from "react";
import { Check, Copy } from "./icons";
import { buttonClass } from "./primitives";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button type="button" onClick={copy} className={buttonClass("secondary")} aria-live="polite">
      {copied ? <Check className="text-accent" /> : <Copy />}
      {copied ? "Copied!" : "Copy email"}
    </button>
  );
}
