import { Link } from "@/i18n/navigation";
import type { Locale } from "@/lib/commerce/catalog";

const COPY = {
  ru: {
    eyebrow: "03 / Выберите не технологию, а задачу",
    title: "Что нужно улучшить в бизнесе?",
    paths: [
      {
        code: "01",
        title: "Получать больше обращений",
        body: "Сайт или каталог объясняет предложение, показывает кейсы и ведёт к форме, Telegram или звонку.",
        items: ["Сайт", "Каталог", "Формы", "Telegram", "Аналитика"],
        href: "/services/websites",
        action: "Сайты для бизнеса",
      },
      {
        code: "02",
        title: "Навести порядок в работе",
        body: "Один рабочий контур связывает клиентов, статусы, задачи, финансы и интеграции вместо таблиц и чатов.",
        items: ["CRM", "ERP", "Автоматизация", "Интеграции", "AI"],
        href: "/services/crm-automation",
        action: "CRM и автоматизация",
      },
    ],
    bot: "Telegram-боты и интеграции",
  },
  uz: {
    eyebrow: "03 / TEXNOLOGIYANI EMAS, VAZIFANI TANLANG",
    title: "Biznesda nimani yaxshilash kerak?",
    paths: [
      {
        code: "01",
        title: "Ko‘proq murojaat olish",
        body: "Sayt yoki katalog taklifni tushuntiradi, keyslarni ko‘rsatadi va forma, Telegram yoki qo‘ng‘iroqqa olib boradi.",
        items: ["Sayt", "Katalog", "Formalar", "Telegram", "Analitika"],
        href: "/services/websites",
        action: "Biznes uchun saytlar",
      },
      {
        code: "02",
        title: "Ishni tartibga solish",
        body: "Bitta ish tizimi mijozlar, statuslar, vazifalar, moliya va integratsiyalarni jadvallar va chatlar o‘rniga bog‘laydi.",
        items: ["CRM", "ERP", "Avtomatlashtirish", "Integratsiyalar", "AI"],
        href: "/services/crm-automation",
        action: "CRM va avtomatlashtirish",
      },
    ],
    bot: "Telegram-botlar va integratsiyalar",
  },
  en: {
    eyebrow: "03 / CHOOSE THE BUSINESS PROBLEM",
    title: "What needs to improve in your business?",
    paths: [
      {
        code: "01",
        title: "Get more enquiries",
        body: "A website or catalogue explains the offer, shows proof and leads visitors to a form, Telegram or a call.",
        items: ["Website", "Catalogue", "Forms", "Telegram", "Analytics"],
        href: "/services/websites",
        action: "Websites for business",
      },
      {
        code: "02",
        title: "Bring order to operations",
        body: "One workflow connects customers, stages, tasks, finance and integrations instead of scattered sheets and chats.",
        items: ["CRM", "ERP", "Automation", "Integrations", "AI"],
        href: "/services/crm-automation",
        action: "CRM and automation",
      },
    ],
    bot: "Telegram bots and integrations",
  },
} satisfies Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    bot: string;
    paths: Array<{
      code: string;
      title: string;
      body: string;
      items: string[];
      href: string;
      action: string;
    }>;
  }
>;

export function BusinessPaths({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  return (
    <section
      className="sales-paths"
      id="solutions"
      aria-labelledby="paths-title"
    >
      <p className="sales-eyebrow">{t.eyebrow}</p>
      <h2 id="paths-title">{t.title}</h2>
      <div className="sales-path-grid">
        {t.paths.map((path) => (
          <article className="sales-path" key={path.code}>
            <span className="sales-path-code">{path.code}</span>
            <h3>{path.title}</h3>
            <p>{path.body}</p>
            <ul>
              {path.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link className="sales-detail-link" href={path.href}>
              {path.action} →
            </Link>
          </article>
        ))}
      </div>
      <Link className="sales-bot-route" href="/services/telegram-bots">
        {t.bot} →
      </Link>
    </section>
  );
}
