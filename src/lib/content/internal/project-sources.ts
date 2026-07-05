/**
 * Project content storage boundary — docs/16_CONTENT_LAYER.md
 * Meta via static imports; MDX via fs (server-only consumers).
 */
import type { ContentLocale, ProjectContent } from "../types";
import {
  loadAllProjectRegistryEntries,
  loadProjectRegistryEntryBySlug,
} from "./project-meta-sources";
import {
  loadAllProjectMdxBySlug,
  loadProjectMdxBySlug,
} from "./project-mdx-sources";

export function loadAllProjectContent(): ProjectContent[] {
  return loadAllProjectRegistryEntries().map((entry) => ({
    meta: entry.meta,
    documents: loadAllProjectMdxBySlug(entry.meta.slug),
  }));
}

export function loadProjectContentBySlug(
  slug: string
): ProjectContent | undefined {
  const entry = loadProjectRegistryEntryBySlug(slug);
  if (!entry) {
    return undefined;
  }

  return {
    meta: entry.meta,
    documents: loadAllProjectMdxBySlug(slug),
  };
}

export function loadProjectContentBySlugAndLocale(
  slug: string,
  locale: ContentLocale
): ProjectContent | undefined {
  const entry = loadProjectRegistryEntryBySlug(slug);
  if (!entry) {
    return undefined;
  }

  const document = loadProjectMdxBySlug(slug, locale);
  if (!document) {
    return undefined;
  }

  return {
    meta: entry.meta,
    documents: { [locale]: document },
  };
}
