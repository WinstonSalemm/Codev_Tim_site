import { createCachedLoader } from "./internal/cache";
import {
  loadAllProjectContent,
  loadProjectContentBySlug,
} from "./internal/project-sources";
import {
  normalizeProjectSlug,
  resolveProjectSlug,
  PROJECT_SLUG_ALIASES,
  PROJECT_SLUG_PATTERN,
  isValidProjectSlug,
} from "./internal/slug";
import { compileEngineeringRecordSection } from "@/lib/mdx/compile-engineering-record-section";
import type {
  ContentLocale,
  ProjectContent,
  ProjectMdxDocument,
  ProjectMeta,
} from "./types";

const getCachedAllProjectContent = createCachedLoader(loadAllProjectContent);

export function getAllProjectContent(): ProjectContent[] {
  return getCachedAllProjectContent().sort(
    (left, right) => left.meta.order - right.meta.order
  );
}

export function getProjectContent(slug: string): ProjectContent | undefined {
  const resolved = resolveProjectSlug(slug);
  return loadProjectContentBySlug(resolved);
}

export function getProjectMeta(slug: string): ProjectMeta | undefined {
  return getProjectContent(slug)?.meta;
}

export function getProjectMdx(
  slug: string,
  locale: ContentLocale
): ProjectMdxDocument | undefined {
  const content = getProjectContent(slug);
  return content?.documents[locale];
}

export {
  normalizeProjectSlug,
  resolveProjectSlug,
  isValidProjectSlug,
  PROJECT_SLUG_ALIASES,
  PROJECT_SLUG_PATTERN,
};

/**
 * MDX compile hook — section bodies compiled via @mdx-js/mdx.
 * Application/Domain must not import this directly; keep in Content layer.
 */
export type ProjectMdxCompiler = (
  document: ProjectMdxDocument
) => Promise<unknown>;

export async function compileProjectMdx(
  document: ProjectMdxDocument,
  compile?: ProjectMdxCompiler
): Promise<unknown> {
  if (compile) {
    return compile(document);
  }

  const sections = document.record.sections.map((section) => section.body);
  const compiled = await Promise.all(
    sections.map((body) => compileEngineeringRecordSection(body))
  );

  return compiled;
}
