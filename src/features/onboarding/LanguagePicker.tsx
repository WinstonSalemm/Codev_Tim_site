"use client";

import { useCallback, useId, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { localeLabels, locales, type Locale } from "@/i18n/config";
import { useClickOutside } from "./use-click-outside";

type LanguagePickerBaseProps = {
  className?: string;
};

type OnboardingLanguagePickerProps = LanguagePickerBaseProps & {
  variant: "onboarding";
  value: Locale;
  onValueChange: (locale: Locale) => void;
  label: string;
};

type CompactLanguagePickerProps = LanguagePickerBaseProps & {
  variant: "compact";
};

export type LanguagePickerProps =
  OnboardingLanguagePickerProps | CompactLanguagePickerProps;

export function LanguagePicker(props: LanguagePickerProps) {
  if (props.variant === "onboarding") {
    return <OnboardingLanguagePicker {...props} />;
  }

  return <CompactLanguagePicker {...props} />;
}

function OnboardingLanguagePicker({
  value,
  onValueChange,
  label,
  className,
}: OnboardingLanguagePickerProps) {
  return (
    <div
      className={[
        "ds-language-picker",
        "ds-language-picker--onboarding",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="radiogroup"
      aria-label={label}
    >
      {locales.map((locale) => {
        const isActive = locale === value;

        return (
          <button
            key={locale}
            type="button"
            className={`ds-language-picker-card ${isActive ? "ds-language-picker-card--active" : ""}`}
            onClick={() => onValueChange(locale)}
            aria-checked={isActive}
            role="radio"
          >
            <span className="ds-language-picker-code">
              {locale.toUpperCase()}
            </span>
            <span className="ds-language-picker-name">
              {localeLabels[locale]}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function CompactLanguagePicker({ className }: CompactLanguagePickerProps) {
  const t = useTranslations("shell");
  const pathname = usePathname();
  const activeLocale = useLocale() as Locale;
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  useClickOutside(rootRef, close, isOpen);

  return (
    <div
      ref={rootRef}
      className={[
        "ds-language-picker",
        "ds-language-picker--compact",
        isOpen ? "ds-language-picker--open" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="ds-sidebar-language-label ds-text-label">
        {t("language.label")}
      </span>

      <button
        type="button"
        className="ds-language-picker-trigger"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listboxId}
      >
        <span className="ds-language-picker-trigger-main">
          <span className="ds-language-picker-code">
            {activeLocale.toUpperCase()}
          </span>
          <span className="ds-language-picker-name">
            {localeLabels[activeLocale]}
          </span>
        </span>
        <span className="ds-language-picker-chevron" aria-hidden="true" />
      </button>

      <div
        id={listboxId}
        className="ds-language-picker-panel"
        role="listbox"
        aria-label={t("language.select")}
        hidden={!isOpen}
      >
        <div className="ds-language-picker-panel-inner">
          {locales.map((locale) => {
            const isActive = locale === activeLocale;

            return (
              <Link
                key={locale}
                href={pathname}
                locale={locale}
                className={`ds-language-picker-option ${isActive ? "ds-language-picker-option--active" : ""}`}
                onClick={close}
                role="option"
                aria-selected={isActive}
                lang={locale}
                hrefLang={locale}
              >
                <span className="ds-language-picker-code">
                  {locale.toUpperCase()}
                </span>
                <span className="ds-language-picker-name">
                  {localeLabels[locale]}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
