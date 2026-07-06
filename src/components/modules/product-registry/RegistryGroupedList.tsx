import type { RegistryGroupedVM } from "@/lib/application";
import { ProductCard, type ProductCardLabels } from "./ProductCard";
import { WorkClusterCard, type WorkClusterCardLabels } from "./WorkClusterCard";

export type RegistryGroupedListLabels = {
  ownProducts: string;
  ownProductsHint: string;
  works: string;
  worksHint: string;
  otherProjects: string;
  cluster: WorkClusterCardLabels;
  card: ProductCardLabels;
};

type RegistryGroupedListProps = {
  grouped: RegistryGroupedVM;
  labels: RegistryGroupedListLabels;
  statusLabels: Record<string, string>;
};

export function RegistryGroupedList({
  grouped,
  labels,
  statusLabels,
}: RegistryGroupedListProps) {
  let staggerIndex = 0;

  return (
    <div className="ds-registry-grouped">
      {grouped.ownProducts.length > 0 ? (
        <section
          className="ds-registry-section ds-registry-section--own"
          aria-labelledby="registry-section-own"
        >
          <header className="ds-registry-section-header">
            <h2 id="registry-section-own" className="ds-registry-section-title">
              {labels.ownProducts}
            </h2>
            <p className="ds-registry-section-hint">{labels.ownProductsHint}</p>
          </header>

          <ol className="ds-registry-list-items">
            {grouped.ownProducts.map((product) => {
              const index = staggerIndex;
              staggerIndex += 1;

              return (
                <ProductCard
                  key={product.slug}
                  product={product}
                  statusLabel={statusLabels[product.status] ?? product.status}
                  labels={labels.card}
                  staggerIndex={index}
                  variant="own"
                />
              );
            })}
          </ol>
        </section>
      ) : null}

      {grouped.workClusters.length > 0 || grouped.otherProjects.length > 0 ? (
        <section
          className="ds-registry-section ds-registry-section--works"
          aria-labelledby="registry-section-works"
        >
          <header className="ds-registry-section-header">
            <h2
              id="registry-section-works"
              className="ds-registry-section-title"
            >
              {labels.works}
            </h2>
            <p className="ds-registry-section-hint">{labels.worksHint}</p>
          </header>

          {grouped.workClusters.length > 0 ? (
            <ol className="ds-registry-cluster-list">
              {grouped.workClusters.map((cluster) => {
                const startIndex = staggerIndex;
                staggerIndex += cluster.products.length;

                return (
                  <WorkClusterCard
                    key={cluster.id}
                    cluster={cluster}
                    labels={labels.cluster}
                    cardLabels={labels.card}
                    statusLabels={statusLabels}
                    staggerStartIndex={startIndex}
                  />
                );
              })}
            </ol>
          ) : null}

          {grouped.otherProjects.length > 0 ? (
            <div className="ds-registry-other-block">
              <h3 className="ds-registry-other-title">
                {labels.otherProjects}
              </h3>
              <ol className="ds-registry-list-items">
                {grouped.otherProjects.map((product) => {
                  const index = staggerIndex;
                  staggerIndex += 1;

                  return (
                    <ProductCard
                      key={product.slug}
                      product={product}
                      statusLabel={
                        statusLabels[product.status] ?? product.status
                      }
                      labels={labels.card}
                      staggerIndex={index}
                      variant="work"
                    />
                  );
                })}
              </ol>
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
