import type { ContentLocale } from "../types";
import { splitProjectMdxSource } from "./project-frontmatter";

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function parseFrontmatterScalar(
  fields: Map<string, string | string[]>,
  key: string
): string {
  const value = fields.get(key);

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Article MDX frontmatter: "${key}" is required.`);
  }

  return value.trim();
}

function parseFrontmatterLines(block: string): Map<string, string | string[]> {
  const fields = new Map<string, string | string[]>();
  const lines = block.split(/\r?\n/);

  for (const line of lines) {
    if (!line || line.trim().length === 0) {
      continue;
    }

    const keyMatch = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (!keyMatch?.[1]) {
      throw new Error(`Invalid article frontmatter line: "${line.trim()}".`);
    }

    const key = keyMatch[1];
    const inlineValue = keyMatch[2] ?? "";

    if (inlineValue.length > 0) {
      fields.set(key, inlineValue.replace(/^["']|["']$/g, ""));
    }
  }

  return fields;
}

export function parseArticleMdxSource(
  source: string,
  slug: string,
  locale: ContentLocale
) {
  const { frontmatter, body } = splitProjectMdxSource(source);
  const fields = parseFrontmatterLines(frontmatter);

  const title = parseFrontmatterScalar(fields, "title");
  const summary = parseFrontmatterScalar(fields, "summary");
  const datePublished = parseFrontmatterScalar(fields, "datePublished");
  const dateModified = parseFrontmatterScalar(fields, "dateModified");

  if (
    !ISO_DATE_PATTERN.test(datePublished) ||
    !ISO_DATE_PATTERN.test(dateModified)
  ) {
    throw new Error(
      `Invalid article MDX frontmatter for "${slug}" (${locale}): dates must be YYYY-MM-DD.`
    );
  }

  if (body.trim().length === 0) {
    throw new Error(
      `Invalid article MDX for "${slug}" (${locale}): body is empty.`
    );
  }

  return {
    slug,
    locale,
    frontmatter: {
      title,
      summary,
      datePublished,
      dateModified,
    },
    body: body.trim(),
  };
}
