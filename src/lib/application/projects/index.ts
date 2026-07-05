import {
  buildProductRegistry,
  buildProjectDetailViewModel,
  buildProjectViewModel,
  calculateProductMetrics,
  resolveProjectSlug,
  selectArchivedProducts,
  selectDevelopmentProducts,
  selectFeaturedProducts,
  selectProductionProducts,
  resolveAdjacentProjectRecords,
} from "@/lib/domain/projects";

export function loadProductRegistry() {
  return buildProductRegistry();
}

export function loadProject(slug: string) {
  return buildProjectDetailViewModel(slug);
}

export function loadProjectCard(slug: string) {
  return buildProjectViewModel(slug);
}

export function loadProductMetrics() {
  return calculateProductMetrics();
}

export function loadFeaturedProducts() {
  return selectFeaturedProducts();
}

export function loadProductionProducts() {
  return selectProductionProducts();
}

export function loadDevelopmentProducts() {
  return selectDevelopmentProducts();
}

export function loadArchivedProducts() {
  return selectArchivedProducts();
}

export function loadAdjacentProjectRecords(slug: string) {
  return resolveAdjacentProjectRecords(slug);
}

export {
  buildRegistryQueryString,
  DEFAULT_REGISTRY_SORT,
  domainToFilterParam,
  hasActiveRegistryFilters,
  loadFilteredProductRegistry,
  parseRegistryQuery,
  REGISTRY_SORT_PARAMS,
  REGISTRY_STATUS_PARAMS,
} from "./registry-query";

export type {
  RegistryQueryState,
  RegistrySortParam,
  RegistryStatusParam,
} from "./registry-query";

export { resolveProjectSlug };
