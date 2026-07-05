import { createCachedLoader } from "./internal/cache";
import { loadPrinciplesIndex } from "./internal/sources";
import type { PrinciplesIndex, SearchableMetadata, Principle } from "./types";
import { getSiteConfig } from "./config";
import enMessages from "../../../messages/en.json";

const getCachedPrinciplesIndex = createCachedLoader(loadPrinciplesIndex);

type ProtocolSearchCopy = {
  title: string;
  summary: string;
};

const protocolSearchCopy = enMessages.engineeringProtocolsPage
  .protocols as Record<string, ProtocolSearchCopy>;

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

  return getPrinciples().map((principle) => {
    const copy = protocolSearchCopy[principle.id];
    const title = copy?.title ?? principle.id;
    const summary = copy?.summary ?? "";

    return {
      id: `principle:${principle.id}`,
      title: `${principle.number} — ${title}`,
      slug: principle.id,
      summary,
      tags: ["principles", "protocols"],
      keywords: [principle.number, title, summary],
      category: "principle",
      language: defaultLocale,
      href: "/principles",
    };
  });
}
