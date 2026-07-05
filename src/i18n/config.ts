import { routing } from "@/i18n/routing";

export const locales = routing.locales;
export type Locale = (typeof locales)[number];

export const defaultLocale = routing.defaultLocale;

export const localeLabels: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
  uz: "O'zbek",
};

export const ogLocales: Record<Locale, string> = {
  en: "en_US",
  ru: "ru_RU",
  uz: "uz_UZ",
};
