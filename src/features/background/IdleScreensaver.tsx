"use client";

import { useEffect, useState } from "react";
import { useBoot } from "@/features/boot";
import { IdleScreensaverMesh } from "./IdleScreensaverMesh";
import { useIdleTimeout } from "./useIdleTimeout";

export function IdleScreensaver() {
  const { isBootComplete } = useBoot();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const { isVisible, isLeaving, runMesh, showWordmark } = useIdleTimeout({
    enabled: isBootComplete && !reducedMotion,
  });

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`ds-idle-screensaver ${showWordmark ? "ds-idle-screensaver--active" : ""} ${isLeaving ? "ds-idle-screensaver--leaving" : ""}`}
      aria-hidden="true"
      inert
    >
      <IdleScreensaverMesh active={runMesh && !isLeaving} />
      <div className="ds-idle-screensaver-vignette" aria-hidden="true" />

      <div className="ds-idle-screensaver-wordmark-stage">
        <div className="ds-idle-screensaver-wordmark-stack" aria-hidden="true">
          <span className="ds-idle-screensaver-wordmark-glow">Codev_Tim</span>
          <span className="ds-idle-screensaver-wordmark-halo">Codev_Tim</span>
          <span className="ds-idle-screensaver-wordmark">Codev_Tim</span>
        </div>
      </div>
    </div>
  );
}
