import type { ArticleCategory } from "@/lib/content/types";

export const KNOWLEDGE_BASE_CATEGORIES: ArticleCategory[] = [
  "Architecture",
  "Product",
  "Process",
  "Infrastructure",
  "Domain",
];

export type KnowledgeBaseQueryState = {
  tag?: string;
  cluster?: string;
  category?: ArticleCategory;
  page: number;
};

export const DEFAULT_KNOWLEDGE_BASE_PAGE = 1;
