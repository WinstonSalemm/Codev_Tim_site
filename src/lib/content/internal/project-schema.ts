import type {
  ProductStatus,
  ProjectArchitectureLayer,
  ProjectLinks,
  ProjectMeta,
} from "../types";
import { assertValidProjectSlug } from "./slug";

const PRODUCT_STATUSES: ProductStatus[] = [
  "Production",
  "In Development",
  "Experimental",
  "Archived",
];

const ARCHITECTURE_LAYERS: ProjectArchitectureLayer[] = [
  "Client",
  "Gateway",
  "API",
  "Services",
  "Database",
  "Infrastructure",
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isProductStatus(value: string): value is ProductStatus {
  return PRODUCT_STATUSES.includes(value as ProductStatus);
}

function isArchitectureLayer(value: string): value is ProjectArchitectureLayer {
  return ARCHITECTURE_LAYERS.includes(value as ProjectArchitectureLayer);
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function parseStringArray(raw: unknown, field: string): string[] {
  if (!Array.isArray(raw) || !raw.every((item) => typeof item === "string")) {
    throw new Error(`Invalid project meta: "${field}" must be string[].`);
  }

  return raw;
}

function parseNullableString(raw: unknown): string | null {
  if (raw === null) {
    return null;
  }

  if (typeof raw !== "string") {
    throw new Error("Invalid project meta: expected string or null.");
  }

  return raw;
}

function parseLinks(raw: unknown): ProjectLinks {
  if (!isRecord(raw)) {
    throw new Error('Invalid project meta: "links" must be an object.');
  }

  const links: ProjectLinks = {};

  if (raw.github !== undefined) {
    if (typeof raw.github !== "string" || !isHttpUrl(raw.github)) {
      throw new Error('Invalid project meta: "links.github" must be a URL.');
    }
    links.github = raw.github;
  }

  if (raw.external !== undefined) {
    if (typeof raw.external !== "string" || !isHttpUrl(raw.external)) {
      throw new Error('Invalid project meta: "links.external" must be a URL.');
    }
    links.external = raw.external;
  }

  return links;
}

/**
 * Raw project meta shape as stored in content/projects/{slug}/meta.json.
 * Replace runtime parsing with Zod when zod is installed:
 * `export const ProjectMetaSchema = z.object({ ... })`
 */
export interface ProjectMetaInput {
  slug: string;
  title: string;
  subtitle: string;
  status: ProductStatus;
  domain: string;
  summary: string;
  stack: string[];
  version: string | null;
  architecture: ProjectArchitectureLayer[];
  featured: boolean;
  order: number;
  since: string | null;
  links: ProjectLinks;
  tags: string[];
}

export function parseProjectMeta(
  raw: unknown,
  directorySlug: string
): ProjectMeta {
  if (!isRecord(raw)) {
    throw new Error(
      `Invalid project meta for "${directorySlug}": expected object.`
    );
  }

  if (
    typeof raw.slug !== "string" ||
    typeof raw.title !== "string" ||
    typeof raw.subtitle !== "string" ||
    typeof raw.status !== "string" ||
    !isProductStatus(raw.status) ||
    typeof raw.domain !== "string" ||
    typeof raw.summary !== "string" ||
    typeof raw.featured !== "boolean" ||
    typeof raw.order !== "number" ||
    !Number.isFinite(raw.order)
  ) {
    throw new Error(`Invalid project meta shape for "${directorySlug}".`);
  }

  if (raw.subtitle.trim().length === 0) {
    throw new Error(
      `Invalid project meta for "${directorySlug}": subtitle is required.`
    );
  }

  assertValidProjectSlug(raw.slug, `meta.json (${directorySlug})`);

  if (raw.slug !== directorySlug) {
    throw new Error(
      `Project meta slug mismatch: directory "${directorySlug}" vs meta "${raw.slug}".`
    );
  }

  const stack = parseStringArray(raw.stack, "stack");
  if (stack.length === 0) {
    throw new Error(
      `Invalid project meta for "${directorySlug}": stack requires min 1 item.`
    );
  }

  const architecture = parseStringArray(raw.architecture, "architecture");
  if (architecture.length < 2) {
    throw new Error(
      `Invalid project meta for "${directorySlug}": architecture requires min 2 layers.`
    );
  }

  if (!architecture.every(isArchitectureLayer)) {
    throw new Error(
      `Invalid project meta for "${directorySlug}": unknown architecture layer.`
    );
  }

  const tags = parseStringArray(raw.tags, "tags");

  return {
    slug: raw.slug,
    title: raw.title,
    subtitle: raw.subtitle,
    status: raw.status,
    domain: raw.domain,
    summary: raw.summary,
    stack,
    version: parseNullableString(raw.version),
    architecture,
    featured: raw.featured,
    order: raw.order,
    since: parseNullableString(raw.since),
    links: parseLinks(raw.links ?? {}),
    tags,
  };
}

/** Future Zod migration hook — assign when zod is installed. */
export type ProjectMetaSchema = unknown;
