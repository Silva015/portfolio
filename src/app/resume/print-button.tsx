"use client";

import { Printer } from "@/components/ui/icons";
import { buttonClass } from "@/components/ui/primitives";

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className={buttonClass("secondary", "h-10")}>
      <Printer size={16} />
      Save as PDF
    </button>
  );
}
