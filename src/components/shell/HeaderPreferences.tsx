"use client";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTheme } from "@/features/theme";
import { animateChange } from "@/lib/shell/animate-change";
export function HeaderPreferences() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("shell");
  const { theme, toggleTheme, resetToSystem, preference } = useTheme();
  return (
    <div className="studio-preferences">
      <label className="studio-language">
        <span className="sr-only">{t("language.select")}</span>
        <select
          aria-label={t("language.select")}
          value={locale}
          onChange={(e) => {
            const next = e.target.value;
            animateChange(() =>
              router.replace(
                pathname + window.location.search + window.location.hash,
                { locale: next, scroll: false }
              )
            );
          }}
        >
          <option value="ru">RU</option>
          <option value="uz">UZ</option>
          <option value="en">EN</option>
        </select>
      </label>
      <button
        className="studio-theme"
        type="button"
        onClick={toggleTheme}
        aria-label={
          theme === "dark" ? t("theme.switchToLight") : t("theme.switchToDark")
        }
        title={
          theme === "dark" ? t("theme.switchToLight") : t("theme.switchToDark")
        }
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          {theme === "dark" ? (
            <>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
            </>
          ) : (
            <path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z" />
          )}
        </svg>
      </button>
      {preference !== "system" && (
        <button
          type="button"
          className="studio-system-theme"
          onClick={resetToSystem}
          title={t("theme.useSystem")}
          aria-label={t("theme.useSystem")}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="4" width="18" height="12" rx="2" />
            <path d="M8 21h8m-4-5v5" />
          </svg>
        </button>
      )}
    </div>
  );
}
