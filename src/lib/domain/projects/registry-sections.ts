import {
  REGISTRY_OWN_PRODUCT_SLUGS,
  REGISTRY_OTHER_WORK_SLUGS,
  REGISTRY_WORK_CLUSTERS,
  type RegistryWorkClusterConfig,
} from "./registry-layout";
import type { RegistryCardVM } from "./view-models";

export type RegistryWorkClusterVM = RegistryWorkClusterConfig & {
  products: RegistryCardVM[];
};

export type RegistryGroupedVM = {
  ownProducts: RegistryCardVM[];
  workClusters: RegistryWorkClusterVM[];
  otherProjects: RegistryCardVM[];
};

function pickProducts(
  slugs: readonly string[],
  bySlug: Map<string, RegistryCardVM>
): RegistryCardVM[] {
  return slugs
    .map((slug) => bySlug.get(slug))
    .filter((product): product is RegistryCardVM => product !== undefined);
}

export function buildRegistryGroupedView(
  products: RegistryCardVM[]
): RegistryGroupedVM {
  const bySlug = new Map(products.map((product) => [product.slug, product]));

  const ownProducts = pickProducts(REGISTRY_OWN_PRODUCT_SLUGS, bySlug);

  const workClusters = REGISTRY_WORK_CLUSTERS.map((cluster) => ({
    ...cluster,
    products: pickProducts(cluster.childSlugs, bySlug),
  })).filter((cluster) => cluster.products.length > 0);

  const otherProjects = pickProducts(REGISTRY_OTHER_WORK_SLUGS, bySlug);

  return { ownProducts, workClusters, otherProjects };
}

export function countGroupedProducts(grouped: RegistryGroupedVM): number {
  return (
    grouped.ownProducts.length +
    grouped.workClusters.reduce(
      (total, cluster) => total + cluster.products.length,
      0
    ) +
    grouped.otherProjects.length
  );
}
