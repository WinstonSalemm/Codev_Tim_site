import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SUPPORT_ENGAGEMENT_IDS } from "@/lib/domain/contact/engagements";

export async function ServiceSupportAside() {
  const t = await getTranslations("services.support");

  return (
    <aside
      className="ds-services-aside"
      aria-labelledby="services-support-heading"
    >
      <h3 id="services-support-heading" className="ds-services-aside-title">
        {t("heading")}
      </h3>
      <p className="ds-services-aside-body">{t("body")}</p>
      <ul className="ds-services-support-list">
        {SUPPORT_ENGAGEMENT_IDS.map((id) => (
          <li key={id} className="ds-services-support-row">
            <div>
              <p className="ds-services-support-name">
                {t(`tiers.${id}.name`)}
              </p>
              <p className="ds-services-support-hint">
                {t(`tiers.${id}.hint`)}
              </p>
            </div>
            <p className="ds-services-support-price">
              {t(`tiers.${id}.price`)}
            </p>
          </li>
        ))}
      </ul>
      <p className="ds-services-aside-note">{t("note")}</p>
      <Link
        href="/contact?engagement=support-basic#contact-form"
        className="ds-services-cta ds-services-cta--secondary"
        scroll
      >
        {t("cta")}
      </Link>
    </aside>
  );
}
