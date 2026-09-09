import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/lib/commerce/catalog";

type CaseCopy = {
  badge: string;
  title: string;
  image: string;
  alt: string;
  problem: string;
  built: string;
  result: string;
  facts: string[];
  href: string;
};

const COPY: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    lead: string;
    labels: string[];
    open: string;
  }
> = {
  ru: {
    eyebrow: "01 / ДОКАЗАТЕЛЬСТВА",
    title: "Не только обещания. Вот что уже работает.",
    lead: "Три разных контура: клиентский каталог, ERP-продукт и внутренний инструмент продаж. Без выдуманных процентов и непроверяемых цифр.",
    labels: ["Задача", "Сделано", "Работает сейчас"],
    open: "Разобрать кейс",
  },
  uz: {
    eyebrow: "01 / DALILLAR",
    title: "Faqat va'dalar emas. Ishlayotgan loyihalar.",
    lead: "Uch xil yechim: mijoz katalogi, ERP mahsuloti va ichki savdo vositasi. Tasdiqlanmagan foizlar va o‘ylab topilgan raqamlarsiz.",
    labels: ["Vazifa", "Bajarildi", "Hozir ishlaydi"],
    open: "Keysni ko‘rish",
  },
  en: {
    eyebrow: "01 / PROOF",
    title: "More than promises. This work is already in use.",
    lead: "Three different systems: a client catalogue, an ERP product and an internal sales tool. No invented growth percentages or unverifiable claims.",
    labels: ["Challenge", "Built", "Working now"],
    open: "View case study",
  },
};

const CASES: Record<Locale, CaseCopy[]> = {
  ru: [
    {
      badge: "Клиентский проект",
      title: "Poj Pro · сайт и каталог",
      image: "/projects/poj-pro-site/home.png",
      alt: "Главная страница каталога Poj Pro",
      problem:
        "Покупателю нужно было быстро найти противопожарное оборудование и передать запрос компании.",
      built:
        "Каталог, поиск, карточки товаров, формы, администрирование и три языка.",
      result:
        "Публичный production-сайт на poj-pro.uz и отдельная панель управления контентом.",
      facts: ["Production", "RU · UZ · EN", "Каталог + админка"],
      href: "/projects/poj-pro-site",
    },
    {
      badge: "Собственный продукт",
      title: "Financial ERP · продажи и финансы",
      image: "/projects/codev-erp/sales-pipeline.png",
      alt: "Канбан лидов и сделок Financial ERP",
      problem:
        "Связать лид, договор, исполнение проекта и оплату в одном рабочем контуре.",
      built:
        "Модули лидов, клиентов, договоров, задач, проектов, счетов и финансовой отчётности.",
      result:
        "Рабочий production-контур с восемью опубликованными экранами реальных модулей.",
      facts: ["Production", "8 экранов", "CRM → договор → финансы"],
      href: "/projects/codev-erp",
    },
    {
      badge: "Внутренний инструмент",
      title: "Call Tracker · контроль контактов",
      image: "/projects/call-tracker/dashboard.png",
      alt: "Главная панель Call Tracker",
      problem:
        "Не терять историю звонков, договорённости и следующие действия по клиентам.",
      built:
        "История контактов, план повторных звонков, аналитика, дневные отчёты и база знаний.",
      result:
        "Ежедневный рабочий маршрут: звонок, результат, следующий контакт и отчёт руководителю.",
      facts: ["Используется", "5 экранов", "Отчёты + аналитика"],
      href: "/projects/call-tracker",
    },
  ],
  uz: [],
  en: [],
};

CASES.uz = CASES.ru.map((item, index) => ({
  ...item,
  badge: ["Mijoz loyihasi", "Shaxsiy mahsulot", "Ichki vosita"][index]!,
  title: [
    "Poj Pro · sayt va katalog",
    "Financial ERP · savdo va moliya",
    "Call Tracker · kontaktlar nazorati",
  ][index]!,
  alt: [
    "Poj Pro katalogining bosh sahifasi",
    "Financial ERP lead va bitimlar kanbani",
    "Call Tracker bosh paneli",
  ][index]!,
  problem: [
    "Xaridor uskunani tez topishi va kompaniyaga so‘rov yuborishi kerak edi.",
    "Lead, shartnoma, loyiha ijrosi va to‘lovni bitta jarayonda bog‘lash kerak edi.",
    "Qo‘ng‘iroqlar tarixi, kelishuvlar va keyingi harakatlarni yo‘qotmaslik kerak edi.",
  ][index]!,
  built: [
    "Katalog, qidiruv, mahsulot sahifalari, formalar, boshqaruv va uch til.",
    "Leadlar, mijozlar, shartnomalar, vazifalar, loyihalar va moliya modullari.",
    "Kontaktlar tarixi, qayta qo‘ng‘iroqlar rejasi, analitika, hisobotlar va bilim bazasi.",
  ][index]!,
  result: [
    "poj-pro.uz dagi production sayt va alohida kontent boshqaruv paneli.",
    "Sakkizta real modul ekrani e'lon qilingan ishlaydigan production kontur.",
    "Kundalik ish oqimi: qo‘ng‘iroq, natija, keyingi aloqa va rahbar hisoboti.",
  ][index]!,
  facts: [
    ["Production", "RU · UZ · EN", "Katalog + boshqaruv"],
    ["Production", "8 ta ekran", "CRM → shartnoma → moliya"],
    ["Foydalanilmoqda", "5 ta ekran", "Hisobotlar + analitika"],
  ][index]!,
}));

CASES.en = CASES.ru.map((item, index) => ({
  ...item,
  badge: ["Client project", "Own product", "Internal tool"][index]!,
  title: [
    "Poj Pro · website and catalogue",
    "Financial ERP · sales and finance",
    "Call Tracker · contact control",
  ][index]!,
  alt: [
    "Poj Pro catalogue home page",
    "Financial ERP lead and deal kanban",
    "Call Tracker dashboard",
  ][index]!,
  problem: [
    "Buyers needed a fast way to find fire-safety equipment and send an enquiry.",
    "Leads, contracts, project delivery and payment needed one connected workflow.",
    "Call history, commitments and next actions needed to stay visible.",
  ][index]!,
  built: [
    "Catalogue, search, product pages, forms, administration and three languages.",
    "Modules for leads, customers, contracts, tasks, projects and finance.",
    "Contact history, follow-up planning, analytics, daily reports and a knowledge base.",
  ][index]!,
  result: [
    "A production website at poj-pro.uz with a separate content administration area.",
    "A working production contour with eight published screens from real modules.",
    "A daily workflow from call and outcome to follow-up and manager reporting.",
  ][index]!,
  facts: [
    ["Production", "RU · UZ · EN", "Catalogue + admin"],
    ["Production", "8 screens", "CRM → contract → finance"],
    ["In use", "5 screens", "Reports + analytics"],
  ][index]!,
}));

export function HomepageProof({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  return (
    <section className="sales-section sales-proof" id="proof">
      <p className="sales-eyebrow">{t.eyebrow}</p>
      <h2>{t.title}</h2>
      <p className="sales-section-lead">{t.lead}</p>
      <div className="sales-case-grid">
        {CASES[locale].map((item) => (
          <article className="sales-case" key={item.href}>
            <Link className="sales-case-image" href={item.href}>
              <Image
                src={item.image}
                alt={item.alt}
                width={2559}
                height={1500}
                sizes="(max-width: 800px) 100vw, 380px"
              />
            </Link>
            <div className="sales-case-body">
              <p className="sales-case-badge">{item.badge}</p>
              <h3>{item.title}</h3>
              {[item.problem, item.built, item.result].map((text, index) => (
                <div className="sales-case-row" key={t.labels[index]}>
                  <span>{t.labels[index]}</span>
                  <p>{text}</p>
                </div>
              ))}
              <ul className="sales-case-facts" aria-label={t.open}>
                {item.facts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
              <Link className="sales-detail-link" href={item.href}>
                {t.open} →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
