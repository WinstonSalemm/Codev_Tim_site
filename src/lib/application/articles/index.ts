import {
  buildArticleViewModel,
  buildKnowledgeBase,
  selectRecentArticles,
  selectRelatedArticles,
} from "@/lib/domain/articles";

export {
  parseKnowledgeBaseQuery,
  buildKnowledgeBaseQueryString,
  buildKnowledgeBaseSearchParams,
  DEFAULT_KNOWLEDGE_BASE_PAGE,
  KNOWLEDGE_BASE_CATEGORIES,
  hasActiveKnowledgeBaseFilters,
  loadKnowledgeBasePage,
  isKnowledgeBaseEmpty,
} from "./load-knowledge-base-page";

export function loadKnowledgeBase() {
  return buildKnowledgeBase();
}

export function loadArticle(slug: string) {
  return buildArticleViewModel(slug);
}

export function loadRecentArticles(limit?: number) {
  return selectRecentArticles(limit);
}

export function loadRelatedArticles(slug: string, limit?: number) {
  return selectRelatedArticles(slug, limit);
}
