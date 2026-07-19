import { getTranslations } from "next-intl/server";

const EXCLUDE_KEYS = [
  "noTask",
  "copycat",
  "noScope",
  "rush",
  "unpaid",
  "noContract",
] as const;

export async function ServiceExcludes() {
  const t = await getTranslations("services.excludes");

  return (
    <section
      className="ds-services-block ds-services-excludes"
      aria-labelledby="services-excludes-heading"
    >
      <h2 id="services-excludes-heading" className="ds-services-block-title">
        {t("heading")}
      </h2>
      <ul className="ds-services-excludes-list">
        {EXCLUDE_KEYS.map((key) => (
          <li key={key}>{t(`items.${key}`)}</li>
        ))}
      </ul>
    </section>
  );
}
