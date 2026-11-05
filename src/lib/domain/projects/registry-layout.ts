/** Canonical registry grouping - own products vs client work clusters. */

export const REGISTRY_OWN_PRODUCT_SLUGS = [
  "call-tracker",
  "codev-erp",
  "codev-tim-travel",
  "codev-tim",
  "assistant-agent",
] as const;

export type RegistryWorkClusterConfig = {
  id: string;
  title: string;
  subtitle: string;
  external?: string;
  childSlugs: readonly string[];
};

export const REGISTRY_WORK_CLUSTERS: readonly RegistryWorkClusterConfig[] = [
  {
    id: "completed-business-work",
    title: "Completed business software",
    subtitle: "Historical development cases",
    childSlugs: [
      "fire-safety-store",
      "business-operations",
      "document-workflow",
      "staff-telegram-tools",
    ],
  },
];

export const REGISTRY_OTHER_WORK_SLUGS = [] as const;

const NESTED_SLUGS = new Set(
  REGISTRY_WORK_CLUSTERS.flatMap((cluster) => cluster.childSlugs)
);

export function isRegistryNestedSlug(slug: string): boolean {
  return NESTED_SLUGS.has(slug);
}
