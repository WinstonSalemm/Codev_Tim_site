import { getTranslations } from "next-intl/server";
import { ServiceBriefAside } from "./ServiceBriefAside";
import { ServiceExcludes } from "./ServiceExcludes";
import { ServiceProcessSteps } from "./ServiceProcessSteps";
import { ServiceProductCards } from "./ServiceProductCards";
import { ServiceProjectsProof } from "./ServiceProjectsProof";
import { ServiceSupportAside } from "./ServiceSupportAside";
import { ServiceTrustGrid } from "./ServiceTrustGrid";

export async function ServicesSection() {
  const t = await getTranslations("services");

  return (
    <section
      id="engagements"
      className="ds-services"
      aria-labelledby="services-heading"
    >
      <header className="ds-services-header">
        <p className="ds-services-eyebrow ds-text-label">{t("eyebrow")}</p>
        <h2 id="services-heading" className="ds-services-heading">
          {t("heading")}
        </h2>
        <p className="ds-services-intro">{t("intro")}</p>
        <p className="ds-services-currency">{t("currencyNote")}</p>
      </header>

      <ServiceProductCards />

      <div className="ds-services-asides">
        <ServiceBriefAside />
        <ServiceSupportAside />
      </div>

      <ServiceTrustGrid />
      <ServiceProjectsProof />
      <ServiceProcessSteps />
      <ServiceExcludes />
    </section>
  );
}
