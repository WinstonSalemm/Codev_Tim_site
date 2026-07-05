"use client";

import type { ReactNode } from "react";
import { BootContentGate } from "@/features/boot";
import { ShellInertRegion } from "./ShellInertRegion";

type ContentViewportClientProps = {
  children: ReactNode;
  ariaLabel: string;
};

export function ContentViewportClient({
  children,
  ariaLabel,
}: ContentViewportClientProps) {
  return (
    <ShellInertRegion className="ds-shell-content">
      <main
        id="content"
        className="ds-shell-content-main ds-scrollbar"
        aria-label={ariaLabel}
      >
        <BootContentGate>{children}</BootContentGate>
      </main>
    </ShellInertRegion>
  );
}
