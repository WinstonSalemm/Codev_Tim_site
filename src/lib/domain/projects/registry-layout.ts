/** Canonical registry grouping — own products vs client work clusters. */

export const REGISTRY_OWN_PRODUCT_SLUGS = ["codev-erp", "codev-tim"] as const;

export type RegistryWorkClusterConfig = {
  id: string;
  title: string;
  subtitle: string;
  external?: string;
  childSlugs: readonly string[];
};

export const REGISTRY_WORK_CLUSTERS: readonly RegistryWorkClusterConfig[] = [
  {
    id: "poj-pro",
    title: "Poj Pro",
    subtitle: "OOO «Poj Pro» · Business Automation",
    external: "https://www.poj-pro.uz",
    childSlugs: [
      "poj-pro-site",
      "poj-pro-platform",
      "poj-pro-api-contracts",
      "poj-pro-telegram-bots",
    ],
  },
];

export const REGISTRY_OTHER_WORK_SLUGS = ["assistant-agent"] as const;

const NESTED_SLUGS = new Set(
  REGISTRY_WORK_CLUSTERS.flatMap((cluster) => cluster.childSlugs)
);

export function isRegistryNestedSlug(slug: string): boolean {
  return NESTED_SLUGS.has(slug);
}
