import type { SearchableMetadata } from "./types";
import paletteSearchIndex from "@/generated/search-index.json";

/** Compile-time palette index — modules, projects, and articles only. */
export function getPaletteSearchIndex(): SearchableMetadata[] {
  return paletteSearchIndex as SearchableMetadata[];
}
