import type { BootPerformanceReport } from "./types";
import type { BootMarkName, BootSessionType } from "./constants";

const PREFIX = "codev:boot";

export function markBoot(name: BootMarkName) {
  if (typeof performance === "undefined") {
    return;
  }

  performance.mark(`${PREFIX}:${name}`);
}

export function measureBootTotal(sessionType: BootSessionType) {
  if (typeof performance === "undefined") {
    return null;
  }

  try {
    performance.measure(
      `${PREFIX}:total`,
      `${PREFIX}:start`,
      `${PREFIX}:ready`
    );
    const entry = performance.getEntriesByName(`${PREFIX}:total`).pop() as
      PerformanceMeasure | undefined;

    const marks: Partial<Record<BootMarkName, number>> = {};
    for (const mark of performance.getEntriesByType("mark")) {
      if (!mark.name.startsWith(`${PREFIX}:`)) {
        continue;
      }

      const key = mark.name.replace(`${PREFIX}:`, "") as BootMarkName;
      marks[key] = mark.startTime;
    }

    return {
      sessionType,
      totalMs: entry?.duration ?? null,
      marks,
    } satisfies BootPerformanceReport;
  } catch {
    return {
      sessionType,
      totalMs: null,
      marks: {},
    } satisfies BootPerformanceReport;
  }
}

export function logBootPerformance(report: BootPerformanceReport) {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  console.info("[Codev_Tim Boot]", report);
}
