import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const locales = ["en", "ru", "uz"];

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

function loadJson(relativePath) {
  return JSON.parse(read(relativePath));
}

function collectKeys(value, prefix = "") {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return Object.entries(value).flatMap(([key, nested]) =>
      collectKeys(nested, prefix ? `${prefix}.${key}` : key),
    );
  }

  return [prefix];
}

function keySet(messages) {
  return new Set(collectKeys(messages));
}

assert(
  existsSync(join(root, "src", "components", "analytics", "DeferredAnalytics.tsx")),
  "Missing deferred analytics component",
);

const analytics = read("src/components/analytics/DeferredAnalytics.tsx");
assert(analytics.includes('strategy="lazyOnload"'), "Analytics scripts must use lazyOnload");
assert(analytics.includes("@vercel/analytics/react"), "Vercel Analytics must be integrated");
assert(
  analytics.includes("NEXT_PUBLIC_GA_MEASUREMENT_ID"),
  "GA4 env var must be referenced",
);
assert(
  analytics.includes("NEXT_PUBLIC_CLARITY_PROJECT_ID"),
  "Clarity env var must be referenced",
);

const layout = read("src/app/[locale]/layout.tsx");
assert(layout.includes("DeferredAnalytics"), "Locale layout must mount deferred analytics");

const missingModule = read("src/components/modules/shared/MissingModulePage.tsx");
assert(missingModule.includes('tErrors("code")'), "404 page must show code");
assert(missingModule.includes("shellHint"), "404 page must show terminal hint");
assert(missingModule.includes("returnAction"), "404 page must link to Operations Center");

const notFoundPage = read("src/app/[locale]/not-found.tsx");
assert(notFoundPage.includes("createNotFoundMetadata"), "Locale not-found must use noindex metadata");

const globalNotFound = read("src/app/not-found.tsx");
assert(globalNotFound.includes("NOINDEX_ROBOTS"), "Global not-found must be noindex");
assert(globalNotFound.includes("MissingModulePage"), "Global not-found must render Missing Module");

assert(
  existsSync(join(root, "src", "app", "[locale]", "[...rest]", "page.tsx")),
  "Missing locale catch-all route for HTTP 404",
);

const enMessages = loadJson("messages/en.json");
const enKeys = keySet(enMessages);

for (const locale of locales.slice(1)) {
  const localeMessages = loadJson(`messages/${locale}.json`);
  const localeKeys = keySet(localeMessages);

  for (const key of enKeys) {
    assert(localeKeys.has(key), `Missing ${locale} translation key: ${key}`);
  }
}

const modulePages = [
  ["src/app/[locale]/page.tsx", "createDashboardMetadata"],
  ["src/app/[locale]/about/page.tsx", "createAboutMetadata"],
  ["src/app/[locale]/principles/page.tsx", "createPrinciplesMetadata"],
  ["src/app/[locale]/writing/page.tsx", "createWritingMetadata"],
  ["src/app/[locale]/contact/page.tsx", "createContactMetadata"],
  ["src/app/[locale]/projects/page.tsx", "createRegistryMetadata"],
  ["src/app/[locale]/projects/[slug]/page.tsx", "createProjectMetadata"],
  ["src/app/[locale]/not-found.tsx", "createNotFoundMetadata"],
];

for (const [pagePath, metadataHelper] of modulePages) {
  const pageSource = read(pagePath);
  assert(
    pageSource.includes(metadataHelper),
    `${pagePath} must use ${metadataHelper}`,
  );
}

const metadataFiles = [
  "dashboard-metadata.ts",
  "about-metadata.ts",
  "principles-metadata.ts",
  "writing-metadata.ts",
  "contact-metadata.ts",
  "registry-metadata.ts",
  "project-metadata.ts",
  "article-metadata.ts",
  "not-found-metadata.ts",
];

for (const metadataFile of metadataFiles) {
  assert(
    existsSync(join(root, "src", "lib", "seo", metadataFile)),
    `Missing metadata helper ${metadataFile}`,
  );
}

if (failures.length > 0) {
  console.error("Phase 5.7/5.9/5.10 audit failed:\n");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Phase 5.7/5.9/5.10 audit passed.");
console.log("- Deferred analytics wired (Vercel, GA4, Clarity)");
console.log("- 404 Missing Module with noindex, path detail, terminal hint");
console.log(`- UI localization keys aligned across ${locales.join(", ")}`);
console.log("- All module metadata helpers present and wired");
