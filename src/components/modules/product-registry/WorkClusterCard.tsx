"use client";

import { useTranslations } from "next-intl";
import { useCallback, useId, useState } from "react";
import type { RegistryWorkClusterVM } from "@/lib/application";
import { ProductCard, type ProductCardLabels } from "./ProductCard";

export type WorkClusterCardLabels = {
  expand: string;
  collapse: string;
  openSite: string;
};

type WorkClusterCardProps = {
  cluster: RegistryWorkClusterVM;
  labels: WorkClusterCardLabels;
  cardLabels: ProductCardLabels;
  statusLabels: Record<string, string>;
  staggerStartIndex: number;
  defaultExpanded?: boolean;
};

export function WorkClusterCard({
  cluster,
  labels,
  cardLabels,
  statusLabels,
  staggerStartIndex,
  defaultExpanded = false,
}: WorkClusterCardProps) {
  const t = useTranslations("productRegistry.cluster");
  const panelId = useId();
  const [expanded, setExpanded] = useState(defaultExpanded);

  const toggleExpanded = useCallback(() => {
    setExpanded((current) => !current);
  }, []);

  const countLabel = t("projectsCount", { count: cluster.products.length });
  const nestedRegionLabel = t("nestedRegion", { title: cluster.title });

  return (
    <li className="ds-work-cluster-item">
      <article className="ds-work-cluster">
        <button
          type="button"
          className="ds-work-cluster-header"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={toggleExpanded}
        >
          <div className="ds-work-cluster-heading">
            <h3 className="ds-work-cluster-title">{cluster.title}</h3>
            <p className="ds-work-cluster-subtitle">{cluster.subtitle}</p>
          </div>

          <div className="ds-work-cluster-meta">
            <span className="ds-work-cluster-count">{countLabel}</span>
            {cluster.external ? (
              <a
                className="ds-work-cluster-site"
                href={cluster.external}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
              >
                {labels.openSite}
              </a>
            ) : null}
            <span
              className="ds-work-cluster-chevron"
              aria-hidden="true"
              data-expanded={expanded ? "true" : "false"}
            />
          </div>
        </button>

        <div
          id={panelId}
          className="ds-work-cluster-panel"
          data-expanded={expanded ? "true" : "false"}
          hidden={!expanded}
        >
          <ol
            className="ds-work-cluster-products"
            aria-label={nestedRegionLabel}
          >
            {cluster.products.map((product, index) => (
              <ProductCard
                key={product.slug}
                product={product}
                statusLabel={statusLabels[product.status] ?? product.status}
                labels={cardLabels}
                staggerIndex={staggerStartIndex + index}
                variant="nested"
              />
            ))}
          </ol>
        </div>

        <span className="ds-work-cluster-toggle-hint">
          {expanded ? labels.collapse : labels.expand}
        </span>
      </article>
    </li>
  );
}
