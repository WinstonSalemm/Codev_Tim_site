import type { BootMarkName, BootPhase, BootSessionType } from "./constants";

export type BootPerformanceReport = {
  sessionType: BootSessionType;
  totalMs: number | null;
  marks: Partial<Record<BootMarkName, number>>;
};

export type BootContextValue = {
  sessionType: BootSessionType;
  phase: BootPhase;
  isBootComplete: boolean;
  isShellInert: boolean;
  isModuleLoading: boolean;
  isPulseActive: boolean;
  isOverlayVisible: boolean;
  performanceReport: BootPerformanceReport | null;
  beginModuleMount: () => void;
  completeModuleMount: () => void;
  beginLocaleSync: () => void;
  completeLocaleSync: () => void;
};
