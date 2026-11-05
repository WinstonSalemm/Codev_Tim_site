import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/lib/commerce/catalog";
import {
  PORTFOLIO,
  PORTFOLIO_COPY,
  portfolioName,
  type PortfolioProject,
} from "@/lib/portfolio";
import screenshots from "../../../content/commerce/project-screenshots.json";
import { isShowcaseSlug, SHOWCASE_COPY } from "@/lib/showcases";
import { ShowcaseViewer } from "./ShowcaseViewer";

type Screenshot = {
  src: string;
  width: number;
  height: number;
  alt: Record<Locale, string>;
};

const DETAIL_COPY = {
  ru: {
    delivered: "Что создано",
    contact: "Обсудить похожую задачу",
    next: "Ваш проект начинается с задачи.",
    index: "Проекты и продукты",
  },
  uz: {
    delivered: "Nima yaratildi",
    contact: "Shunga o‘xshash vazifani muhokama qilish",
    next: "Loyihangiz vazifadan boshlanadi.",
    index: "Loyihalar va mahsulotlar",
  },
  en: {
    delivered: "What was built",
    contact: "Discuss a similar project",
    next: "Your project starts with a problem to solve.",
    index: "Projects and products",
  },
};

export function Portfolio({ locale }: { locale: Locale }) {
  const t = PORTFOLIO_COPY[locale];
  return (
    <div className="sales-page portfolio-page work-index">
      <header className="studio-page-heading work-index-heading">
        <p className="sales-eyebrow">Codev_Tim / {DETAIL_COPY[locale].index}</p>
        <h1>
          {t.title}
          <span aria-hidden="true">
            ({String(PORTFOLIO.length).padStart(2, "0")})
          </span>
        </h1>
        <p>{t.lead}</p>
      </header>
      {(["client", "internal", "own"] as const).map((group, groupIndex) => (
        <section
          key={group}
          className="work-group"
          aria-labelledby={"work-group-" + group}
        >
          <h2 id={"work-group-" + group}>
            <span aria-hidden="true">0{groupIndex + 1}</span>
            {t[group]}
          </h2>
          <div className="work-list">
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
                <article
                  className={
                    "work-item" +
                    (cover ? " work-item-visual" : " work-item-text")
                  }
                  key={p.slug}
                >
                  <div className="work-item-copy">
                    <div className="work-item-meta">
                      <span>{p.category[locale]}</span>
                      <span
                        className={"project-status project-status--" + p.status}
                      >
                        {t[p.status]}
                      </span>
                    </div>
                    <h3>
                      <Link href={"/projects/" + p.slug}>
                        {portfolioName(p, locale)}
                      </Link>
                    </h3>
                    <p>{p.description[locale]}</p>
                    <ul className="work-tags">
                      {p.stack.map((technology) => (
                        <li key={technology}>{technology}</li>
                      ))}
                    </ul>
                    <Link className="work-open" href={"/projects/" + p.slug}>
                      {t.open}
                      <span aria-hidden="true">↗</span>
                    </Link>
                    {isShowcaseSlug(p.slug) && (
                      <Link
                        className="work-open work-demo-link"
                        href={`/projects/${p.slug}/demo`}
                      >
                        {SHOWCASE_COPY[locale].demo}
                        <span aria-hidden="true">↗</span>
                      </Link>
                    )}
                  </div>
                  {cover ? (
                    <Link
                      className="work-image"
                      href={"/projects/" + p.slug}
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <Image
                        src={cover.src}
                        alt=""
                        width={cover.width}
                        height={cover.height}
                        sizes="(max-width: 800px) calc(100vw - 40px), (max-width: 1500px) 60vw, 840px"
                      />
                      <span className="work-image-arrow" aria-hidden="true">
                        ↗
                      </span>
                    </Link>
                  ) : (
                    <span className="work-item-number" aria-hidden="true">
                      {String(PORTFOLIO.indexOf(p) + 1).padStart(2, "0")}
                    </span>
                  )}
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
  const detail = DETAIL_COPY[locale];
  const shots = (screenshots as Record<string, Screenshot[]>)[p.slug] ?? [];
  const [cover, ...gallery] = shots;
  const nextProject = PORTFOLIO[(PORTFOLIO.indexOf(p) + 1) % PORTFOLIO.length];
  return (
    <article className="sales-page portfolio-detail work-detail">
      <Link className="portfolio-back" href="/projects">
        ← {t.back}
      </Link>
      <header className="studio-page-heading work-detail-heading">
        <div className="work-item-meta">
          <p className="sales-eyebrow">{p.category[locale]}</p>
          <span className={"project-status project-status--" + p.status}>
            {t[p.status]}
          </span>
        </div>
        <h1>{portfolioName(p, locale)}</h1>
        <p>{p.purpose[locale]}</p>
      </header>
      {isShowcaseSlug(p.slug) && (
        <ShowcaseViewer slug={p.slug} locale={locale} />
      )}
      {cover && (
        <figure className="work-detail-cover">
          <a href={cover.src} target="_blank" rel="noreferrer">
            <Image
              src={cover.src}
              alt={cover.alt[locale]}
              width={cover.width}
              height={cover.height}
              sizes="(max-width: 1500px) calc(100vw - 80px), 1344px"
              priority
            />
          </a>
          <figcaption>
            <span aria-hidden="true">01 / </span>
            {cover.alt[locale]}
          </figcaption>
        </figure>
      )}
      <div className="work-detail-story">
        <section className="work-delivered">
          <h2>{detail.delivered}</h2>
          <p>{p.description[locale]}</p>
          {p.evidence?.length ? (
            <section className="work-evidence">
              <h3>{t.evidence}</h3>
              <ul>
                {p.evidence.map((fact) => (
                  <li key={fact[locale]}>{fact[locale]}</li>
                ))}
              </ul>
            </section>
          ) : null}
        </section>
        <aside className="work-technology">
          <h2>{t.stack}</h2>
          {p.stack.length ? (
            <ul>
              {p.stack.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          ) : (
            <p>{t.stackPending}</p>
          )}
          {p.repository && !p.client && (
            <a
              className="work-open"
              href={p.repository}
              target="_blank"
              rel="noreferrer"
            >
              {t.github}
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </aside>
      </div>
      {gallery.length > 0 && (
        <section className="work-gallery" aria-labelledby="gallery-title">
          <h2 id="gallery-title">
            {t.screenshots}
            <span aria-hidden="true">
              ({String(shots.length).padStart(2, "0")})
            </span>
          </h2>
          <div className="work-gallery-grid">
            {gallery.map((shot, index) => (
              <figure key={shot.src}>
                <a href={shot.src} target="_blank" rel="noreferrer">
                  <Image
                    src={shot.src}
                    alt={shot.alt[locale]}
                    width={shot.width}
                    height={shot.height}
                    sizes="(max-width: 800px) calc(100vw - 40px), (max-width: 1500px) 60vw, 800px"
                  />
                </a>
                <figcaption>
                  <span aria-hidden="true">
                    {String(index + 2).padStart(2, "0")} /{" "}
                  </span>
                  {shot.alt[locale]}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
      <footer className="work-detail-footer">
        <p>{detail.next}</p>
        <Link className="work-open" href="/contact">
          {detail.contact}
          <span aria-hidden="true">↗</span>
        </Link>
      </footer>
      {nextProject && (
        <Link
          className="work-next-project"
          href={`/projects/${nextProject.slug}`}
        >
          <span>{SHOWCASE_COPY[locale].next}</span>
          <strong>{portfolioName(nextProject, locale)}</strong>
          <span aria-hidden="true">↗</span>
        </Link>
      )}
    </article>
  );
}
