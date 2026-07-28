import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PRODUCT_ENGAGEMENT_IDS } from "@/lib/domain/contact/engagements";

export async function ServiceProductCards() {
  const [t, locale] = await Promise.all([
    getTranslations("services"),
    getLocale(),
  ]);
  const pageLinks: Partial<
    Record<(typeof PRODUCT_ENGAGEMENT_IDS)[number], string>
  > = {
    landing: "/services/website-development-tashkent",
    corporate: "/services/corporate-website",
    system: "/services/business-automation",
  };
  const pageLinkLabel =
    locale === "ru"
      ? "Страница услуги →"
      : locale === "uz"
        ? "Xizmat sahifasi →"
        : "Service page →";

  return (
    <ol className="ds-services-products">
      {PRODUCT_ENGAGEMENT_IDS.map((id) => (
        <li key={id} className="ds-services-card">
          <div className="ds-services-card-top">
            <span className="ds-services-card-code ds-text-label">
              {t(`products.${id}.code`)}
            </span>
            <span className="ds-services-card-price">
              {t(`products.${id}.price`)}
            </span>
          </div>
          <h3 className="ds-services-card-name">{t(`products.${id}.name`)}</h3>
          <p className="ds-services-card-summary">
            {t(`products.${id}.summary`)}
          </p>
          <p className="ds-services-card-details">
            {t(`products.${id}.details`)}
          </p>
          {id === "landing" || id === "corporate" || id === "system" ? (
            <p className="ds-services-card-timeline">
              <span className="ds-text-label">
                {t("products.timelineLabel")}
              </span>
              <span>{t(`products.${id}.timeline`)}</span>
            </p>
          ) : null}
          <div className="ds-services-card-actions">
            <Link
              href={`/contact?engagement=${id}#contact-form`}
              className="ds-services-cta"
              scroll
            >
              {t(`products.${id}.cta`)}
            </Link>
            {pageLinks[id] ? (
              <Link href={pageLinks[id]} className="ds-services-card-link">
                {pageLinkLabel}
              </Link>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
