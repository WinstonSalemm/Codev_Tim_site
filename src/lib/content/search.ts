import { getActivitySearchMetadata } from "./activity";
import { getSiteSearchMetadata } from "./config";
import { createCachedLoader } from "./internal/cache";
import { getNavigationSearchMetadata } from "./navigation";
import { getProjectSearchMetadata } from "./projects";
import { getTechnologySearchMetadata } from "./technologies";
import { getTimelineSearchMetadata } from "./timeline";
import type { SearchableMetadata } from "./types";

const getCachedSearchIndex = createCachedLoader(buildSearchIndexInternal);

function buildSearchIndexInternal(): SearchableMetadata[] {
  return [
    ...getSiteSearchMetadata(),
    ...getNavigationSearchMetadata(),
    ...getProjectSearchMetadata(),
    ...getTechnologySearchMetadata(),
    ...getTimelineSearchMetadata(),
    ...getActivitySearchMetadata(),
  ];
}

/** Index only - ranking and filtering live in Domain Layer (`lib/domain/search`). */
export function buildSearchIndex(): SearchableMetadata[] {
  return getCachedSearchIndex();
}
