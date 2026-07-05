import {
  buildArticlesRssFeed,
  buildProjectsRssFeed,
  renderRssFeedXml,
} from "@/lib/domain/rss";
import type { ContentLocale } from "@/lib/content/types";
import { getSiteUrl } from "@/lib/seo/site-url";

export function loadArticlesRssFeed(locale: ContentLocale): string {
  const feed = buildArticlesRssFeed(locale, getSiteUrl());
  return renderRssFeedXml(feed);
}

export function loadProjectsRssFeed(): string {
  const feed = buildProjectsRssFeed(getSiteUrl());
  return renderRssFeedXml(feed);
}
