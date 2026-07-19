import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { loadProductRegistry } from "@/lib/application";
import { SERVICES_PROOF_SLUGS } from "@/lib/domain/contact/engagements";

export async function ServiceProjectsProof() {
  const [t, registry] = await Promise.all([
    getTranslations("services.projects"),
    Promise.resolve(loadProductRegistry()),
  ]);

  const products = SERVICES_PROOF_SLUGS.map((slug) =>
    registry.products.find((product) => product.slug === slug)
  ).filter((product): product is NonNullable<typeof product> =>
    Boolean(product)
  );

  if (products.length === 0) {
    return null;
  }

  return (
    <section
      className="ds-services-block"
      aria-labelledby="services-projects-heading"
    >
      <div className="ds-services-block-head">
        <h2 id="services-projects-heading" className="ds-services-block-title">
          {t("heading")}
        </h2>
        <p className="ds-services-block-lead">{t("lead")}</p>
      </div>
      <ul className="ds-services-projects">
        {products.map((product) => (
          <li key={product.slug} className="ds-services-project">
            <p className="ds-services-project-type ds-text-label">
              {t(`items.${product.slug}.type`)}
            </p>
            <h3 className="ds-services-project-name">{product.title}</h3>
            <p className="ds-services-project-summary">
              {t(`items.${product.slug}.summary`)}
            </p>
            <p className="ds-services-project-features">
              {t(`items.${product.slug}.features`)}
            </p>
            <p className="ds-services-project-stack">
              {product.stack.slice(0, 4).join(" · ")}
            </p>
            <div className="ds-services-project-actions">
              <Link
                href={`/projects/${product.slug}`}
                className="ds-services-project-link"
              >
                {t("openRecord")}
              </Link>
              {product.links.external ? (
                <a
                  href={product.links.external}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ds-services-project-link"
                >
                  {t("openLive")}
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
      <Link
        href="/projects"
        className="ds-services-cta ds-services-cta--secondary"
      >
        {t("viewAll")}
      </Link>
    </section>
  );
}
