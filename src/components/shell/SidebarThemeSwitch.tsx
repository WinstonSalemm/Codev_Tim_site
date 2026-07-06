"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "@/features/theme";

export function SidebarThemeSwitch() {
  const t = useTranslations("shell.theme");
  const { theme, preference, toggleTheme, resetToSystem } = useTheme();
  const isLight = theme === "light";
  const followsSystem = preference === "system";

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
        aria-label={
          followsSystem
            ? t("switchFromSystem", {
                current: isLight ? t("light") : t("dark"),
              })
            : isLight
              ? t("switchToDark")
              : t("switchToLight")
        }
      >
        <span
          className={`ds-sidebar-theme-indicator ${followsSystem ? "ds-sidebar-theme-indicator--system" : ""}`}
          aria-hidden="true"
        />
        <span className="ds-sidebar-theme-copy">
          <span className="ds-sidebar-theme-mode">
            {isLight ? t("light") : t("dark")}
          </span>
          {followsSystem ? (
            <span className="ds-sidebar-theme-hint">{t("systemHint")}</span>
          ) : null}
        </span>
      </button>
      {!followsSystem ? (
        <button
          type="button"
          className="ds-sidebar-theme-reset"
          onClick={resetToSystem}
        >
          {t("useSystem")}
        </button>
      ) : null}
    </div>
  );
}
