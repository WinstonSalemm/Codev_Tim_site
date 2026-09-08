import type { Localized, Locale } from "./commerce/catalog";
export type PortfolioProject = {
  slug: string;
  name: string;
  category: Localized;
  description: Localized;
  purpose: Localized;
  stack: string[];
  status: "used" | "ready" | "development";
  client: boolean;
  repository?: string;
};
const text = (ru: string, uz: string, en: string): Localized => ({
  ru,
  uz,
  en,
});
export const PORTFOLIO: PortfolioProject[] = [
  {
    slug: "poj-pro-site",
    name: "Poj Pro",
    category: text(
      "Сайт и каталог",
      "Sayt va katalog",
      "Website and catalogue"
    ),
    description: text(
      "Каталог противопожарного оборудования с поиском, карточками товаров и обращениями покупателей.",
      "Yong‘in xavfsizligi uskunalari katalogi: qidiruv, mahsulot kartochkalari va xaridor murojaatlari.",
      "Fire safety equipment catalogue with search, product pages and customer enquiries."
    ),
    purpose: text(
      "Помочь покупателю найти оборудование и передать запрос компании. Для сотрудников предусмотрено управление содержимым и каталогом.",
      "Xaridorga uskunani topish va kompaniyaga so‘rov yuborishda yordam berish. Xodimlar uchun kontent va katalog boshqaruvi mavjud.",
      "Help buyers find equipment and contact the company. Staff can manage content and the catalogue."
    ),
    stack: ["Next.js", "React", "TypeScript", "Prisma", "MySQL"],
    status: "development",
    client: true,
  },
  {
    slug: "poj-pro-platform",
    name: "Poj Pro Operations",
    category: text(
      "Приложение для компании",
      "Kompaniya ilovasi",
      "Business application"
    ),
    description: text(
      "Внутреннее приложение для продаж, склада, клиентов, договоров и финансов.",
      "Sotuvlar, ombor, mijozlar, shartnomalar va moliya uchun ichki ilova.",
      "An internal application for sales, inventory, customers, contracts and finance."
    ),
    purpose: text(
      "Собрать повседневные операции в одном приложении. Архитектура предусматривает работу без связи с последующей синхронизацией.",
      "Kundalik operatsiyalarni bitta ilovada birlashtirish. Arxitektura oflayn ishlash va keyingi sinxronlashni ko‘zda tutadi.",
      "Bring daily operations into one application, with an architecture designed for offline work and later synchronisation."
    ),
    stack: ["C#", ".NET MAUI", "ASP.NET Core", "SQLite"],
    status: "development",
    client: true,
  },
  {
    slug: "poj-pro-api-contracts",
    name: "Poj Pro Documents",
    category: text(
      "Генератор договоров",
      "Shartnoma generatori",
      "Contract generator"
    ),
    description: text(
      "Сервис формирует договор из реквизитов покупателя и позиций заказа, затем возвращает PDF.",
      "Xaridor rekvizitlari va buyurtma asosida shartnoma tuzib, PDF qaytaruvchi xizmat.",
      "A service that creates a contract from buyer details and order items, then returns a PDF."
    ),
    purpose: text(
      "Сократить ручное заполнение документов. Отдельный сервис принимает данные из приложения или бота и формирует файл по шаблону.",
      "Hujjatlarni qo‘lda to‘ldirishni kamaytirish. Xizmat ilova yoki botdan ma’lumot olib, shablon bo‘yicha fayl yaratadi.",
      "Reduce manual document entry. A separate service accepts application or bot data and generates a file from a template."
    ),
    stack: ["C#", "ASP.NET Core", "DocX", "LibreOffice"],
    status: "development",
    client: true,
  },
  {
    slug: "poj-pro-telegram-bots",
    name: "Poj Pro Telegram",
    category: text(
      "Боты для сотрудников",
      "Xodimlar uchun botlar",
      "Staff bots"
    ),
    description: text(
      "Telegram-боты для подготовки договоров и получения курсов валют.",
      "Shartnomalar tayyorlash va valyuta kurslarini olish uchun Telegram botlar.",
      "Telegram bots for preparing contracts and receiving exchange rates."
    ),
    purpose: text(
      "Договорный бот собирает реквизиты, товары, количество и цены, затем отправляет PDF. Второй бот получает и рассылает курсы валют.",
      "Shartnoma boti rekvizitlar, mahsulotlar, miqdor va narxlarni yig‘ib, PDF yuboradi. Ikkinchi bot valyuta kurslarini oladi va yuboradi.",
      "The contract bot collects buyer details, items, quantities and prices, then sends a PDF. A second bot retrieves and distributes exchange rates."
    ),
    stack: ["Python", "aiogram", "PostgreSQL", "Telegram Bot API"],
    status: "development",
    client: true,
  },
  {
    slug: "codev-erp",
    name: "Financial ERP",
    category: text("ERP и CRM", "ERP va CRM", "ERP and CRM"),
    description: text(
      "Приложение для B2B-компании: лиды, клиенты, договоры, исполнение проектов, финансы и задачи.",
      "B2B kompaniya uchun ilova: lidlar, mijozlar, shartnomalar, loyihalar ijrosi, moliya va vazifalar.",
      "An application for B2B companies covering leads, customers, contracts, project delivery, finance and tasks."
    ),
    purpose: text(
      "Связать продажу с исполнением и оплатой. Сейчас проект развивается до демонстрационной версии; коммерческая готовность ещё не подтверждена.",
      "Sotuvni ijro va to‘lov bilan bog‘lash. Loyiha hozir namoyish versiyasigacha ishlab chiqilmoqda; tijoriy tayyorligi tasdiqlanmagan.",
      "Connect sales with delivery and payment. The project is progressing towards a demonstrable version; commercial readiness is not yet confirmed."
    ),
    stack: [".NET 10", ".NET MAUI", "ASP.NET Core", "EF Core", "PostgreSQL"],
    status: "development",
    client: false,
    repository: "https://github.com/WinstonSalemm/FinancialApp",
  },
  {
    slug: "assistant-agent",
    name: "Codev Assistant",
    category: text("AI-помощник", "AI yordamchi", "AI assistant"),
    description: text(
      "Прототип персонального помощника: общение с AI, задачи и напоминания в отдельном приложении.",
      "Shaxsiy yordamchi prototipi: AI bilan muloqot, vazifalar va eslatmalar alohida ilovada.",
      "A personal assistant prototype for AI conversations, tasks and reminders in a dedicated application."
    ),
    purpose: text(
      "Проверить, как AI помогает с повседневными задачами. Проект включает клиентское приложение, сервер и хранение данных; сценарии ещё развиваются.",
      "AI kundalik vazifalarda qanday yordam berishini tekshirish. Loyiha mijoz ilovasi, server va ma’lumot saqlashdan iborat; ssenariylar rivojlantirilmoqda.",
      "Explore how AI can help with everyday tasks. The project includes a client application, server and data storage, with scenarios still being developed."
    ),
    stack: [
      "C#",
      ".NET MAUI",
      "ASP.NET Core",
      "PostgreSQL",
      "Redis",
      "OpenAI API",
    ],
    status: "development",
    client: false,
    repository: "https://github.com/WinstonSalemm/AssistantAgent",
  },
  {
    slug: "codev-tim-travel",
    name: "Codev_Tim Travel",
    category: text(
      "CRM турагентства",
      "Sayyohlik agentligi CRM",
      "Travel agency CRM"
    ),
    description: text(
      "Проект рабочего пространства для клиентов турагентства, заявок и информации о поездках.",
      "Sayyohlik agentligi mijozlari, arizalar va sayohat ma’lumotlari uchun ish maydoni loyihasi.",
      "A workspace project for travel agency customers, enquiries and trip information."
    ),
    purpose: text(
      "Собрать данные туристов и работу с заявками в одном месте. Состав продукта и техническое решение уточняются в процессе разработки.",
      "Sayyohlar ma’lumotlari va arizalar bilan ishlashni birlashtirish. Mahsulot tarkibi va texnik yechim ishlab chiqish jarayonida aniqlanmoqda.",
      "Bring traveller information and enquiry handling together. Product scope and technical choices are being refined during development."
    ),
    stack: [],
    status: "development",
    client: false,
  },
  {
    slug: "codev-tim",
    name: "Codev_Tim",
    category: text("Сайт разработчика", "Dasturchi sayti", "Developer website"),
    description: text(
      "Этот сайт: предложение, портфолио и обращения клиентов на русском, узбекском и английском.",
      "Ushbu sayt: rus, o‘zbek va ingliz tillarida takliflar, portfolio va mijoz murojaatlari.",
      "This website: services, portfolio and customer enquiries in Russian, Uzbek and English."
    ),
    purpose: text(
      "Помочь заказчику выбрать подходящее решение и обсудить проект. Сайт объединяет калькулятор, акции и отправку заявок в Telegram.",
      "Mijozga mos yechimni tanlash va loyihani muhokama qilishda yordam berish. Sayt kalkulyator, aksiyalar va Telegramga ariza yuborishni birlashtiradi.",
      "Help customers select a suitable solution and discuss a project. The website combines a configurator, promotions and Telegram enquiry delivery."
    ),
    stack: ["Next.js 15", "React 19", "TypeScript", "next-intl"],
    status: "used",
    client: false,
    repository: "https://github.com/WinstonSalemm/Codev_Tim_site",
  },
];
export const PORTFOLIO_COPY = {
  ru: {
    title: "Проекты",
    lead: "Сайты, приложения и внутренние инструменты. У каждой работы своя задача и текущий статус.",
    client: "Клиентские проекты",
    own: "Собственные продукты",
    used: "Используется",
    ready: "Готово к релизу",
    development: "В разработке",
    open: "Посмотреть проект",
    back: "Все проекты",
    purpose: "Для чего создавался",
    stack: "Технологии",
    stackPending: "Техническое решение уточняется",
    screenshots: "Интерфейс",
    github: "Исходный код на GitHub",
  },
  uz: {
    title: "Loyihalar",
    lead: "Saytlar, ilovalar va ichki vositalar. Har bir ishning vazifasi va joriy holati ko‘rsatilgan.",
    client: "Mijoz loyihalari",
    own: "Shaxsiy mahsulotlar",
    used: "Foydalanilmoqda",
    ready: "Relizga tayyor",
    development: "Ishlab chiqilmoqda",
    open: "Loyihani ko‘rish",
    back: "Barcha loyihalar",
    purpose: "Nima uchun yaratilgan",
    stack: "Texnologiyalar",
    stackPending: "Texnik yechim aniqlanmoqda",
    screenshots: "Interfeys",
    github: "GitHubdagi manba kodi",
  },
  en: {
    title: "Projects",
    lead: "Websites, applications and internal tools. Each project has its own purpose and current status.",
    client: "Client projects",
    own: "Own products",
    used: "In use",
    ready: "Ready for release",
    development: "In development",
    open: "View project",
    back: "All projects",
    purpose: "Purpose",
    stack: "Technology",
    stackPending: "Technical approach being defined",
    screenshots: "Interface",
    github: "Source code on GitHub",
  },
} satisfies Record<Locale, Record<string, string>>;
export function findPortfolioProject(slug: string) {
  return PORTFOLIO.find((p) => p.slug === slug);
}
