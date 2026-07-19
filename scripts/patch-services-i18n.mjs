import fs from "node:fs";

function writeLocale(path, services, patch) {
  const data = JSON.parse(fs.readFileSync(path, "utf8"));
  data.services = services;
  delete data.contact?.engagements;
  patch(data);
  fs.writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
  console.log("updated", path);
}

const ruServices = {
  hero: {
    eyebrow: "Разработка сайтов и бизнес-систем в Ташкенте",
    title: "Сайты и системы для бизнеса под ключ",
    description:
      "Разрабатываю корпоративные сайты, каталоги, личные кабинеты, Telegram-ботов и внутренние системы. Сначала фиксируем задачу, стоимость и сроки — затем запускаем готовый продукт.",
    note: "Официальный договор · Адаптация под мобильные устройства · Оплата в USD или UZS",
    primaryCta: "Обсудить проект",
    secondaryCta: "Посмотреть проекты",
  },
  eyebrow: "Что можно заказать",
  heading: "Понятные форматы и цены",
  intro:
    "Выберите подходящий формат. Объём работ и сроки фиксируем до старта — без сюрпризов в процессе.",
  currencyNote:
    "// Оплата возможна в эквиваленте UZS по согласованному курсу",
  teaser: {
    heading: "Услуги и цены",
    body: "Консультация, сайт-визитка, корпоративный сайт, бизнес-система и сопровождение — полный список на главной.",
    cta: "Открыть услуги и цены →",
  },
  messagePrefix: {
    consult: "[Первичная консультация]\n",
    landing: "[Лендинг или сайт-визитка]\n",
    corporate: "[Корпоративный сайт или каталог]\n",
    system: "[Бизнес-система или автоматизация]\n",
    brief: "[Разбор проекта]\n",
    "support-basic": "[Базовая поддержка]\n",
    "support-extended": "[Расширенная поддержка]\n",
  },
  products: {
    timelineLabel: "Срок",
    consult: {
      code: "00",
      name: "Первичная консультация",
      summary:
        "Коротко разберём задачу и определим подходящий формат работы.",
      details:
        "30–40 минут. Обсудим цели, примерный объём, сроки и бюджет. Без обязательств.",
      price: "Бесплатно",
      cta: "Запросить консультацию",
    },
    landing: {
      code: "01",
      name: "Лендинг или сайт-визитка",
      summary:
        "Для компании, услуги, мероприятия или отдельного направления бизнеса.",
      details:
        "Уникальный дизайн, мобильная версия, форма заявки, подключение домена, базовое SEO и запуск.",
      timeline: "от 5 рабочих дней",
      price: "от $400",
      cta: "Обсудить сайт",
    },
    corporate: {
      code: "02",
      name: "Корпоративный сайт или каталог",
      summary:
        "Для компаний, которым нужен полноценный сайт с разделами, товарами или услугами.",
      details:
        "Структура, дизайн, административная часть при необходимости, несколько языков, аналитика, SEO и запуск.",
      timeline: "от 7 рабочих дней",
      price: "от $700",
      cta: "Рассчитать проект",
    },
    system: {
      code: "03",
      name: "Бизнес-система или автоматизация",
      summary:
        "Личный кабинет, ERP-модуль, CRM-функции, Telegram-бот, интеграции или внутренняя система.",
      details:
        "Стоимость определяется после анализа ролей, процессов, модулей, интеграций и требований к безопасности.",
      timeline: "после оценки проекта",
      price: "от $1 200",
      cta: "Обсудить систему",
    },
  },
  brief: {
    heading: "Для сложных проектов",
    body: "Если объём системы пока не определён, можно отдельно заказать технический разбор проекта. Результат — структура системы, список модулей, роли пользователей, этапы, риски и предварительный бюджет.",
    price: "$100",
    credit:
      "Если дальнейшая разработка заказывается у Codev_Tim, стоимость разбора засчитывается в бюджет проекта.",
    cta: "Заказать разбор проекта",
  },
  support: {
    heading: "Поддержка после запуска",
    body: "Обновления, небольшие доработки, контроль работы сайта, помощь с доменом, сервером и интеграциями.",
    note: "Точный формат зависит от проекта. Дополнительные работы — от $40 в час.",
    cta: "Обсудить поддержку",
    tiers: {
      "support-basic": {
        name: "Базовая поддержка",
        hint: "ориентир до 4 часов в месяц",
        price: "от $150 / мес",
      },
      "support-extended": {
        name: "Расширенная поддержка",
        hint: "ориентир до 8 часов в месяц",
        price: "от $300 / мес",
      },
    },
  },
  trust: {
    heading: "Что входит в работу",
    items: {
      scope: "Предварительная фиксация объёма и сроков",
      contract: "Официальный договор",
      responsive: "Адаптация под телефоны и компьютеры",
      launch: "Подключение домена и запуск",
      seo: "Базовая настройка SEO и аналитики",
      qa: "Проверка перед передачей",
      support: "Поддержка после запуска",
      payment: "Оплата в USD или эквиваленте в UZS",
    },
  },
  process: {
    heading: "Как проходит работа",
    steps: {
      discuss: {
        name: "Обсуждение задачи",
        body: "Разбираем цели бизнеса и нужный результат.",
      },
      estimate: {
        name: "Оценка и договор",
        body: "Фиксируем объём, сроки, стоимость и условия.",
      },
      build: {
        name: "Дизайн и разработка",
        body: "Собираем продукт по согласованному плану.",
      },
      review: {
        name: "Проверка",
        body: "Тестируем сценарии и исправляем замечания.",
      },
      launch: {
        name: "Запуск и поддержка",
        body: "Публикуем систему и остаёмся на связи.",
      },
    },
  },
  projects: {
    heading: "Реальные проекты",
    lead: "Примеры систем и сайтов, уже работающих в бизнесе.",
    openRecord: "Подробнее →",
    openLive: "Открыть сайт →",
    viewAll: "Все проекты →",
    items: {
      "poj-pro-site": {
        type: "Корпоративный сайт · каталог",
        summary:
          "Публичный сайт компании с каталогом продукции и контентом на трёх языках.",
        features:
          "Каталог, администрирование, мультиязычность, SEO, публикация на poj-pro.uz",
      },
      "poj-pro-platform": {
        type: "Внутренняя бизнес-система",
        summary:
          "Операционная система для продаж, склада, финансов и договоров.",
        features: "Рабочий клиент, API, учёт операций, синхронизация данных",
      },
      "codev-erp": {
        type: "ERP · автоматизация",
        summary:
          "Финансовая ERP-платформа: склад, финансы и операционная отчётность.",
        features: "Модульная архитектура, клиент и API, PostgreSQL",
      },
    },
  },
  excludes: {
    heading: "Форматы, с которыми я не работаю",
    items: {
      noTask: "проекты без понятной бизнес-задачи",
      copycat: "копирование чужих сайтов один в один",
      noScope: "разработка без согласованного объёма",
      rush: "срочная работа без предварительной оценки",
      unpaid: "неоплачиваемые тестовые проекты",
      noContract:
        "проекты, где невозможно официально зафиксировать договорённости",
    },
  },
};

const enServices = {
  hero: {
    eyebrow: "Website and business system development in Tashkent",
    title: "Turnkey websites and systems for business",
    description:
      "I build corporate websites, catalogs, client portals, Telegram bots, and internal systems. We lock the scope, price, and timeline first — then ship a working product.",
    note: "Official contract · Mobile-ready · Payment in USD or UZS",
    primaryCta: "Discuss a project",
    secondaryCta: "View projects",
  },
  eyebrow: "What you can order",
  heading: "Clear formats and pricing",
  intro:
    "Pick a format that fits. Scope and timeline are fixed before work starts.",
  currencyNote: "// Payment in UZS equivalent is available at an agreed rate",
  teaser: {
    heading: "Services and pricing",
    body: "Consultation, brochure site, corporate site, business system, and support — full list on the home page.",
    cta: "Open services and pricing →",
  },
  messagePrefix: {
    consult: "[Initial consultation]\n",
    landing: "[Landing / brochure site]\n",
    corporate: "[Corporate site / catalog]\n",
    system: "[Business system / automation]\n",
    brief: "[Architecture Brief]\n",
    "support-basic": "[Basic support]\n",
    "support-extended": "[Extended support]\n",
  },
  products: {
    timelineLabel: "Timeline",
    consult: {
      code: "00",
      name: "Initial consultation",
      summary: "A short call to clarify the task and choose the right format.",
      details:
        "30–40 minutes. Goals, approximate scope, timeline, and budget. No commitment.",
      price: "Free",
      cta: "Request consultation",
    },
    landing: {
      code: "01",
      name: "Landing or brochure site",
      summary: "For a company, service, event, or a single business line.",
      details:
        "Custom design, mobile layout, inquiry form, domain setup, basic SEO, and launch.",
      timeline: "from 5 business days",
      price: "from $400",
      cta: "Discuss a website",
    },
    corporate: {
      code: "02",
      name: "Corporate site or catalog",
      summary:
        "For companies that need a full site with sections, products, or services.",
      details:
        "Structure, design, admin area when needed, multiple languages, analytics, SEO, and launch.",
      timeline: "from 7 business days",
      price: "from $700",
      cta: "Estimate the project",
    },
    system: {
      code: "03",
      name: "Business system or automation",
      summary:
        "Client portal, ERP module, CRM features, Telegram bot, integrations, or an internal system.",
      details:
        "Price is set after reviewing roles, processes, modules, integrations, and security needs.",
      timeline: "after project assessment",
      price: "from $1,200",
      cta: "Discuss a system",
    },
  },
  brief: {
    heading: "For complex projects",
    body: "If the system scope is still unclear, you can order a technical project review (Architecture Brief). Deliverable: system structure, modules, user roles, stages, risks, and a preliminary budget.",
    price: "$100",
    credit:
      "If you continue development with Codev_Tim, the review fee is credited toward the project budget.",
    cta: "Order a project review",
  },
  support: {
    heading: "Support after launch",
    body: "Updates, small improvements, uptime checks, help with domain, server, and integrations.",
    note: "Exact format depends on the project. Extra work from $40 / hour.",
    cta: "Discuss support",
    tiers: {
      "support-basic": {
        name: "Basic support",
        hint: "about up to 4 hours / month",
        price: "from $150 / month",
      },
      "support-extended": {
        name: "Extended support",
        hint: "about up to 8 hours / month",
        price: "from $300 / month",
      },
    },
  },
  trust: {
    heading: "What is included",
    items: {
      scope: "Scope and timeline fixed before start",
      contract: "Official contract",
      responsive: "Layouts for phones and desktops",
      launch: "Domain setup and launch",
      seo: "Basic SEO and analytics setup",
      qa: "Pre-handover review",
      support: "Support after launch",
      payment: "Payment in USD or UZS equivalent",
    },
  },
  process: {
    heading: "How work proceeds",
    steps: {
      discuss: {
        name: "Discuss the task",
        body: "We clarify business goals and the expected result.",
      },
      estimate: {
        name: "Estimate and contract",
        body: "We lock scope, timeline, price, and terms.",
      },
      build: {
        name: "Design and development",
        body: "We build the product against the agreed plan.",
      },
      review: {
        name: "Review",
        body: "We test scenarios and address feedback.",
      },
      launch: {
        name: "Launch and support",
        body: "We publish the system and stay available.",
      },
    },
  },
  projects: {
    heading: "Real projects",
    lead: "Examples of sites and systems already used in business.",
    openRecord: "Details →",
    openLive: "Open live site →",
    viewAll: "All projects →",
    items: {
      "poj-pro-site": {
        type: "Corporate site · catalog",
        summary:
          "Public company website with a product catalog and trilingual content.",
        features:
          "Catalog, admin tools, multilingual content, SEO, live at poj-pro.uz",
      },
      "poj-pro-platform": {
        type: "Internal business system",
        summary:
          "Operations system for sales, warehouse, finance, and contracts.",
        features: "Desktop client, API, operational records, data sync",
      },
      "codev-erp": {
        type: "ERP · automation",
        summary:
          "Financial ERP platform for inventory, finance, and operational reporting.",
        features: "Modular architecture, client and API, PostgreSQL",
      },
    },
  },
  excludes: {
    heading: "Formats I do not take",
    items: {
      noTask: "projects without a clear business goal",
      copycat: "one-to-one copies of someone else’s website",
      noScope: "development without an agreed scope",
      rush: "rush work without prior assessment",
      unpaid: "unpaid trial projects",
      noContract: "projects where terms cannot be fixed officially",
    },
  },
};

const uzServices = {
  hero: {
    eyebrow: "Toshkentda sayt va biznes tizimlari ishlab chiqish",
    title: "Biznes uchun tayyor saytlar va tizimlar",
    description:
      "Korporativ saytlar, kataloglar, shaxsiy kabinetlar, Telegram-botlar va ichki tizimlarni yarataman. Avval vazifa, narx va muddatni belgilaymiz — keyin ishlaydigan mahsulotni ishga tushiramiz.",
    note: "Rasmiy shartnoma · Mobil moslashuv · USD yoki UZS da to‘lov",
    primaryCta: "Loyihani muhokama qilish",
    secondaryCta: "Loyihalarni ko‘rish",
  },
  eyebrow: "Nima buyurtma qilish mumkin",
  heading: "Tushunarli formatlar va narxlar",
  intro:
    "Mos formatni tanlang. Ish hajmi va muddatni startdan oldin belgilaymiz.",
  currencyNote:
    "// To‘lov kelishilgan kurs bo‘yicha UZS ekvivalentida mumkin",
  teaser: {
    heading: "Xizmatlar va narxlar",
    body: "Konsultatsiya, vizitka-sayt, korporativ sayt, biznes-tizim va qo‘llab-quvvatlash — to‘liq ro‘yxat bosh sahifada.",
    cta: "Xizmatlar va narxlarni ochish →",
  },
  messagePrefix: {
    consult: "[Boshlang‘ich konsultatsiya]\n",
    landing: "[Landing / vizitka-sayt]\n",
    corporate: "[Korporativ sayt / katalog]\n",
    system: "[Biznes-tizim / avtomatlashtirish]\n",
    brief: "[Loyiha tahlili]\n",
    "support-basic": "[Asosiy qo‘llab-quvvatlash]\n",
    "support-extended": "[Kengaytirilgan qo‘llab-quvvatlash]\n",
  },
  products: {
    timelineLabel: "Muddat",
    consult: {
      code: "00",
      name: "Boshlang‘ich konsultatsiya",
      summary:
        "Vazifani qisqa muhokama qilib, mos ish formatini aniqlaymiz.",
      details:
        "30–40 daqiqa. Maqsadlar, taxminiy hajm, muddat va byudjet. Majburiyatsiz.",
      price: "Bepul",
      cta: "Konsultatsiya so‘rash",
    },
    landing: {
      code: "01",
      name: "Landing yoki vizitka-sayt",
      summary:
        "Kompaniya, xizmat, tadbir yoki alohida yo‘nalish uchun.",
      details:
        "Individual dizayn, mobil versiya, ariza formasi, domen ulash, asosiy SEO va ishga tushirish.",
      timeline: "5 ish kunidan",
      price: "$400 dan",
      cta: "Saytni muhokama qilish",
    },
    corporate: {
      code: "02",
      name: "Korporativ sayt yoki katalog",
      summary:
        "Bo‘limlar, mahsulotlar yoki xizmatlar bilan to‘liq sayt kerak bo‘lgan kompaniyalar uchun.",
      details:
        "Tuzilma, dizayn, kerak bo‘lsa admin qism, bir necha til, analitika, SEO va ishga tushirish.",
      timeline: "7 ish kunidan",
      price: "$700 dan",
      cta: "Loyihani hisoblash",
    },
    system: {
      code: "03",
      name: "Biznes-tizim yoki avtomatlashtirish",
      summary:
        "Shaxsiy kabinet, ERP-modul, CRM funksiyalar, Telegram-bot, integratsiyalar yoki ichki tizim.",
      details:
        "Narx rollar, jarayonlar, modullar, integratsiyalar va xavfsizlik talablari tahlilidan keyin aniqlanadi.",
      timeline: "baholashdan keyin",
      price: "$1 200 dan",
      cta: "Tizimni muhokama qilish",
    },
  },
  brief: {
    heading: "Murakkab loyihalar uchun",
    body: "Agar tizim hajmi hali aniq bo‘lmasa, alohida texnik tahlil buyurtma qilish mumkin. Natija — tizim tuzilmasi, modullar, foydalanuvchi rollari, bosqichlar, xatarlar va dastlabki byudjet.",
    price: "$100",
    credit:
      "Agar keyingi ishlab chiqish Codev_Tim da davom etsa, tahlil narxi loyiha byudjetiga hisoblanadi.",
    cta: "Loyiha tahlilini buyurtma qilish",
  },
  support: {
    heading: "Ishga tushirishdan keyingi qo‘llab-quvvatlash",
    body: "Yangilanishlar, kichik o‘zgarishlar, sayt ishlashini nazorat, domen, server va integratsiyalar bo‘yicha yordam.",
    note: "Aniq format loyihaga bog‘liq. Qo‘shimcha ishlar — soatiga $40 dan.",
    cta: "Qo‘llab-quvvatlashni muhokama qilish",
    tiers: {
      "support-basic": {
        name: "Asosiy qo‘llab-quvvatlash",
        hint: "oyiga taxminan 4 soatgacha",
        price: "oyiga $150 dan",
      },
      "support-extended": {
        name: "Kengaytirilgan qo‘llab-quvvatlash",
        hint: "oyiga taxminan 8 soatgacha",
        price: "oyiga $300 dan",
      },
    },
  },
  trust: {
    heading: "Ishga nima kiradi",
    items: {
      scope: "Hajm va muddatni oldindan belgilash",
      contract: "Rasmiy shartnoma",
      responsive: "Telefon va kompyuterga moslashuv",
      launch: "Domen ulash va ishga tushirish",
      seo: "Asosiy SEO va analitika sozlamasi",
      qa: "Topshirishdan oldin tekshiruv",
      support: "Ishga tushirishdan keyin qo‘llab-quvvatlash",
      payment: "USD yoki UZS ekvivalentida to‘lov",
    },
  },
  process: {
    heading: "Ish qanday ketadi",
    steps: {
      discuss: {
        name: "Vazifani muhokama qilish",
        body: "Biznes maqsadi va kerakli natijani aniqlaymiz.",
      },
      estimate: {
        name: "Baholash va shartnoma",
        body: "Hajm, muddat, narx va shartlarni belgilaymiz.",
      },
      build: {
        name: "Dizayn va ishlab chiqish",
        body: "Kelishilgan reja bo‘yicha mahsulotni yig‘amiz.",
      },
      review: {
        name: "Tekshiruv",
        body: "Ssenariylarni sinab, izohlarni tuzatamiz.",
      },
      launch: {
        name: "Ishga tushirish va qo‘llab-quvvatlash",
        body: "Tizimni nashr qilamiz va aloqada qolamiz.",
      },
    },
  },
  projects: {
    heading: "Haqiqiy loyihalar",
    lead: "Biznesda allaqachon ishlayotgan sayt va tizimlar misollari.",
    openRecord: "Batafsil →",
    openLive: "Saytni ochish →",
    viewAll: "Barcha loyihalar →",
    items: {
      "poj-pro-site": {
        type: "Korporativ sayt · katalog",
        summary:
          "Mahsulot katalogi va uch tilda kontentli kompaniya sayti.",
        features:
          "Katalog, boshqaruv, ko‘p tillilik, SEO, poj-pro.uz da ishlaydi",
      },
      "poj-pro-platform": {
        type: "Ichki biznes-tizim",
        summary:
          "Sotuv, ombor, moliya va shartnomalar uchun operatsion tizim.",
        features: "Ishchi klient, API, operatsiyalar hisobi, ma’lumot sinxroni",
      },
      "codev-erp": {
        type: "ERP · avtomatlashtirish",
        summary:
          "Ombor, moliya va operatsion hisobotlar uchun moliyaviy ERP platforma.",
        features: "Modulli arxitektura, klient va API, PostgreSQL",
      },
    },
  },
  excludes: {
    heading: "Qaysi formatlar bilan ishlamayman",
    items: {
      noTask: "aniq biznes vazifasisiz loyihalar",
      copycat: "boshqa saytlarni birma-bir nusxalash",
      noScope: "kelishilgan hajmsiz ishlab chiqish",
      rush: "oldindan baholamasdan shoshilinch ish",
      unpaid: "to‘lovsiz sinov loyihalari",
      noContract: "shartlarni rasmiy qayd etib bo‘lmaydigan loyihalar",
    },
  },
};

writeLocale("messages/ru.json", ruServices, (data) => {
  data.modules.operationsCenter = {
    label: "Разработка сайтов в Ташкенте",
    name: "Codev_Tim",
    description:
      "Сайты, каталоги, личные кабинеты, ERP и автоматизация для бизнеса в Узбекистане.",
  };
  data.metadata.operationsCenter = {
    title: "Разработка сайтов в Ташкенте — Codev_Tim",
    description:
      "Заказать сайт или бизнес-систему в Ташкенте: корпоративный сайт, каталог, личный кабинет, ERP, Telegram-бот. Официальный договор, сроки и стоимость до старта. Миссия: {mission}.",
    ogImageAlt: "Разработка сайтов в Ташкенте — Codev_Tim",
  };
  if (data.engineerProfile?.engagements) {
    data.engineerProfile.engagements = {
      body: "Консультация, сайт от $400, корпоративный сайт от $700, системы от $1 200. Официальный договор, оплата в UZS.",
      cta: "Смотреть услуги и цены на главной →",
    };
  }
});

writeLocale("messages/en.json", enServices, (data) => {
  data.modules.operationsCenter = {
    label: "Website development in Tashkent",
    name: "Codev_Tim",
    description:
      "Websites, catalogs, client portals, ERP, and automation for businesses in Uzbekistan.",
  };
  data.metadata.operationsCenter = {
    title: "Website Development in Tashkent — Codev_Tim",
    description:
      "Order a website or business system in Tashkent: corporate site, catalog, client portal, ERP, Telegram bot. Official contract, scope and price before start. Mission: {mission}.",
    ogImageAlt: "Website development in Tashkent — Codev_Tim",
  };
  if (data.engineerProfile?.engagements) {
    data.engineerProfile.engagements = {
      body: "Consultation, sites from $400, corporate sites from $700, systems from $1,200. Official contract, UZS payment available.",
      cta: "See services and pricing on the home page →",
    };
  }
});

writeLocale("messages/uz.json", uzServices, (data) => {
  data.modules.operationsCenter = {
    label: "Toshkentda sayt ishlab chiqish",
    name: "Codev_Tim",
    description:
      "O‘zbekiston biznesi uchun saytlar, kataloglar, shaxsiy kabinetlar, ERP va avtomatlashtirish.",
  };
  data.metadata.operationsCenter = {
    title: "Toshkentda sayt ishlab chiqish — Codev_Tim",
    description:
      "Toshkentda sayt yoki biznes-tizim buyurtma qiling: korporativ sayt, katalog, shaxsiy kabinet, ERP, Telegram-bot. Rasmiy shartnoma, muddat va narx startidan oldin. Missiya: {mission}.",
    ogImageAlt: "Toshkentda sayt ishlab chiqish — Codev_Tim",
  };
  if (data.engineerProfile?.engagements) {
    data.engineerProfile.engagements = {
      body: "Konsultatsiya, sayt $400 dan, korporativ sayt $700 dan, tizimlar $1 200 dan. Rasmiy shartnoma, UZS to‘lov.",
      cta: "Bosh sahifada xizmat va narxlarni ko‘rish →",
    };
  }
});
