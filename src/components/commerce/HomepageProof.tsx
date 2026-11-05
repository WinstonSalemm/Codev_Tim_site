import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/lib/commerce/catalog";

type CaseCopy = {
  badge: string;
  title: string;
  image: string;
  width: number;
  height: number;
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
    eyebrow: "01 / ИЗБРАННЫЕ ПРОЕКТЫ",
    title: "От задачи к рабочему продукту.",
    lead: "Каталог для покупателей. Финансы для команды. История каждого контакта. Три проекта в деталях.",
    labels: ["Задача", "Сделано", "Результат разработки"],
    open: "Разобрать кейс",
  },
  uz: {
    eyebrow: "01 / TANLANGAN LOYIHALAR",
    title: "Vazifadan ishlaydigan mahsulotgacha.",
    lead: "Xaridorlar uchun katalog. Jamoa uchun moliya. Har bir aloqa tarixi. Uch loyiha tafsilotlari.",
    labels: ["Vazifa", "Bajarildi", "Ishlab chiqish natijasi"],
    open: "Keysni ko‘rish",
  },
  en: {
    eyebrow: "01 / SELECTED WORK",
    title: "From a problem to a working product.",
    lead: "A catalogue for buyers. Finance for teams. Every customer conversation recorded. Three projects, in detail.",
    labels: ["Challenge", "Built", "Delivered scope"],
    open: "View case study",
  },
};

const CASES: Record<Locale, CaseCopy[]> = {
  ru: [
    {
      badge: "Клиентский проект",
      title: "Сайт-каталог противопожарного оборудования",
      image: "/projects/fire-safety-store/workflow.svg",
      width: 1280,
      height: 720,
      alt: "Иллюстративная схема каталога оборудования — не скриншот",
      problem:
        "Покупателю нужно было быстро найти противопожарное оборудование и передать запрос компании.",
      built:
        "Каталог, поиск, карточки товаров, формы, администрирование и три языка.",
      result:
        "Завершённый проект: путь от поиска оборудования до заявки и отдельное управление контентом.",
      facts: ["Завершено", "RU · UZ · EN", "Каталог + админка"],
      href: "/projects/fire-safety-store",
    },
    {
      badge: "Собственный продукт",
      title: "Financial ERP · продажи и финансы",
      image: "/projects/codev-erp/sales-pipeline.png",
      width: 2559,
      height: 1549,
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
      image: "/projects/call-tracker/workflow.svg",
      width: 1280,
      height: 720,
      alt: "Иллюстративная схема Call Tracker — не скриншот",
      problem:
        "Не терять историю звонков, договорённости и следующие действия по клиентам.",
      built:
        "История контактов, план повторных звонков, аналитика, дневные отчёты и база знаний.",
      result:
        "Ежедневный рабочий маршрут: звонок, результат, следующий контакт и отчёт руководителю.",
      facts: ["Используется", "Схема сценария", "Отчёты + аналитика"],
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
    "Yong‘in xavfsizligi uskunalari katalogi",
    "Financial ERP · savdo va moliya",
    "Call Tracker · kontaktlar nazorati",
  ][index]!,
  alt: [
    "Uskunalar katalogi ssenariysi — skrinshot emas",
    "Financial ERP lead va bitimlar kanbani",
    "Call Tracker jarayon sxemasi — skrinshot emas",
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
    "Yakunlangan loyiha: uskunani topishdan arizagacha bo‘lgan yo‘l va alohida kontent boshqaruvi.",
    "Sakkizta real modul ekrani e'lon qilingan ishlaydigan production kontur.",
    "Kundalik ish oqimi: qo‘ng‘iroq, natija, keyingi aloqa va rahbar hisoboti.",
  ][index]!,
  facts: [
    ["Yakunlangan", "RU · UZ · EN", "Katalog + boshqaruv"],
    ["Production", "8 ta ekran", "CRM → shartnoma → moliya"],
    ["Foydalanilmoqda", "Jarayon sxemasi", "Hisobotlar + analitika"],
  ][index]!,
}));

CASES.en = CASES.ru.map((item, index) => ({
  ...item,
  badge: ["Client project", "Own product", "Internal tool"][index]!,
  title: [
    "Fire Safety Equipment Catalog",
    "Financial ERP · sales and finance",
    "Call Tracker · contact control",
  ][index]!,
  alt: [
    "Equipment catalogue workflow illustration — not a screenshot",
    "Financial ERP lead and deal kanban",
    "Call Tracker workflow illustration — not a screenshot",
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
    "Completed development: equipment discovery, enquiries and a separate content administration area.",
    "A working production contour with eight published screens from real modules.",
    "A daily workflow from call and outcome to follow-up and manager reporting.",
  ][index]!,
  facts: [
    ["Completed", "RU · UZ · EN", "Catalogue + admin"],
    ["Production", "8 screens", "CRM → contract → finance"],
    ["In use", "Workflow diagram", "Reports + analytics"],
  ][index]!,
}));

export function HomepageProof({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  return (
    <section className="selected-work" id="proof" aria-labelledby="work-title">
      <header className="selected-work-heading">
        <p className="sales-eyebrow">{t.eyebrow}</p>
        <h2 id="work-title">{t.title}</h2>
        <p>{t.lead}</p>
      </header>
      <div className="selected-work-grid">
        {CASES[locale].map((item, caseIndex) => (
          <article
            className={
              "selected-case" +
              (caseIndex === 0 ? " selected-case-featured" : "")
            }
            key={item.href}
          >
            <div className="work-caption">
              <span aria-hidden="true">0{caseIndex + 1}</span>
              <span>{item.badge}</span>
            </div>
            <Link className="work-image" href={item.href}>
              <Image
                src={item.image}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(max-width: 800px) calc(100vw - 40px), (max-width: 1500px) 60vw, 840px"
              />
              <span className="work-image-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
            <div className="selected-case-body">
              <h3>{item.title}</h3>
              <dl className="work-facts">
                {[item.problem, item.built, item.result].map((text, index) => (
                  <div key={t.labels[index]}>
                    <dt>{t.labels[index]}</dt>
                    <dd>{text}</dd>
                  </div>
                ))}
              </dl>
              <ul className="work-tags">
                {item.facts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
              <Link className="work-open" href={item.href}>
                {t.open} <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
