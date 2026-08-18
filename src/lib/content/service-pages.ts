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
  pricingTitle: string;
  pricingIntro: string;
  pricing: {
    price: string;
    title: string;
    fit: string;
    scope: string[];
    timeline: string;
  }[];
  termsTitle: string;
  terms: string[];
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
    title: "Разработка сайта в Ташкенте, который приводит к диалогу с клиентом",
    description:
      "Разработка сайтов в Ташкенте для услуг и B2B-компаний: понятная структура, аккуратный дизайн, договор и запуск на вашем домене.",
    intro:
      "Клиент должен за минуту понять, чем вы полезны, почему вам можно доверять и как с вами связаться. Для этого не нужен шаблонный лендинг: нужен сайт с ясной логикой, сильными аргументами и удобным следующим шагом.",
    audienceTitle: "Кому подходит",
    audience: [
      "компаниям, у которых продажи пока держатся на соцсетях, рекомендациях и переписке",
      "экспертам и командам, которым важно объяснить сложную услугу без канцелярита",
      "бизнесу в Ташкенте и Узбекистане, которому нужна русская, узбекская или английская версия сайта",
    ],
    deliverablesTitle: "Что входит",
    deliverables: [
      "смысловая структура: что клиент увидит сначала, где получит ответы и в какой момент оставит заявку",
      "дизайн и адаптивная вёрстка, которые одинаково уверенно работают на телефоне и компьютере",
      "контактные точки: форма, Telegram, звонок или другой согласованный способ связи",
      "техническая основа для поиска: метаданные, sitemap, robots.txt, canonical и hreflang",
      "публикация на вашем домене, проверка форм и передача готового сайта",
    ],
    processTitle: "Как проходит работа",
    process: [
      {
        title: "Задача",
        body: "Созваниваемся или работаем по брифу: выясняем, кому вы продаёте, за что вас выбирают и какое действие должен совершить посетитель.",
      },
      {
        title: "Структура",
        body: "Собираем маршрут клиента: заголовки, блоки доверия, услуги, кейсы, ответы на сомнения и точки связи. До дизайна вы понимаете, что именно будет на сайте.",
      },
      {
        title: "Разработка",
        body: "Собираю сайт, адаптирую материалы, подключаю нужные формы и закладываю техническую основу для индексации.",
      },
      {
        title: "Проверка",
        body: "Проверяем мобильную версию, формы, ссылки, язык страниц и аналитику. Правим до передачи, а не после запуска.",
      },
      {
        title: "Запуск",
        body: "Подключаем домен, публикуем сайт и передаём доступы с понятным списком того, что можно развивать дальше.",
      },
    ],
    pricingTitle: "Три уровня сайта",
    pricingIntro:
      "Это не «три одинаковых шаблона». У каждого уровня — своя задача, объём и результат. Точную смету фиксируем после короткого брифа, до начала работы.",
    pricing: [
      {
        price: "3 560 000 сум",
        title: "Одностраничный сайт",
        fit: "Когда нужно быстро и достойно представить одну услугу, продукт или новое направление.",
        scope: [
          "одна продуманная страница: предложение, выгоды, доверие, контакты и призыв к действию",
          "индивидуальная визуальная подача в рамках одной страницы, без конструктора и копипаста",
          "форма заявки, Telegram или звонок, подключение домена и базовая настройка SEO",
          "проверка на телефоне и компьютере перед публикацией",
        ],
        timeline:
          "Ориентир: от 5 рабочих дней после получения материалов и согласования структуры.",
      },
      {
        price: "4 745 000 сум",
        title: "Сайт для продаж",
        fit: "Когда у бизнеса несколько услуг и клиенту нужно быстро найти именно свою причину обратиться.",
        scope: [
          "несколько страниц или расширенный лендинг с отдельными блоками по услугам",
          "кейсы, FAQ, ответы на типовые вопросы и понятная навигация",
          "GA4, Search Console, события ключевых форм и внутренняя перелинковка",
          "подготовка структуры материалов, запуск и первичная проверка индексации",
        ],
        timeline:
          "Ориентир: 7–10 рабочих дней; срок зависит от количества страниц и готовности материалов.",
      },
      {
        price: "8 300 000 сум",
        title: "Корпоративный сайт",
        fit: "Для компании, которая продаёт B2B, развивает несколько направлений или хочет выстроить фундамент для рекламы и SEO.",
        scope: [
          "архитектура разделов: услуги, проекты, о компании, контакты, документы и другие нужные блоки",
          "отдельные страницы услуг под разные запросы и сегменты клиентов",
          "RU/UZ/EN-структура с корректными языковыми версиями и технической SEO-основой",
          "аналитика, формы, согласованные интеграции и подготовка к последующему продвижению",
          "предрелизная проверка, публикация и инструкция по работе с сайтом",
        ],
        timeline:
          "Ориентир: от 2–3 недель после согласования структуры и материалов.",
      },
    ],
    termsTitle: "Работа официально и по договору",
    terms: [
      "До старта фиксируем в договоре состав работ, этапы, сроки, стоимость и порядок приёмки.",
      "Работаем официально: документы и закрывающие материалы оформляем прозрачно.",
      "Способ и график расчёта подбираем в удобном для клиента формате и отражаем в договоре.",
      "Если в процессе появляется новая задача, сначала показываю её влияние на сроки и бюджет. Без согласования объём не расширяется.",
    ],
    proofTitle: "Подход Codev_Tim",
    proof:
      "Сначала выясняем, что именно покупает ваш клиент и какие сомнения мешают ему оставить заявку. Уже из этого строятся структура, текст и дизайн — поэтому сайт не выглядит как очередной шаблон и работает на доверие.",
    cta: "Получить структуру и расчёт",
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
    title: "Корпоративный сайт, который помогает продажам до первого звонка",
    description:
      "Корпоративный сайт для B2B-компании: услуги, кейсы, мультиязычность, SEO и запуск на вашем домене по договору.",
    intro:
      "Хороший корпоративный сайт снимает с отдела продаж повторяющиеся вопросы: чем вы занимаетесь, с кем работаете, какие задачи решаете и как начать разговор. Мы строим его вокруг этих ответов, а не вокруг модных блоков.",
    audienceTitle: "Когда нужен корпоративный сайт",
    audience: [
      "у компании несколько направлений, услуг, филиалов или разных аудиторий",
      "продажам нужны кейсы, понятная подача услуг и единая точка входа для B2B-клиентов",
      "нужна деловая подача на нескольких языках и понятная аналитика обращений",
    ],
    deliverablesTitle: "Результат проекта",
    deliverables: [
      "архитектура разделов, где клиент последовательно проходит от интереса к заявке",
      "страницы услуг с аргументами, примерами и отдельным следующим шагом",
      "кейсы по понятной логике: задача → решение → результат",
      "мультиязычная структура без дублей с корректными языковыми версиями",
      "домен, аналитика, Search Console и базовая техническая проверка перед запуском",
    ],
    processTitle: "Пять этапов",
    process: [
      {
        title: "Интервью",
        body: "Разбираем продукт, цикл сделки, возражения клиентов и то, что сейчас приходится объяснять вручную.",
      },
      {
        title: "Контент",
        body: "Собираем факты, кейсы и материалы. Если информации не хватает, помогаю превратить рабочий опыт команды в понятные тексты.",
      },
      {
        title: "Дизайн",
        body: "Показываю, как будут связаны страницы и как сайт будет вести посетителя к обращению. Затем утверждаем визуальное решение.",
      },
      {
        title: "Сборка",
        body: "Собираю сайт, формы, языковые версии, аналитику и техническую основу для поиска.",
      },
      {
        title: "Запуск",
        body: "Проверяем сценарии, запуск и доступы. Вы получаете готовый сайт, а не архив с исходниками без объяснений.",
      },
    ],
    pricingTitle: "Уровень проекта под задачу",
    pricingIntro:
      "Корпоративный сайт можно запускать поэтапно: от компактной версии для старта до полноценной системы страниц и языков.",
    pricing: [
      {
        price: "3 560 000 сум",
        title: "Компактная презентация",
        fit: "Чтобы быстро представить компанию, ключевые услуги и контакты.",
        scope: [
          "одна структурированная страница о компании",
          "услуги, преимущества, доказательства и форма обращения",
          "адаптив, домен, базовая SEO-настройка и публикация",
        ],
        timeline: "Ориентир: от 5 рабочих дней.",
      },
      {
        price: "4 745 000 сум",
        title: "Рабочий корпоративный сайт",
        fit: "Для компании с несколькими услугами и регулярными B2B-обращениями.",
        scope: [
          "главная, услуги, кейсы, о компании и контакты",
          "отдельные CTA и контент под основные сегменты клиентов",
          "аналитика, Search Console и внутренняя перелинковка",
        ],
        timeline: "Ориентир: от 7–10 рабочих дней.",
      },
      {
        price: "8 300 000 сум",
        title: "Масштабируемая версия",
        fit: "Для компании с филиалами, несколькими направлениями и мультиязычными продажами.",
        scope: [
          "расширенная архитектура и отдельные страницы услуг",
          "кейсы, документы, команда, FAQ и мультиязычная структура",
          "техническая SEO-основа и подготовка к дальнейшему продвижению",
        ],
        timeline: "Ориентир: от 2–3 недель.",
      },
    ],
    termsTitle: "Прозрачные условия работы",
    terms: [
      "Работаем официально и заключаем договор до начала разработки.",
      "В договоре закрепляем результат, сроки, этапы, стоимость и порядок согласований.",
      "Формат расчёта выбираем вместе с клиентом и фиксируем его в документах.",
      "Дополнительные работы не появляются неожиданно: изменения объёма сначала согласовываются.",
    ],
    proofTitle: "Что важно для B2B",
    proof:
      "Вместо общих слов на сайте появляются реальные задачи, понятные форматы работы, сроки, примеры и следующий шаг. Это даёт клиенту повод обратиться, а не просто пролистать страницу.",
    cta: "Обсудить корпоративный сайт",
    ctaHref: "/contact?engagement=corporate#contact-form",
    relatedTitle: "Связанные услуги",
    related: [
      {
        title: "Разработка сайта в Ташкенте",
        href: "/services/website-development-tashkent",
      },
      { title: "Автоматизация и ERP", href: "/services/business-automation" },
    ],
  },
  "business-automation": {
    slug: "business-automation",
    label: "УСЛУГА · АВТОМАТИЗАЦИЯ",
    title: "Автоматизация бизнеса: меньше ручной работы, больше контроля",
    description:
      "Автоматизация бизнеса в Узбекистане: ERP, личные кабинеты, CRM-процессы, Telegram-боты и интеграции под реальные задачи команды.",
    intro:
      "Когда заявки теряются в чатах, цифры расходятся в таблицах, а руководитель узнаёт о проблеме слишком поздно — дело не в людях, а в процессе. Сначала разбираем его вместе, затем автоматизируем только то, что даст ощутимый эффект.",
    audienceTitle: "Для каких задач",
    audience: [
      "продажи, склад, финансы или договоры должны работать в одном понятном контуре",
      "нужны роли, статусы, согласования и отчётность без ручного контроля каждой операции",
      "команде нужен Telegram-бот, личный кабинет или интеграция с уже используемыми сервисами",
    ],
    deliverablesTitle: "Что проектируем",
    deliverables: [
      "карту процесса: кто, что и в какой момент делает, где возникают ошибки и задержки",
      "ERP-модули для продаж, склада, финансов и операционной отчётности",
      "кабинеты, CRM-процессы, Telegram-боты и интеграции без лишнего функционала",
      "права доступа, историю действий и понятные статусы операций",
      "поэтапный запуск с приоритетами, рисками, сроками и предварительной оценкой",
    ],
    processTitle: "Сначала система, потом код",
    process: [
      {
        title: "Разбор",
        body: "Разбираем, как команда работает сейчас, где теряет время и какие ошибки уже стоят денег или клиентов.",
      },
      {
        title: "Модель",
        body: "Описываем роли, данные, статусы и правила доступа так, чтобы будущая система поддерживала ваш порядок работы, а не диктовала чужой.",
      },
      {
        title: "Приоритет",
        body: "Не пытаемся автоматизировать всё сразу. Выбираем первый модуль с понятным эффектом: скорость обработки, контроль денег, меньше ошибок или прозрачные статусы.",
      },
      {
        title: "Пилот",
        body: "Собираем рабочий контур и проверяем его на реальных сценариях команды, а не на красивой демонстрации.",
      },
      {
        title: "Развитие",
        body: "После пилота спокойно добавляем интеграции и отчётность, сохраняя контроль над данными и изменениями.",
      },
    ],
    pricingTitle: "Автоматизация по уровням",
    pricingIntro:
      "В автоматизации стоимость определяет не количество экранов, а глубина бизнес-логики, интеграций и требований к данным.",
    pricing: [
      {
        price: "3 560 000 сум",
        title: "Аудит и первый контур",
        fit: "Чтобы описать процесс и выбрать модуль с самым быстрым эффектом.",
        scope: [
          "разбор текущего процесса и карта ролей",
          "описание сущностей, статусов и узких мест",
          "приоритизированное техническое задание и оценка следующего этапа",
        ],
        timeline: "Ориентир: от 3–5 рабочих дней.",
      },
      {
        price: "4 745 000 сум",
        title: "Рабочий модуль",
        fit: "Для запуска одного процесса: заявки, сделки, склад, согласования или отчётность.",
        scope: [
          "рабочий модуль с ролями, статусами и базовыми проверками",
          "личный кабинет или Telegram-сценарий по согласованному процессу",
          "тестирование на реальных сценариях и передача инструкции",
        ],
        timeline: "Ориентир: от 7–10 рабочих дней.",
      },
      {
        price: "8 300 000 сум",
        title: "Интегрированный контур",
        fit: "Для компании, которой нужны несколько ролей, интеграции и единая отчётность.",
        scope: [
          "связанный контур из нескольких модулей и пользовательских ролей",
          "интеграции, журнал действий, права доступа и контроль данных",
          "поэтапный план развития, пилот и сопровождение запуска",
        ],
        timeline: "Ориентир: от 2–3 недель после аудита процессов.",
      },
    ],
    termsTitle: "Безопасная и прозрачная разработка",
    terms: [
      "Работаем официально, по договору и с фиксацией ответственности сторон.",
      "До разработки согласовываем доступы, данные, этапы, стоимость и критерии готовности.",
      "Расчёт можно организовать в удобном для клиента формате, который фиксируется в договоре.",
      "Новые интеграции и изменения бизнес-логики оцениваются отдельно и добавляются только после согласования.",
    ],
    proofTitle: "Инженерный принцип",
    proof:
      "Ценность автоматизации не в количестве экранов. Она появляется, когда команда перестаёт искать актуальные данные по чатам и таблицам, а у руководителя появляется контроль без постоянных уточнений.",
    cta: "Разобрать процесс и оценить автоматизацию",
    ctaHref: "/contact?engagement=system#contact-form",
    relatedTitle: "Связанные услуги",
    related: [
      {
        title: "Корпоративный сайт под ключ",
        href: "/services/corporate-website",
      },
      {
        title: "Разработка сайта в Ташкенте",
        href: "/services/website-development-tashkent",
      },
    ],
  },
};

const LOCALE_COPY: Record<
  "en" | "uz",
  Record<string, Partial<ServicePageSeed>>
> = {
  en: {
    "website-development-tashkent": {
      label: "SERVICE · TASHKENT",
      title: "Website development in Tashkent for your business",
      description:
        "Business websites, landing pages and corporate sites in Tashkent. Scope, timeline and price are agreed before development starts.",
      intro:
        "I build fast, clear websites that explain your offer, prove your expertise and turn search or advertising traffic into conversations.",
      audienceTitle: "Who it is for",
      audience: [
        "companies replacing scattered social-media pages with one business website",
        "experts and teams that need to explain a complex service clearly",
        "businesses in Tashkent and Uzbekistan that need RU, UZ or EN versions",
      ],
      deliverablesTitle: "What is included",
      deliverables: [
        "page structure and a prototype of the key customer journey",
        "responsive interface for phones and desktops",
        "lead form, Telegram contacts and basic GA4 analytics",
        "SEO foundation: metadata, sitemap, robots.txt, canonical and hreflang",
        "domain launch and pre-handover checks",
      ],
      processTitle: "How the project works",
      process: [
        {
          title: "Brief",
          body: "We define the audience, offer and success criteria.",
        },
        {
          title: "Structure",
          body: "We assemble pages, proof points, content and contact paths.",
        },
        {
          title: "Development",
          body: "I build the interface, content and technical SEO foundation.",
        },
        {
          title: "QA",
          body: "We check mobile layouts, forms, links and analytics.",
        },
        {
          title: "Launch",
          body: "We connect the domain, publish and agree the next steps.",
        },
      ],
      pricingTitle: "Three website levels",
      pricingIntro:
        "The final price depends on content volume, languages, integrations and review cycles. These levels provide a clear starting point before the detailed brief.",
      pricing: [
        {
          price: "3,560,000 UZS",
          title: "Starter website",
          fit: "For a specialist, small company or a new business direction.",
          scope: [
            "one focused sales page",
            "responsive layout and trust blocks",
            "lead form, Telegram contact and domain",
            "basic SEO setup",
          ],
          timeline: "Typical starting point: from 5 business days.",
        },
        {
          price: "4,745,000 UZS",
          title: "Growth website",
          fit: "For a business with several services and a regular flow of enquiries.",
          scope: [
            "several pages or an expanded landing page",
            "services, cases, FAQ and objection handling",
            "GA4, Search Console and conversion basics",
            "content structure and internal linking",
          ],
          timeline: "Typical starting point: 7–10 business days.",
        },
        {
          price: "8,300,000 UZS",
          title: "Corporate level",
          fit: "For a company with several directions, B2B sales or a scaling plan.",
          scope: [
            "full architecture for services, projects and company",
            "unique service pages for search intent",
            "RU/UZ/EN structure with hreflang and canonical",
            "forms, analytics, integrations and handover guide",
          ],
          timeline:
            "Typical starting point: 2–3 weeks after structure approval.",
        },
      ],
      termsTitle: "Official work and a contract",
      terms: [
        "The contract fixes scope, stages, deadlines, price and acceptance terms.",
        "The work is handled officially with transparent project documents.",
        "The payment method and schedule are agreed in a format convenient for the client.",
        "Out-of-scope work is estimated and approved before it is started.",
      ],
      proofTitle: "The Codev_Tim approach",
      proof:
        "A clear commercial offer and customer path come first, then the visual layer. The result is a website that looks considered and helps start a sales conversation.",
      cta: "Discuss website development",
      relatedTitle: "Related services",
      related: [
        { title: "Corporate website", href: "/services/corporate-website" },
        { title: "Business automation", href: "/services/business-automation" },
      ],
    },
    "corporate-website": {
      label: "SERVICE · CORPORATE WEBSITE",
      title: "Corporate website built for your company",
      description:
        "A corporate website with structure, service pages, cases, multilingual support, SEO and launch on your domain.",
      intro:
        "A corporate website should answer the buyer's questions before the first call: who you are, what you do, why you can be trusted and how to start.",
      audienceTitle: "When a corporate website is needed",
      audience: [
        "your company has several services or branches",
        "B2B sales need cases, a service catalogue and one trusted entry point",
        "you need a consistent business presentation and measurable enquiries",
      ],
      deliverablesTitle: "Project result",
      deliverables: [
        "section architecture for services, projects, team, contacts and documents",
        "service pages with separate search intent and CTA",
        "cases built as problem → solution → result",
        "multilingual structure without duplicate pages",
        "domain, analytics, Search Console and SEO checks",
      ],
      processTitle: "Five stages",
      process: [
        {
          title: "Interview",
          body: "We understand the product, sales cycle and buyer questions.",
        },
        {
          title: "Content",
          body: "We collect facts, cases, prices and proof of competence.",
        },
        {
          title: "Design",
          body: "We form a calm page system around customer tasks.",
        },
        {
          title: "Build",
          body: "We develop the site, forms, SEO and languages.",
        },
        {
          title: "Launch",
          body: "We check indexing and analytics, then hand over the site.",
        },
      ],
      pricingTitle: "A project level for the task",
      pricingIntro:
        "A corporate website can launch in stages, from a compact company presentation to a multilingual system of pages.",
      pricing: [
        {
          price: "3,560,000 UZS",
          title: "Compact presentation",
          fit: "To present the company, key services and contacts quickly.",
          scope: [
            "one structured company page",
            "services, benefits, proof and enquiry form",
            "responsive layout, domain and basic SEO",
          ],
          timeline: "Typical starting point: from 5 business days.",
        },
        {
          price: "4,745,000 UZS",
          title: "Working corporate site",
          fit: "For a company with several services and regular B2B enquiries.",
          scope: [
            "home, services, cases, company and contacts",
            "CTAs for key customer segments",
            "analytics, Search Console and internal linking",
          ],
          timeline: "Typical starting point: 7–10 business days.",
        },
        {
          price: "8,300,000 UZS",
          title: "Scalable version",
          fit: "For branches, multiple directions and multilingual sales.",
          scope: [
            "expanded architecture and separate service pages",
            "cases, documents, team, FAQ and languages",
            "technical SEO foundation for future growth",
          ],
          timeline: "Typical starting point: 2–3 weeks.",
        },
      ],
      termsTitle: "Transparent engagement terms",
      terms: [
        "The project is official and starts with a contract.",
        "The contract fixes the result, stages, deadlines, price and review process.",
        "The payment format is selected with the client and written into the documents.",
        "Changes in scope are agreed before they are added.",
      ],
      proofTitle: "What matters for B2B",
      proof:
        "Instead of generic promises, the page shows formats, deadlines, limitations, real projects and a clear next step.",
      cta: "Estimate a corporate website",
      relatedTitle: "Related services",
      related: [
        {
          title: "Website development",
          href: "/services/website-development-tashkent",
        },
        { title: "Business automation", href: "/services/business-automation" },
      ],
    },
    "business-automation": {
      label: "SERVICE · AUTOMATION",
      title: "Business automation and ERP systems",
      description:
        "Business automation in Uzbekistan: ERP, portals, CRM workflows, Telegram bots and integrations built around real processes.",
      intro:
        "When data lives in spreadsheets, chats and disconnected systems, we first map the process and then choose automation that saves time in practice.",
      audienceTitle: "Typical tasks",
      audience: [
        "sales, warehouse, finance and contracts need one connected workflow",
        "you need user roles, statuses, approvals and reporting",
        "your team needs a Telegram bot, portal or integration with existing tools",
      ],
      deliverablesTitle: "What we design",
      deliverables: [
        "process, role, data and control-point map",
        "ERP modules for sales, inventory, finance and operations",
        "portals, CRM workflows, Telegram bots and integrations",
        "permissions, audit trail and clear operation statuses",
        "a staged launch plan with priorities, risks and estimates",
      ],
      processTitle: "System first, code second",
      process: [
        {
          title: "Review",
          body: "We document the current process and the cost of manual work.",
        },
        {
          title: "Model",
          body: "We define entities, roles, statuses and access rules.",
        },
        {
          title: "Prioritise",
          body: "We select the first module with measurable impact.",
        },
        {
          title: "Pilot",
          body: "We build a working contour and test real scenarios.",
        },
        {
          title: "Scale",
          body: "We add integrations and reporting without losing control.",
        },
      ],
      pricingTitle: "Automation by level",
      pricingIntro:
        "In automation, price is driven by business logic, integrations and data requirements rather than screen count.",
      pricing: [
        {
          price: "3,560,000 UZS",
          title: "Audit and first contour",
          fit: "To describe the process and select the fastest-impact module.",
          scope: [
            "current-process review and role map",
            "entities, statuses and bottlenecks",
            "prioritised specification and next-stage estimate",
          ],
          timeline: "Typical starting point: 3–5 business days.",
        },
        {
          price: "4,745,000 UZS",
          title: "Working module",
          fit: "For one process: leads, deals, inventory, approvals or reporting.",
          scope: [
            "module with roles, statuses and core validations",
            "portal or Telegram flow for the agreed process",
            "real-scenario testing and handover guide",
          ],
          timeline: "Typical starting point: 7–10 business days.",
        },
        {
          price: "8,300,000 UZS",
          title: "Integrated contour",
          fit: "For several roles, integrations and unified reporting.",
          scope: [
            "connected contour of several modules",
            "integrations, audit trail, permissions and data controls",
            "staged delivery plan, pilot and launch support",
          ],
          timeline: "Typical starting point: 2–3 weeks after process audit.",
        },
      ],
      termsTitle: "Safe and transparent development",
      terms: [
        "We work officially, under a contract with clear responsibilities.",
        "Access, data, stages, price and acceptance criteria are agreed before development.",
        "The payment format can be convenient for the client and is fixed in the contract.",
        "New integrations and business rules are estimated and approved separately.",
      ],
      proofTitle: "Engineering principle",
      proof:
        "Automation is valuable not because it has many screens, but because it preserves business rules, control and responsibility for data.",
      cta: "Discuss automation",
      relatedTitle: "Related services",
      related: [
        { title: "Corporate website", href: "/services/corporate-website" },
        {
          title: "Website development",
          href: "/services/website-development-tashkent",
        },
      ],
    },
  },
  uz: {
    "website-development-tashkent": {
      label: "XIZMAT · TOSHKENT",
      title: "Toshkentda biznes uchun sayt ishlab chiqish",
      description:
        "Toshkentda landing, korporativ va biznes saytlar. Ish boshlanishidan oldin vazifa, muddat va narxni kelishib olamiz.",
      intro:
        "Xizmatlaringizni tushuntiradigan, ishonchni ko‘rsatadigan va qidiruv yoki reklama orqali murojaat olib keladigan tezkor saytlar yarataman.",
      audienceTitle: "Kimlar uchun",
      audience: [
        "ijtimoiy tarmoqlardagi tarqoq sahifalarni yagona biznes saytiga almashtirmoqchi bo‘lgan kompaniyalar",
        "murakkab xizmatni sodda tilda tushuntirishi kerak bo‘lgan ekspertlar va jamoalar",
        "RU, UZ yoki EN versiyalariga muhtoj Toshkent va O‘zbekiston bizneslari",
      ],
      deliverablesTitle: "Nimalar kiradi",
      deliverables: [
        "sahifalar tuzilmasi va mijoz yo‘lining prototipi",
        "telefon va kompyuter uchun moslashuvchan interfeys",
        "ariza formasi, Telegram aloqa va asosiy GA4 analitikasi",
        "SEO asoslari: metadata, sitemap, robots.txt, canonical va hreflang",
        "domenni ulash va topshirishdan oldingi tekshiruv",
      ],
      processTitle: "Ish qanday boradi",
      process: [
        {
          title: "Vazifa",
          body: "Auditoriya, taklif va tayyorlik mezonlarini belgilaymiz.",
        },
        {
          title: "Tuzilma",
          body: "Sahifalar, dalillar, kontent va aloqa nuqtalarini yig‘amiz.",
        },
        {
          title: "Ishlab chiqish",
          body: "Interfeys, kontent va texnik SEO asosini yarataman.",
        },
        {
          title: "Tekshiruv",
          body: "Mobil versiya, formalar, havolalar va analitikani tekshiramiz.",
        },
        {
          title: "Ishga tushirish",
          body: "Domenni ulaymiz, nashr qilamiz va keyingi qadamlarni kelishamiz.",
        },
      ],
      pricingTitle: "Saytning uch darajasi",
      pricingIntro:
        "Yakuniy narx kontent, tillar, integratsiyalar va kelishuvlar soniga bog‘liq. Quyidagi darajalar dastlabki yo‘nalishni tanlashga yordam beradi.",
      pricing: [
        {
          price: "3 560 000 so‘m",
          title: "Boshlang‘ich sayt",
          fit: "Mutaxassis, kichik kompaniya yoki yangi yo‘nalish uchun.",
          scope: [
            "bitta sotuvga yo‘naltirilgan sahifa",
            "moslashuvchan dizayn va ishonch bloklari",
            "ariza formasi, Telegram aloqa va domen",
            "asosiy SEO sozlamalari",
          ],
          timeline: "Odatda: 5 ish kunidan boshlab.",
        },
        {
          price: "4 745 000 so‘m",
          title: "O‘sish sayti",
          fit: "Bir nechta xizmat va muntazam murojaatlarga ega biznes uchun.",
          scope: [
            "bir nechta sahifa yoki kengaytirilgan landing",
            "xizmatlar, keyslar, FAQ va e’tirozlarga javoblar",
            "GA4, Search Console va konversiya asoslari",
            "kontent tuzilmasi va ichki havolalar",
          ],
          timeline: "Odatda: 7–10 ish kuni.",
        },
        {
          price: "8 300 000 so‘m",
          title: "Korporativ daraja",
          fit: "Bir nechta yo‘nalish, B2B savdo yoki kengayish rejasi bor kompaniya uchun.",
          scope: [
            "xizmatlar, loyihalar va kompaniya uchun to‘liq arxitektura",
            "qidiruv niyatiga mos alohida xizmat sahifalari",
            "RU/UZ/EN tuzilmasi, hreflang va canonical",
            "formalar, analitika, integratsiyalar va topshirish qo‘llanmasi",
          ],
          timeline: "Odatda: tuzilma tasdiqlangach 2–3 hafta.",
        },
      ],
      termsTitle: "Rasmiy va shartnoma asosida ishlaymiz",
      terms: [
        "Shartnomada ish tarkibi, bosqichlar, muddat, narx va qabul qilish tartibi belgilanadi.",
        "Ish rasmiy va shaffof hujjatlar asosida olib boriladi.",
        "To‘lov usuli va jadvali mijozga qulay shaklda kelishiladi va shartnomaga kiritiladi.",
        "Tarifdan tashqari ishlar boshlanishidan oldin baholanadi va tasdiqlanadi.",
      ],
      proofTitle: "Codev_Tim yondashuvi",
      proof:
        "Avval aniq tijoriy taklif va mijoz yo‘lini tuzamiz, keyin vizual qatlamni yaratamiz. Natijada sayt chiroyli ko‘rinish bilan birga suhbatni boshlashga yordam beradi.",
      cta: "Sayt ishlab chiqishni muhokama qilish",
      relatedTitle: "Bog‘liq xizmatlar",
      related: [
        { title: "Korporativ sayt", href: "/services/corporate-website" },
        {
          title: "Biznesni avtomatlashtirish",
          href: "/services/business-automation",
        },
      ],
    },
    "corporate-website": {
      label: "XIZMAT · KORPORATIV SAYT",
      title: "Kompaniya uchun korporativ sayt",
      description:
        "Tuzilma, xizmat sahifalari, keyslar, ko‘p tillilik, SEO va domeningizda ishga tushirish bilan korporativ sayt.",
      intro:
        "Korporativ sayt mijozning birinchi qo‘ng‘irog‘igacha asosiy savollariga javob berishi kerak: siz kimsiz, nima qilasiz, nima uchun ishonish mumkin va qanday boshlash kerak.",
      audienceTitle: "Qachon kerak",
      audience: [
        "kompaniyada bir nechta xizmat yoki filial bo‘lsa",
        "B2B savdoga keyslar, xizmatlar katalogi va yagona kirish nuqtasi kerak bo‘lsa",
        "biznes taqdimoti va o‘lchanadigan murojaatlarni tartibga solish kerak bo‘lsa",
      ],
      deliverablesTitle: "Loyiha natijasi",
      deliverables: [
        "xizmatlar, loyihalar, jamoa, kontaktlar va hujjatlar arxitekturasi",
        "alohida qidiruv niyati va CTA ga ega xizmat sahifalari",
        "muammo → yechim → natija formulasi bo‘yicha keyslar",
        "takrorlanmaydigan ko‘p tilli tuzilma",
        "domen, analitika, Search Console va SEO tekshiruvi",
      ],
      processTitle: "Besh bosqich",
      process: [
        {
          title: "Intervyu",
          body: "Mahsulot, savdo sikli va xaridor savollarini tushunamiz.",
        },
        {
          title: "Kontent",
          body: "Faktlar, keyslar, narxlar va kompetensiya dalillarini yig‘amiz.",
        },
        {
          title: "Dizayn",
          body: "Mijoz vazifalari atrofida sahifalar tizimini tuzamiz.",
        },
        {
          title: "Yig‘ish",
          body: "Sayt, formalar, SEO va tillarni ishlab chiqamiz.",
        },
        {
          title: "Ishga tushirish",
          body: "Indekslash va analitikani tekshirib, saytni topshiramiz.",
        },
      ],
      pricingTitle: "Vazifaga mos loyiha darajasi",
      pricingIntro:
        "Korporativ saytni bosqichma-bosqich ishga tushirish mumkin: ixcham taqdimotdan ko‘p tilli sahifalar tizimigacha.",
      pricing: [
        {
          price: "3 560 000 so‘m",
          title: "Ixcham taqdimot",
          fit: "Kompaniya, asosiy xizmatlar va kontaktlarni tez ko‘rsatish uchun.",
          scope: [
            "kompaniya haqida bitta tuzilgan sahifa",
            "xizmatlar, afzalliklar, dalillar va murojaat formasi",
            "moslashuvchan dizayn, domen va asosiy SEO",
          ],
          timeline: "Odatda: 5 ish kunidan boshlab.",
        },
        {
          price: "4 745 000 so‘m",
          title: "Ishchi korporativ sayt",
          fit: "Bir nechta xizmat va muntazam B2B murojaatlari bor kompaniya uchun.",
          scope: [
            "bosh sahifa, xizmatlar, keyslar, kompaniya va kontaktlar",
            "asosiy mijoz segmentlari uchun CTA lar",
            "analitika, Search Console va ichki havolalar",
          ],
          timeline: "Odatda: 7–10 ish kuni.",
        },
        {
          price: "8 300 000 so‘m",
          title: "Kengaytiriladigan versiya",
          fit: "Filiallar, bir nechta yo‘nalish va ko‘p tilli savdo uchun.",
          scope: [
            "kengaytirilgan arxitektura va alohida xizmat sahifalari",
            "keyslar, hujjatlar, jamoa, FAQ va tillar",
            "kelajakdagi rivojlanish uchun texnik SEO asoslari",
          ],
          timeline: "Odatda: 2–3 hafta.",
        },
      ],
      termsTitle: "Shaffof hamkorlik shartlari",
      terms: [
        "Loyiha rasmiy tarzda shartnoma bilan boshlanadi.",
        "Shartnomada natija, bosqichlar, muddat, narx va kelishuv tartibi belgilanadi.",
        "To‘lov formati mijoz bilan tanlanadi va hujjatlarda qayd etiladi.",
        "Hajm o‘zgarishi qo‘shilishidan oldin kelishiladi.",
      ],
      proofTitle: "B2B uchun muhim jihatlar",
      proof:
        "Umumiy va’dalar o‘rniga sahifada formatlar, muddatlar, cheklovlar, real loyihalar va aniq keyingi qadam ko‘rsatiladi.",
      cta: "Korporativ saytni hisoblash",
      relatedTitle: "Bog‘liq xizmatlar",
      related: [
        {
          title: "Sayt ishlab chiqish",
          href: "/services/website-development-tashkent",
        },
        {
          title: "Biznesni avtomatlashtirish",
          href: "/services/business-automation",
        },
      ],
    },
    "business-automation": {
      label: "XIZMAT · AVTOMATLASHTIRISH",
      title: "Biznesni avtomatlashtirish va ERP tizimlari",
      description:
        "O‘zbekistonda biznes avtomatlashtirish: ERP, kabinetlar, CRM jarayonlari, Telegram botlar va real jarayonlarga mos integratsiyalar.",
      intro:
        "Ma’lumotlar jadvallar, chatlar va alohida tizimlarda tarqalgan bo‘lsa, avval jarayonni tahlil qilamiz, keyin amalda vaqt tejaydigan avtomatlashtirishni tanlaymiz.",
      audienceTitle: "Qaysi vazifalar uchun",
      audience: [
        "savdo, ombor, moliya va shartnomalar yagona jarayonda ishlashi kerak bo‘lsa",
        "foydalanuvchi rollari, statuslar, tasdiqlashlar va hisobotlar kerak bo‘lsa",
        "Telegram bot, kabinet yoki mavjud servislar bilan integratsiya zarur bo‘lsa",
      ],
      deliverablesTitle: "Nimalarni loyihalaymiz",
      deliverables: [
        "jarayonlar, rollar, ma’lumotlar va nazorat nuqtalari xaritasi",
        "savdo, ombor, moliya va operatsion hisobotlar uchun ERP modullari",
        "kabinetlar, CRM jarayonlari, Telegram botlar va integratsiyalar",
        "ruxsatlar, harakatlar jurnali va aniq operatsiya statuslari",
        "ustuvorliklar, xatarlar va baholar bilan bosqichli ishga tushirish rejasi",
      ],
      processTitle: "Avval tizim, keyin kod",
      process: [
        {
          title: "Tahlil",
          body: "Amaldagi jarayon va qo‘lda bajariladigan ishlar narxini belgilaymiz.",
        },
        {
          title: "Model",
          body: "Obyektlar, rollar, statuslar va kirish qoidalarini aniqlaymiz.",
        },
        {
          title: "Ustuvorlik",
          body: "O‘lchanadigan ta’sir beradigan birinchi modulni tanlaymiz.",
        },
        {
          title: "Pilot",
          body: "Ishchi kontur yaratib, real ssenariylarda tekshiramiz.",
        },
        {
          title: "Rivojlantirish",
          body: "Nazoratni yo‘qotmasdan integratsiya va hisobotlarni qo‘shamiz.",
        },
      ],
      pricingTitle: "Avtomatlashtirish darajalari",
      pricingIntro:
        "Avtomatlashtirishda narx ekranlar soniga emas, biznes mantiqi, integratsiyalar va ma’lumotlar talablariga bog‘liq.",
      pricing: [
        {
          price: "3 560 000 so‘m",
          title: "Audit va birinchi kontur",
          fit: "Jarayonni yozib, eng tez natija beradigan modulni tanlash uchun.",
          scope: [
            "amaldagi jarayon va rollar tahlili",
            "obyektlar, statuslar va muammoli nuqtalar",
            "ustuvor texnik topshiriq va keyingi bosqich bahosi",
          ],
          timeline: "Odatda: 3–5 ish kuni.",
        },
        {
          price: "4 745 000 so‘m",
          title: "Ishchi modul",
          fit: "Arizalar, kelishuvlar, ombor yoki hisobot kabi bitta jarayon uchun.",
          scope: [
            "rollar, statuslar va asosiy tekshiruvlarga ega modul",
            "kelishilgan jarayon uchun kabinet yoki Telegram ssenariysi",
            "real ssenariylar testi va topshirish qo‘llanmasi",
          ],
          timeline: "Odatda: 7–10 ish kuni.",
        },
        {
          price: "8 300 000 so‘m",
          title: "Integratsiyalangan kontur",
          fit: "Bir nechta rol, integratsiya va yagona hisobot kerak bo‘lgan kompaniya uchun.",
          scope: [
            "bir nechta moduldan iborat bog‘langan kontur",
            "integratsiyalar, harakatlar jurnali, ruxsatlar va ma’lumot nazorati",
            "bosqichli reja, pilot va ishga tushirish ko‘magi",
          ],
          timeline: "Odatda: jarayon auditi sonrası 2–3 hafta.",
        },
      ],
      termsTitle: "Xavfsiz va shaffof ishlab chiqish",
      terms: [
        "Rasmiy, shartnoma asosida va tomonlar mas’uliyati aniq holda ishlaymiz.",
        "Kirishlar, ma’lumotlar, bosqichlar, narx va tayyorlik mezonlari oldindan kelishiladi.",
        "To‘lov formati mijozga qulay bo‘lishi mumkin va shartnomada belgilanadi.",
        "Yangi integratsiya va biznes qoidalari alohida baholanib, tasdiqlanadi.",
      ],
      proofTitle: "Muhandislik tamoyili",
      proof:
        "Avtomatlashtirish ekranlar ko‘pligi bilan emas, biznes qoidalari, nazorat va ma’lumotlar uchun javobgarlikni saqlashi bilan qadrli.",
      cta: "Avtomatlashtirishni muhokama qilish",
      relatedTitle: "Bog‘liq xizmatlar",
      related: [
        { title: "Korporativ sayt", href: "/services/corporate-website" },
        {
          title: "Sayt ishlab chiqish",
          href: "/services/website-development-tashkent",
        },
      ],
    },
  },
};

function translateSeed(
  seed: ServicePageSeed,
  locale: ServicePageLocale
): ServicePage {
  if (locale === "ru") return { ...seed, locale };

  return {
    ...seed,
    ...LOCALE_COPY[locale][seed.slug],
    locale,
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
