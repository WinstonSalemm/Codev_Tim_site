import "server-only";

import type { ProjectRecordSectionVM } from "@/lib/domain/projects";
import { createScopedHeadingId, ensureUniqueHeadingId } from "./heading-id";
import type { DocumentTocEntry } from "./document-toc";

export type { DocumentTocEntry } from "./document-toc";
export { resolveTocHashTarget } from "./document-toc";

function extractMarkdownSubheadings(
  sectionId: string,
  body: string
): { rawId: string; title: string; level: 3 | 4 }[] {
  const headings: { rawId: string; title: string; level: 3 | 4 }[] = [];

  for (const line of body.split(/\r?\n/)) {
    const trimmed = line.trim();

    const h3Match = /^###\s+(.+)$/.exec(trimmed);
    if (h3Match?.[1]) {
      headings.push({
        rawId: createScopedHeadingId(h3Match[1], sectionId),
        title: h3Match[1].trim(),
        level: 3,
      });
      continue;
    }

    const h4Match = /^####\s+(.+)$/.exec(trimmed);
    if (h4Match?.[1]) {
      headings.push({
        rawId: createScopedHeadingId(h4Match[1], sectionId),
        title: h4Match[1].trim(),
        level: 4,
      });
    }
  }

  return headings;
}

/**
 * Build document TOC from canonical section headings and in-body MDX subheadings.
 */
export function buildDocumentToc(
  sections: ProjectRecordSectionVM[]
): DocumentTocEntry[] {
  const entries: DocumentTocEntry[] = [];
  const usedIds = new Set<string>();

  for (const section of sections) {
    entries.push({
      id: ensureUniqueHeadingId(section.id, usedIds),
      title: section.title,
      level: 2,
    });

    for (const heading of extractMarkdownSubheadings(
      section.id,
      section.body
    )) {
      entries.push({
        id: ensureUniqueHeadingId(heading.rawId, usedIds),
        title: heading.title,
        level: heading.level,
      });
    }
  }

  return entries;
}
