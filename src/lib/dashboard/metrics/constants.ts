/** Live metric animation — docs/11_DESIGN_TOKENS.md §15 (--motion-duration-counter) */
export const DASHBOARD_LIVE_METRICS = {
  durationMs: 800,
  sessionStorageKey: "codev-tim-dashboard-live-metrics",
} as const;

export const DASHBOARD_LIVE_METRICS_MARK = {
  cardStart: (cardId: string) => `codev:dashboard:live-metrics:start:${cardId}`,
  cardDone: (cardId: string) => `codev:dashboard:live-metrics:done:${cardId}`,
} as const;
