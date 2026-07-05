import "server-only";

import { loadArticleMdxBySlug } from "./internal/article-mdx-sources";
import { readArticleMetaFile } from "./internal/article-storage";
import { getArticle } from "./articles";
import type { ArticleNote, ContentLocale } from "./types";

const noteCache = new Map<string, ArticleNote | undefined>();

function noteCacheKey(slug: string, locale: ContentLocale): string {
  return `${slug}:${locale}`;
}

export function getArticleNote(
  slug: string,
  locale: ContentLocale
): ArticleNote | undefined {
  const key = noteCacheKey(slug, locale);

  if (noteCache.has(key)) {
    return noteCache.get(key);
  }

  const meta = getArticle(slug) ?? readArticleMetaFile(slug);
  const document = loadArticleMdxBySlug(slug, locale);

  if (!meta || meta.publishStatus !== "published" || !document) {
    noteCache.set(key, undefined);
    return undefined;
  }

  const note: ArticleNote = {
    slug,
    locale,
    meta,
    frontmatter: document.frontmatter,
    body: document.body,
  };

  noteCache.set(key, note);
  return note;
}
