export type {
  ProductMetricsVM,
  ProductRegistryVM,
  ProjectDetailVM,
  ProjectLinksVM,
  ProjectMdxRefVM,
  ProjectRecordNavLinkVM,
  ProjectRecordNavigationVM,
  ProjectRecordSectionVM,
  ProjectRecordVM,
  RegistryCardVM,
} from "./view-models";
export { mapProjectEngineeringRecordToVM } from "./record";
export { resolveAdjacentProjectRecords } from "./record-navigation";
export {
  ARCHITECTURE_LAYER_ORDER,
  ARCHITECTURE_LAYER_ROLES,
  buildArchitectureDiagramModel,
  getArchitectureDiagramActiveEdgeIds,
  getArchitectureDiagramHighlightIds,
} from "./architecture-diagram";
export type {
  ArchitectureDiagramEdge,
  ArchitectureDiagramModel,
  ArchitectureDiagramNode,
} from "./architecture-diagram";
export {
  DEFAULT_REGISTRY_SORT,
  REGISTRY_SORT_PARAMS,
  REGISTRY_STATUS_PARAMS,
  type RegistryQueryState,
  type RegistrySortParam,
  type RegistryStatusParam,
} from "./query-types";
export {
  applyRegistryQuery,
  domainToFilterParam,
  filterRegistryProducts,
  hasActiveRegistryFilters,
  listRegistryDomains,
  resolveStatusFilter,
  sortRegistryProductsByQuery,
  statusToFilterParam,
} from "./registry-query";
export { REGISTRY_STATUS_PRIORITY, sortRegistryProducts } from "./sorting";
export {
  buildRegistryGroupedView,
  countGroupedProducts,
  type RegistryGroupedVM,
  type RegistryWorkClusterVM,
} from "./registry-sections";
export {
  REGISTRY_OWN_PRODUCT_SLUGS,
  REGISTRY_OTHER_WORK_SLUGS,
  REGISTRY_WORK_CLUSTERS,
  isRegistryNestedSlug,
  type RegistryWorkClusterConfig,
} from "./registry-layout";
export {
  buildProductRegistry,
  buildProjectDetailViewModel,
  buildProjectViewModel,
  calculateProductMetrics,
  resolveLatestProjectSlug,
  resolveProjectSlug,
  selectArchivedProducts,
  selectDevelopmentProducts,
  selectFeaturedProducts,
  selectProductionProducts,
} from "./registry";
