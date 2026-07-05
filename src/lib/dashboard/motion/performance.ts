import { DASHBOARD_MOTION_MARK, REGISTRY_MOTION_MARK } from "./constants";

function safeMark(name: string) {
  if (typeof performance === "undefined") {
    return;
  }

  try {
    performance.mark(name);
  } catch {
    /* ignore duplicate or unsupported marks */
  }
}

function safeMeasure(name: string, start: string, end: string) {
  if (typeof performance === "undefined") {
    return;
  }

  try {
    performance.measure(name, start, end);
  } catch {
    /* ignore missing marks */
  }
}

export function markDashboardCardEnter(index: number) {
  safeMark(DASHBOARD_MOTION_MARK.cardEnter(index));
}

export function markDashboardCardEnterDone(index: number) {
  const start = DASHBOARD_MOTION_MARK.cardEnter(index);
  const end = DASHBOARD_MOTION_MARK.cardEnterDone(index);
  safeMark(end);
  safeMeasure(`codev:dashboard:card-enter-duration:${index}`, start, end);
}

export function markDashboardModuleNavStart() {
  safeMark(DASHBOARD_MOTION_MARK.moduleNavStart);
}

export function markDashboardModuleNavEnd() {
  safeMark(DASHBOARD_MOTION_MARK.moduleNavEnd);
  safeMeasure(
    "codev:dashboard:module-nav-duration",
    DASHBOARD_MOTION_MARK.moduleNavStart,
    DASHBOARD_MOTION_MARK.moduleNavEnd
  );
}

export function markModuleEnterStart() {
  safeMark(DASHBOARD_MOTION_MARK.moduleEnterStart);
}

export function markModuleEnterDone() {
  safeMark(DASHBOARD_MOTION_MARK.moduleEnterDone);
  safeMeasure(
    "codev:dashboard:module-enter-duration",
    DASHBOARD_MOTION_MARK.moduleEnterStart,
    DASHBOARD_MOTION_MARK.moduleEnterDone
  );
}

export function markRegistryCardEnter(index: number) {
  safeMark(REGISTRY_MOTION_MARK.cardEnter(index));
}

export function markRegistryCardEnterDone(index: number) {
  const start = REGISTRY_MOTION_MARK.cardEnter(index);
  const end = REGISTRY_MOTION_MARK.cardEnterDone(index);
  safeMark(end);
  safeMeasure(`codev:registry:card-enter-duration:${index}`, start, end);
}

export function markRegistryDrilldownStart() {
  safeMark(REGISTRY_MOTION_MARK.drilldownStart);
}

export function markRegistryDrilldownEnd() {
  safeMark(REGISTRY_MOTION_MARK.drilldownEnd);
  safeMeasure(
    "codev:registry:drilldown-duration",
    REGISTRY_MOTION_MARK.drilldownStart,
    REGISTRY_MOTION_MARK.drilldownEnd
  );
}

export function readDashboardMotionMeasures(): PerformanceMeasure[] {
  if (typeof performance === "undefined") {
    return [];
  }

  return performance
    .getEntriesByType("measure")
    .filter((entry) =>
      entry.name.startsWith("codev:dashboard:")
    ) as PerformanceMeasure[];
}
