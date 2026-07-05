/** Cubic ease-out — docs/11_DESIGN_TOKENS.md §15 */
export function easeOutCubic(progress: number): number {
  const t = Math.min(Math.max(progress, 0), 1);
  return 1 - Math.pow(1 - t, 3);
}

export type NumericSegment = {
  type: "text" | "number";
  value: string;
  numeric?: number;
};

export function splitNumericSegments(text: string): NumericSegment[] {
  const parts = text.split(/(\d+)/).filter((part) => part.length > 0);

  return parts.map((part) =>
    /^\d+$/.test(part)
      ? { type: "number", value: part, numeric: Number.parseInt(part, 10) }
      : { type: "text", value: part }
  );
}

export function isPureNumericMetric(value: string): number | null {
  const trimmed = value.trim();
  if (!/^\d+$/.test(trimmed)) {
    return null;
  }

  return Number.parseInt(trimmed, 10);
}
