import { createCachedLoader } from "./internal/cache";
import { loadPrinciplesIndex } from "./internal/sources";
import type { PrinciplesIndex, SearchableMetadata, Principle } from "./types";
import { getSiteConfig } from "./config";

const getCachedPrinciplesIndex = createCachedLoader(loadPrinciplesIndex);

export function getPrinciplesIndex(): PrinciplesIndex {
  return getCachedPrinciplesIndex();
}

export function getPrinciples(): Principle[] {
  return getPrinciplesIndex().items;
}

export function getPrinciplesCount(): number {
  return getPrinciplesIndex().count;
}

export function getPrinciplesSearchMetadata(): SearchableMetadata[] {
  const { defaultLocale } = getSiteConfig();

  return getPrinciples().map((principle) => ({
    id: `principle:${principle.id}`,
    title: `${principle.number} — ${principle.title}`,
    slug: principle.id,
    summary: principle.description,
    tags: ["principles", "protocols"],
    keywords: [principle.number, principle.title, principle.description],
    category: "principle",
    language: defaultLocale,
    href: "/principles",
  }));
}
