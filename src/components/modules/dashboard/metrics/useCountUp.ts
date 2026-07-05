"use client";

import { useEffect, useState } from "react";
import { DASHBOARD_LIVE_METRICS, easeOutCubic } from "@/lib/dashboard/metrics";

export function useCountUp(
  target: number,
  active: boolean,
  immediate: boolean
): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (immediate) {
      setValue(target);
      return;
    }

    if (!active) {
      setValue(0);
      return;
    }

    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = easeOutCubic(
        elapsed / DASHBOARD_LIVE_METRICS.durationMs
      );
      const next = Math.round(target * progress);
      setValue(next);

      if (elapsed < DASHBOARD_LIVE_METRICS.durationMs) {
        frame = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [active, immediate, target]);

  return value;
}
