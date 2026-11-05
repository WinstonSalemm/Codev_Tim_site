import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { extname, join, relative } from "node:path";

// Server-only redirect configuration intentionally sits outside these roots.
// Binary artwork also needs visual review; this audit cannot read text in pixels.
const root = process.cwd();
const privateBrand =
  /poj[\s_-]*pro|пож[\s_-]*про|tgbotpoj|github\.com\/WinstonSalemm\/projectApp/i;
const secretValue =
  /(?:mysql|postgres(?:ql)?):\/\/[^\s"']+|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|\b\d{8,12}:[A-Za-z0-9_-]{35}\b/;
const textExtensions = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".mjs",
  ".json",
  ".md",
  ".mdx",
  ".html",
  ".css",
  ".svg",
  ".xml",
  ".txt",
  ".webmanifest",
  ".rsc",
  ".body",
]);

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

let checked = 0;
function scan(directory, filter = () => true) {
  for (const file of walk(join(root, directory)).filter(filter)) {
    const name = relative(root, file);
    assert(
      !privateBrand.test(name),
      `Private brand in public file path: ${name}`
    );
    if (!textExtensions.has(extname(file))) continue;
    const text = readFileSync(file, "utf8");
    assert(
      !privateBrand.test(text),
      `Private brand in public content: ${name}`
    );
    assert(
      !secretValue.test(text),
      `Potential credential value in public content: ${name}`
    );
    checked++;
  }
}

for (const directory of ["src", "content", "messages", "public", "apps/fire-safety-store/src", "apps/fire-safety-store/content", "apps/fire-safety-store/data", "apps/fire-safety-store/public"])
  scan(directory);

const canonicalCases = [
  "fire-safety-store",
  "business-operations",
  "document-workflow",
  "staff-telegram-tools",
];
for (const slug of canonicalCases) {
  const meta = JSON.parse(
    readFileSync(join(root, "content/projects", slug, "meta.json"), "utf8")
  );
  assert.equal(meta.slug, slug);
  assert.equal(meta.status, "Archived");
  assert.deepEqual(
    meta.links,
    {},
    `${slug}: no former production or repository links`
  );
  for (const locale of ["ru", "uz", "en"]) {
    assert(
      existsSync(join(root, "content/projects", slug, `index.${locale}.mdx`))
    );
  }
}

const screenshots = JSON.parse(
  readFileSync(join(root, "content/commerce/project-screenshots.json"), "utf8")
);
for (const images of Object.values(screenshots)) {
  for (const image of images) {
    assert(
      image.src.startsWith("/projects/"),
      "Case images must be local public assets"
    );
    assert(
      existsSync(join(root, "public", image.src)),
      `Missing case image: ${image.src}`
    );
    for (const locale of ["ru", "uz", "en"]) assert(image.alt[locale]?.length);
  }
}
for (const name of [
  "dashboard",
  "follow-ups",
  "knowledge",
  "analytics",
  "reports",
]) {
  assert(
    !existsSync(join(root, "public/projects/call-tracker", `${name}.png`)),
    "Withdrawn prospect screenshot must not be served"
  );
}

if (process.argv.includes("--build")) {
  assert(
    existsSync(join(root, ".next/BUILD_ID")),
    "Build audit requires a completed production build"
  );
  scan(".next/static");
  scan("apps/fire-safety-store/.next/static");
  scan("apps/fire-safety-store/.next/server/app", (file) =>
    [".html", ".rsc", ".body"].includes(extname(file))
  );
  // HTML, RSC and feed bodies are public. Server route code/manifests may retain redirect sources.
  scan(".next/server/app", (file) =>
    [".html", ".rsc", ".body"].includes(extname(file))
  );
}

console.log(
  `Public privacy audit passed: ${checked} text assets; canonical cases and image references verified.`
);
console.log(
  "Raster artwork requires separate visual review; source and compiled checks do not replace it."
);
