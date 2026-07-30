import { getTranslations } from "next-intl/server";
import { getSiteConfig } from "@/lib/content";

export async function ServicesHeroCtas() {
  const t = await getTranslations("services.hero");
  const contacts = getSiteConfig().contacts;
  const telegram = contacts.telegram[0];
  const phone = contacts.phones[0];

  return (
    <div className="ds-services-hero-extras">
      <p className="ds-services-hero-note">{t("note")}</p>
      <div className="ds-services-hero-actions">
        {telegram ? (
          <a
            href={telegram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="ds-services-cta"
          >
            {t("primaryCta")}
          </a>
        ) : null}
        {phone ? (
          <a
            href={phone.href}
            className="ds-services-cta ds-services-cta--secondary"
          >
            {t("secondaryCta")}
          </a>
        ) : null}
      </div>
    </div>
  );
}
