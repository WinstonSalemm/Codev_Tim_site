import type { Locale } from "@/i18n/config";

export type OnboardingCopy = {
  eyebrow: string;
  title: string;
  languageHeading: string;
  languageHint: string;
  fullscreenHeading: string;
  fullscreenBody: string;
  fullscreenF11: string;
  fullscreenButton: string;
  fullscreenActive: string;
  continue: string;
};

export const ONBOARDING_COPY: Record<Locale, OnboardingCopy> = {
  en: {
    eyebrow: "First launch",
    title: "Codev_Tim Operations Center",
    languageHeading: "Choose your language",
    languageHint: "You can change this anytime in the sidebar menu.",
    fullscreenHeading: "Immersive mode",
    fullscreenBody:
      "For the full engineering OS experience, run the site in fullscreen.",
    fullscreenF11: "Press F11 or use the button below.",
    fullscreenButton: "Enter fullscreen",
    fullscreenActive: "Fullscreen active",
    continue: "Enter Operations Center",
  },
  ru: {
    eyebrow: "Первый запуск",
    title: "Codev_Tim Operations Center",
    languageHeading: "Выберите язык",
    languageHint: "Сменить язык можно в любой момент в меню сайдбара.",
    fullscreenHeading: "Полноэкранный режим",
    fullscreenBody:
      "Для полного погружения в инженерную ОС откройте сайт на весь экран.",
    fullscreenF11: "Нажмите F11 или кнопку ниже.",
    fullscreenButton: "На весь экран",
    fullscreenActive: "Полноэкранный режим включён",
    continue: "Войти в Operations Center",
  },
  uz: {
    eyebrow: "Birinchi ishga tushirish",
    title: "Codev_Tim Operations Center",
    languageHeading: "Tilni tanlang",
    languageHint:
      "Tilni istalgan vaqtda yon panel menyusidan o'zgartirishingiz mumkin.",
    fullscreenHeading: "To'liq ekran rejimi",
    fullscreenBody:
      "Muhandislik OS tajribasidan to'liq foydalanish uchun saytni to'liq ekranga oching.",
    fullscreenF11: "F11 tugmasini bosing yoki quyidagi tugmadan foydalaning.",
    fullscreenButton: "To'liq ekranga o'tish",
    fullscreenActive: "To'liq ekran yoqilgan",
    continue: "Operations Center ga kirish",
  },
};
