import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/lib/commerce/catalog";
import {
  PORTFOLIO,
  PORTFOLIO_COPY,
  type PortfolioProject,
} from "@/lib/portfolio";
import screenshots from "../../../content/commerce/project-screenshots.json";
type Screenshot = { src: string; alt: Record<Locale, string> };
export function Portfolio({ locale }: { locale: Locale }) {
  const t = PORTFOLIO_COPY[locale];
  return (
    <div className="sales-page portfolio-page">
      <header className="studio-page-heading">
        <p className="sales-eyebrow">Codev_Tim / Portfolio</p>
        <h1>{t.title}</h1>
        <p>{t.lead}</p>
      </header>
      {[true, false].map((client) => (
        <section key={String(client)} className="portfolio-section">
          <h2>{client ? t.client : t.own}</h2>
          <div className="portfolio-grid">
            {PORTFOLIO.filter((p) => p.client === client).map((p) => (
              <article className="portfolio-card" key={p.slug}>
                <div className="portfolio-card-top">
                  <span>{p.category[locale]}</span>
                  <span
                    className={"project-status project-status--" + p.status}
                  >
                    {t[p.status]}
                  </span>
                </div>
                <h3>
                  <Link href={"/projects/" + p.slug}>{p.name}</Link>
                </h3>
                <p>{p.description[locale]}</p>
                <div className="portfolio-stack">
                  {p.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
                <Link className="portfolio-open" href={"/projects/" + p.slug}>
                  {t.open}
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
export function PortfolioDetail({
  project: p,
  locale,
}: {
  project: PortfolioProject;
  locale: Locale;
}) {
  const t = PORTFOLIO_COPY[locale];
  const shots = (screenshots as Record<string, Screenshot[]>)[p.slug] ?? [];
  return (
    <article className="sales-page portfolio-detail">
      <Link className="portfolio-back" href="/projects">
        ← {t.back}
      </Link>
      <header className="studio-page-heading">
        <div className="portfolio-card-top">
          <p className="sales-eyebrow">{p.category[locale]}</p>
          <span className={"project-status project-status--" + p.status}>
            {t[p.status]}
          </span>
        </div>
        <h1>{p.name}</h1>
        <p>{p.description[locale]}</p>
      </header>
      <div className="portfolio-story">
        <section>
          <h2>{t.purpose}</h2>
          <p>{p.purpose[locale]}</p>
          {p.repository && !p.client && (
            <a
              className="portfolio-open"
              href={p.repository}
              target="_blank"
              rel="noreferrer"
            >
              {t.github}
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </section>
        <aside>
          <h2>{t.stack}</h2>
          {p.stack.length ? (
            <ul>
              {p.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          ) : (
            <p>{t.stackPending}</p>
          )}
        </aside>
      </div>
      {shots.length > 0 && (
        <section className="portfolio-gallery">
          <h2>{t.screenshots}</h2>
          {shots.map((shot) => (
            <figure key={shot.src}>
              <Image
                src={shot.src}
                alt={shot.alt[locale]}
                width={1440}
                height={960}
                sizes="(max-width: 800px) 100vw, 1120px"
              />
              <figcaption>{shot.alt[locale]}</figcaption>
            </figure>
          ))}
        </section>
      )}
    </article>
  );
}
