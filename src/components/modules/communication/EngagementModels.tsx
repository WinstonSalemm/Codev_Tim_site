import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

/** Compact teaser on /contact — full pricing lives on the home page. */
export async function EngagementModelsTeaser() {
  const t = await getTranslations("services.teaser");

  return (
    <section
      className="ds-contact-section ds-engagements-teaser"
      aria-labelledby="engagements-teaser-heading"
    >
      <h2 id="engagements-teaser-heading" className="ds-contact-section-title">
        {t("heading")}
      </h2>
      <p className="ds-engagements-teaser-body">{t("body")}</p>
      <Link href="/#engagements" className="ds-engagements-teaser-cta" scroll>
        {t("cta")}
      </Link>
    </section>
  );
}
