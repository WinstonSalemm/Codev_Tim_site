"use client";

import { useTranslations } from "next-intl";

type HeaderVersionBadgeProps = {
  version: string;
};

export function HeaderVersionBadge({ version }: HeaderVersionBadgeProps) {
  const t = useTranslations("shell");

  return (
    <span
      className="ds-header-version"
      aria-label={t("header.versionAria", { version })}
    >
      <span className="ds-header-version-label ds-text-label">
        {t("header.version")}
      </span>
      <span className="ds-header-version-value">v{version}</span>
    </span>
  );
}
