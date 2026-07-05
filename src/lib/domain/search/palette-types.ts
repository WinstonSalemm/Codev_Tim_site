import type { ContentLocale } from "@/lib/content/types";

export type PaletteSearchGroup = "module" | "project" | "article";

export type PaletteSearchResultVM = {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  group: PaletteSearchGroup;
};

export type PaletteSearchOptions = {
  locale?: ContentLocale;
  limit?: number;
};

export const PALETTE_SEARCH_GROUPS: PaletteSearchGroup[] = [
  "module",
  "project",
  "article",
];
