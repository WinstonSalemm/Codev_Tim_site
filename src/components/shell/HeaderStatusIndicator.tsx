"use client";

import { useTranslations } from "next-intl";

export function HeaderStatusIndicator() {
  const t = useTranslations("shell");

  return (
    <div className="ds-header-status" aria-label={t("header.statusAria")}>
      <span
        className="ds-header-status-dot ds-status-dot-operational"
        aria-hidden="true"
      />
      <span className="ds-header-status-label">{t("status.operational")}</span>
    </div>
  );
}
