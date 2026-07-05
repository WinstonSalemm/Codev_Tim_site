/**
 * Project MDX loader — fs boundary, server-only entry via project-content.ts
 */
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import type { ContentLocale, ProjectMdxDocument } from "../types";
import { parseProjectMdxSource } from "./engineering-record-parser";
import { loadProjectMetaBySlug } from "./project-meta-sources";
import { PROJECT_REGISTRY_SLUGS } from "./project-meta-manifest";

const CONTENT_LOCALES: ContentLocale[] = ["en", "ru", "uz"];
const PROJECTS_CONTENT_ROOT = join(process.cwd(), "content", "projects");

function readProjectMdx(
  slug: string,
  locale: ContentLocale
): ProjectMdxDocument {
  const filePath = join(PROJECTS_CONTENT_ROOT, slug, `index.${locale}.mdx`);

  if (!existsSync(filePath)) {
    throw new Error(`Missing project MDX: ${filePath}`);
  }

  const source = readFileSync(filePath, "utf8");
  return parseProjectMdxSource(source, slug, locale);
}

export function loadProjectMdxBySlug(
  slug: string,
  locale: ContentLocale
): ProjectMdxDocument | undefined {
  if (!PROJECT_REGISTRY_SLUGS.includes(slug)) {
    return undefined;
  }

  if (!loadProjectMetaBySlug(slug)) {
    return undefined;
  }

  return readProjectMdx(slug, locale);
}

export function loadAllProjectMdxBySlug(
  slug: string
): Partial<Record<ContentLocale, ProjectMdxDocument>> {
  const documents: Partial<Record<ContentLocale, ProjectMdxDocument>> = {};

  for (const locale of CONTENT_LOCALES) {
    documents[locale] = readProjectMdx(slug, locale);
  }

  return documents;
}
