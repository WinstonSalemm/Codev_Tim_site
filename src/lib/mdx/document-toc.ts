import { slugifyHeadingText } from "./heading-id";

export type DocumentTocEntry = {
  id: string;
  title: string;
  level: 2 | 3 | 4;
};

/** Resolve hash fragment to a known TOC entry id. */
export function resolveTocHashTarget(
  hash: string,
  entries: DocumentTocEntry[]
): string | null {
  const id = hash.replace(/^#/, "").trim();

  if (!id) {
    return null;
  }

  if (entries.some((entry) => entry.id === id)) {
    return id;
  }

  const slugMatch = entries.find(
    (entry) => slugifyHeadingText(entry.title) === id
  );

  return slugMatch?.id ?? null;
}
