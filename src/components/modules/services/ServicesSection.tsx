import { getTranslations } from "next-intl/server";
import { ServiceBusinessProblems } from "./ServiceBusinessProblems";
import { ServiceProcessSteps } from "./ServiceProcessSteps";
import { ServiceProductCards } from "./ServiceProductCards";
import { ServiceProjectsProof } from "./ServiceProjectsProof";

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
      </header>

      <ServiceBusinessProblems />
      <ServiceProductCards />
      <ServiceProjectsProof />
      <ServiceProcessSteps />
    </section>
  );
}
