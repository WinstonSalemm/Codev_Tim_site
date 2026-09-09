import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/lib/commerce/catalog";
import {
  PORTFOLIO,
  PORTFOLIO_COPY,
  type PortfolioProject,
} from "@/lib/portfolio";
import screenshots from "../../../content/commerce/project-screenshots.json";
type Screenshot = {
  src: string;
  width: number;
  height: number;
  alt: Record<Locale, string>;
};
export function Portfolio({ locale }: { locale: Locale }) {
  const t = PORTFOLIO_COPY[locale];
  return (
    <div className="sales-page portfolio-page">
      <header className="studio-page-heading">
        <p className="sales-eyebrow">Codev_Tim / Portfolio</p>
        <h1>{t.title}</h1>
        <p>{t.lead}</p>
      </header>
      {(["client", "internal", "own"] as const).map((group) => (
        <section key={group} className="portfolio-section">
          <h2>{t[group]}</h2>
          <div className="portfolio-grid">
            {PORTFOLIO.filter((p) =>
              group === "client"
                ? p.client
                : group === "internal"
                  ? p.internal
                  : !p.client && !p.internal
            ).map((p) => {
              const cover = (screenshots as Record<string, Screenshot[]>)[
                p.slug
              ]?.[0];
              return (
                <article className="portfolio-card" key={p.slug}>
                  <div className="portfolio-card-top">
                    <span>{p.category[locale]}</span>
                    <span
                      className={"project-status project-status--" + p.status}
                    >
                      {t[p.status]}
                    </span>
                  </div>
                  {cover && (
                    <Link
                      className="portfolio-cover"
                      href={"/projects/" + p.slug}
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <Image
                        src={cover.src}
                        alt=""
                        width={cover.width}
                        height={cover.height}
                        sizes="(max-width: 800px) 100vw, 560px"
                      />
                    </Link>
                  )}
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
              );
            })}
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
              <a href={shot.src} target="_blank" rel="noreferrer">
                <Image
                  src={shot.src}
                  alt={shot.alt[locale]}
                  width={shot.width}
                  height={shot.height}
                  sizes="(max-width: 800px) 100vw, 1120px"
                />
              </a>
              <figcaption>{shot.alt[locale]}</figcaption>
            </figure>
          ))}
        </section>
      )}
    </article>
  );
}
