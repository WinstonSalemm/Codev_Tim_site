import { listProjectRegistryMeta } from "@/lib/content/project-registry";
import { toRfc822Date } from "./format-date";
import type { RSSEntry, RSSFeedDescriptor } from "./types";

const FEED_AUTHOR = "Timur";
const PROJECT_FEED_BASE_DATE = Date.UTC(2026, 0, 1);

function resolveProjectLink(siteUrl: string, slug: string): string {
  return `${siteUrl}/en/projects/${slug}`;
}

function resolveProjectPubDate(order: number, since: string | null): string {
  if (since) {
    return toRfc822Date(since);
  }

  return toRfc822Date(new Date(PROJECT_FEED_BASE_DATE + order * 86_400_000));
}

export function buildProjectsRssFeed(siteUrl: string): RSSFeedDescriptor {
  const metas = [...listProjectRegistryMeta()].sort(
    (left, right) => left.order - right.order
  );

  const items: RSSEntry[] = metas.map((meta) => {
    const link = resolveProjectLink(siteUrl, meta.slug);

    return {
      title: meta.title,
      link,
      guid: link,
      pubDate: resolveProjectPubDate(meta.order, meta.since),
      description: meta.summary,
      category: meta.domain,
      author: FEED_AUTHOR,
    };
  });

  const feedUrl = `${siteUrl}/projects/feed.xml`;
  const lastBuildDate = items.at(-1)?.pubDate ?? toRfc822Date(new Date());

  return {
    title: "Codev_Tim Engineering Records",
    link: feedUrl,
    description: "Engineering Records from the Codev_Tim Product Registry.",
    language: "en",
    lastBuildDate,
    items,
  };
}
