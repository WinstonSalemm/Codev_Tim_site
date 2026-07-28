export type ServicePageLocale = "en" | "ru" | "uz";

export type ServicePage = {
  slug: string;
  locale: ServicePageLocale;
  label: string;
  title: string;
  description: string;
  intro: string;
  audienceTitle: string;
  audience: string[];
  deliverablesTitle: string;
  deliverables: string[];
  processTitle: string;
  process: { title: string; body: string }[];
  proofTitle: string;
  proof: string;
  cta: string;
  ctaHref: string;
  relatedTitle: string;
  related: { title: string; href: string }[];
};

type ServicePageSeed = Omit<ServicePage, "locale">;

const RU: Record<string, ServicePageSeed> = {
  "website-development-tashkent": {
    slug: "website-development-tashkent",
    label: "УСЛУГА · ТАШКЕНТ",
    title: "Разработка сайта в Ташкенте под задачу бизнеса",
    description:
      "Разработка корпоративных сайтов, каталогов и сайтов-визиток в Ташкенте. Фиксируем задачу, сроки и стоимость до старта.",
    intro:
      "Собираю быстрые сайты для компаний, которым нужно понятно представить услуги, показать реальные проекты и получать обращения из поиска и рекламы.",
    audienceTitle: "Кому подходит",
    audience: [
      "компаниям, которым нужен сайт вместо разрозненных страниц в соцсетях",
      "экспертам и командам, которым важно объяснить сложную услугу простым языком",
      "бизнесу в Ташкенте и Узбекистане, которому нужны RU, UZ или EN-версии",
    ],
    deliverablesTitle: "Что входит",
    deliverables: [
      "структура страниц и прототип ключевого пользовательского пути",
      "адаптивный интерфейс для телефона и компьютера",
      "формы заявки, Telegram-контакты и базовая аналитика GA4",
      "SEO-основа: метаданные, sitemap, robots.txt, canonical и hreflang",
      "публикация на домене и проверка перед передачей",
    ],
    processTitle: "Как проходит работа",
    process: [
      {
        title: "Задача",
        body: "Фиксируем аудиторию, предложение и критерии готовности.",
      },
      {
        title: "Структура",
        body: "Собираем страницы, тексты, доказательства и точки контакта.",
      },
      {
        title: "Разработка",
        body: "Собираю интерфейс, контент и техническую SEO-основу.",
      },
      {
        title: "Проверка",
        body: "Проверяем мобильную версию, формы, ссылки и аналитику.",
      },
      {
        title: "Запуск",
        body: "Подключаем домен, публикуем и передаём понятный список следующих шагов.",
      },
    ],
    proofTitle: "Подход Codev_Tim",
    proof:
      "Сначала понятное коммерческое предложение и маршрут клиента, затем визуальный слой. Поэтому сайт не просто выглядит аккуратно, а помогает объяснить ценность и начать разговор.",
    cta: "Обсудить разработку сайта",
    ctaHref: "/contact?engagement=landing#contact-form",
    relatedTitle: "Связанные услуги",
    related: [
      {
        title: "Корпоративный сайт под ключ",
        href: "/services/corporate-website",
      },
      { title: "Автоматизация и ERP", href: "/services/business-automation" },
    ],
  },
  "corporate-website": {
    slug: "corporate-website",
    label: "УСЛУГА · КОРПОРАТИВНЫЙ САЙТ",
    title: "Корпоративный сайт под ключ для компании",
    description:
      "Корпоративный сайт под ключ: структура, дизайн, каталог услуг, кейсы, мультиязычность, SEO и запуск на вашем домене.",
    intro:
      "Корпоративный сайт должен отвечать на вопросы клиента до первого звонка: кто вы, что делаете, почему вам можно доверять и как начать проект.",
    audienceTitle: "Когда нужен корпоративный сайт",
    audience: [
      "у компании несколько направлений, услуг или филиалов",
      "продажам нужны кейсы, каталог и единая точка входа для B2B-клиентов",
      "нужно согласовать деловую подачу, несколько языков и измеримые обращения",
    ],
    deliverablesTitle: "Результат проекта",
    deliverables: [
      "архитектура разделов: услуги, проекты, команда, контакты и документы",
      "страницы услуг с отдельным поисковым намерением и CTA",
      "кейсы с формулой задача → решение → результат",
      "мультиязычная структура без дубликатов и с корректным hreflang",
      "подключение домена, аналитики, Search Console и базовой SEO-проверки",
    ],
    processTitle: "Пять этапов",
    process: [
      {
        title: "Интервью",
        body: "Понимаем продукт, цикл сделки и вопросы покупателей.",
      },
      {
        title: "Контент",
        body: "Собираем факты, кейсы, цены и доказательства компетенции.",
      },
      {
        title: "Дизайн",
        body: "Формируем спокойную систему страниц вокруг задач клиента.",
      },
      {
        title: "Сборка",
        body: "Разрабатываем сайт, формы, SEO и мультиязычность.",
      },
      {
        title: "Запуск",
        body: "Проверяем индексацию, аналитику и передаём сайт команде.",
      },
    ],
    proofTitle: "Что важно для B2B",
    proof:
      "Вместо общих обещаний на странице появляются конкретные форматы работы, сроки, ограничения, реальные проекты и понятный следующий шаг.",
    cta: "Рассчитать корпоративный сайт",
    ctaHref: "/contact?engagement=corporate#contact-form",
    relatedTitle: "Связанные услуги",
    related: [
      {
        title: "Разработка сайта в Ташкенте",
        href: "/services/website-development-tashkent",
      },
      { title: "Сайт-каталог для бизнеса", href: "/services/catalog-website" },
    ],
  },
  "business-automation": {
    slug: "business-automation",
    label: "УСЛУГА · АВТОМАТИЗАЦИЯ",
    title: "Автоматизация бизнеса и ERP-системы",
    description:
      "Автоматизация бизнеса в Узбекистане: ERP, личные кабинеты, CRM-функции, Telegram-боты и интеграции под реальные процессы.",
    intro:
      "Если данные живут в таблицах, чатах и нескольких несвязанных системах, сначала описываем процесс, а затем выбираем автоматизацию, которая действительно экономит время.",
    audienceTitle: "Для каких задач",
    audience: [
      "продажи, склад, финансы и договоры должны работать в едином контуре",
      "нужны роли пользователей, статусы, согласования и отчётность",
      "команде требуется Telegram-бот, личный кабинет или интеграция с текущими сервисами",
    ],
    deliverablesTitle: "Что проектируем",
    deliverables: [
      "карту процессов, ролей, данных и точек контроля",
      "ERP-модули для продаж, склада, финансов и операционной отчётности",
      "личные кабинеты, CRM-функции, Telegram-боты и интеграции",
      "права доступа, журнал действий и понятные статусы операций",
      "поэтапный запуск с приоритетами, рисками и предварительной оценкой",
    ],
    processTitle: "Сначала система, потом код",
    process: [
      {
        title: "Разбор",
        body: "Фиксируем текущий процесс и стоимость ручной работы.",
      },
      {
        title: "Модель",
        body: "Определяем сущности, роли, статусы и правила доступа.",
      },
      {
        title: "Приоритет",
        body: "Выбираем первый модуль, который даст измеримый эффект.",
      },
      {
        title: "Пилот",
        body: "Собираем рабочий контур и проверяем его на реальных сценариях.",
      },
      {
        title: "Развитие",
        body: "Добавляем интеграции и отчётность без потери управляемости.",
      },
    ],
    proofTitle: "Инженерный принцип",
    proof:
      "Автоматизация ценна не количеством экранов, а тем, насколько точно она сохраняет бизнес-правила, контроль и ответственность за данные.",
    cta: "Обсудить автоматизацию",
    ctaHref: "/contact?engagement=system#contact-form",
    relatedTitle: "Связанные услуги",
    related: [
      {
        title: "Корпоративный сайт под ключ",
        href: "/services/corporate-website",
      },
      { title: "Telegram-боты для процессов", href: "/services/telegram-bots" },
    ],
  },
};

function translateSeed(
  seed: ServicePageSeed,
  locale: ServicePageLocale
): ServicePage {
  if (locale === "ru") return { ...seed, locale };

  const isUzbek = locale === "uz";
  const labels = isUzbek
    ? {
        label: `XIZMAT · ${seed.slug === "business-automation" ? "AVTOMATLASHTIRISH" : "TOSHKENT"}`,
        cta: "Loyihani muhokama qilish",
        relatedTitle: "Bog‘liq xizmatlar",
      }
    : {
        label: `SERVICE · ${seed.slug === "business-automation" ? "AUTOMATION" : "TASHKENT"}`,
        cta: "Discuss the project",
        relatedTitle: "Related services",
      };

  return {
    ...seed,
    locale,
    label: labels.label,
    title: isUzbek ? `${seed.title} — Codev_Tim` : `${seed.title} — Codev_Tim`,
    description: isUzbek
      ? `Codev_Tim: biznes uchun saytlar va tizimlar. ${seed.description}`
      : `Codev_Tim: websites and business systems in Tashkent. ${seed.description}`,
    cta: labels.cta,
    relatedTitle: labels.relatedTitle,
  };
}

export function getServicePage(
  slug: string,
  locale: string
): ServicePage | undefined {
  const seed = RU[slug];
  if (!seed || !["en", "ru", "uz"].includes(locale)) return undefined;
  return translateSeed(seed, locale as ServicePageLocale);
}

export function getServicePageSlugs(): string[] {
  return Object.keys(RU);
}
