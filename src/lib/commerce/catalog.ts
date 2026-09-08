import prices from "../../../content/commerce/prices.json";
export type Locale = "ru" | "uz" | "en";
export type Localized<T = string> = Record<Locale, T>;
export type OfferId = keyof typeof prices;
export type Offer = {
  id: OfferId;
  kind: "service" | "pilot" | "case" | "support";
  name: Localized;
  result: Localized;
  scope: Localized<string[]>;
  days: string;
  project?: string;
};
export const lang = (locale: string): Locale =>
  locale === "uz" || locale === "en" ? locale : "ru";
const l = (ru: string, uz: string, en: string): Localized => ({ ru, uz, en });
const scope = (
  ru: string[],
  uz: string[],
  en: string[]
): Localized<string[]> => ({ ru, uz, en });
export const OFFERS: Offer[] = [
  {
    id: "landing",
    kind: "service",
    days: "5–7",
    name: l(
      "Лендинг для заявок",
      "Buyurtmalar uchun landing",
      "Lead generation landing page"
    ),
    result: l(
      "Одна услуга или товар. Объяснить ценность и получить обращение.",
      "Bitta xizmat yoki mahsulotni tanishtirish va murojaat olish.",
      "Explain one service or product and make it easy to enquire."
    ),
    scope: scope(
      [
        "1 страница, до 8 блоков, 1 язык",
        "Дизайн для телефона и компьютера",
        "Форма → Telegram, базовое SEO",
        "Запуск и передача исходного кода",
      ],
      [
        "1 sahifa, 8 tagacha blok, 1 til",
        "Telefon va kompyuter uchun dizayn",
        "Ariza → Telegram, asosiy SEO",
        "Ishga tushirish va kodni topshirish",
      ],
      [
        "1 page, up to 8 sections, 1 language",
        "Mobile and desktop design",
        "Form → Telegram, basic SEO",
        "Launch and source code handover",
      ]
    ),
  },
  {
    id: "corporate",
    kind: "service",
    days: "10–15",
    name: l("Сайт компании", "Kompaniya sayti", "Business website"),
    result: l(
      "Несколько услуг, портфолио и понятный путь к заказу.",
      "Xizmatlar, portfolio va buyurtma berishning qulay yo‘li.",
      "Present your services, work and a clear path to an enquiry."
    ),
    scope: scope(
      [
        "До 5 страниц, 1 язык",
        "Услуги, кейсы, о компании, контакты",
        "Формы, аналитика, SEO-основа",
        "2 круга правок и запуск",
      ],
      [
        "5 tagacha sahifa, 1 til",
        "Xizmatlar, ishlar, kompaniya, aloqa",
        "Arizalar, analitika, asosiy SEO",
        "2 bosqich tuzatish va ishga tushirish",
      ],
      [
        "Up to 5 pages, 1 language",
        "Services, case studies, about, contact",
        "Forms, analytics, SEO setup",
        "2 revision rounds and launch",
      ]
    ),
  },
  {
    id: "bot",
    kind: "service",
    days: "5–10",
    name: l("Telegram-бот", "Telegram-bot", "Telegram bot"),
    result: l(
      "Принимать заявки и отвечать на частые вопросы прямо в Telegram.",
      "Telegram orqali arizalar olish va odatiy savollarga javob berish.",
      "Collect enquiries and answer common questions in Telegram."
    ),
    scope: scope(
      [
        "1 сценарий, до 8 шагов, 1 язык",
        "Меню, вопросы и контакты клиента",
        "Уведомления менеджеру",
        "Развёртывание и инструкция",
      ],
      [
        "1 ssenariy, 8 tagacha qadam, 1 til",
        "Menyu, savollar va mijoz kontaktlari",
        "Menejerga bildirishnomalar",
        "Joylashtirish va yo‘riqnoma",
      ],
      [
        "1 flow, up to 8 steps, 1 language",
        "Menu, questions and contact details",
        "Manager notifications",
        "Deployment and instructions",
      ]
    ),
  },
  {
    id: "system",
    kind: "service",
    days: "15–25",
    name: l(
      "CRM и автоматизация",
      "CRM va avtomatlashtirish",
      "CRM and automation"
    ),
    result: l(
      "Клиенты, заявки и следующие действия в одном рабочем процессе.",
      "Mijozlar, arizalar va keyingi vazifalar bitta ish jarayonida.",
      "Keep customers, enquiries and next actions in one workflow."
    ),
    scope: scope(
      [
        "Пилот: 1 процесс, до 5 сотрудников",
        "Карточки клиентов, статусы, задачи",
        "2 роли доступа, 1 базовый отчёт",
        "Обучение и приёмка по сценариям",
      ],
      [
        "Pilot: 1 jarayon, 5 tagacha xodim",
        "Mijoz kartalari, holatlar, vazifalar",
        "2 rol, 1 asosiy hisobot",
        "O‘qitish va ssenariylar bo‘yicha tekshirish",
      ],
      [
        "Pilot: 1 workflow, up to 5 staff",
        "Customer records, stages and tasks",
        "2 access roles, 1 basic report",
        "Training and acceptance scenarios",
      ]
    ),
  },
  {
    id: "brief",
    kind: "service",
    days: "3–5",
    name: l(
      "Аудит и план проекта",
      "Audit va loyiha rejasi",
      "Project audit and plan"
    ),
    result: l(
      "Разобраться со сложной задачей до вложений в разработку.",
      "Ishlab chiqishga pul sarflashdan oldin murakkab vazifani aniqlashtirish.",
      "Define a complex project before investing in development."
    ),
    scope: scope(
      [
        "Разбор 1 бизнес-процесса",
        "Карта требований и ограничений",
        "План этапов и оценка бюджета",
        "Документ с рекомендациями; без разработки",
      ],
      [
        "1 biznes-jarayon tahlili",
        "Talablar va cheklovlar",
        "Bosqichlar va byudjet bahosi",
        "Tavsiyalar hujjati; ishlab chiqishsiz",
      ],
      [
        "Review 1 business process",
        "Requirements and constraints",
        "Phased plan and budget estimate",
        "Recommendations document; no development",
      ]
    ),
  },
  {
    id: "support-basic",
    kind: "support",
    days: "",
    name: l(
      "Поддержка · Базовая",
      "Qo‘llab-quvvatlash · Asosiy",
      "Support · Basic"
    ),
    result: l(
      "Небольшие изменения после запуска без нового проекта.",
      "Yangi loyihasiz kichik o‘zgarishlar.",
      "Small changes after launch without a new project."
    ),
    scope: scope(
      [
        "До 3 часов работ в месяц",
        "Обновления текста и небольшие исправления",
        "Новые функции — по отдельной оценке",
      ],
      [
        "Oyiga 3 soatgacha ish",
        "Matn yangilash va kichik tuzatishlar",
        "Yangi funksiyalar alohida baholanadi",
      ],
      [
        "Up to 3 hours per month",
        "Content updates and minor fixes",
        "New features quoted separately",
      ]
    ),
  },
  {
    id: "support-extended",
    kind: "support",
    days: "",
    name: l(
      "Поддержка · Развитие",
      "Qo‘llab-quvvatlash · Rivojlanish",
      "Support · Growth"
    ),
    result: l(
      "Регулярно улучшать сайт или систему небольшими итерациями.",
      "Sayt yoki tizimni bosqichma-bosqich yaxshilash.",
      "Improve your website or system in regular increments."
    ),
    scope: scope(
      [
        "До 8 часов работ в месяц",
        "Согласованный список улучшений",
        "Отчёт о выполненных работах",
      ],
      [
        "Oyiga 8 soatgacha ish",
        "Kelishilgan yaxshilanishlar ro‘yxati",
        "Bajarilgan ishlar hisoboti",
      ],
      [
        "Up to 8 hours per month",
        "Agreed improvement backlog",
        "Completed work report",
      ]
    ),
  },
  {
    id: "codev-tim",
    project: "codev-tim",
    kind: "case",
    days: "10–15",
    name: l(
      "Сайт эксперта · Codev_Tim",
      "Ekspert sayti · Codev_Tim",
      "Expert website · Codev_Tim"
    ),
    result: l(
      "Сайт с услугами и портфолио по опыту этого проекта.",
      "Ushbu loyiha tajribasi asosida xizmatlar va portfolio sayti.",
      "A service and portfolio website based on this project's approach."
    ),
    scope: scope(
      [
        "До 5 страниц, 1 язык",
        "Каталог работ и форма заявки",
        "Индивидуальный дизайн и запуск",
      ],
      [
        "5 tagacha sahifa, 1 til",
        "Ishlar katalogi va ariza shakli",
        "Individual dizayn va ishga tushirish",
      ],
      [
        "Up to 5 pages, 1 language",
        "Work catalogue and enquiry form",
        "Custom design and launch",
      ]
    ),
  },
  {
    id: "codev-tim-travel",
    project: "codev-tim-travel",
    kind: "pilot",
    days: "20–30",
    name: l(
      "CRM для турагентства",
      "Turagentlik uchun CRM",
      "Travel agency CRM"
    ),
    result: l(
      "Пилот учёта туристов и заявок для небольшой команды.",
      "Kichik jamoa uchun turistlar va arizalarni boshqarish piloti.",
      "A customer and enquiry management pilot for a small team."
    ),
    scope: scope(
      [
        "1 воронка, до 5 менеджеров",
        "Карточки клиентов, заявки и статусы",
        "Обучение; AI и бронирования — отдельно",
      ],
      [
        "1 voronka, 5 tagacha menejer",
        "Mijozlar, arizalar va holatlar",
        "O‘qitish; AI va bronlash alohida",
      ],
      [
        "1 pipeline, up to 5 managers",
        "Customers, enquiries and stages",
        "Training; AI and booking quoted separately",
      ]
    ),
  },
  {
    id: "codev-erp",
    project: "codev-erp",
    kind: "pilot",
    days: "25–40",
    name: l(
      "ERP: склад и заказы",
      "ERP: ombor va buyurtmalar",
      "ERP: inventory and orders"
    ),
    result: l(
      "Начать с одного модуля учёта и проверить его на вашем процессе.",
      "Bitta hisob moduli bilan boshlash va jarayoningizda tekshirish.",
      "Start with one operational module and validate it on your workflow."
    ),
    scope: scope(
      [
        "Аудит и 1 выбранный модуль",
        "До 5 пользователей, 2 роли",
        "Тестовые данные и приёмка",
        "Полная ERP и миграция — отдельные этапы",
      ],
      [
        "Audit va 1 tanlangan modul",
        "5 tagacha foydalanuvchi, 2 rol",
        "Sinov ma’lumotlari va qabul qilish",
        "To‘liq ERP va migratsiya alohida bosqichlar",
      ],
      [
        "Audit and 1 selected module",
        "Up to 5 users, 2 roles",
        "Test data and acceptance",
        "Full ERP and migration are separate phases",
      ]
    ),
  },
  {
    id: "assistant-agent",
    project: "assistant-agent",
    kind: "pilot",
    days: "10–20",
    name: l(
      "AI-помощник для бизнеса",
      "Biznes uchun AI-yordamchi",
      "Business AI assistant"
    ),
    result: l(
      "Проверить один сценарий AI на согласованном источнике данных.",
      "Kelishilgan ma’lumot manbasida bitta AI ssenariysini sinash.",
      "Test one AI use case against an agreed data source."
    ),
    scope: scope(
      [
        "1 сценарий и 1 источник",
        "Подключение модели и тестовый набор",
        "Отчёт о качестве ответов",
        "API модели и рабочий интерфейс — отдельно",
      ],
      [
        "1 ssenariy va 1 manba",
        "Model ulash va sinov to‘plami",
        "Javoblar sifati hisoboti",
        "Model API va ish interfeysi alohida",
      ],
      [
        "1 use case and 1 source",
        "Model integration and test set",
        "Response quality report",
        "Model API and production UI quoted separately",
      ]
    ),
  },
  {
    id: "poj-pro-site",
    project: "poj-pro-site",
    kind: "case",
    days: "15–25",
    name: l(
      "Корпоративный сайт с каталогом",
      "Katalogli korporativ sayt",
      "Corporate catalogue website"
    ),
    result: l(
      "Покупатель находит нужный товар и обращается в компанию.",
      "Xaridor kerakli mahsulotni topib, kompaniyaga murojaat qiladi.",
      "Help buyers find products and contact your company."
    ),
    scope: scope(
      [
        "До 7 страниц, до 20 товаров, 1 язык",
        "Каталог, карточки и сбор обращений",
        "SEO и запуск; админка — отдельно",
      ],
      [
        "7 tagacha sahifa, 20 tagacha tovar, 1 til",
        "Katalog, kartalar va murojaatlar",
        "SEO va ishga tushirish; admin panel alohida",
      ],
      [
        "Up to 7 pages, 20 products, 1 language",
        "Catalogue, product pages and enquiries",
        "SEO and launch; admin panel extra",
      ]
    ),
  },
  {
    id: "poj-pro-platform",
    project: "poj-pro-platform",
    kind: "case",
    days: "30–45",
    name: l(
      "Продажи, склад и финансы",
      "Savdo, ombor va moliya",
      "Sales, stock and finance"
    ),
    result: l(
      "Поэтапная разработка системы по опыту проекта Poj Pro.",
      "Poj Pro tajribasi asosida tizimni bosqichma-bosqich yaratish.",
      "Phased custom development informed by the Poj Pro project."
    ),
    scope: scope(
      [
        "Обследование и 1 рабочий модуль",
        "До 5 пользователей, 2 роли",
        "Интерфейс оператора и обучение",
        "Офлайн-режим и остальные модули — отдельно",
      ],
      [
        "Tahlil va 1 ishchi modul",
        "5 tagacha foydalanuvchi, 2 rol",
        "Operator interfeysi va o‘qitish",
        "Oflayn rejim va boshqa modullar alohida",
      ],
      [
        "Discovery and 1 working module",
        "Up to 5 users, 2 roles",
        "Operator interface and training",
        "Offline mode and other modules extra",
      ]
    ),
  },
  {
    id: "poj-pro-api-contracts",
    project: "poj-pro-api-contracts",
    kind: "case",
    days: "10–15",
    name: l(
      "Договоры и интеграция систем",
      "Shartnomalar va tizim integratsiyasi",
      "Contracts and system integration"
    ),
    result: l(
      "Статусы и история договоров доступны в ваших сервисах.",
      "Shartnomalar holati va tarixi xizmatlaringizda mavjud.",
      "Access contract status and history from your existing services."
    ),
    scope: scope(
      [
        "Модель договора и статусы",
        "API, журнал истории, 1 интеграция",
        "Документация; без ЭЦП и генерации документов",
      ],
      [
        "Shartnoma modeli va holatlar",
        "API, tarix jurnali, 1 integratsiya",
        "Hujjatlar; ERI va hujjat yaratishsiz",
      ],
      [
        "Contract model and stages",
        "API, history log, 1 integration",
        "Documentation; no e-signature or document generation",
      ]
    ),
  },
  {
    id: "poj-pro-telegram-bots",
    project: "poj-pro-telegram-bots",
    kind: "case",
    days: "7–12",
    name: l(
      "Telegram-бот для сотрудников",
      "Xodimlar uchun Telegram-bot",
      "Internal team Telegram bot"
    ),
    result: l(
      "Статусы, уведомления и рабочие команды в привычном мессенджере.",
      "Odatiy messenjerda holatlar, bildirishnomalar va ish buyruqlari.",
      "Statuses, notifications and work commands in a familiar messenger."
    ),
    scope: scope(
      [
        "До 5 команд, 1 язык",
        "Доступы сотрудников, 1 готовый API",
        "Уведомления, запуск, инструкция",
        "Разработка API или CRM — отдельно",
      ],
      [
        "5 tagacha buyruq, 1 til",
        "Xodimlar ruxsati, 1 tayyor API",
        "Bildirishnomalar, ishga tushirish, yo‘riqnoma",
        "API yoki CRM yaratish alohida",
      ],
      [
        "Up to 5 commands, 1 language",
        "Staff permissions, 1 existing API",
        "Notifications, deployment, instructions",
        "API or CRM development quoted separately",
      ]
    ),
  },
];
export const findOffer = (id: string | undefined) =>
  OFFERS.find((o) => o.id === id);
export const PRIMARY_IDS = ["landing", "corporate", "bot", "system"] as const;
export const PROJECT_OFFERS = OFFERS.filter((o) => o.project);
export const BASE_PRICES = prices;
export const ADDONS = [
  {
    id: "language",
    price: 700000,
    days: 2,
    allowed: ["landing", "corporate", "bot"],
    name: l("Второй язык", "Ikkinchi til", "Second language"),
    note: l(
      "Перевод предоставляет клиент",
      "Tarjimani mijoz beradi",
      "Client supplies translation"
    ),
  },
  {
    id: "analytics",
    price: 500000,
    days: 1,
    allowed: ["landing"],
    name: l(
      "События аналитики",
      "Analitika hodisalari",
      "Conversion analytics"
    ),
    note: l(
      "GA4: отправка заявки и клики по контактам",
      "GA4: arizalar va kontakt bosishlari",
      "GA4: enquiries and contact clicks"
    ),
  },
  {
    id: "integration",
    price: 1500000,
    days: 3,
    allowed: ["bot", "system"],
    name: l(
      "Одна интеграция по готовому API",
      "Tayyor API orqali bitta integratsiya",
      "One existing API integration"
    ),
    note: l(
      "Без разработки внешнего сервиса",
      "Tashqi xizmatni yaratishsiz",
      "External service development excluded"
    ),
  },
];
