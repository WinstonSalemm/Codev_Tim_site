import type { ContentLocale, ProjectContent } from "@/lib/content/types";
import type {
  ProjectDetailVM,
  ProjectMdxRefVM,
  RegistryCardVM,
} from "./view-models";

/** Locales with index.{locale}.mdx per product — Phase 4 compiles source. */
const PROJECT_MDX_LOCALES: ContentLocale[] = ["en", "ru", "uz"];

function formatBlueprintPreview(architecture: string[]): string {
  return architecture.join(" → ");
}

function resolveCluster(tags: string[]): string | null {
  return tags[0] ?? null;
}

export function mapProjectContentToRegistryCard(
  content: ProjectContent
): RegistryCardVM {
  const { meta } = content;

  return {
    slug: meta.slug,
    title: meta.title,
    subtitle: meta.subtitle,
    status: meta.status,
    cluster: resolveCluster(meta.tags),
    domain: meta.domain,
    summary: meta.summary,
    stack: [...meta.stack],
    version: meta.version,
    architecture: [...meta.architecture],
    blueprintPreview: formatBlueprintPreview(meta.architecture),
    featured: meta.featured,
    order: meta.order,
    since: meta.since,
    links: { ...meta.links },
    tags: [...meta.tags],
  };
}

function buildMdxAvailabilityRefs(
  slug: string
): Partial<Record<ContentLocale, ProjectMdxRefVM>> {
  const documents: Partial<Record<ContentLocale, ProjectMdxRefVM>> = {};

  for (const locale of PROJECT_MDX_LOCALES) {
    documents[locale] = {
      locale,
      slug,
      available: true,
    };
  }

  return documents;
}

export function mapProjectContentToDetail(
  content: ProjectContent
): ProjectDetailVM {
  return {
    ...mapProjectContentToRegistryCard(content),
    documents: buildMdxAvailabilityRefs(content.meta.slug),
  };
}
