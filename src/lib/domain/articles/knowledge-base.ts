import { getArticles } from "@/lib/content";
import type { Article } from "@/lib/content/types";
import {
  RECENT_ARTICLES_LIMIT,
  RELATED_ARTICLES_LIMIT,
} from "../shared/constants";
import type { ArticleCardVM, KnowledgeBaseVM } from "./view-models";

function buildArticleViewModelFromRecord(article: Article): ArticleCardVM {
  return {
    slug: article.slug,
    title: article.title,
    summary: article.summary,
    category: article.category,
    cluster: article.cluster,
    tags: article.tags,
    datePublished: article.datePublished,
    readingTime: article.readingTime,
  };
}

export function buildKnowledgeBase(): KnowledgeBaseVM {
  const notes = getArticles().map(buildArticleViewModelFromRecord);

  return {
    notes,
    count: notes.length,
  };
}

export function selectRecentArticles(
  limit = RECENT_ARTICLES_LIMIT
): ArticleCardVM[] {
  return getArticles().slice(0, limit).map(buildArticleViewModelFromRecord);
}

export function buildArticleViewModel(slug: string): ArticleCardVM | undefined {
  const articles = getArticles();
  const article = articles.find((entry) => entry.slug === slug);
  return article ? buildArticleViewModelFromRecord(article) : undefined;
}

export function selectRelatedArticles(
  slug: string,
  limit = RELATED_ARTICLES_LIMIT
): ArticleCardVM[] {
  const source = getArticles().find((entry) => entry.slug === slug);
  if (!source) {
    return [];
  }

  const sourceTags = new Set(source.tags);

  return getArticles()
    .filter((article) => article.slug !== slug)
    .map((article) => {
      const sharedTags = article.tags.filter((tag) =>
        sourceTags.has(tag)
      ).length;

      return { article, sharedTags };
    })
    .sort((left, right) => right.sharedTags - left.sharedTags)
    .slice(0, limit)
    .map(({ article }) => buildArticleViewModelFromRecord(article));
}
