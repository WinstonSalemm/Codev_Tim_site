"use client";

import { useTranslations } from "next-intl";

export function SkipLink() {
  const t = useTranslations("shell");

  return (
    <a href="#content" className="ds-skip-link">
      {t("skipToContent")}
    </a>
  );
}
