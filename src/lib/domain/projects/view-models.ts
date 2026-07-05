import type {
  ContentLocale,
  EngineeringRecordSectionId,
} from "@/lib/content/types";

export type ProjectLinksVM = {
  github?: string;
  external?: string;
};

/** MDX document reference — source compiled in Phase 4 via Content layer. */
export type ProjectMdxRefVM = {
  locale: ContentLocale;
  slug: string;
  available: boolean;
  source?: string;
};

export type RegistryCardVM = {
  slug: string;
  title: string;
  subtitle: string;
  status: string;
  cluster: string | null;
  domain: string;
  summary: string;
  stack: string[];
  version: string | null;
  architecture: string[];
  blueprintPreview: string;
  featured: boolean;
  order: number;
  since: string | null;
  links: ProjectLinksVM;
  tags: string[];
};

export type ProjectDetailVM = RegistryCardVM & {
  documents: Partial<Record<ContentLocale, ProjectMdxRefVM>>;
};

export type ProductMetricsVM = {
  registered: number;
  production: number;
  inDevelopment: number;
  experimental: number;
  archived: number;
};

export type ProductRegistryVM = {
  latestSlug: string;
  products: RegistryCardVM[];
  metrics: ProductMetricsVM;
};

export type ProjectRecordSectionVM = {
  id: EngineeringRecordSectionId;
  title: string;
  body: string;
};

/** Engineering Record view model — Phase 4.0 foundation; UI wired in Phase 4.1. */
export type ProjectRecordVM = {
  slug: string;
  locale: ContentLocale;
  title: string;
  subtitle: string;
  version: string | null;
  status: string;
  domain: string;
  stack: string[];
  updatedAt: string;
  sections: ProjectRecordSectionVM[];
};

export type ProjectRecordNavLinkVM = {
  slug: string;
  title: string;
};

export type ProjectRecordNavigationVM = {
  previous?: ProjectRecordNavLinkVM;
  next?: ProjectRecordNavLinkVM;
};
