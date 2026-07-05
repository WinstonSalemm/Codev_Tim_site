import { getArticles } from "@/lib/content";
import type { Article, ArticleCategory } from "@/lib/content/types";
import { KNOWLEDGE_BASE_PAGE_SIZE } from "../shared/constants";
import type {
  ArticleCardVM,
  KnowledgeBaseFilterOptionsVM,
  KnowledgeBasePageVM,
} from "./view-models";
import {
  DEFAULT_KNOWLEDGE_BASE_PAGE,
  KNOWLEDGE_BASE_CATEGORIES,
  type KnowledgeBaseQueryState,
} from "./query-types";

function buildArticleCardVM(article: Article): ArticleCardVM {
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

function normalizeFilterValue(value: string | undefined): string | undefined {
  const normalized = value?.trim().toLowerCase();
  return normalized && normalized.length > 0 ? normalized : undefined;
}

function articleMatchesQuery(
  article: Article,
  query: KnowledgeBaseQueryState
): boolean {
  const tag = normalizeFilterValue(query.tag);
  const cluster = normalizeFilterValue(query.cluster);
  const category = query.category;

  if (tag && !article.tags.some((item) => item.toLowerCase() === tag)) {
    return false;
  }

  if (cluster && article.cluster.toLowerCase() !== cluster) {
    return false;
  }

  if (category && article.category !== category) {
    return false;
  }

  return true;
}

function buildFilterOptions(articles: Article[]): KnowledgeBaseFilterOptionsVM {
  const tags = new Set<string>();
  const clusters = new Set<string>();
  const categories = new Set<string>();

  for (const article of articles) {
    for (const tag of article.tags) {
      tags.add(tag);
    }

    clusters.add(article.cluster);
    categories.add(article.category);
  }

  return {
    tags: [...tags].sort((left, right) => left.localeCompare(right)),
    clusters: [...clusters].sort((left, right) => left.localeCompare(right)),
    categories: KNOWLEDGE_BASE_CATEGORIES.filter((category) =>
      categories.has(category)
    ),
  };
}

function resolvePage(page: number, totalPages: number): number {
  if (totalPages === 0) {
    return DEFAULT_KNOWLEDGE_BASE_PAGE;
  }

  if (page < 1) {
    return DEFAULT_KNOWLEDGE_BASE_PAGE;
  }

  if (page > totalPages) {
    return totalPages;
  }

  return page;
}

export function hasActiveKnowledgeBaseFilters(
  query: KnowledgeBaseQueryState
): boolean {
  return Boolean(query.tag || query.cluster || query.category);
}

export function applyKnowledgeBaseQuery(
  query: KnowledgeBaseQueryState
): KnowledgeBasePageVM {
  const filteredArticles = getArticles()
    .filter((article) => articleMatchesQuery(article, query))
    .map(buildArticleCardVM);

  const total = filteredArticles.length;
  const totalPages =
    total === 0 ? 0 : Math.ceil(total / KNOWLEDGE_BASE_PAGE_SIZE);
  const page = resolvePage(query.page, totalPages);
  const start = (page - 1) * KNOWLEDGE_BASE_PAGE_SIZE;
  const notes = filteredArticles.slice(start, start + KNOWLEDGE_BASE_PAGE_SIZE);

  return {
    notes,
    total,
    page,
    pageSize: KNOWLEDGE_BASE_PAGE_SIZE,
    totalPages,
    query: {
      tag: query.tag,
      cluster: query.cluster,
      category: query.category,
      page,
    },
    filterOptions: buildFilterOptions(getArticles()),
  };
}

export function listKnowledgeBaseTags(): string[] {
  return buildFilterOptions(getArticles()).tags;
}

export function listKnowledgeBaseClusters(): string[] {
  return buildFilterOptions(getArticles()).clusters;
}

export function listKnowledgeBaseCategories(): ArticleCategory[] {
  return buildFilterOptions(getArticles()).categories as ArticleCategory[];
}

export function isKnowledgeBaseEmpty(): boolean {
  return getArticles().length === 0;
}

export function isKnowledgeBaseFilteredEmpty(
  query: KnowledgeBaseQueryState
): boolean {
  return (
    getArticles().some((article) => articleMatchesQuery(article, query)) ===
      false &&
    getArticles().length > 0 &&
    hasActiveKnowledgeBaseFilters(query)
  );
}
