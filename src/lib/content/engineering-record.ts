import "server-only";

/**
 * Engineering Record loader — server-only entry.
 * Not exported from content/index.ts (fs boundary).
 */
import { loadProjectMdxBySlug } from "./internal/project-mdx-sources";
import { resolveProjectSlug } from "./internal/slug";
import type { ContentLocale, ProjectEngineeringRecord } from "./types";

const recordCache = new Map<string, ProjectEngineeringRecord | undefined>();

function recordCacheKey(slug: string, locale: ContentLocale): string {
  return `${slug}:${locale}`;
}

export function getProjectEngineeringRecord(
  slug: string,
  locale: ContentLocale
): ProjectEngineeringRecord | undefined {
  const resolved = resolveProjectSlug(slug);
  const key = recordCacheKey(resolved, locale);

  if (recordCache.has(key)) {
    return recordCache.get(key);
  }

  const record = loadProjectMdxBySlug(resolved, locale)?.record;
  recordCache.set(key, record);
  return record;
}

export {
  ENGINEERING_RECORD_SECTION_HEADINGS,
  ENGINEERING_RECORD_SECTION_ORDER,
} from "./internal/engineering-record-sections";
