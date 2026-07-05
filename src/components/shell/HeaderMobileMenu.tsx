"use client";

import { useTranslations } from "next-intl";
import { useShellContext } from "@/context/shell";

export function HeaderMobileMenu() {
  const t = useTranslations("shell");
  const { isMobileNavOpen, toggleMobileNav } = useShellContext();

  return (
    <button
      type="button"
      className="ds-header-menu-button"
      aria-label={t("openNavigation")}
      aria-expanded={isMobileNavOpen}
      aria-controls="module-navigation"
      onClick={toggleMobileNav}
    >
      <span className="ds-text-label">{t("menu")}</span>
    </button>
  );
}
