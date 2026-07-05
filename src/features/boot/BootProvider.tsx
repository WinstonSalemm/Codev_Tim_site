"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  BOOT_SESSION_KEY,
  BOOT_TIMINGS,
  type BootPhase,
  type BootSessionType,
} from "./constants";
import { logBootPerformance, markBoot, measureBootTotal } from "./performance";
import type { BootContextValue, BootPerformanceReport } from "./types";

const BootContext = createContext<BootContextValue | null>(null);

export function useBoot() {
  const context = useContext(BootContext);

  if (!context) {
    throw new Error("useBoot must be used within BootProvider");
  }

  return context;
}

type BootProviderProps = {
  children: React.ReactNode;
};

function prefersReducedMotion() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function persistBootSession() {
  try {
    sessionStorage.setItem(BOOT_SESSION_KEY, "1");
  } catch {
    /* ignore storage errors */
  }
}

const PULSE_PHASES: BootPhase[] = [
  "status-active",
  "header-ready",
  "content-mount",
  "ready",
  "module-loading",
];

export function BootProvider({ children }: BootProviderProps) {
  const [sessionType, setSessionType] = useState<BootSessionType>("cold");
  const [phase, setPhase] = useState<BootPhase>("initializing");
  const [isBootComplete, setIsBootComplete] = useState(false);
  const [isModuleLoading, setIsModuleLoading] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const [performanceReport, setPerformanceReport] =
    useState<BootPerformanceReport | null>(null);
  const bootStarted = useRef(false);
  const moduleSafetyTimer = useRef<number | null>(null);

  const finishBoot = useCallback((mode: BootSessionType) => {
    markBoot("ready");
    const report = measureBootTotal(mode);
    setPerformanceReport(report);
    if (report) {
      logBootPerformance(report);
    }
    setPhase("ready");
    setIsBootComplete(true);
    setIsOverlayVisible(false);
    persistBootSession();
  }, []);

  const clearModuleSafetyTimer = useCallback(() => {
    if (moduleSafetyTimer.current !== null) {
      window.clearTimeout(moduleSafetyTimer.current);
      moduleSafetyTimer.current = null;
    }
  }, []);

  const completeModuleMount = useCallback(() => {
    clearModuleSafetyTimer();
    setIsModuleLoading(false);
    setPhase("ready");
    markBoot("module-ready");
  }, [clearModuleSafetyTimer]);

  const beginModuleMount = useCallback(() => {
    clearModuleSafetyTimer();
    setIsModuleLoading(true);
    setPhase("module-loading");
    markBoot("module-start");

    moduleSafetyTimer.current = window.setTimeout(() => {
      completeModuleMount();
    }, BOOT_TIMINGS.moduleMountMax);
  }, [clearModuleSafetyTimer, completeModuleMount]);

  const completeLocaleSync = useCallback(() => {
    setPhase("ready");
  }, []);

  const beginLocaleSync = useCallback(() => {
    setPhase("synchronizing");
  }, []);

  useEffect(() => {
    if (bootStarted.current) {
      return;
    }

    bootStarted.current = true;
    markBoot("start");

    let isWarmSession = false;
    try {
      isWarmSession = sessionStorage.getItem(BOOT_SESSION_KEY) === "1";
    } catch {
      isWarmSession = false;
    }

    if (prefersReducedMotion()) {
      setSessionType(isWarmSession ? "warm" : "cold");
      finishBoot(isWarmSession ? "warm" : "cold");
      return;
    }

    if (isWarmSession) {
      setSessionType("warm");
      setPhase("initializing");
      setIsOverlayVisible(true);

      const warmReady = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          markBoot("shell");
          markBoot("content");
          finishBoot("warm");
        });
      });

      return () => window.cancelAnimationFrame(warmReady);
    }

    setSessionType("cold");
    setPhase("initializing");
    setIsOverlayVisible(true);

    const timers = [
      window.setTimeout(() => {
        setPhase("shell-mount");
        markBoot("shell");
      }, BOOT_TIMINGS.shellStart),
      window.setTimeout(() => {
        setPhase("status-active");
        setIsOverlayVisible(false);
        markBoot("status");
      }, BOOT_TIMINGS.statusPulse),
      window.setTimeout(() => {
        setPhase("header-ready");
        markBoot("header");
      }, BOOT_TIMINGS.wordmark),
      window.setTimeout(() => {
        setPhase("content-mount");
        markBoot("content-start");
      }, BOOT_TIMINGS.contentStart),
      window.setTimeout(() => {
        markBoot("content");
      }, BOOT_TIMINGS.contentEnd),
      window.setTimeout(() => {
        markBoot("terminal-ready");
        finishBoot("cold");
      }, BOOT_TIMINGS.ready),
    ];

    return () => {
      for (const timer of timers) {
        window.clearTimeout(timer);
      }
    };
  }, [finishBoot]);

  useEffect(() => clearModuleSafetyTimer, [clearModuleSafetyTimer]);

  const isShellInert =
    !isBootComplete &&
    (phase === "initializing" ||
      phase === "shell-mount" ||
      phase === "status-active");

  const value = useMemo<BootContextValue>(
    () => ({
      sessionType,
      phase,
      isBootComplete,
      isShellInert,
      isModuleLoading,
      isPulseActive: PULSE_PHASES.includes(phase),
      isOverlayVisible,
      performanceReport,
      beginModuleMount,
      completeModuleMount,
      beginLocaleSync,
      completeLocaleSync,
    }),
    [
      beginLocaleSync,
      beginModuleMount,
      completeLocaleSync,
      completeModuleMount,
      isBootComplete,
      isModuleLoading,
      isOverlayVisible,
      isShellInert,
      performanceReport,
      phase,
      sessionType,
    ]
  );

  return <BootContext.Provider value={value}>{children}</BootContext.Provider>;
}
