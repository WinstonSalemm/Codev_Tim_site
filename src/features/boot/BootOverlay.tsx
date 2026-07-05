"use client";

import { useTranslations } from "next-intl";
import { useBoot } from "./BootProvider";

export function BootOverlay() {
  const t = useTranslations("shell.boot");
  const { sessionType, phase, isOverlayVisible } = useBoot();

  if (!isOverlayVisible) {
    return null;
  }

  const message =
    sessionType === "warm"
      ? t("sessionRestored")
      : phase === "initializing"
        ? t("initializing")
        : null;

  if (!message) {
    return null;
  }

  return (
    <div className="boot-overlay" aria-hidden="true">
      <span className="boot-overlay-message">{message}</span>
    </div>
  );
}
