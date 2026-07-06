"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const IDLE_MS = 5 * 60 * 1000;
const LEAVE_MS = 750;

type IdlePhase = "off" | "entering" | "active" | "leaving";

type UseIdleTimeoutOptions = {
  enabled?: boolean;
  timeoutMs?: number;
};

export function useIdleTimeout({
  enabled = true,
  timeoutMs = IDLE_MS,
}: UseIdleTimeoutOptions = {}) {
  const [phase, setPhase] = useState<IdlePhase>("off");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const phaseRef = useRef<IdlePhase>("off");

  const clearIdleTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const clearLeaveTimer = useCallback(() => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  }, []);

  const scheduleIdle = useCallback(() => {
    clearIdleTimer();
    if (!enabled) return;

    timerRef.current = setTimeout(() => {
      phaseRef.current = "entering";
      setPhase("entering");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          phaseRef.current = "active";
          setPhase("active");
        });
      });
    }, timeoutMs);
  }, [clearIdleTimer, enabled, timeoutMs]);

  const wake = useCallback(() => {
    const current = phaseRef.current;
    if (current === "active" || current === "entering") {
      clearLeaveTimer();
      phaseRef.current = "leaving";
      setPhase("leaving");
      leaveTimerRef.current = setTimeout(() => {
        phaseRef.current = "off";
        setPhase("off");
        scheduleIdle();
      }, LEAVE_MS);
      return;
    }

    if (current === "off") {
      scheduleIdle();
    }
  }, [clearLeaveTimer, scheduleIdle]);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    if (!enabled) {
      clearIdleTimer();
      clearLeaveTimer();
      phaseRef.current = "off";
      setPhase("off");
      return;
    }

    const onActivity = () => {
      if (document.visibilityState !== "visible") return;
      wake();
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        scheduleIdle();
      } else {
        clearIdleTimer();
      }
    };

    const events = [
      "pointermove",
      "pointerdown",
      "keydown",
      "touchstart",
      "wheel",
    ] as const;

    for (const event of events) {
      window.addEventListener(event, onActivity, { passive: true });
    }
    document.addEventListener("visibilitychange", onVisibility);

    scheduleIdle();

    return () => {
      clearIdleTimer();
      clearLeaveTimer();
      for (const event of events) {
        window.removeEventListener(event, onActivity);
      }
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [clearIdleTimer, clearLeaveTimer, enabled, scheduleIdle, wake]);

  const isVisible =
    phase === "entering" || phase === "active" || phase === "leaving";

  return {
    phase,
    isVisible,
    isLeaving: phase === "leaving",
    runMesh: phase === "entering" || phase === "active",
    showWordmark: phase === "active",
  };
}
