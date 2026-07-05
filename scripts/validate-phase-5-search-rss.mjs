import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

assert(
  existsSync(join(root, "src", "generated", "search-index.json")),
  "Missing compile-time search index at src/generated/search-index.json",
);
assert(
  existsSync(join(root, "scripts", "build-search-index.mjs")),
  "Missing scripts/build-search-index.mjs",
);
assert(
  existsSync(join(root, "src", "lib", "content", "palette-search-index.ts")),
  "Missing palette search index loader",
);
assert(
  existsSync(join(root, "src", "lib", "domain", "search", "palette-ranking.ts")),
  "Missing domain palette ranking",
);
assert(
  existsSync(join(root, "src", "lib", "application", "search", "command-palette-actions.ts")),
  "Missing command palette server action",
);

const palette = read("src/features/palette/CommandPalette.tsx");
assert(
  palette.includes("searchCommandPalette"),
  "Command palette must call server-side search action",
);
assert(
  !palette.includes("MODULE_DEFINITIONS"),
  "Command palette must not filter modules client-side",
);

const writingPage = read("src/app/[locale]/writing/page.tsx");
assert(
  writingPage.includes("noindex: Boolean(q?.trim())"),
  "Writing page must noindex search results when ?q= is present",
);

const feedRoutes = [
  "src/app/feed.xml/route.ts",
  "src/app/ru/feed.xml/route.ts",
  "src/app/uz/feed.xml/route.ts",
  "src/app/projects/feed.xml/route.ts",
];

for (const route of feedRoutes) {
  assert(existsSync(join(root, route)), `Missing RSS route ${route}`);
}

const writingMetadata = read("src/lib/seo/writing-metadata.ts");
assert(
  writingMetadata.includes("rssFeedUrl"),
  "Writing metadata must expose RSS discovery link",
);

const dashboardMetadata = read("src/lib/seo/dashboard-metadata.ts");
assert(
  dashboardMetadata.includes("rssFeedUrl"),
  "Dashboard metadata must expose RSS discovery link",
);

const searchIndex = JSON.parse(read("src/generated/search-index.json"));
assert(Array.isArray(searchIndex), "Search index must be an array");
assert(searchIndex.length >= 12, "Search index must include modules and projects");

const categories = new Set(searchIndex.map((entry) => entry.category));
assert(categories.has("module"), "Search index must include modules");
assert(categories.has("project"), "Search index must include projects");

const writingData = JSON.parse(read("content/writing/index.json"));
const publishedNotes = (writingData.notes ?? []).filter(
  (note) => note.publishStatus === "published",
);

if (publishedNotes.length > 0) {
  assert(categories.has("article"), "Search index must include published articles");
}

if (failures.length > 0) {
  console.error("Phase 5.6/5.8 search + RSS audit failed:\n");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Phase 5.6/5.8 search + RSS audit passed.");
console.log(`- Compile-time search index: ${searchIndex.length} entries`);
console.log("- Command palette wired to server-side search");
console.log("- Writing ?q= noindex metadata present");
console.log("- RSS routes: feed.xml, ru/feed.xml, uz/feed.xml, projects/feed.xml");
