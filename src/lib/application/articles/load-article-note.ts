import "server-only";

import { buildArticleNoteVM } from "@/lib/domain/articles/note-loader";
import type { ContentLocale } from "@/lib/content/types";

export function loadArticleNote(slug: string, locale: string) {
  return buildArticleNoteVM(slug, locale as ContentLocale);
}
