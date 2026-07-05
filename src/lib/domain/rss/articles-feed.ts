import { getArticles, getSiteConfig } from "@/lib/content";
import type { ContentLocale } from "@/lib/content/types";
import { toRfc822Date } from "./format-date";
import type { RSSEntry, RSSFeedDescriptor } from "./types";

const FEED_AUTHOR = "Timur";

function resolveArticlesFeedUrl(
  locale: ContentLocale,
  siteUrl: string
): string {
  if (locale === "en") {
    return `${siteUrl}/feed.xml`;
  }

  return `${siteUrl}/${locale}/feed.xml`;
}

function resolveArticleLink(
  siteUrl: string,
  locale: ContentLocale,
  slug: string
): string {
  return `${siteUrl}/${locale}/writing/${slug}`;
}

export function buildArticlesRssFeed(
  locale: ContentLocale,
  siteUrl: string
): RSSFeedDescriptor {
  const { defaultLocale } = getSiteConfig();
  const articles = locale === defaultLocale ? getArticles() : [];

  const items: RSSEntry[] = articles.map((article) => {
    const link = resolveArticleLink(siteUrl, defaultLocale, article.slug);

    return {
      title: article.title,
      link,
      guid: link,
      pubDate: toRfc822Date(article.datePublished),
      description: article.summary,
      category: article.category,
      author: article.author || FEED_AUTHOR,
    };
  });

  const feedUrl = resolveArticlesFeedUrl(locale, siteUrl);
  const lastBuildDate = items[0]?.pubDate ?? toRfc822Date(new Date());

  return {
    title: "Codev_Tim Knowledge Base",
    link: feedUrl,
    description: "Engineering Notes from the Codev_Tim Knowledge Base.",
    language: locale,
    lastBuildDate,
    items,
  };
}
