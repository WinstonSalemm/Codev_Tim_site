import { getTranslations } from "next-intl/server";

const TRUST_KEYS = [
  "scope",
  "contract",
  "responsive",
  "launch",
  "seo",
  "qa",
  "support",
  "payment",
] as const;

export async function ServiceTrustGrid() {
  const t = await getTranslations("services.trust");

  return (
    <section
      className="ds-services-block"
      aria-labelledby="services-trust-heading"
    >
      <h2 id="services-trust-heading" className="ds-services-block-title">
        {t("heading")}
      </h2>
      <ul className="ds-services-trust-grid">
        {TRUST_KEYS.map((key) => (
          <li key={key} className="ds-services-trust-item">
            {t(`items.${key}`)}
          </li>
        ))}
      </ul>
    </section>
  );
}
