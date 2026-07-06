import { type Locale, locales } from "@/i18n/config";

export function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") {
    return "en";
  }

  const languages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const language of languages) {
    const normalized = language.toLowerCase();

    if (normalized.startsWith("ru")) {
      return "ru";
    }

    if (normalized.startsWith("uz")) {
      return "uz";
    }

    if (normalized.startsWith("en")) {
      return "en";
    }
  }

  return locales[0];
}
