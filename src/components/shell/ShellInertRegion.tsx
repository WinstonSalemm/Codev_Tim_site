"use client";

import type { ReactNode } from "react";
import { useShellContext } from "@/context/shell";

type ShellInertRegionProps = {
  children: ReactNode;
  className?: string;
  role?: React.AriaRole;
};

export function ShellInertRegion({
  children,
  className,
  role,
}: ShellInertRegionProps) {
  const { isMobileNavOpen } = useShellContext();

  return (
    <div
      className={className}
      role={role}
      inert={isMobileNavOpen ? true : undefined}
    >
      {children}
    </div>
  );
}
