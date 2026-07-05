"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  DASHBOARD_LIVE_METRICS,
  DASHBOARD_LIVE_METRICS_MARK,
  hasLiveMetricsAnimated,
  markLiveMetricsAnimated,
} from "@/lib/dashboard/metrics";
import { useReducedMotion } from "../motion/useReducedMotion";

type DashboardLiveMetricsState = {
  ref: (node: HTMLElement | null) => void;
  isActive: boolean;
  isComplete: boolean;
};

export function useDashboardLiveMetrics(
  cardId: string
): DashboardLiveMetricsState {
  const reducedMotion = useReducedMotion();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [state, setState] = useState(() => {
    const alreadyAnimated = hasLiveMetricsAnimated(cardId);
    return {
      isActive: alreadyAnimated,
      isComplete: alreadyAnimated,
    };
  });

  const ref = useCallback((node: HTMLElement | null) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (reducedMotion || hasLiveMetricsAnimated(cardId)) {
      setState({ isActive: true, isComplete: true });
      return;
    }

    if (!element) {
      return;
    }

    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) {
          return;
        }

        observerRef.current?.disconnect();
        performance.mark(DASHBOARD_LIVE_METRICS_MARK.cardStart(cardId));
        setState({ isActive: true, isComplete: false });
      },
      { threshold: 0.35, rootMargin: "0px 0px -5% 0px" }
    );

    observerRef.current.observe(element);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [cardId, element, reducedMotion]);

  useEffect(() => {
    if (!state.isActive || state.isComplete) {
      return;
    }

    const timer = window.setTimeout(() => {
      markLiveMetricsAnimated(cardId);
      performance.mark(DASHBOARD_LIVE_METRICS_MARK.cardDone(cardId));
      try {
        performance.measure(
          `codev:dashboard:live-metrics-duration:${cardId}`,
          DASHBOARD_LIVE_METRICS_MARK.cardStart(cardId),
          DASHBOARD_LIVE_METRICS_MARK.cardDone(cardId)
        );
      } catch {
        /* ignore missing marks */
      }
      setState({ isActive: true, isComplete: true });
    }, DASHBOARD_LIVE_METRICS.durationMs);

    return () => window.clearTimeout(timer);
  }, [cardId, state.isActive, state.isComplete]);

  return { ref, ...state };
}
