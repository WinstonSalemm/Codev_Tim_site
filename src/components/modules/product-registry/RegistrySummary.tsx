import type { ProductMetricsVM } from "@/lib/application";

type RegistrySummaryProps = {
  metrics: ProductMetricsVM;
  labels: {
    regionLabel: string;
    registered: string;
    inDevelopment: string;
    production: string;
    experimental: string;
    archived: string;
  };
};

export function RegistrySummary({ metrics, labels }: RegistrySummaryProps) {
  const items = [
    { key: "registered", label: labels.registered, value: metrics.registered },
    {
      key: "inDevelopment",
      label: labels.inDevelopment,
      value: metrics.inDevelopment,
    },
    {
      key: "production",
      label: labels.production,
      value: metrics.production,
    },
    {
      key: "experimental",
      label: labels.experimental,
      value: metrics.experimental,
    },
    { key: "archived", label: labels.archived, value: metrics.archived },
  ] as const;

  return (
    <section className="ds-registry-summary" aria-label={labels.regionLabel}>
      <dl className="ds-registry-summary-grid">
        {items.map((item) => (
          <div key={item.key} className="ds-registry-summary-item">
            <dt className="ds-registry-summary-label">{item.label}</dt>
            <dd className="ds-registry-summary-value">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
