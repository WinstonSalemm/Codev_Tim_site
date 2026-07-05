"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { REGISTRY_DRILLDOWN_SESSION_KEY } from "@/lib/dashboard/motion";
import { useReducedMotion } from "@/components/modules/dashboard/motion/useReducedMotion";

type EngineeringRecordEnterMotionProps = {
  children: ReactNode;
};

export function EngineeringRecordEnterMotion({
  children,
}: EngineeringRecordEnterMotionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    let shouldEnter = false;

    try {
      shouldEnter =
        sessionStorage.getItem(REGISTRY_DRILLDOWN_SESSION_KEY) === "1";
      if (shouldEnter) {
        sessionStorage.removeItem(REGISTRY_DRILLDOWN_SESSION_KEY);
      }
    } catch {
      shouldEnter = false;
    }

    if (!shouldEnter || !rootRef.current) {
      return;
    }

    const root = rootRef.current;
    root.classList.add("ds-engineering-record--enter");

    const handleDone = () => {
      root.removeEventListener("animationend", handleDone);
    };

    root.addEventListener("animationend", handleDone);

    return () => {
      root.removeEventListener("animationend", handleDone);
    };
  }, [reducedMotion]);

  return (
    <div ref={rootRef} className="ds-engineering-record-motion">
      {children}
    </div>
  );
}
