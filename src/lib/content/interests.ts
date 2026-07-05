import { createCachedLoader } from "./internal/cache";
import { loadEngineeringInterests } from "./internal/sources";
import type { EngineeringInterests } from "./types";

const getCachedInterests = createCachedLoader(loadEngineeringInterests);

export function getEngineeringInterests(): EngineeringInterests {
  return getCachedInterests();
}

export function getInterestTags(): string[] {
  return getEngineeringInterests().interests;
}
