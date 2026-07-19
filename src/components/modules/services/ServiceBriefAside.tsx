import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function ServiceBriefAside() {
  const t = await getTranslations("services.brief");

  return (
    <aside
      className="ds-services-aside"
      aria-labelledby="services-brief-heading"
    >
      <div className="ds-services-aside-head">
        <h3 id="services-brief-heading" className="ds-services-aside-title">
          {t("heading")}
        </h3>
        <p className="ds-services-aside-price">{t("price")}</p>
      </div>
      <p className="ds-services-aside-body">{t("body")}</p>
      <p className="ds-services-aside-credit">{t("credit")}</p>
      <Link
        href="/contact?engagement=brief#contact-form"
        className="ds-services-cta ds-services-cta--secondary"
        scroll
      >
        {t("cta")}
      </Link>
    </aside>
  );
}
