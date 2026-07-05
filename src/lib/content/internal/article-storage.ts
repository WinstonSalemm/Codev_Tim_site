/**
 * Article MDX storage — filesystem boundary (server-only consumers).
 */
import "server-only";

import { existsSync, readFileSync } from "fs";
import { join } from "path";
import type { Article, ContentLocale } from "../types";
import { parseArticleMeta } from "./article-meta-schema";

const WRITING_CONTENT_ROOT = join(process.cwd(), "content", "writing");

export function readArticleMetaFile(slug: string): Article | undefined {
  const metaPath = join(WRITING_CONTENT_ROOT, slug, "meta.json");

  if (!existsSync(metaPath)) {
    return undefined;
  }

  const raw = JSON.parse(readFileSync(metaPath, "utf8")) as unknown;
  return parseArticleMeta(raw, slug);
}

export function readArticleMdxSource(
  slug: string,
  locale: ContentLocale
): string | undefined {
  const filePath = join(WRITING_CONTENT_ROOT, slug, `index.${locale}.mdx`);

  if (!existsSync(filePath)) {
    return undefined;
  }

  return readFileSync(filePath, "utf8");
}

export function articleMdxExists(slug: string, locale: ContentLocale): boolean {
  return existsSync(join(WRITING_CONTENT_ROOT, slug, `index.${locale}.mdx`));
}
