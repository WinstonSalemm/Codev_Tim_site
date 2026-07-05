"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { localeLabels, locales, type Locale } from "@/i18n/config";

export function SidebarLanguageSwitch() {
  const t = useTranslations("shell");
  const pathname = usePathname();
  const activeLocale = useLocale() as Locale;

  return (
    <div className="ds-sidebar-language">
      <span className="ds-sidebar-language-label ds-text-label">
        {t("language.label")}
      </span>

      <div
        className="ds-sidebar-language-options"
        role="group"
        aria-label={t("language.select")}
      >
        {locales.map((locale) => {
          const isActive = locale === activeLocale;

          return (
            <Link
              key={locale}
              href={pathname}
              locale={locale}
              className={`ds-sidebar-language-option ${isActive ? "ds-sidebar-language-option--active" : ""}`}
              aria-current={isActive ? "true" : undefined}
              lang={locale}
              hrefLang={locale}
            >
              <span className="ds-sidebar-language-code">
                {locale.toUpperCase()}
              </span>
              <span className="ds-sidebar-language-name">
                {localeLabels[locale]}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
