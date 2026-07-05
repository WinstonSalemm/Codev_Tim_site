"use client";

import { useCallback, type CSSProperties, type MouseEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import type { RegistryCardVM } from "@/lib/application";
import { CardSignal } from "@/components/modules/dashboard/CardSignal";
import { useReducedMotion } from "@/components/modules/dashboard/motion/useReducedMotion";
import {
  REGISTRY_DRILLDOWN_SESSION_KEY,
  REGISTRY_MOTION,
  markRegistryCardEnter,
  markRegistryCardEnterDone,
  markRegistryDrilldownEnd,
  markRegistryDrilldownStart,
  saveRegistryOrigin,
} from "@/lib/dashboard/motion";
import { StatusBadge } from "./StatusBadge";

export type ProductCardLabels = {
  stack: string;
  architecture: string;
  lifecycle: string;
  version: string;
  since: string;
  domain: string;
  openProject: string;
  metrics: string;
};

type ProductCardProps = {
  product: RegistryCardVM;
  statusLabel: string;
  labels: ProductCardLabels;
  staggerIndex: number;
};

function buildHoverMetrics(
  product: RegistryCardVM,
  labels: ProductCardLabels
): Array<{ label: string; value: string }> {
  const metrics: Array<{ label: string; value: string }> = [
    { label: labels.domain, value: product.domain },
  ];

  if (product.version) {
    metrics.push({ label: labels.version, value: product.version });
  }

  if (product.since) {
    metrics.push({ label: labels.since, value: product.since });
  }

  return metrics;
}

export function ProductCard({
  product,
  statusLabel,
  labels,
  staggerIndex,
}: ProductCardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reducedMotion = useReducedMotion();
  const href = `/projects/${product.slug}`;
  const hoverMetrics = buildHoverMetrics(product, labels);
  const ariaLabel = `${product.title}, ${statusLabel}, ${product.subtitle}`;

  const persistRegistryOrigin = useCallback(() => {
    if (pathname !== "/projects") {
      return;
    }

    const query = searchParams.toString();
    saveRegistryOrigin(query.length > 0 ? `${pathname}?${query}` : pathname);
  }, [pathname, searchParams]);

  const handleAnimationStart = useCallback(() => {
    markRegistryCardEnter(staggerIndex);
  }, [staggerIndex]);

  const handleAnimationEnd = useCallback(() => {
    markRegistryCardEnterDone(staggerIndex);
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
      markRegistryDrilldownStart();
      persistRegistryOrigin();

      const page = document.querySelector(".ds-registry-page");
      page?.classList.add("ds-registry-page--exit");

      try {
        sessionStorage.setItem(REGISTRY_DRILLDOWN_SESSION_KEY, "1");
      } catch {
        /* best-effort */
      }

      window.setTimeout(() => {
        router.push(href);
        markRegistryDrilldownEnd();
      }, REGISTRY_MOTION.drilldownMs);
    },
    [href, persistRegistryOrigin, reducedMotion, router]
  );

  const handleLinkClick = useCallback(() => {
    persistRegistryOrigin();
  }, [persistRegistryOrigin]);

  return (
    <li className="ds-product-card-item">
      <Link
        href={href}
        className="ds-product-card ds-product-card--motion"
        style={
          {
            "--registry-stagger-index": staggerIndex,
          } as CSSProperties
        }
        aria-label={ariaLabel}
        onClick={(event) => {
          handleLinkClick();
          handleNavigate(event);
        }}
        onAnimationStart={handleAnimationStart}
        onAnimationEnd={handleAnimationEnd}
      >
        <CardSignal className="ds-product-card-signal" />

        <header className="ds-product-card-header">
          <h2 className="ds-product-card-title">{product.title}</h2>
          <StatusBadge status={product.status} label={statusLabel} />
        </header>

        <p className="ds-product-card-subtitle">{product.subtitle}</p>

        <dl className="ds-product-card-fields">
          <div className="ds-product-card-field">
            <dt className="ds-product-card-field-label">{labels.stack}</dt>
            <dd className="ds-product-card-field-value">
              {product.stack.join(" · ")}
            </dd>
          </div>
          <div className="ds-product-card-field">
            <dt className="ds-product-card-field-label">
              {labels.architecture}
            </dt>
            <dd className="ds-product-card-field-value ds-product-card-architecture">
              {product.blueprintPreview}
            </dd>
          </div>
          <div className="ds-product-card-field">
            <dt className="ds-product-card-field-label">{labels.lifecycle}</dt>
            <dd className="ds-product-card-field-value">{statusLabel}</dd>
          </div>
        </dl>

        <dl className="ds-product-card-metrics" aria-label={labels.metrics}>
          {hoverMetrics.map((metric) => (
            <div
              key={`${metric.label}-${metric.value}`}
              className="ds-product-card-metric"
            >
              <dt className="ds-product-card-metric-label">{metric.label}</dt>
              <dd className="ds-product-card-metric-value">{metric.value}</dd>
            </div>
          ))}
        </dl>

        <footer className="ds-product-card-footer">
          <span className="ds-product-card-action">{labels.openProject}</span>
        </footer>
      </Link>
    </li>
  );
}
