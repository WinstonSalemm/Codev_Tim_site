"use client";

import { useShellContext } from "@/context/shell";

export function ShellAnnouncer() {
  const { navigationAnnouncement } = useShellContext();

  return (
    <div
      className="ds-sr-only"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {navigationAnnouncement}
    </div>
  );
}
