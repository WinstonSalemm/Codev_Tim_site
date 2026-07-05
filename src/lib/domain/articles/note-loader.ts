import "server-only";

import { getArticleNote } from "@/lib/content/article-content";
import type { ContentLocale } from "@/lib/content/types";
import type { ArticleNoteVM } from "./view-models";

export function buildArticleNoteVM(
  slug: string,
  locale: ContentLocale
): ArticleNoteVM | undefined {
  const note = getArticleNote(slug, locale);

  if (!note) {
    return undefined;
  }

  return {
    slug: note.slug,
    locale: note.locale,
    title: note.meta.title,
    summary: note.meta.summary,
    category: note.meta.category,
    cluster: note.meta.cluster,
    tags: note.meta.tags,
    datePublished: note.meta.datePublished,
    dateModified: note.meta.dateModified,
    readingTime: note.meta.readingTime,
    body: note.body,
  };
}
