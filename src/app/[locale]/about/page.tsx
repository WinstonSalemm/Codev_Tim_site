import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { JsonLdScript } from "@/components/seo";
import { lang } from "@/lib/commerce/catalog";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getSiteUrl, buildAlternateLanguages } from "@/lib/seo/site-url";
const copy = {
  ru: {
    title: "Тимур Искандаров",
    label: "Обо мне",
    role: "Разработчик из Ташкента. Автор Codev_Tim.",
    intro:
      "Делаю сайты, Telegram-ботов и приложения для работы бизнеса. Мне интересны задачи, где результат можно увидеть в повседневной работе: проще принять заказ, найти нужный документ или понять, что происходит с клиентом.",
    work: "Работаю над клиентскими проектами и собственными продуктами. Среди них сайт, боты и внутренние инструменты Poj Pro, система Financial ERP и AI-помощник. В портфолио указываю текущий статус каждой работы.",
    process: "Как будем работать",
    steps: [
      [
        "Сначала задача",
        "Разбираемся, кто будет пользоваться продуктом и что должно стать удобнее.",
      ],
      [
        "Понятная договорённость",
        "До разработки согласуем состав, цену, этапы и способ приёмки.",
      ],
      [
        "Результат по ходу работы",
        "Показываю рабочие версии, собираю замечания и проверяю основные сценарии.",
      ],
      [
        "Передача проекта",
        "После запуска передаю код, доступы и инструкции. Дальнейшую поддержку обсуждаем отдельно.",
      ],
    ],
    projects: "Посмотреть проекты",
    contact: "Связаться со мной",
  },
  uz: {
    title: "Timur Iskandarov",
    label: "Men haqimda",
    role: "Toshkentlik dasturchi. Codev_Tim muallifi.",
    intro:
      "Biznes uchun saytlar, Telegram botlar va ilovalar yarataman. Natijasi kundalik ishda ko‘rinadigan vazifalar qiziqtiradi: buyurtma olish, hujjat topish yoki mijoz bilan ish holatini tushunish osonlashishi.",
    work: "Mijoz loyihalari va o‘z mahsulotlarim ustida ishlayman. Ular orasida Poj Pro sayti, botlari va ichki vositalari, Financial ERP tizimi va AI yordamchi bor. Portfolioda har bir ishning joriy holatini ko‘rsataman.",
    process: "Qanday ishlaymiz",
    steps: [
      [
        "Avval vazifa",
        "Mahsulotdan kim foydalanishi va nima qulayroq bo‘lishi kerakligini aniqlaymiz.",
      ],
      [
        "Aniq kelishuv",
        "Ishdan oldin tarkib, narx, bosqichlar va qabul qilish usulini kelishamiz.",
      ],
      [
        "Ish davomida natija",
        "Ishlaydigan versiyalarni ko‘rsataman, fikrlarni yig‘aman va asosiy ssenariylarni tekshiraman.",
      ],
      [
        "Loyihani topshirish",
        "Ishga tushgach kod, kirish huquqlari va yo‘riqnomani topshiraman. Keyingi yordamni alohida muhokama qilamiz.",
      ],
    ],
    projects: "Loyihalarni ko‘rish",
    contact: "Men bilan bog‘lanish",
  },
  en: {
    title: "Timur Iskandarov",
    label: "About me",
    role: "Developer in Tashkent. Creator of Codev_Tim.",
    intro:
      "I build websites, Telegram bots and business applications. I enjoy projects whose results show up in everyday work: taking an order, finding a document or understanding what is happening with a customer.",
    work: "I work on client projects and my own products, including the Poj Pro website, bots and internal tools, Financial ERP and an AI assistant. My portfolio states the current status of each project.",
    process: "How we will work",
    steps: [
      [
        "Start with the task",
        "Understand who will use the product and what should become easier.",
      ],
      [
        "A clear agreement",
        "Agree scope, price, stages and acceptance criteria before development.",
      ],
      [
        "Progress you can see",
        "Review working versions, collect feedback and test the main scenarios.",
      ],
      [
        "Project handover",
        "After launch, I provide the code, access and instructions. Further support is discussed separately.",
      ],
    ],
    projects: "View projects",
    contact: "Get in touch",
  },
};
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = copy[lang(locale)];
  return buildPageMetadata({
    locale,
    title: t.title + " | Codev_Tim",
    description: t.role + " " + t.intro.split(".")[0] + ".",
    canonical: getSiteUrl() + "/" + locale + "/about",
    alternateLanguages: buildAlternateLanguages("/about"),
    ogImageAlt: t.title,
  });
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = copy[lang(locale)];
  const url = getSiteUrl();
  return (
    <>
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          url: url + "/" + locale + "/about",
          inLanguage: locale,
          mainEntity: {
            "@type": "Person",
            "@id": url + "/#person",
            name: "Timur Iskandarov",
            alternateName: "Тимур Искандаров",
            jobTitle: "Software developer",
            url: url + "/" + locale + "/about",
            sameAs: ["https://github.com/WinstonSalemm"],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Tashkent",
              addressCountry: "UZ",
            },
          },
        }}
      />
      <div className="sales-page about-page">
        <header className="studio-page-heading">
          <p className="sales-eyebrow">{t.label}</p>
          <h1>{t.title}</h1>
          <p>{t.role}</p>
        </header>
        <div className="about-intro">
          <p>{t.intro}</p>
          <p>{t.work}</p>
          <Link className="portfolio-open" href="/projects">
            {t.projects}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <section id="process" className="about-process">
          <h2>{t.process}</h2>
          <ol>
            {t.steps.map(([title, body], i) => (
              <li key={title}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <Link className="sales-button" href="/contact">
          {t.contact}
        </Link>
      </div>
    </>
  );
}
