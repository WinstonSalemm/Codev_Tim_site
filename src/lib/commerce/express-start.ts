import type { Locale } from "./catalog";

// This package is quoted in USD. Payment in UZS is agreed before work starts.
export const EXPRESS_START_ID = "web_start" as const;
export const EXPRESS_START_COPY = {
  ru: {
    name: "Экспресс-сайт для бизнеса",
    result:
      "Адаптация готового шаблона для услуг, контактов и заявок малого бизнеса.",
    title: "Ваш бизнес заслуживает собственного сайта.",
    subtitle:
      "Профессиональная страница для ваших услуг, контактов и заявок. Без долгой разработки и лишних расходов.",
    cardScope: [
      "Адаптивный шаблон · до 6 блоков",
      "Один язык: русский или узбекский",
      "Форма → Telegram; WhatsApp и телефон",
      "Базовое SEO, размещение и проверка",
      "2 раунда правок за 14 дней после сдачи",
    ],
    scope: [
      "Готовый адаптивный дизайн на основе проверенного шаблона",
      "1 страница, до 6 смысловых блоков",
      "Один язык на выбор: русский или узбекский",
      "Форма заявки с уведомлением в Telegram",
      "Кнопки Telegram, WhatsApp и телефона",
      "Базовые SEO-настройки",
      "Размещение сайта и проверка работоспособности",
      "2 раунда небольших правок в течение 14 дней после сдачи",
    ],
    order: "Заказать экспресс-сайт",
    paymentNote:
      "$100 за фиксированный базовый объём. Оплата в сумах по заранее согласованной смете.",
    deliveryNote:
      "Ориентировочно 2–3 рабочих дня после согласования задачи и получения всех материалов.",
    materialsNote:
      "Тексты, логотип, фотографии и другие исходные материалы предоставляет клиент.",
    exclusionsTitle: "Границы пакета",
    exclusions:
      "Не входят: индивидуальный дизайн, CMS, каталоги, дополнительные языки, сложные интеграции, рекламное продвижение, платные домены и сервисы.",
    fixedPackage: "Express Start · $100",
    customPackage: "Индивидуальный сайт",
    heroLink: "Нужен простой сайт? Express Start · $100 →",
    priceLabel: "Фиксированный пакет",
    catalogNote:
      "Express Start — $100; индивидуальная разработка — в сумах. Смету и оплату в сумах согласуем до начала работ.",
  },
  uz: {
    name: "Biznes uchun ekspress-sayt",
    result:
      "Kichik biznes xizmatlari, kontaktlari va arizalari uchun tayyor shablonni moslashtirish.",
    title: "Biznesingiz o‘z saytiga munosib.",
    subtitle:
      "Xizmatlar, kontaktlar va arizalar uchun professional sahifa. Uzoq ishlab chiqish va ortiqcha xarajatlarsiz.",
    cardScope: [
      "Moslashuvchan shablon · 6 tagacha blok",
      "Bitta til: ruscha yoki o‘zbekcha",
      "Ariza → Telegram; WhatsApp va telefon",
      "Asosiy SEO, joylashtirish va tekshirish",
      "Topshirilgach 14 kunda 2 bosqich tuzatish",
    ],
    scope: [
      "Sinalgan shablon asosida tayyor moslashuvchan dizayn",
      "1 sahifa, 6 tagacha mazmuniy blok",
      "Bitta til: rus yoki o‘zbek tili",
      "Telegramga bildirishnoma yuboradigan ariza formasi",
      "Telegram, WhatsApp va telefon tugmalari",
      "Asosiy SEO sozlamalari",
      "Saytni joylashtirish va ishlashini tekshirish",
      "Topshirilgandan keyin 14 kun ichida 2 bosqich kichik tuzatish",
    ],
    order: "Ekspress-saytga buyurtma berish",
    paymentNote:
      "Belgilangan asosiy hajm uchun $100. To‘lov oldindan kelishilgan smeta bo‘yicha so‘mda amalga oshiriladi.",
    deliveryNote:
      "Vazifa kelishilib, barcha materiallar olingach, taxminan 2–3 ish kuni.",
    materialsNote:
      "Matnlar, logotip, fotosuratlar va boshqa boshlang‘ich materiallarni mijoz taqdim etadi.",
    exclusionsTitle: "Paket chegaralari",
    exclusions:
      "Kirmaydi: individual dizayn, CMS, kataloglar, qo‘shimcha tillar, murakkab integratsiyalar, reklama, pulli domenlar va xizmatlar.",
    fixedPackage: "Express Start · $100",
    customPackage: "Individual sayt",
    heroLink: "Oddiy sayt kerakmi? Express Start · $100 →",
    priceLabel: "Belgilangan hajmli paket",
    catalogNote:
      "Express Start — $100; individual ishlab chiqish — so‘mda. Smeta va so‘mdagi to‘lov ish boshlanishidan oldin kelishiladi.",
  },
  en: {
    name: "Express website for business",
    result:
      "A ready-made template adapted for a small business’s services, contacts and enquiries.",
    title: "Your business deserves its own website.",
    subtitle:
      "A professional page for your services, contacts and enquiries. Without a long development process or unnecessary costs.",
    cardScope: [
      "Responsive template · up to 6 sections",
      "One language: Russian or Uzbek",
      "Form → Telegram; WhatsApp and phone",
      "Basic SEO, deployment and checks",
      "2 revision rounds within 14 days of handover",
    ],
    scope: [
      "Ready-made responsive design based on a proven template",
      "1 page with up to 6 content sections",
      "One language: Russian or Uzbek",
      "Enquiry form with Telegram notifications",
      "Telegram, WhatsApp and phone buttons",
      "Basic SEO setup",
      "Website deployment and functionality checks",
      "2 rounds of minor revisions within 14 days of handover",
    ],
    order: "Order an express website",
    paymentNote:
      "$100 for the fixed base scope. Payment in UZS according to an estimate agreed in advance.",
    deliveryNote:
      "Approximately 2–3 working days after the scope is agreed and all materials are received.",
    materialsNote:
      "The client supplies text, logo, photos and other source materials.",
    exclusionsTitle: "Package boundaries",
    exclusions:
      "Excluded: custom design, CMS, catalogues, additional languages, complex integrations, advertising, paid domains and services.",
    fixedPackage: "Express Start · $100",
    customPackage: "Custom website",
    heroLink: "Need a simple website? Express Start · $100 →",
    priceLabel: "Fixed package",
    catalogNote:
      "Express Start — $100; custom development — in UZS. The estimate and UZS payment are agreed before work starts.",
  },
} satisfies Record<
  Locale,
  {
    name: string;
    result: string;
    title: string;
    subtitle: string;
    scope: string[];
    cardScope: string[];
    order: string;
    paymentNote: string;
    deliveryNote: string;
    materialsNote: string;
    exclusionsTitle: string;
    exclusions: string;
    fixedPackage: string;
    customPackage: string;
    heroLink: string;
    priceLabel: string;
    catalogNote: string;
  }
>;
