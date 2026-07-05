import type { Locale } from "@/i18n/config";

const OG_LOCALE_MAP: Record<Locale, string> = {
  en: "en_US",
  ru: "ru_RU",
  uz: "uz_UZ",
};

export function getOpenGraphLocale(locale: string): string {
  return OG_LOCALE_MAP[locale as Locale] ?? OG_LOCALE_MAP.en;
}

export function getOpenGraphAlternateLocales(locale: string): string[] {
  return (Object.keys(OG_LOCALE_MAP) as Locale[])
    .filter((entry) => entry !== locale)
    .map((entry) => OG_LOCALE_MAP[entry]);
}
