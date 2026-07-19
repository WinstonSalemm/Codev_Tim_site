import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function ServicesHeroCtas() {
  const t = await getTranslations("services.hero");

  return (
    <div className="ds-services-hero-extras">
      <p className="ds-services-hero-note">{t("note")}</p>
      <div className="ds-services-hero-actions">
        <Link
          href="/contact?engagement=consult#contact-form"
          className="ds-services-cta"
          scroll
        >
          {t("primaryCta")}
        </Link>
        <Link
          href="/projects"
          className="ds-services-cta ds-services-cta--secondary"
        >
          {t("secondaryCta")}
        </Link>
      </div>
    </div>
  );
}
