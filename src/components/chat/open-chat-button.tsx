"use client";

import type { ReactNode } from "react";

export const OPEN_CHAT_EVENT = "ask-ai:open";

export function openChat(question?: string) {
  window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT, { detail: { question } }));
}

export function OpenChatButton({
  className,
  question,
  children,
}: {
  className?: string;
  question?: string;
  children: ReactNode;
}) {
  return (
    <button type="button" className={className} onClick={() => openChat(question)}>
      {children}
    </button>
  );
}
