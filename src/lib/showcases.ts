import type { Locale } from "./commerce/catalog";

export const SHOWCASES = {
  "fire-safety-store": { title: "FireSafe Demo", kind: "catalog" },
  "codev-erp": { title: "Financial ERP", kind: "workflow" },
  "call-tracker": { title: "Call Tracker", kind: "workflow" },
} as const;
export type ShowcaseSlug = keyof typeof SHOWCASES;
export function isShowcaseSlug(slug: string): slug is ShowcaseSlug {
  return Object.hasOwn(SHOWCASES, slug);
}
export function showcaseSource(slug: ShowcaseSlug, locale: Locale) {
  return `/showcases/${slug}/${locale}/index.html`;
}
export const SHOWCASE_COPY = {
  ru: {
    direct: "Открыть в отдельной вкладке",
    fullscreenFallback:
      "Полноэкранный режим недоступен. Можно открыть демонстрацию в отдельной вкладке.",
    title: "Попробуйте в действии",
    demo: "Открыть демоверсию",
    start: "Запустить интерактивный просмотр",
    disclosure: "Демоверсия · Вымышленные данные",
    simulation: "Симуляция рабочего процесса · Вымышленные данные",
    desktop: "Компьютер",
    tablet: "Планшет",
    mobile: "Телефон",
    refresh: "Сбросить демо",
    fullscreen: "На весь экран",
    back: "Вернуться к кейсу",
    loading: "Загружаем демонстрацию…",
    error:
      "Просмотр недоступен. Откройте демоверсию отдельной страницей или повторите загрузку.",
    description:
      "Исследуйте интерфейс, меняйте параметры и проверяйте сценарии. Действия выполняются только внутри демонстрации.",
    next: "Следующий проект",
    architecture: "Устройство системы",
    experience: "Интерактивный опыт",
  },
  uz: {
    direct: "Alohida varaqda ochish",
    fullscreenFallback:
      "To‘liq ekran rejimi mavjud emas. Demoni alohida varaqda ochishingiz mumkin.",
    title: "Amalda sinab ko‘ring",
    demo: "Demoversiyani ochish",
    start: "Interaktiv ko‘rishni boshlash",
    disclosure: "Demoversiya · Namunaviy ma’lumotlar",
    simulation: "Ish jarayoni simulyatsiyasi · Namunaviy ma’lumotlar",
    desktop: "Kompyuter",
    tablet: "Planshet",
    mobile: "Telefon",
    refresh: "Demoni tiklash",
    fullscreen: "To‘liq ekran",
    back: "Keysga qaytish",
    loading: "Demo yuklanmoqda…",
    error:
      "Ko‘rish imkoni yo‘q. Demoni alohida sahifada oching yoki qayta yuklang.",
    description:
      "Interfeysni o‘rganing, parametrlarni o‘zgartiring va jarayonlarni sinang. Barcha amallar faqat demo ichida bajariladi.",
    next: "Keyingi loyiha",
    architecture: "Tizim tuzilishi",
    experience: "Interaktiv tajriba",
  },
  en: {
    direct: "Open in a separate tab",
    fullscreenFallback:
      "Fullscreen is unavailable. You can open the demonstration in a separate tab.",
    title: "Try the experience",
    demo: "Open demo",
    start: "Launch interactive preview",
    disclosure: "Demo · Fictional data",
    simulation: "Workflow simulation · Fictional data",
    desktop: "Desktop",
    tablet: "Tablet",
    mobile: "Mobile",
    refresh: "Reset demo",
    fullscreen: "Fullscreen",
    back: "Back to case study",
    loading: "Loading demonstration…",
    error: "Preview unavailable. Open the demo separately or try reloading.",
    description:
      "Explore the interface, change parameters and try the workflows. Actions run entirely inside the demonstration.",
    next: "Next project",
    architecture: "System architecture",
    experience: "Interactive experience",
  },
} satisfies Record<Locale, Record<string, string>>;
