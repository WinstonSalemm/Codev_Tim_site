import type { DashboardCardMetricVM } from "@/lib/application";

type CardMetricsProps = {
  metrics: DashboardCardMetricVM[];
  className?: string;
};

export function CardMetrics({ metrics, className }: CardMetricsProps) {
  if (metrics.length === 0) {
    return null;
  }

  return (
    <dl className={className ?? "ds-dashboard-card-metrics"}>
      {metrics.map((metric) => (
        <div
          key={`${metric.label}-${metric.value}`}
          className="ds-dashboard-card-metric"
        >
          <dt className="ds-dashboard-card-metric-label">{metric.label}</dt>
          <dd className="ds-dashboard-card-metric-value">{metric.value}</dd>
        </div>
      ))}
    </dl>
  );
}
