import type { Localized, Locale, OfferId } from "./catalog";

const l = <T>(ru: T, uz: T, en: T): Record<Locale, T> => ({ ru, uz, en });

export type ServiceLanding = {
  slug: string;
  offerIds: OfferId[];
  title: Localized;
  description: Localized;
  lead: Localized;
  audienceTitle: Localized;
  audience: Record<Locale, string[]>;
  deliverablesTitle: Localized;
  deliverables: Record<Locale, string[]>;
  proofTitle: Localized;
  proof: Localized;
  proofHref: string;
};

export const SERVICE_LANDINGS: Record<string, ServiceLanding> = {
  websites: {
    slug: "websites",
    offerIds: ["landing", "corporate"],
    title: l(
      "Сайты и каталоги, которые ведут к обращению",
      "Murojaatga olib boradigan saytlar va kataloglar",
      "Websites and catalogues built to generate enquiries"
    ),
    description: l(
      "Разработка сайтов в Ташкенте: лендинги, сайты компаний и B2B-каталоги с формами, SEO-основой и запуском на вашем домене.",
      "Toshkentda landing, kompaniya sayti va B2B kataloglarini formalar, SEO asosi va domeningizda ishga tushirish bilan ishlab chiqish.",
      "Website development in Tashkent: landing pages, business websites and B2B catalogues with forms, SEO foundations and launch on your domain."
    ),
    lead: l(
      "Клиент должен быстро понять, что вы продаёте, почему вам можно доверять и как сделать следующий шаг. Структуру, контент и интерфейс строим вокруг этого маршрута.",
      "Mijoz nima sotayotganingizni, nima uchun ishonish mumkinligini va keyingi qadamni tez tushunishi kerak. Tuzilma, kontent va interfeys shu yo‘l atrofida quriladi.",
      "A customer should quickly understand what you offer, why they can trust you and what to do next. Structure, content and interface are built around that journey."
    ),
    audienceTitle: l("Кому подходит", "Kimlar uchun", "Who it is for"),
    audience: l(
      [
        "компаниям, которые пока продают через соцсети, рекомендации и переписку",
        "B2B-бизнесу с несколькими услугами, товарами или каталогом",
        "бизнесу, которому нужны RU, UZ или EN версии и понятная аналитика обращений",
      ],
      [
        "hozircha ijtimoiy tarmoqlar, tavsiyalar va yozishmalar orqali sotayotgan kompaniyalar",
        "bir nechta xizmat, mahsulot yoki katalogga ega B2B biznes",
        "RU, UZ yoki EN versiyalari va murojaatlar analitikasi kerak bo‘lgan biznes",
      ],
      [
        "companies still selling mainly through social media, referrals and messages",
        "B2B businesses with several services, products or a catalogue",
        "businesses needing RU, UZ or EN pages and clear enquiry analytics",
      ]
    ),
    deliverablesTitle: l("Что получите", "Natija", "What you receive"),
    deliverables: l(
      [
        "структуру страниц и маршрут клиента до обращения",
        "адаптивный интерфейс для телефона и компьютера",
        "формы, Telegram, аналитику и техническую SEO-основу",
        "запуск на домене, передачу кода и доступов",
      ],
      [
        "sahifalar tuzilmasi va mijozning murojaatgacha yo‘li",
        "telefon va kompyuter uchun moslashuvchan interfeys",
        "formalar, Telegram, analitika va texnik SEO asosi",
        "domenda ishga tushirish, kod va kirishlarni topshirish",
      ],
      [
        "page structure and a clear journey to enquiry",
        "responsive interface for mobile and desktop",
        "forms, Telegram, analytics and technical SEO foundations",
        "domain launch plus source code and access handover",
      ]
    ),
    proofTitle: l(
      "Пример в production",
      "Production misoli",
      "Production example"
    ),
    proof: l(
      "Poj Pro - публичный каталог противопожарного оборудования с поиском, карточками, заявками, админкой и тремя языками.",
      "Poj Pro - qidiruv, mahsulot sahifalari, arizalar, boshqaruv va uch tilga ega production katalog.",
      "Poj Pro is a production catalogue with search, product pages, enquiries, administration and three languages."
    ),
    proofHref: "/projects/poj-pro-site",
  },
  "crm-automation": {
    slug: "crm-automation",
    offerIds: ["brief", "system"],
    title: l(
      "CRM и автоматизация под ваш рабочий процесс",
      "Ish jarayoningiz uchun CRM va avtomatlashtirish",
      "CRM and automation built around your workflow"
    ),
    description: l(
      "Внедрение CRM, ERP и бизнес-автоматизации в Узбекистане: клиенты, статусы, роли, отчёты и интеграции в одном контуре.",
      "O‘zbekistonda CRM, ERP va biznes avtomatlashtirish: mijozlar, statuslar, rollar, hisobotlar va integratsiyalar bitta tizimda.",
      "CRM, ERP and business automation in Uzbekistan: customers, stages, roles, reporting and integrations in one workflow."
    ),
    lead: l(
      "Сначала разбираем, где теряются данные, время и контроль. Затем выбираем один ограниченный пилот, проверяем его на реальных сценариях и только после этого расширяем систему.",
      "Avval ma'lumot, vaqt va nazorat qayerda yo‘qolishini aniqlaymiz. Keyin bitta cheklangan pilotni real ssenariylarda tekshirib, shundan so‘ng tizimni kengaytiramiz.",
      "We first identify where data, time and control are lost. Then we validate one limited pilot on real scenarios before expanding the system."
    ),
    audienceTitle: l("Когда это нужно", "Qachon kerak", "When it helps"),
    audience: l(
      [
        "заявки и договорённости теряются между Telegram, Excel и памятью сотрудников",
        "руководителю не видны статусы, сроки, долги и следующие действия",
        "у ролей и отделов нет одной версии данных и понятных прав доступа",
      ],
      [
        "arizalar Telegram, Excel va xodimlar xotirasi orasida yo‘qolsa",
        "rahbar statuslar, muddatlar, qarzlar va keyingi harakatlarni ko‘rmasa",
        "bo‘limlarda yagona ma'lumot va aniq kirish huquqlari bo‘lmasa",
      ],
      [
        "enquiries and commitments are lost across Telegram, Excel and memory",
        "management cannot see stages, deadlines, debt and next actions",
        "teams lack one source of truth and clear access permissions",
      ]
    ),
    deliverablesTitle: l(
      "Что входит в пилот",
      "Pilot tarkibi",
      "What the pilot includes"
    ),
    deliverables: l(
      [
        "карта одного процесса, ролей, статусов и точек контроля",
        "карточки клиентов, задачи, статусы и один базовый отчёт",
        "до пяти сотрудников, две роли доступа и обучение",
        "приёмка по заранее согласованным рабочим сценариям",
      ],
      [
        "bitta jarayon, rollar, statuslar va nazorat nuqtalari xaritasi",
        "mijoz kartalari, vazifalar, statuslar va bitta asosiy hisobot",
        "beshtagacha xodim, ikki kirish roli va o‘qitish",
        "oldindan kelishilgan ish ssenariylari bo‘yicha qabul qilish",
      ],
      [
        "map of one workflow, roles, stages and control points",
        "customer records, tasks, stages and one basic report",
        "up to five staff, two access roles and training",
        "acceptance against agreed working scenarios",
      ]
    ),
    proofTitle: l(
      "Доказательство компетенции",
      "Tajriba dalili",
      "Proof of capability"
    ),
    proof: l(
      "Financial ERP связывает лиды, договоры, исполнение, задачи и финансы. В кейсе опубликованы восемь реальных экранов системы.",
      "Financial ERP leadlar, shartnomalar, ijro, vazifalar va moliyani bog‘laydi. Keysda tizimning sakkizta real ekrani ko‘rsatilgan.",
      "Financial ERP connects leads, contracts, delivery, tasks and finance. The case study includes eight real system screens."
    ),
    proofHref: "/projects/codev-erp",
  },
  "telegram-bots": {
    slug: "telegram-bots",
    offerIds: ["bot"],
    title: l(
      "Telegram-боты для заявок и рабочих операций",
      "Arizalar va ish jarayonlari uchun Telegram-botlar",
      "Telegram bots for enquiries and business workflows"
    ),
    description: l(
      "Разработка Telegram-ботов в Узбекистане: заявки, анкеты, уведомления, документы и интеграции с внутренними системами.",
      "O‘zbekistonda Telegram-botlar: arizalar, anketalar, bildirishnomalar, hujjatlar va ichki tizimlar bilan integratsiya.",
      "Telegram bot development in Uzbekistan for enquiries, forms, notifications, documents and integrations with internal systems."
    ),
    lead: l(
      "Бот подходит, когда клиенту или сотруднику нужно пройти короткий понятный сценарий: выбрать услугу, передать данные, получить файл или уведомить ответственного.",
      "Bot mijoz yoki xodim qisqa va tushunarli ssenariydan o‘tishi kerak bo‘lganda mos keladi: xizmat tanlash, ma'lumot yuborish, fayl olish yoki mas'ul xodimni xabardor qilish.",
      "A bot fits when a customer or employee needs a short, clear flow: choose a service, submit data, receive a file or notify the responsible person."
    ),
    audienceTitle: l(
      "Подходящие сценарии",
      "Mos ssenariylar",
      "Good use cases"
    ),
    audience: l(
      [
        "сбор заявок, контактов и ответов на частые вопросы",
        "анкеты, бронирования, статусы и уведомления менеджеру",
        "внутренние сценарии с документами, валютными курсами или данными CRM",
      ],
      [
        "arizalar, kontaktlar va tez-tez beriladigan savollarga javoblar",
        "anketalar, bronlash, statuslar va menejerga bildirishnomalar",
        "hujjatlar, valyuta kurslari yoki CRM ma'lumotlari bilan ichki ssenariylar",
      ],
      [
        "enquiries, contact capture and frequently asked questions",
        "forms, bookings, stages and manager notifications",
        "internal flows with documents, exchange rates or CRM data",
      ]
    ),
    deliverablesTitle: l("Что входит", "Nimalar kiradi", "What is included"),
    deliverables: l(
      [
        "один сценарий до восьми шагов на одном языке",
        "меню, вопросы, контакты и согласованные поля",
        "уведомление ответственному и проверка сценария",
        "развёртывание, инструкция и передача доступов",
      ],
      [
        "bitta tilda sakkiz qadamgacha bo‘lgan bitta ssenariy",
        "menyu, savollar, kontaktlar va kelishilgan maydonlar",
        "mas'ul xodimga bildirishnoma va ssenariyni tekshirish",
        "ishga tushirish, yo‘riqnoma va kirishlarni topshirish",
      ],
      [
        "one flow with up to eight steps in one language",
        "menu, questions, contact capture and agreed fields",
        "responsible-person notification and flow testing",
        "deployment, instructions and access handover",
      ]
    ),
    proofTitle: l(
      "Пример рабочего сценария",
      "Ishlayotgan misol",
      "Working example"
    ),
    proof: l(
      "Для Poj Pro работают боты, которые собирают реквизиты и товары, формируют договор в PDF и рассылают курсы валют.",
      "Poj Pro botlari rekvizit va tovarlarni yig‘adi, PDF shartnoma yaratadi va valyuta kurslarini yuboradi.",
      "Poj Pro bots collect customer details and items, generate a PDF contract and distribute exchange rates."
    ),
    proofHref: "/projects/poj-pro-telegram-bots",
  },
};

export const SERVICE_LANDING_SLUGS = Object.keys(SERVICE_LANDINGS);

export function getServiceLanding(slug: string) {
  return SERVICE_LANDINGS[slug];
}
