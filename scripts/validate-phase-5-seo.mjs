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

assert(existsSync(join(root, "public", "og", "default.png")), "Missing public/og/default.png");
assert(existsSync(join(root, "public", "llms.txt")), "Missing public/llms.txt");
assert(existsSync(join(root, "src", "app", "robots.ts")), "Missing src/app/robots.ts");
assert(existsSync(join(root, "src", "app", "sitemap.ts")), "Missing src/app/sitemap.ts");
assert(existsSync(join(root, "src", "lib", "seo", "metadata.ts")), "Missing metadata helper");

const layout = read("src/app/[locale]/layout.tsx");
assert(layout.includes("index: true"), "Locale layout must allow indexing");

const robots = read("src/app/robots.ts");
assert(robots.includes("sitemap.xml"), "robots.ts must reference sitemap.xml");
assert(robots.includes("Disallow: /api/") || robots.includes('"/api/"'), "robots.ts must block /api/");

const seoIndex = read("src/lib/seo/index.ts");
assert(seoIndex.includes("createAboutMetadata"), "SEO exports must include module metadata");
assert(seoIndex.includes("buildPrinciplesJsonLd"), "SEO exports must include JSON-LD builders");

const aboutPage = read("src/app/[locale]/about/page.tsx");
assert(aboutPage.includes("createAboutMetadata"), "About page must use full metadata");
assert(aboutPage.includes("buildAboutJsonLd"), "About page must include Person JSON-LD");

const principlesPage = read("src/app/[locale]/principles/page.tsx");
assert(principlesPage.includes("buildPrinciplesJsonLd"), "Principles page must include JSON-LD");

const writingPage = read("src/app/[locale]/writing/page.tsx");
assert(writingPage.includes("createWritingMetadata"), "Writing page must use full metadata");

const contactPage = read("src/app/[locale]/contact/page.tsx");
assert(contactPage.includes("buildContactJsonLd"), "Contact page must include JSON-LD");

const notFoundPage = read("src/app/[locale]/not-found.tsx");
assert(notFoundPage.includes("createNotFoundMetadata"), "404 must use noindex metadata");

const projectSlugs = [
  "codev-erp",
  "codev-tim",
  "poj-pro-platform",
  "poj-pro-site",
  "assistant-agent",
  "poj-pro-api-contracts",
  "poj-pro-telegram-bots",
];

for (const slug of projectSlugs) {
  assert(
    existsSync(join(root, "public", "og", "projects", `${slug}.png`)),
    `Missing project OG image for ${slug}`,
  );
}

if (failures.length > 0) {
  console.error("Phase 5.5 SEO audit failed:\n");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Phase 5.5 SEO audit passed.");
console.log("- Indexing enabled in locale layout");
console.log("- robots.ts and sitemap.ts present");
console.log("- Full metadata + JSON-LD wired on module routes");
console.log("- OG default and per-project assets present");
console.log("- llms.txt published");
