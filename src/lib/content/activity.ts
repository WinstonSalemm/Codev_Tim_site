import { createCachedLoader } from "./internal/cache";
import { loadActivityLog } from "./internal/sources";
import type { ActivityRecord, SearchableMetadata } from "./types";
import { getSiteConfig } from "./config";

const getCachedActivityLog = createCachedLoader(loadActivityLog);

export function getActivityLog(): ActivityRecord[] {
  return getCachedActivityLog().entries;
}

/** Alias — public API name from content layer spec. */
export function getActivity(): ActivityRecord[] {
  return getActivityLog();
}

export function getActivitySearchMetadata(): SearchableMetadata[] {
  const { defaultLocale } = getSiteConfig();

  return getActivityLog().map((entry) => ({
    id: `activity:${entry.id}`,
    title: entry.target ?? entry.action,
    slug: entry.id,
    summary: entry.action,
    tags: [entry.action],
    keywords: [entry.action, entry.target ?? "", entry.id],
    category: "activity",
    language: defaultLocale,
  }));
}
