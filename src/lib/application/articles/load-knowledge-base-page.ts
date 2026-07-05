import {
  applyKnowledgeBaseQuery,
  DEFAULT_KNOWLEDGE_BASE_PAGE,
  KNOWLEDGE_BASE_CATEGORIES,
  isKnowledgeBaseEmpty,
  type KnowledgeBaseQueryState,
} from "@/lib/domain/articles";
import type { ArticleCategory } from "@/lib/content/types";

export type {
  KnowledgeBaseQueryState,
  KnowledgeBasePageVM,
  ArticleNoteVM,
} from "@/lib/domain/articles";

export {
  DEFAULT_KNOWLEDGE_BASE_PAGE,
  KNOWLEDGE_BASE_CATEGORIES,
  hasActiveKnowledgeBaseFilters,
} from "@/lib/domain/articles";

function parseCategoryParam(
  param: string | undefined
): ArticleCategory | undefined {
  if (!param || !KNOWLEDGE_BASE_CATEGORIES.includes(param as ArticleCategory)) {
    return undefined;
  }

  return param as ArticleCategory;
}

function parsePageParam(param: string | undefined): number {
  const parsed = Number.parseInt(param ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0
    ? parsed
    : DEFAULT_KNOWLEDGE_BASE_PAGE;
}

export function parseKnowledgeBaseQuery(params: {
  tag?: string;
  cluster?: string;
  category?: string;
  page?: string;
}): KnowledgeBaseQueryState {
  return {
    tag: params.tag?.trim() || undefined,
    cluster: params.cluster?.trim() || undefined,
    category: parseCategoryParam(params.category),
    page: parsePageParam(params.page),
  };
}

export function buildKnowledgeBaseSearchParams(
  state: KnowledgeBaseQueryState
): URLSearchParams {
  const params = new URLSearchParams();

  if (state.tag) {
    params.set("tag", state.tag);
  }

  if (state.cluster) {
    params.set("cluster", state.cluster);
  }

  if (state.category) {
    params.set("category", state.category);
  }

  if (state.page > DEFAULT_KNOWLEDGE_BASE_PAGE) {
    params.set("page", String(state.page));
  }

  return params;
}

export function buildKnowledgeBaseQueryString(
  state: KnowledgeBaseQueryState
): string {
  return buildKnowledgeBaseSearchParams(state).toString();
}

export function loadKnowledgeBasePage(rawParams: {
  tag?: string;
  cluster?: string;
  category?: string;
  page?: string;
}) {
  const query = parseKnowledgeBaseQuery(rawParams);
  const page = applyKnowledgeBaseQuery(query);

  return {
    page,
    query,
  };
}

export { isKnowledgeBaseEmpty };
