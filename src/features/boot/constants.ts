/**
 * Boot sequence timings — docs/10_IMPLEMENTATION_PLAN.md §1.7
 */
export const BOOT_SESSION_KEY = "codev-tim-boot-complete";

export const BOOT_TIMINGS = {
  base: 0,
  shellStart: 0,
  shellDuration: 200,
  shellStaggerHeader: 0,
  shellStaggerSidebar: 66,
  shellStaggerStatus: 133,
  statusPulse: 200,
  wordmark: 300,
  contentStart: 400,
  contentEnd: 800,
  ready: 1000,
  /** Warm boot overlay — one frame batch, max fallback */
  warmBootMax: 120,
  /** Module mount safety cap — brand target ≤240ms */
  moduleMountMax: 240,
} as const;

export type BootSessionType = "cold" | "warm";

export type BootPhase =
  | "initializing"
  | "shell-mount"
  | "status-active"
  | "header-ready"
  | "content-mount"
  | "ready"
  | "module-loading"
  | "synchronizing";

export type BootMarkName =
  | "start"
  | "shell"
  | "status"
  | "header"
  | "content-start"
  | "content"
  | "terminal-ready"
  | "ready"
  | "module-start"
  | "module-ready";
