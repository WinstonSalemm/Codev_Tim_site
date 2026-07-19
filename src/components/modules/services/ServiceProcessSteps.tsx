import { getTranslations } from "next-intl/server";

const STEP_KEYS = ["discuss", "estimate", "build", "review", "launch"] as const;

export async function ServiceProcessSteps() {
  const t = await getTranslations("services.process");

  return (
    <section
      className="ds-services-block"
      aria-labelledby="services-process-heading"
    >
      <h2 id="services-process-heading" className="ds-services-block-title">
        {t("heading")}
      </h2>
      <ol className="ds-services-process">
        {STEP_KEYS.map((key, index) => (
          <li key={key} className="ds-services-process-step">
            <span className="ds-services-process-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="ds-services-process-name">
                {t(`steps.${key}.name`)}
              </h3>
              <p className="ds-services-process-body">
                {t(`steps.${key}.body`)}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
