import type { Article, ArticleCategory, PublishStatus } from "../types";

export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  "Architecture",
  "Product",
  "Process",
  "Infrastructure",
  "Domain",
];

export const PUBLISH_STATUSES: PublishStatus[] = [
  "published",
  "draft",
  "archived",
];

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isArticleCategory(value: string): value is ArticleCategory {
  return ARTICLE_CATEGORIES.includes(value as ArticleCategory);
}

function isPublishStatus(value: string): value is PublishStatus {
  return PUBLISH_STATUSES.includes(value as PublishStatus);
}

function parseStringArray(raw: unknown, field: string, slug: string): string[] {
  if (!Array.isArray(raw)) {
    throw new Error(
      `Invalid article meta for "${slug}": "${field}" must be an array.`
    );
  }

  return raw.filter((item): item is string => typeof item === "string");
}

function parseNullableNumber(
  raw: unknown,
  field: string,
  slug: string
): number | null {
  if (raw === null) {
    return null;
  }

  if (typeof raw !== "number") {
    throw new Error(
      `Invalid article meta for "${slug}": "${field}" must be number or null.`
    );
  }

  return raw;
}

function parseNullableOrder(raw: unknown, slug: string): number | null {
  if (raw === null) {
    return null;
  }

  if (typeof raw !== "number") {
    throw new Error(
      `Invalid article meta for "${slug}": "order" must be number or null.`
    );
  }

  return raw;
}

export function parseArticleMeta(raw: unknown, slug: string): Article {
  if (!isRecord(raw)) {
    throw new Error(`Invalid article meta for "${slug}": expected object.`);
  }

  if (typeof raw.slug !== "string" || raw.slug !== slug) {
    throw new Error(`Invalid article meta for "${slug}": slug mismatch.`);
  }

  if (
    typeof raw.title !== "string" ||
    typeof raw.summary !== "string" ||
    typeof raw.category !== "string" ||
    !isArticleCategory(raw.category) ||
    typeof raw.cluster !== "string" ||
    typeof raw.datePublished !== "string" ||
    !ISO_DATE_PATTERN.test(raw.datePublished) ||
    typeof raw.dateModified !== "string" ||
    !ISO_DATE_PATTERN.test(raw.dateModified) ||
    typeof raw.publishStatus !== "string" ||
    !isPublishStatus(raw.publishStatus)
  ) {
    throw new Error(
      `Invalid article meta for "${slug}": required fields missing or invalid.`
    );
  }

  return {
    slug: raw.slug,
    previousSlugs: parseStringArray(
      raw.previousSlugs ?? [],
      "previousSlugs",
      slug
    ),
    title: raw.title,
    summary: raw.summary,
    category: raw.category,
    cluster: raw.cluster,
    tags: parseStringArray(raw.tags ?? [], "tags", slug),
    relatedProjects: parseStringArray(
      raw.relatedProjects ?? [],
      "relatedProjects",
      slug
    ),
    relatedNotes: parseStringArray(
      raw.relatedNotes ?? [],
      "relatedNotes",
      slug
    ),
    principles: parseStringArray(raw.principles ?? [], "principles", slug),
    datePublished: raw.datePublished,
    dateModified: raw.dateModified,
    readingTime: parseNullableNumber(
      raw.readingTime ?? null,
      "readingTime",
      slug
    ),
    featured: raw.featured === true,
    order: parseNullableOrder(raw.order ?? null, slug),
    publishStatus: raw.publishStatus,
    author: typeof raw.author === "string" ? raw.author : "Timur",
  };
}
