"use client";

import { splitNumericSegments } from "@/lib/dashboard/metrics";
import { LiveMetricValue } from "./LiveMetricValue";

type LiveMetricTextProps = {
  text: string;
  cardId: string;
  active: boolean;
  immediate: boolean;
};

export function LiveMetricText({
  text,
  cardId,
  active,
  immediate,
}: LiveMetricTextProps) {
  const segments = splitNumericSegments(text);

  return (
    <>
      {segments.map((segment, index) => {
        if (segment.type === "text") {
          return <span key={`${cardId}-text-${index}`}>{segment.value}</span>;
        }

        return (
          <LiveMetricValue
            key={`${cardId}-num-${index}`}
            value={segment.numeric ?? 0}
            active={active}
            immediate={immediate}
          />
        );
      })}
    </>
  );
}
