import { createCachedLoader } from "./internal/cache";
import { loadArticlesIndex } from "./internal/sources";
import type { Article, ArticlesIndex, SearchableMetadata } from "./types";
import { getSiteConfig } from "./config";

const getCachedArticlesIndex = createCachedLoader(loadArticlesIndex);

export function getArticlesIndex(): ArticlesIndex {
  return getCachedArticlesIndex();
}

export function getArticles(): Article[] {
  return getArticlesIndex()
    .notes.filter((article) => article.publishStatus === "published")
    .sort((left, right) =>
      right.datePublished.localeCompare(left.datePublished)
    );
}

export function getArticle(slug: string): Article | undefined {
  return getArticles().find((article) => article.slug === slug);
}

export function getArticleSearchMetadata(): SearchableMetadata[] {
  const { defaultLocale } = getSiteConfig();

  return getArticles().map((article) => ({
    id: `article:${article.slug}`,
    title: article.title,
    slug: article.slug,
    summary: article.summary,
    tags: article.tags,
    keywords: [
      article.title,
      article.slug,
      article.summary,
      article.category,
      article.cluster,
      ...article.tags,
    ],
    category: "article",
    language: defaultLocale,
    href: `/writing/${article.slug}`,
  }));
}
