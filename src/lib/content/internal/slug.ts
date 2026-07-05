/**
 * Slug normalization and alias resolution for project content.
 * Canonical slugs: docs/09_PRODUCT_REGISTRY.md
 */

/** Lowercase kebab-case slug pattern. */
export const PROJECT_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Legacy slug redirects — routing applies 301 in Phase 3. */
export const PROJECT_SLUG_ALIASES: Readonly<Record<string, string>> = {
  "erp-platform": "codev-erp",
};

export function normalizeProjectSlug(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function isValidProjectSlug(slug: string): boolean {
  return PROJECT_SLUG_PATTERN.test(slug);
}

export function resolveProjectSlug(input: string): string {
  const normalized = normalizeProjectSlug(input);
  return PROJECT_SLUG_ALIASES[normalized] ?? normalized;
}

export function assertValidProjectSlug(slug: string, context: string): void {
  if (!isValidProjectSlug(slug)) {
    throw new Error(`Invalid project slug "${slug}" in ${context}.`);
  }
}
