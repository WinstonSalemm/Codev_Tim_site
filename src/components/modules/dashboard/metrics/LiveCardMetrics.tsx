"use client";

import type { DashboardCardMetricVM } from "@/lib/application";
import { isPureNumericMetric } from "@/lib/dashboard/metrics";
import { LiveMetricValue } from "./LiveMetricValue";

type LiveCardMetricsProps = {
  cardId: string;
  metrics: DashboardCardMetricVM[];
  active: boolean;
  immediate: boolean;
  className?: string;
};

export function LiveCardMetrics({
  cardId,
  metrics,
  active,
  immediate,
  className,
}: LiveCardMetricsProps) {
  if (metrics.length === 0) {
    return null;
  }

  return (
    <dl className={className ?? "ds-dashboard-card-metrics"}>
      {metrics.map((metric) => {
        const numericValue = isPureNumericMetric(metric.value);

        return (
          <div
            key={`${cardId}-${metric.label}-${metric.value}`}
            className="ds-dashboard-card-metric"
          >
            <dt className="ds-dashboard-card-metric-label">{metric.label}</dt>
            <dd className="ds-dashboard-card-metric-value">
              {numericValue !== null ? (
                <LiveMetricValue
                  value={numericValue}
                  active={active}
                  immediate={immediate}
                />
              ) : (
                metric.value
              )}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
