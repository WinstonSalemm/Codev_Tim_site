"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/config";
import { ONBOARDING_COPY } from "./copy";
import { detectBrowserLocale } from "./detect-browser-locale";
import { LanguagePicker } from "./LanguagePicker";
import { useOnboarding } from "./OnboardingProvider";
import { useIsDesktop } from "./use-is-desktop";

export function OnboardingOverlay() {
  const router = useRouter();
  const pathname = usePathname();
  const activeLocale = useLocale() as Locale;
  const { completeOnboarding } = useOnboarding();
  const isDesktop = useIsDesktop();
  const [selectedLocale, setSelectedLocale] = useState<Locale>(activeLocale);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    setSelectedLocale(detectBrowserLocale());
  }, []);

  useEffect(() => {
    function syncFullscreenState() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }

    syncFullscreenState();
    document.addEventListener("fullscreenchange", syncFullscreenState);

    return () => {
      document.removeEventListener("fullscreenchange", syncFullscreenState);
    };
  }, []);

  const copy = ONBOARDING_COPY[selectedLocale];

  const handleFullscreen = useCallback(async () => {
    if (document.fullscreenElement) {
      return;
    }

    try {
      await document.documentElement.requestFullscreen();
    } catch {
      /* user agent may block fullscreen */
    }
  }, []);

  const handleContinue = useCallback(() => {
    setIsEntering(true);

    window.setTimeout(() => {
      if (selectedLocale !== activeLocale) {
        router.replace(pathname, { locale: selectedLocale });
      }

      completeOnboarding();
    }, 280);
  }, [activeLocale, completeOnboarding, pathname, router, selectedLocale]);

  return (
    <div
      className={`onboarding-overlay ${isEntering ? "onboarding-overlay--exit" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
    >
      <div className="onboarding-overlay-backdrop" aria-hidden="true" />
      <div className="onboarding-overlay-card">
        <p className="onboarding-overlay-eyebrow ds-text-label">
          {copy.eyebrow}
        </p>
        <h1 id="onboarding-title" className="onboarding-overlay-title">
          {copy.title}
        </h1>

        <section className="onboarding-overlay-section">
          <h2 className="onboarding-overlay-section-title">
            {copy.languageHeading}
          </h2>
          <p className="onboarding-overlay-section-hint">{copy.languageHint}</p>
          <LanguagePicker
            variant="onboarding"
            value={selectedLocale}
            onValueChange={setSelectedLocale}
            label={copy.languageHeading}
          />
        </section>

        {isDesktop ? (
          <section className="onboarding-overlay-section onboarding-overlay-section--fullscreen">
            <h2 className="onboarding-overlay-section-title">
              {copy.fullscreenHeading}
            </h2>
            <p className="onboarding-overlay-section-body">
              {copy.fullscreenBody}
            </p>
            <p className="onboarding-overlay-section-hint onboarding-overlay-kbd-hint">
              {copy.fullscreenF11}
            </p>
            <div className="onboarding-overlay-actions">
              <button
                type="button"
                className="onboarding-overlay-button onboarding-overlay-button--secondary"
                onClick={handleFullscreen}
                disabled={isFullscreen}
              >
                {isFullscreen ? copy.fullscreenActive : copy.fullscreenButton}
              </button>
            </div>
          </section>
        ) : null}

        <div className="onboarding-overlay-footer">
          <button
            type="button"
            className="onboarding-overlay-button onboarding-overlay-button--primary"
            onClick={handleContinue}
          >
            {copy.continue}
          </button>
        </div>
      </div>
    </div>
  );
}
