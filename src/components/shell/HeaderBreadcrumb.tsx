"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { getModuleByPathname } from "@/lib/shell";

export function HeaderBreadcrumb() {
  const t = useTranslations("shell");
  const tModules = useTranslations("modules");
  const pathname = usePathname();
  const activeModule = getModuleByPathname(pathname);

  const trail = activeModule
    ? tModules(`${activeModule.id}.name`)
    : tModules("missingModule.name");

  return (
    <nav
      className="ds-header-breadcrumb"
      aria-label={t("header.breadcrumbAria")}
    >
      <span className="ds-header-breadcrumb-value">{trail}</span>
    </nav>
  );
}
