"use client";

import { useTranslations } from "next-intl";

export function HeaderSystemLabel() {
  const t = useTranslations("shell");

  return (
    <span className="ds-header-system-label ds-text-label">
      {t("header.system")}
    </span>
  );
}
