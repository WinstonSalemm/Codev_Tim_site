import { buildSearchIndex } from "@/lib/content";
import type { ContentLocale, SearchableMetadata } from "@/lib/content/types";

export type SearchRankingResult = SearchableMetadata & {
  score: number;
};

function normalizeQuery(query: string): string {
  return query.trim().toLowerCase();
}

function scoreDocument(document: SearchableMetadata, tokens: string[]): number {
  if (tokens.length === 0) {
    return 0;
  }

  const haystack = [
    document.title,
    document.slug,
    document.summary ?? "",
    ...document.tags,
    ...document.keywords,
    document.category,
  ]
    .join(" ")
    .toLowerCase();

  let score = 0;

  for (const token of tokens) {
    if (document.title.toLowerCase().includes(token)) {
      score += 4;
    }

    if (document.slug.toLowerCase().includes(token)) {
      score += 3;
    }

    if (haystack.includes(token)) {
      score += 1;
    }
  }

  return score;
}

export type SearchRankingOptions = {
  locale?: ContentLocale;
  limit?: number;
};

export function buildSearchRanking(
  query: string,
  options: SearchRankingOptions = {}
): SearchRankingResult[] {
  const normalized = normalizeQuery(query);
  if (!normalized) {
    return [];
  }

  const tokens = normalized.split(/\s+/).filter(Boolean);
  const limit = options.limit ?? 20;

  const results = buildSearchIndex()
    .filter(
      (document) => !options.locale || document.language === options.locale
    )
    .map((document) => ({
      ...document,
      score: scoreDocument(document, tokens),
    }))
    .filter((document) => document.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit);

  return results;
}
