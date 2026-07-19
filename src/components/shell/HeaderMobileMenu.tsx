"use client";

import { useTranslations } from "next-intl";
import { useShellContext } from "@/context/shell";

export function HeaderMobileMenu() {
  const t = useTranslations("shell");
  const { isMobileNavOpen, toggleMobileNav } = useShellContext();

  return (
    <button
      type="button"
      className={`ds-header-menu-button${isMobileNavOpen ? "ds-header-menu-button--open" : ""}`}
      aria-label={t("openNavigation")}
      aria-expanded={isMobileNavOpen}
      aria-controls="module-navigation"
      onClick={toggleMobileNav}
    >
      <span className="ds-header-menu-glyph" aria-hidden="true">
        <span className="ds-header-menu-glyph-line" />
        <span className="ds-header-menu-glyph-line" />
        <span className="ds-header-menu-glyph-line" />
      </span>
      <span className="ds-text-label ds-header-menu-label">{t("menu")}</span>
    </button>
  );
}
