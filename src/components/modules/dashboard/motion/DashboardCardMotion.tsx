"use client";

import { useCallback, type CSSProperties, type MouseEvent } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import type { DashboardCardVM } from "@/lib/application";
import {
  DASHBOARD_MOTION,
  MODULE_TRANSITION_SESSION_KEY,
  markDashboardCardEnter,
  markDashboardCardEnterDone,
  markDashboardModuleNavEnd,
  markDashboardModuleNavStart,
} from "@/lib/dashboard/motion";
import { CardSignal } from "../CardSignal";
import {
  LiveCardMetrics,
  LiveMetricText,
  useDashboardLiveMetrics,
} from "../metrics";
import { useReducedMotion } from "./useReducedMotion";

type DashboardCardMotionProps = {
  card: DashboardCardVM;
  moduleLabel: string;
  title: string;
  staggerIndex: number;
};

export function DashboardCardMotion({
  card,
  moduleLabel,
  title,
  staggerIndex,
}: DashboardCardMotionProps) {
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const {
    ref: metricsRef,
    isActive,
    isComplete,
  } = useDashboardLiveMetrics(card.id);

  const handleAnimationStart = useCallback(() => {
    markDashboardCardEnter(staggerIndex);
  }, [staggerIndex]);

  const handleAnimationEnd = useCallback(() => {
    markDashboardCardEnterDone(staggerIndex);
  }, [staggerIndex]);

  const handleNavigate = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (
        reducedMotion ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      ) {
        return;
      }

      event.preventDefault();
      markDashboardModuleNavStart();

      const page = document.querySelector(".ds-dashboard-page");
      page?.classList.add("ds-dashboard-page--exit");

      try {
        sessionStorage.setItem(MODULE_TRANSITION_SESSION_KEY, "1");
      } catch {
        /* best-effort */
      }

      window.setTimeout(() => {
        router.push(card.href);
        markDashboardModuleNavEnd();
      }, DASHBOARD_MOTION.moduleTransitionMs);
    },
    [card.href, reducedMotion, router]
  );

  const metricsImmediate = reducedMotion || isComplete;

  return (
    <Link
      ref={metricsRef}
      href={card.href}
      className="ds-dashboard-card ds-dashboard-card--motion"
      style={
        {
          "--dashboard-stagger-index": staggerIndex,
        } as CSSProperties
      }
      aria-label={`${title}: ${card.preview}`}
      onClick={handleNavigate}
      onAnimationStart={handleAnimationStart}
      onAnimationEnd={handleAnimationEnd}
    >
      <CardSignal />
      <p className="ds-dashboard-card-module ds-text-label">{moduleLabel}</p>
      <h2 className="ds-dashboard-card-title">{title}</h2>
      <p className="ds-dashboard-card-preview">
        <LiveMetricText
          text={card.preview}
          cardId={card.id}
          active={isActive}
          immediate={metricsImmediate}
        />
      </p>
      <LiveCardMetrics
        cardId={card.id}
        metrics={card.metrics}
        active={isActive}
        immediate={metricsImmediate}
      />
    </Link>
  );
}

type DashboardPageMotionProps = {
  children: React.ReactNode;
};

export function DashboardPageMotion({ children }: DashboardPageMotionProps) {
  return <div className="ds-dashboard-page-motion">{children}</div>;
}
