"use client";

import type { ReactNode } from "react";
import { useBoot } from "./BootProvider";

type BootShellFrameProps = {
  children: ReactNode;
};

export function BootShellFrame({ children }: BootShellFrameProps) {
  const {
    sessionType,
    phase,
    isBootComplete,
    isShellInert,
    isModuleLoading,
    isPulseActive,
  } = useBoot();

  return (
    <div
      className="ds-shell"
      data-boot-session={sessionType}
      data-boot-phase={phase}
      data-boot-complete={isBootComplete ? "true" : "false"}
      data-boot-pulse={isPulseActive ? "active" : "idle"}
      data-boot-module={isModuleLoading ? "loading" : "idle"}
      data-boot-terminal={phase === "ready" ? "ready" : "pending"}
      inert={isShellInert ? true : undefined}
    >
      {children}
    </div>
  );
}
