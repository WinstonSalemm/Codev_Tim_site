/** URL query vocabulary for Product Registry — domain-owned. */

export const REGISTRY_STATUS_PARAMS = {
  "in-development": "In Development",
  production: "Production",
  experimental: "Experimental",
  archived: "Archived",
} as const;

export type RegistryStatusParam = keyof typeof REGISTRY_STATUS_PARAMS;

export const REGISTRY_SORT_PARAMS = {
  lifecycle: "lifecycle",
  production: "production",
  "in-development": "in-development",
  experimental: "experimental",
  archived: "archived",
  title: "title",
  order: "order",
} as const;

export type RegistrySortParam = keyof typeof REGISTRY_SORT_PARAMS;

export const DEFAULT_REGISTRY_SORT: RegistrySortParam = "lifecycle";

export type RegistryQueryState = {
  status?: RegistryStatusParam;
  domain?: string;
  search?: string;
  sort?: RegistrySortParam;
};
