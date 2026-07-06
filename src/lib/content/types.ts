/** Supported content locales — mirrors site config. */
export type ContentLocale = "en" | "ru" | "uz";

export type SearchableCategory =
  | "site"
  | "module"
  | "project"
  | "article"
  | "technology"
  | "principle"
  | "activity";

/** Normalized metadata every content service exposes for search indexing. */
export type SearchableMetadata = {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  tags: string[];
  keywords: string[];
  category: SearchableCategory;
  language: ContentLocale;
  href?: string;
};

export type SearchResult = SearchableMetadata & {
  score: number;
};

export type SiteStatus = "operational";

export type SiteAuthor = {
  name: string;
  fullName: string;
  location: string;
  timezone: string;
  email: string;
  github: string;
};

export type SiteAvailability = {
  status: string;
  label: string;
  responseTimeHours: number;
};

export type SiteSocial = {
  github: string;
  email: string;
};

export type ContactChannel = {
  label: string;
  href: string;
};

export type SiteContacts = {
  phones: ContactChannel[];
  telegram: ContactChannel[];
  email: string;
  github: string;
};

export type SiteConfig = {
  name: string;
  version: string;
  status: SiteStatus;
  mission: string;
  defaultLocale: ContentLocale;
  locales: ContentLocale[];
  author: SiteAuthor;
  availability: SiteAvailability;
  social: SiteSocial;
  contacts: SiteContacts;
};

export type EngineerIdentity = {
  roles: string[];
  focus: string;
  primaryLanguage: string;
  additionalLanguages: string[];
};

export type TimelineEvent = {
  id: string;
  period: string;
  role: string;
  context: string;
  focus: string;
  order: number;
};

export type EngineeringInterests = {
  interests: string[];
};

export type Principle = {
  id: string;
  number: string;
  order: number;
};

export type ProductStatus =
  "Production" | "In Development" | "Experimental" | "Archived";

export type ProjectArchitectureLayer =
  "Client" | "Gateway" | "API" | "Services" | "Database" | "Infrastructure";

export type ProjectLinks = {
  github?: string;
  external?: string;
};

/** Validated metadata from content/projects/{slug}/meta.json */
export type ProjectMeta = {
  slug: string;
  title: string;
  subtitle: string;
  status: ProductStatus;
  domain: string;
  summary: string;
  stack: string[];
  version: string | null;
  architecture: ProjectArchitectureLayer[];
  featured: boolean;
  order: number;
  since: string | null;
  links: ProjectLinks;
  tags: string[];
};

/** Frontmatter block in content/projects/{slug}/index.{locale}.mdx */
export type EngineeringRecordFrontmatter = {
  title: string;
  subtitle: string;
  version: string | null;
  status: ProductStatus;
  domain: string;
  stack: string[];
  updatedAt: string;
};

export type EngineeringRecordSectionId =
  | "overview"
  | "problem-statement"
  | "business-context"
  | "system-blueprint"
  | "technology-stack"
  | "trade-offs"
  | "roadmap"
  | "interface-record"
  | "lessons-recorded";

export type EngineeringRecordSection = {
  id: EngineeringRecordSectionId;
  title: string;
  body: string;
};

/** Parsed Engineering Record — MDX body split into canonical sections. */
export type ProjectEngineeringRecord = {
  locale: ContentLocale;
  slug: string;
  source: string;
  frontmatter: EngineeringRecordFrontmatter;
  sections: EngineeringRecordSection[];
};

/** Parsed MDX document — compileProjectMdx consumes source in Phase 4.1+. */
export type ProjectMdxDocument = {
  locale: ContentLocale;
  slug: string;
  source: string;
  record: ProjectEngineeringRecord;
};

export type ProjectContent = {
  meta: ProjectMeta;
  documents: Partial<Record<ContentLocale, ProjectMdxDocument>>;
};

/**
 * Content registry port — swap filesystem adapter for REST/PostgreSQL
 * without changing Domain or Application layers.
 */
export interface ProjectRegistrySource {
  listAll(): ProjectContent[];
  getBySlug(slug: string): ProjectContent | undefined;
  resolveSlug(slug: string): string;
}

export type Product = {
  slug: string;
  title: string;
  subtitle: string;
  status: ProductStatus | string;
  cluster: string | null;
  blueprintPreview?: string;
};

export type ProductsRegistry = {
  latestSlug: string;
  products: Product[];
};

export type ArticleCategory =
  "Architecture" | "Product" | "Process" | "Infrastructure" | "Domain";

export type PublishStatus = "published" | "draft" | "archived";

export type Article = {
  slug: string;
  previousSlugs: string[];
  title: string;
  summary: string;
  category: ArticleCategory;
  cluster: string;
  tags: string[];
  relatedProjects: string[];
  relatedNotes: string[];
  principles: string[];
  datePublished: string;
  dateModified: string;
  readingTime: number | null;
  featured: boolean;
  order: number | null;
  publishStatus: PublishStatus;
  author: string;
};

export type ArticleIndexEntry = Article;

export type ArticlesIndex = {
  notes: Article[];
};

export type ArticleNoteFrontmatter = {
  title: string;
  summary: string;
  datePublished: string;
  dateModified: string;
};

export type ArticleNote = {
  slug: string;
  locale: ContentLocale;
  meta: Article;
  frontmatter: ArticleNoteFrontmatter;
  body: string;
};

export type ArticleMdxDocument = {
  slug: string;
  locale: ContentLocale;
  frontmatter: ArticleNoteFrontmatter;
  body: string;
};

export type TechnologyLayer = {
  id: string;
  label: string;
  count: number;
};

export type TechnologyStack = {
  layers: TechnologyLayer[];
  topTags: string[];
};

export type ExperienceTimeline = {
  summary: string;
  period: string;
  organization: string;
  events: TimelineEvent[];
};

export type ActivityAction =
  | "session_started"
  | "session_restored"
  | "module_accessed"
  | "query_executed"
  | "system_event";

export type ActivityRecord = {
  id: string;
  timestamp: string;
  action: ActivityAction;
  target?: string;
  href?: string;
};

export type ActivityLog = {
  entries: ActivityRecord[];
};

export type PrinciplesIndex = {
  count: number;
  items: Principle[];
};

export type ContentNavigationItem = {
  id: string;
  href: string;
  title: string;
  shortTitle: string;
  category: "module";
};
