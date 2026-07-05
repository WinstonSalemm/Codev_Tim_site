import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const outputDir = join(root, "src", "generated");
const outputPath = join(outputDir, "search-index.json");

const NAVIGATION_ITEMS = [
  {
    id: "operationsCenter",
    href: "/",
    title: "Operations Center",
    shortTitle: "Ops",
  },
  {
    id: "productRegistry",
    href: "/projects",
    title: "Product Registry",
    shortTitle: "Projects",
  },
  {
    id: "engineeringProtocols",
    href: "/principles",
    title: "Engineering Protocols",
    shortTitle: "Protocols",
  },
  {
    id: "knowledgeBase",
    href: "/writing",
    title: "Knowledge Base",
    shortTitle: "Notes",
  },
  {
    id: "engineerProfile",
    href: "/about",
    title: "Engineer Profile",
    shortTitle: "Profile",
  },
  {
    id: "communicationModule",
    href: "/contact",
    title: "Communication Module",
    shortTitle: "Contact",
  },
];

function readJson(relativePath) {
  return JSON.parse(readFileSync(join(root, relativePath), "utf8"));
}

function buildModuleEntries(defaultLocale) {
  return NAVIGATION_ITEMS.map((item) => ({
    id: `module:${item.id}`,
    title: item.title,
    slug: item.id,
    summary: item.shortTitle,
    tags: ["module"],
    keywords: [item.title, item.shortTitle, item.id, item.href],
    category: "module",
    language: defaultLocale,
    href: item.href,
  }));
}

function buildProjectEntries(defaultLocale) {
  const projectsDir = join(root, "content", "projects");
  const slugs = readdirSync(projectsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  return slugs.map((slug) => {
    const meta = readJson(join("content", "projects", slug, "meta.json"));

    return {
      id: `project:${slug}`,
      title: meta.title,
      slug,
      summary: meta.summary,
      tags: [meta.status, ...(meta.tags ?? [])].filter(Boolean),
      keywords: [
        meta.title,
        slug,
        meta.subtitle,
        meta.domain,
        meta.summary,
        meta.status,
        ...(meta.stack ?? []),
        ...(meta.tags ?? []),
      ].filter(Boolean),
      category: "project",
      language: defaultLocale,
      href: `/projects/${slug}`,
    };
  });
}

function buildArticleEntries(defaultLocale) {
  const index = readJson("content/writing/index.json");

  return (index.notes ?? [])
    .filter((note) => note.publishStatus === "published")
    .map((article) => ({
      id: `article:${article.slug}`,
      title: article.title,
      slug: article.slug,
      summary: article.summary,
      tags: article.tags ?? [],
      keywords: [
        article.title,
        article.slug,
        article.summary,
        article.category,
        article.cluster,
        ...(article.tags ?? []),
      ],
      category: "article",
      language: defaultLocale,
      href: `/writing/${article.slug}`,
    }));
}

function buildSearchIndex() {
  const siteConfig = readJson("content/site/config.json");
  const defaultLocale = siteConfig.defaultLocale ?? "en";

  return [
    ...buildModuleEntries(defaultLocale),
    ...buildProjectEntries(defaultLocale),
    ...buildArticleEntries(defaultLocale),
  ];
}

const index = buildSearchIndex();

if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

writeFileSync(outputPath, `${JSON.stringify(index, null, 2)}\n`, "utf8");

console.log(`Search index generated: ${index.length} entries → src/generated/search-index.json`);
