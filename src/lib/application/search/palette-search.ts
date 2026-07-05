import {
  buildPaletteSearchResults,
  type PaletteSearchOptions,
  type PaletteSearchResultVM,
} from "@/lib/domain/search";

export type PaletteSearchQueryOptions = PaletteSearchOptions;
export type PaletteSearchQueryResult = PaletteSearchResultVM;

export function executePaletteSearch(
  query: string,
  options: PaletteSearchQueryOptions = {}
): PaletteSearchQueryResult[] {
  return buildPaletteSearchResults(query, options);
}
