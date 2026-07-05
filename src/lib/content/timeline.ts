import { createCachedLoader } from "./internal/cache";
import { loadExperienceTimeline } from "./internal/sources";
import type { ExperienceTimeline, SearchableMetadata } from "./types";
import { getSiteConfig } from "./config";

const getCachedTimeline = createCachedLoader(loadExperienceTimeline);

export function getTimeline(): ExperienceTimeline {
  return getCachedTimeline();
}

export function getTimelineSearchMetadata(): SearchableMetadata[] {
  const timeline = getTimeline();
  const { defaultLocale } = getSiteConfig();

  return [
    {
      id: "timeline:experience",
      title: timeline.organization,
      slug: "experience",
      summary: timeline.summary,
      tags: ["experience", "timeline"],
      keywords: [timeline.organization, timeline.period, timeline.summary],
      category: "site",
      language: defaultLocale,
      href: "/about",
    },
  ];
}
