import type {
  ContentLocale,
  EngineeringRecordFrontmatter,
  ProductStatus,
} from "../types";

const PRODUCT_STATUSES: ProductStatus[] = [
  "Production",
  "In Development",
  "Experimental",
  "Archived",
];

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function isProductStatus(value: string): value is ProductStatus {
  return PRODUCT_STATUSES.includes(value as ProductStatus);
}

function unquote(value: string): string {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

function parseScalar(raw: string): string | null {
  const trimmed = raw.trim();

  if (trimmed === "null") {
    return null;
  }

  if (trimmed === "") {
    return "";
  }

  return unquote(trimmed);
}

function parseFrontmatterLines(block: string): Map<string, string | string[]> {
  const fields = new Map<string, string | string[]>();
  const lines = block.split(/\r?\n/);
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    index += 1;

    if (!line || line.trim().length === 0) {
      continue;
    }

    const keyMatch = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (!keyMatch) {
      throw new Error(`Invalid frontmatter line: "${line.trim()}".`);
    }

    const key = keyMatch[1];
    const inlineValue = keyMatch[2] ?? "";

    if (!key) {
      throw new Error(`Invalid frontmatter line: "${line.trim()}".`);
    }

    if (inlineValue.length > 0) {
      fields.set(key, parseScalar(inlineValue) ?? "");
      continue;
    }

    const listItems: string[] = [];

    while (index < lines.length) {
      const listLine = lines[index];
      if (!listLine || !/^\s+-\s+/.test(listLine)) {
        break;
      }

      const itemMatch = /^\s+-\s+(.*)$/.exec(listLine);
      if (!itemMatch?.[1]) {
        break;
      }

      listItems.push(unquote(itemMatch[1].trim()));
      index += 1;
    }

    fields.set(key, listItems);
  }

  return fields;
}

function requireStringField(
  fields: Map<string, string | string[]>,
  key: keyof EngineeringRecordFrontmatter,
  slug: string,
  locale: ContentLocale
): string {
  const value = fields.get(key);

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(
      `Invalid Engineering Record frontmatter for "${slug}" (${locale}): "${key}" is required.`
    );
  }

  return value.trim();
}

function requireStringArrayField(
  fields: Map<string, string | string[]>,
  key: keyof EngineeringRecordFrontmatter,
  slug: string,
  locale: ContentLocale
): string[] {
  const value = fields.get(key);

  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(
      `Invalid Engineering Record frontmatter for "${slug}" (${locale}): "${key}" must be a non-empty array.`
    );
  }

  return value.map((item) => item.trim()).filter((item) => item.length > 0);
}

export function splitProjectMdxSource(source: string): {
  frontmatter: string;
  body: string;
} {
  const trimmed = source.trim();

  if (!trimmed.startsWith("---")) {
    throw new Error(
      "Project MDX must begin with YAML frontmatter delimited by ---."
    );
  }

  const closingIndex = trimmed.indexOf("\n---", 3);
  if (closingIndex === -1) {
    throw new Error(
      "Project MDX frontmatter is missing closing --- delimiter."
    );
  }

  const frontmatter = trimmed.slice(3, closingIndex).trim();
  const body = trimmed.slice(closingIndex + 4).trimStart();

  if (frontmatter.length === 0) {
    throw new Error("Project MDX frontmatter block is empty.");
  }

  return { frontmatter, body };
}

export function parseEngineeringRecordFrontmatter(
  block: string,
  slug: string,
  locale: ContentLocale
): EngineeringRecordFrontmatter {
  const fields = parseFrontmatterLines(block);

  const title = requireStringField(fields, "title", slug, locale);
  const subtitle = requireStringField(fields, "subtitle", slug, locale);
  const statusRaw = requireStringField(fields, "status", slug, locale);
  const domain = requireStringField(fields, "domain", slug, locale);
  const updatedAt = requireStringField(fields, "updatedAt", slug, locale);
  const stack = requireStringArrayField(fields, "stack", slug, locale);

  if (!isProductStatus(statusRaw)) {
    throw new Error(
      `Invalid Engineering Record frontmatter for "${slug}" (${locale}): unknown status "${statusRaw}".`
    );
  }

  if (!ISO_DATE_PATTERN.test(updatedAt)) {
    throw new Error(
      `Invalid Engineering Record frontmatter for "${slug}" (${locale}): updatedAt must be YYYY-MM-DD.`
    );
  }

  const versionRaw = fields.get("version");

  if (versionRaw === undefined) {
    throw new Error(
      `Invalid Engineering Record frontmatter for "${slug}" (${locale}): "version" is required (use null when unset).`
    );
  }

  let version: string | null;

  if (typeof versionRaw === "string") {
    version = versionRaw.length === 0 ? null : versionRaw;
  } else if (Array.isArray(versionRaw) && versionRaw.length === 0) {
    version = null;
  } else {
    throw new Error(
      `Invalid Engineering Record frontmatter for "${slug}" (${locale}): "version" must be string or null.`
    );
  }

  return {
    title,
    subtitle,
    version,
    status: statusRaw,
    domain,
    stack,
    updatedAt,
  };
}
