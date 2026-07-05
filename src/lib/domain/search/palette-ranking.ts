import { getPaletteSearchIndex } from "@/lib/content/palette-search-index";
import type { ContentLocale, SearchableMetadata } from "@/lib/content/types";
import type {
  PaletteSearchGroup,
  PaletteSearchOptions,
  PaletteSearchResultVM,
} from "./palette-types";

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

function isLocaleVisible(
  document: SearchableMetadata,
  locale: ContentLocale | undefined
): boolean {
  if (document.category === "module" || document.category === "project") {
    return true;
  }

  if (document.category === "article") {
    return !locale || document.language === locale;
  }

  return false;
}

function toPaletteGroup(
  category: SearchableMetadata["category"]
): PaletteSearchGroup {
  if (category === "project") {
    return "project";
  }

  if (category === "article") {
    return "article";
  }

  return "module";
}

function toPaletteResult(document: SearchableMetadata): PaletteSearchResultVM {
  return {
    id: document.id,
    title: document.title,
    subtitle: document.summary,
    href: document.href ?? "/",
    group: toPaletteGroup(document.category),
  };
}

function comparePaletteResults(
  left: PaletteSearchResultVM,
  right: PaletteSearchResultVM
): number {
  const groupOrder: Record<PaletteSearchGroup, number> = {
    module: 0,
    project: 1,
    article: 2,
  };

  const groupDelta = groupOrder[left.group] - groupOrder[right.group];
  if (groupDelta !== 0) {
    return groupDelta;
  }

  return left.title.localeCompare(right.title);
}

export function buildPaletteSearchResults(
  query: string,
  options: PaletteSearchOptions = {}
): PaletteSearchResultVM[] {
  const normalized = normalizeQuery(query);
  const limit = options.limit ?? 20;
  const index = getPaletteSearchIndex();

  if (!normalized) {
    return index
      .filter((document) => document.category === "module")
      .map(toPaletteResult)
      .sort(comparePaletteResults);
  }

  const tokens = normalized.split(/\s+/).filter(Boolean);

  return index
    .filter((document) => isLocaleVisible(document, options.locale))
    .map((document) => ({
      document,
      score: scoreDocument(document, tokens),
    }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)
    .map((entry) => toPaletteResult(entry.document))
    .sort(comparePaletteResults);
}
