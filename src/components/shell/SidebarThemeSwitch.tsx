"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "@/features/theme";

export function SidebarThemeSwitch() {
  const t = useTranslations("shell.theme");
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <div className="ds-sidebar-theme">
      <span className="ds-sidebar-language-label ds-text-label">
        {t("label")}
      </span>
      <button
        type="button"
        className="ds-sidebar-theme-toggle"
        onClick={toggleTheme}
        aria-pressed={isLight}
        aria-label={isLight ? t("switchToDark") : t("switchToLight")}
      >
        <span className="ds-sidebar-theme-indicator" aria-hidden="true" />
        <span className="ds-sidebar-theme-mode">
          {isLight ? t("light") : t("dark")}
        </span>
      </button>
    </div>
  );
}
