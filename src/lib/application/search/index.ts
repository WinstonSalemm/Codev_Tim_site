import {
  buildSearchRanking,
  type SearchRankingOptions,
  type SearchRankingResult,
} from "@/lib/domain/search";

export type SearchQueryOptions = SearchRankingOptions;
export type SearchQueryResult = SearchRankingResult;

export function executeSearch(
  query: string,
  options: SearchQueryOptions = {}
): SearchQueryResult[] {
  return buildSearchRanking(query, options);
}

export type {
  PaletteSearchQueryOptions,
  PaletteSearchQueryResult,
} from "./palette-search";
export { executePaletteSearch } from "./palette-search";
