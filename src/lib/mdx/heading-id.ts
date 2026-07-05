const HEADING_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Slugify heading text into a URL-safe fragment id.
 * Scope prefix avoids collisions across sections (e.g. overview--context).
 */
export function slugifyHeadingText(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function createScopedHeadingId(text: string, scope: string): string {
  const slug = slugifyHeadingText(text);

  if (!slug) {
    return scope;
  }

  return `${scope}--${slug}`;
}

export function ensureUniqueHeadingId(
  id: string,
  usedIds: Set<string>
): string {
  if (!usedIds.has(id)) {
    usedIds.add(id);
    return id;
  }

  let index = 2;

  while (usedIds.has(`${id}-${index}`)) {
    index += 1;
  }

  const uniqueId = `${id}-${index}`;
  usedIds.add(uniqueId);
  return uniqueId;
}

export function isValidHeadingId(id: string): boolean {
  return HEADING_ID_PATTERN.test(id);
}
