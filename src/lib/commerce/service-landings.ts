import type { Localized, Locale, OfferId } from "./catalog";
import { FOCUSED_SERVICE_LANDINGS } from "./focused-service-landings";

const l = <T>(ru: T, uz: T, en: T): Record<Locale, T> => ({ ru, uz, en });

export type ServiceLanding = {
  slug: string;
  offerIds: OfferId[];
  seoTitle: Localized;
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
  preset?: "landing" | "catalog";
  boundaries?: Record<Locale, string[]>;
  questions?: Record<Locale, Array<[string, string]>>;
};

export const SERVICE_LANDINGS: Record<string, ServiceLanding> = {
  websites: {
    slug: "websites",
    offerIds: ["web_start", "landing", "corporate"],
    seoTitle: l(
      "Создание и разработка сайтов в Ташкенте",
      "Toshkentda sayt yaratish va ishlab chiqish",
      "Website design and development in Tashkent"
    ),
    title: l(
      "Разработка сайтов для бизнеса в Ташкенте",
      "Toshkentda biznes uchun sayt yaratish",
      "Website development for businesses in Tashkent"
    ),
    description: l(
      "Сайты для бизнеса в Ташкенте: Express Start на шаблоне за $100, индивидуальные лендинги от 3 000 000 сум и сайты компаний. Состав и смета до старта.",
      "Toshkentda biznes uchun saytlar: shablon asosidagi Express Start $100, individual landing 3 000 000 so‘mdan va kompaniya saytlari. Tarkib va smeta oldindan kelishiladi.",
      "Business websites in Tashkent: template-based Express Start for $100, custom landing pages from UZS 3,000,000 and business sites. Scope and estimate agreed first."
    ),
    lead: l(
      "Для быстрого старта — профессиональная страница на проверенном шаблоне. Для своей структуры, дизайна и дополнительных функций — индивидуальный лендинг или сайт компании. Выберите объём под вашу задачу.",
      "Tez boshlash uchun — sinalgan shablon asosidagi professional sahifa. O‘z tuzilmasi, dizayni va qo‘shimcha funksiyalari uchun — individual landing yoki kompaniya sayti. Vazifangizga mos hajmni tanlang.",
      "For a quick start, choose a professional page adapted from a proven template. For a tailored structure, design and additional features, choose a custom landing page or business website. Match the scope to your task."
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
    deliverablesTitle: l(
      "Состав зависит от формата",
      "Tarkib tanlangan formatga bog‘liq",
      "Scope depends on the format"
    ),
    deliverables: l(
      [
        "Express Start: адаптация шаблона, до 6 блоков, один язык — русский или узбекский",
        "индивидуальный лендинг: структура и дизайн под задачу, до 8 блоков, один язык",
        "сайт компании: до 5 страниц, услуги, кейсы, о компании и контакты",
        "адаптивный интерфейс для телефона и компьютера",
        "форму заявки в Telegram, базовое SEO и проверку запуска во всех трёх форматах",
      ],
      [
        "Express Start: shablonni moslashtirish, 6 tagacha blok, bitta til — ruscha yoki o‘zbekcha",
        "individual landing: vazifaga mos tuzilma va dizayn, 8 tagacha blok, bitta til",
        "kompaniya sayti: 5 tagacha sahifa, xizmatlar, keyslar, kompaniya va kontaktlar",
        "telefon va kompyuter uchun moslashuvchan interfeys",
        "uchala formatda ham Telegramga ariza, asosiy SEO va ishga tushirishni tekshirish",
      ],
      [
        "Express Start: template adaptation, up to 6 sections, one language — Russian or Uzbek",
        "custom landing page: tailored structure and design, up to 8 sections, one language",
        "business website: up to 5 pages covering services, case studies, about and contact",
        "responsive interface for mobile and desktop",
        "Telegram enquiry delivery, basic SEO and launch checks in all three formats",
      ]
    ),
    proofTitle: l(
      "Пример в production",
      "Production misoli",
      "Production example"
    ),
    proof: l(
      "Poj Pro — публичный каталог противопожарного оборудования с поиском, карточками, заявками, админкой и тремя языками. Это отдельная расширенная разработка; такой объём не входит в Express Start.",
      "Poj Pro — qidiruv, mahsulot sahifalari, arizalar, boshqaruv va uch tilga ega production katalog. Bu alohida kengaytirilgan loyiha; bunday hajm Express Start paketiga kirmaydi.",
      "Poj Pro is a production catalogue with search, product pages, enquiries, administration and three languages. It is a separate, larger project; this scope is not included in Express Start."
    ),
    proofHref: "/projects/poj-pro-site",
    boundaries: l(
      [
        "Express Start стоит $100 за фиксированный объём. Оплата в сумах по заранее согласованной смете; курс не рассчитывается автоматически.",
        "Тексты, фотографии, логотип и контакты для Express Start предоставляет клиент. Ориентир — 2–3 рабочих дня после согласования задачи и получения всех материалов.",
        "В Express Start входят два раунда небольших правок в течение 14 дней после сдачи. Индивидуальный дизайн, CMS, каталоги, дополнительные языки и сложные интеграции в пакет не входят.",
        "Платные домены и сервисы, рекламное продвижение и подготовка материалов не входят. Дополнительный объём согласуется отдельно; запуск сайта не гарантирует рост продаж.",
      ],
      [
        "Express Start qat’iy hajm uchun $100 turadi. To‘lov oldindan kelishilgan smeta bo‘yicha so‘mda; kurs avtomatik hisoblanmaydi.",
        "Express Start uchun matn, surat, logotip va kontaktlarni mijoz beradi. Muddat — vazifa kelishilib, barcha materiallar olingandan keyin taxminan 2–3 ish kuni.",
        "Topshirilgandan keyingi 14 kun ichida ikki bosqich kichik tuzatish kiradi. Individual dizayn, CMS, katalog, qo‘shimcha tillar va murakkab integratsiyalar Express Start tarkibiga kirmaydi.",
        "Pullik domen va servislar, reklama yuritish va material tayyorlash kirmaydi. Qo‘shimcha hajm alohida kelishiladi; saytning ishga tushishi sotuv o‘sishini kafolatlamaydi.",
      ],
      [
        "Express Start costs $100 for a fixed scope. Payment is in UZS under an estimate agreed in advance; no exchange rate is calculated automatically.",
        "The client supplies copy, photos, a logo and contact details for Express Start. Allow approximately 2–3 working days after scope approval and receipt of all materials.",
        "Two rounds of small revisions within 14 days of handover are included. Custom design, CMS, catalogues, additional languages and complex integrations are outside Express Start.",
        "Paid domains and services, advertising and material preparation are excluded. Additional scope is agreed separately; launch does not guarantee sales growth.",
      ]
    ),
  },
  "crm-automation": {
    slug: "crm-automation",
    offerIds: ["brief", "system"],
    seoTitle: l(
      "CRM и автоматизация бизнеса в Ташкенте",
      "Toshkentda CRM va biznesni avtomatlashtirish",
      "CRM and business automation in Tashkent"
    ),
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
    seoTitle: l(
      "Разработка Telegram-ботов в Ташкенте",
      "Toshkentda Telegram bot yaratish",
      "Telegram bot development in Tashkent"
    ),
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
  ...FOCUSED_SERVICE_LANDINGS,
};

export const SERVICE_LANDING_SLUGS = Object.keys(SERVICE_LANDINGS);

export function getServiceLanding(slug: string) {
  return Object.hasOwn(SERVICE_LANDINGS, slug)
    ? SERVICE_LANDINGS[slug]
    : undefined;
}
