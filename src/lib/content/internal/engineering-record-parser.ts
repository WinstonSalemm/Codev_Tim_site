import type {
  ContentLocale,
  EngineeringRecordSection,
  ProjectEngineeringRecord,
  ProjectMdxDocument,
} from "../types";
import {
  ENGINEERING_RECORD_SECTION_HEADINGS,
  ENGINEERING_RECORD_SECTION_ORDER,
  resolveEngineeringRecordSectionId,
} from "./engineering-record-sections";
import {
  parseEngineeringRecordFrontmatter,
  splitProjectMdxSource,
} from "./project-frontmatter";

function parseEngineeringRecordSections(
  body: string,
  slug: string,
  locale: ContentLocale
): EngineeringRecordSection[] {
  const headingPattern = /^## (.+)$/gm;
  const matches = [...body.matchAll(headingPattern)];

  if (matches.length === 0) {
    throw new Error(
      `Invalid Engineering Record for "${slug}" (${locale}): no ## sections found.`
    );
  }

  const sections: EngineeringRecordSection[] = [];

  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index];
    if (!match?.[1] || match.index === undefined) {
      throw new Error(
        `Invalid Engineering Record for "${slug}" (${locale}): malformed section heading.`
      );
    }

    const heading = match[1].trim();
    const sectionId = resolveEngineeringRecordSectionId(heading);

    if (!sectionId) {
      throw new Error(
        `Invalid Engineering Record for "${slug}" (${locale}): unknown section heading "${heading}".`
      );
    }

    const contentStart = match.index + match[0].length;
    const nextMatch = matches[index + 1];
    const contentEnd = nextMatch?.index ?? body.length;
    const sectionBody = body.slice(contentStart, contentEnd).trim();

    if (sectionBody.length === 0) {
      throw new Error(
        `Invalid Engineering Record for "${slug}" (${locale}): section "${heading}" is empty.`
      );
    }

    sections.push({
      id: sectionId,
      title: ENGINEERING_RECORD_SECTION_HEADINGS[sectionId],
      body: sectionBody,
    });
  }

  for (
    let index = 0;
    index < ENGINEERING_RECORD_SECTION_ORDER.length;
    index += 1
  ) {
    const expectedId = ENGINEERING_RECORD_SECTION_ORDER[index];
    const actual = sections[index];

    if (!expectedId || !actual || actual.id !== expectedId) {
      const expectedHeading = expectedId
        ? ENGINEERING_RECORD_SECTION_HEADINGS[expectedId]
        : "unknown";
      throw new Error(
        `Invalid Engineering Record for "${slug}" (${locale}): expected section "${expectedHeading}" at position ${index + 1}.`
      );
    }
  }

  if (sections.length !== ENGINEERING_RECORD_SECTION_ORDER.length) {
    throw new Error(
      `Invalid Engineering Record for "${slug}" (${locale}): expected ${ENGINEERING_RECORD_SECTION_ORDER.length} sections, found ${sections.length}.`
    );
  }

  return sections;
}

export function parseEngineeringRecord(
  source: string,
  slug: string,
  locale: ContentLocale
): ProjectEngineeringRecord {
  if (source.trim().length === 0) {
    throw new Error(`Empty project MDX for "${slug}" (${locale}).`);
  }

  const { frontmatter, body } = splitProjectMdxSource(source);

  return {
    locale,
    slug,
    source,
    frontmatter: parseEngineeringRecordFrontmatter(frontmatter, slug, locale),
    sections: parseEngineeringRecordSections(body, slug, locale),
  };
}

export function parseProjectMdxSource(
  source: string,
  slug: string,
  locale: ContentLocale
): ProjectMdxDocument {
  const record = parseEngineeringRecord(source, slug, locale);

  return {
    locale: record.locale,
    slug: record.slug,
    source: record.source,
    record,
  };
}
