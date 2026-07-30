import { getTranslations } from "next-intl/server";

const PROBLEM_KEYS = ["site", "catalog", "operations"] as const;

export async function ServiceBusinessProblems() {
  const t = await getTranslations("services.problems");

  return (
    <section
      className="ds-services-block"
      aria-labelledby="services-problems-heading"
    >
      <div className="ds-services-block-head">
        <p className="ds-services-eyebrow ds-text-label">{t("eyebrow")}</p>
        <h2 id="services-problems-heading" className="ds-services-block-title">
          {t("heading")}
        </h2>
        <p className="ds-services-block-lead">{t("lead")}</p>
      </div>
      <ul className="ds-services-problems">
        {PROBLEM_KEYS.map((key) => (
          <li key={key} className="ds-services-problem">
            <h3 className="ds-services-problem-title">
              {t(`items.${key}.title`)}
            </h3>
            <p className="ds-services-problem-body">{t(`items.${key}.body`)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
