/**
 * Article MDX loader — fs boundary, server-only entry via article-content.ts
 */
import type { ArticleMdxDocument, ContentLocale } from "../types";
import { getArticle } from "../articles";
import { articleMdxExists, readArticleMdxSource } from "./article-storage";
import { parseArticleMdxSource } from "./article-parser";

export function loadArticleMdxBySlug(
  slug: string,
  locale: ContentLocale
): ArticleMdxDocument | undefined {
  const meta = getArticle(slug);

  if (!meta) {
    return undefined;
  }

  if (!articleMdxExists(slug, locale)) {
    return undefined;
  }

  const source = readArticleMdxSource(slug, locale);

  if (!source) {
    return undefined;
  }

  return parseArticleMdxSource(source, slug, locale);
}
