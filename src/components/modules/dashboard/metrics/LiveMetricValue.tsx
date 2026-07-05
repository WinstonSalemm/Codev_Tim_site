"use client";

import { useCountUp } from "./useCountUp";

type LiveMetricValueProps = {
  value: number;
  active: boolean;
  immediate: boolean;
};

export function LiveMetricValue({
  value,
  active,
  immediate,
}: LiveMetricValueProps) {
  const current = useCountUp(value, active, immediate);

  return <span className="ds-live-metric-value">{current}</span>;
}
