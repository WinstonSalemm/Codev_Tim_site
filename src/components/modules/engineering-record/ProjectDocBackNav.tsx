"use client";

import { useSyncExternalStore } from "react";
import { Link } from "@/i18n/navigation";
import { readRegistryOrigin } from "@/lib/dashboard/motion/registry-origin";

type ProjectDocBackNavProps = {
  label: string;
};

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getBackHref(): string {
  return readRegistryOrigin();
}

function getServerBackHref(): string {
  return "/projects";
}

export function ProjectDocBackNav({ label }: ProjectDocBackNavProps) {
  const href = useSyncExternalStore(subscribe, getBackHref, getServerBackHref);

  return (
    <nav className="ds-er-doc-back" aria-label={label}>
      <Link href={href} className="ds-er-doc-back-link">
        <span className="ds-er-doc-back-arrow" aria-hidden="true">
          ←
        </span>
        {label}
      </Link>
    </nav>
  );
}
