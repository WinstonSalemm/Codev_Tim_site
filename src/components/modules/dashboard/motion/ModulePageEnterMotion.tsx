"use client";

import { useEffect, useRef, type ReactNode } from "react";
import {
  MODULE_TRANSITION_SESSION_KEY,
  markModuleEnterDone,
  markModuleEnterStart,
} from "@/lib/dashboard/motion";
import { useReducedMotion } from "./useReducedMotion";

type ModulePageEnterMotionProps = {
  children: ReactNode;
};

export function ModulePageEnterMotion({
  children,
}: ModulePageEnterMotionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    let shouldEnter = false;

    try {
      shouldEnter =
        sessionStorage.getItem(MODULE_TRANSITION_SESSION_KEY) === "1";
      if (shouldEnter) {
        sessionStorage.removeItem(MODULE_TRANSITION_SESSION_KEY);
      }
    } catch {
      shouldEnter = false;
    }

    if (!shouldEnter || !rootRef.current) {
      return;
    }

    const root = rootRef.current;
    markModuleEnterStart();
    root.classList.add("ds-module-page--enter");

    const handleDone = () => {
      markModuleEnterDone();
      root.removeEventListener("animationend", handleDone);
    };

    root.addEventListener("animationend", handleDone);

    return () => {
      root.removeEventListener("animationend", handleDone);
    };
  }, [reducedMotion]);

  return (
    <div ref={rootRef} className="ds-module-page-motion">
      {children}
    </div>
  );
}
