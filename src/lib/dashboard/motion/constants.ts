/**
 * Dashboard motion timings — docs/11_DESIGN_TOKENS.md §15
 * docs/10_IMPLEMENTATION_PLAN.md §2.5
 *
 * Measured against CSS custom properties at runtime.
 */
export const DASHBOARD_MOTION = {
  staggerStepMs: 50,
  moduleTransitionMs: 200,
  cardEnterMs: 200,
  hoverMs: 120,
  metricsRevealMs: 200,
  metricsRevealDelayMs: 200,
  translateY: "var(--motion-translate-y-max)",
  cardLift: "var(--motion-card-lift)",
} as const;

export const MODULE_TRANSITION_SESSION_KEY = "codev-tim-module-transition";

/** Registry index → Engineering Record drill-down (Phase 3.6). */
export const REGISTRY_DRILLDOWN_SESSION_KEY = "codev-tim-registry-drilldown";

/** Product Registry motion — Phase 3.7 */
export const REGISTRY_MOTION = {
  staggerStepMs: 50,
  drilldownMs: 200,
  cardEnterMs: 200,
  hoverMs: 120,
  pageExitMs: 200,
  drilldownTranslateX: "12px",
} as const;

export const REGISTRY_MOTION_MARK = {
  cardEnter: (index: number) => `codev:registry:card-enter:${index}`,
  cardEnterDone: (index: number) => `codev:registry:card-enter-done:${index}`,
  drilldownStart: "codev:registry:drilldown-start",
  drilldownEnd: "codev:registry:drilldown-end",
} as const;

export const DASHBOARD_MOTION_MARK = {
  cardEnter: (index: number) => `codev:dashboard:card-enter:${index}`,
  cardEnterDone: (index: number) => `codev:dashboard:card-enter-done:${index}`,
  moduleNavStart: "codev:dashboard:module-nav-start",
  moduleNavEnd: "codev:dashboard:module-nav-end",
  moduleEnterStart: "codev:dashboard:module-enter-start",
  moduleEnterDone: "codev:dashboard:module-enter-done",
} as const;
