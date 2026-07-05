export * from "./shared";
export * from "./dashboard";
export * from "./projects";
export * from "./articles";
export * from "./profile";
export * from "./principles";
export * from "./terminal";
export * from "./navigation";
export * from "./search";

export type {
  ActivityAction,
  ActivityRecord,
  ActivityEntryVM,
  DashboardCardId,
  DashboardCardMetricVM,
  DashboardCardVM,
  DashboardMetricsVM,
  HeaderVM,
  OperationsCenterVM,
} from "@/lib/domain/dashboard";

export type {
  ArticleCardVM,
  KnowledgeBaseVM,
  KnowledgeBasePageVM,
  KnowledgeBaseQueryState,
  ArticleNoteVM,
} from "@/lib/domain/articles";

export type {
  DeploymentEventVM,
  EngineerProfileVM,
  ProfileDataRowVM,
  TechnologyLayerVM,
} from "@/lib/domain/profile";

export type {
  PrincipleCardVM,
  PrinciplesPageVM,
} from "@/lib/domain/principles";

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
  RegistryQueryState,
  RegistrySortParam,
  RegistryStatusParam,
} from "@/lib/domain/projects";

export type { NavigationItemVM } from "@/lib/domain/navigation";

export type {
  TerminalContextVM,
  TerminalModuleTargetVM,
  TerminalProductVM,
  TerminalStackLayerVM,
} from "@/lib/domain/terminal";

export type { SearchQueryOptions, SearchQueryResult } from "./search";

export {
  parseKnowledgeBaseQuery,
  buildKnowledgeBaseQueryString,
  buildKnowledgeBaseSearchParams,
  DEFAULT_KNOWLEDGE_BASE_PAGE,
  KNOWLEDGE_BASE_CATEGORIES,
  hasActiveKnowledgeBaseFilters,
  loadKnowledgeBasePage,
  isKnowledgeBaseEmpty,
} from "./articles";

export type { ActivityMessageTemplates } from "@/lib/domain/dashboard";

export {
  ACTIVITY_CARD_PREVIEW_COUNT,
  ACTIVITY_FEED_MAX_VISIBLE,
  mergeActivityFeedEntries,
  sortActivityRecordsLatestFirst,
} from "@/lib/domain/dashboard";
