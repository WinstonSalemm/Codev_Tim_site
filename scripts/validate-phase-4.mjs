/**
 * Phase 4 Engineering Record release gate audit.
 * Run: npm run phase4:audit
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT_DIR = path.join(ROOT, "content", "projects");
const PUBLIC_OG_DIR = path.join(ROOT, "public", "og");

const REQUIRED_SECTIONS = [
  "Overview",
  "Problem Statement",
  "Business Context",
  "System Blueprint",
  "Technology Stack",
  "Trade-offs",
  "Roadmap",
  "Interface Record",
  "Lessons Recorded",
];

const P0_SLUGS = ["codev-erp", "poj-pro-platform"];
const LOCALES = ["en", "ru", "uz"];
const PLACEHOLDER_PATTERNS = [
  /Placeholder —/i,
  /Заглушка —/i,
  /Joy egasi —/i,
  /lorem ipsum/i,
];

const results = [];
let errorCount = 0;
let warnCount = 0;

function pass(name, detail) {
  results.push({ level: "PASS", name, detail });
}

function fail(name, detail) {
  results.push({ level: "FAIL", name, detail });
  errorCount += 1;
}

function warn(name, detail) {
  results.push({ level: "WARN", name, detail });
  warnCount += 1;
}

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function fileExists(filePath) {
  return fs.existsSync(filePath);
}

function auditSeoLayer() {
  const projectMetadata = read(path.join(ROOT, "src", "lib", "seo", "project-metadata.ts"));
  const projectPage = read(path.join(ROOT, "src", "app", "[locale]", "projects", "[slug]", "page.tsx"));
  const jsonLdBuilder = path.join(ROOT, "src", "lib", "seo", "build-project-json-ld.ts");
  const ogResolver = path.join(ROOT, "src", "lib", "seo", "resolve-project-og-image.ts");
  const messages = read(path.join(ROOT, "messages", "en.json"));

  if (messages.includes("{title} — Engineering Record — Codev_Tim")) {
    pass("Metadata title template", "{Product} — Engineering Record — Codev_Tim");
  } else {
    fail("Metadata title template", "Missing canonical title pattern in messages/en.json");
  }

  if (projectMetadata.includes("resolveProjectOgImagePath")) {
    pass("OG image fallback resolver", "resolveProjectOgImagePath wired in project-metadata");
  } else {
    fail("OG image fallback resolver", "project-metadata.ts missing OG resolver");
  }

  if (fileExists(jsonLdBuilder)) {
    const source = read(jsonLdBuilder);
    if (
      source.includes("TechArticle") &&
      source.includes("SoftwareApplication") &&
      source.includes("BreadcrumbList")
    ) {
      pass("JSON-LD builder", "TechArticle + SoftwareApplication + BreadcrumbList");
    } else {
      fail("JSON-LD builder", "Missing required schema types");
    }
  } else {
    fail("JSON-LD builder", "build-project-json-ld.ts not found");
  }

  if (projectPage.includes("JsonLdScript") && projectPage.includes("buildProjectJsonLd")) {
    pass("JSON-LD render", "Project page renders JsonLdScript");
  } else {
    fail("JSON-LD render", "Project page missing JsonLdScript");
  }

  if (fileExists(ogResolver)) {
    pass("OG resolver module", "resolve-project-og-image.ts present");
  } else {
    fail("OG resolver module", "resolve-project-og-image.ts not found");
  }

  if (fileExists(path.join(PUBLIC_OG_DIR, "default.png"))) {
    pass("Default OG asset", "public/og/default.png exists");
  } else {
    fail("Default OG asset", "public/og/default.png missing");
  }
}

function auditUiLayer() {
  const layout = read(path.join(ROOT, "src", "components", "modules", "engineering-record", "ProjectDocLayout.tsx"));
  const drilldown = read(path.join(ROOT, "src", "components", "modules", "product-registry", "ProductCard.tsx"));
  const slugLayout = read(path.join(ROOT, "src", "app", "[locale]", "projects", "[slug]", "layout.tsx"));
  const mdxRegistry = read(
    path.join(ROOT, "src", "lib", "mdx", "engineering-record-mdx-components.server.tsx"),
  );

  if (layout.includes("EngineeringRecordBreadcrumb")) {
    pass("Breadcrumbs", "EngineeringRecordBreadcrumb wired in ProjectDocLayout");
  } else {
    fail("Breadcrumbs", "ProjectDocLayout missing breadcrumb");
  }

  if (layout.includes("ProjectDocTocNav") && layout.includes("ProjectDocFooterNav")) {
    pass("TOC + prev/next", "ProjectDocLayout includes TOC and footer navigation");
  } else {
    fail("TOC + prev/next", "Missing TOC or footer navigation");
  }

  if (
    drilldown.includes("REGISTRY_DRILLDOWN_SESSION_KEY") &&
    slugLayout.includes("EngineeringRecordEnterMotion")
  ) {
    pass("Drill-down transition", "Registry session flag + enter motion layout");
  } else {
    fail("Drill-down transition", "Drill-down wiring incomplete");
  }

  const requiredComponents = [
    "Callout",
    "TradeoffTable",
    "CodeBlock",
    "ScreenshotFrame",
    "ArchitectureDiagram",
    "InterfaceRecordGallery",
  ];

  const missingComponents = requiredComponents.filter((name) => !mdxRegistry.includes(name));
  if (missingComponents.length === 0) {
    pass("MDX component registry", requiredComponents.join(", "));
  } else {
    fail("MDX component registry", `Missing: ${missingComponents.join(", ")}`);
  }
}

function auditContent() {
  const slugs = fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  for (const slug of slugs) {
    for (const locale of LOCALES) {
      const filePath = path.join(CONTENT_DIR, slug, `index.${locale}.mdx`);
      if (!fileExists(filePath)) {
        fail(`Content ${slug}/${locale}`, "MDX file missing");
        continue;
      }

      const source = read(filePath);
      for (const heading of REQUIRED_SECTIONS) {
        if (!source.includes(`## ${heading}`)) {
          fail(`Content ${slug}/${locale}`, `Missing section: ${heading}`);
        }
      }

      if (P0_SLUGS.includes(slug)) {
        for (const pattern of PLACEHOLDER_PATTERNS) {
          if (pattern.test(source)) {
            fail(`Content ${slug}/${locale}`, `Placeholder pattern detected: ${pattern}`);
          }
        }
      }
    }
  }

  pass("Content structure", `${slugs.length} projects × ${LOCALES.length} locales checked`);
}

function auditArchitecture() {
  const contract = read(path.join(ROOT, "docs", "20_PHASE_4_CONTRACT.md"));
  const loadRecord = read(path.join(ROOT, "src", "lib", "application", "projects", "load-project-record.ts"));

  if (loadRecord.includes("server-only") || loadRecord.includes('"server-only"')) {
    pass("Architecture boundary", "loadProjectRecord is server-only");
  } else {
    warn("Architecture boundary", "load-project-record.ts missing explicit server-only import");
  }

  if (contract.includes("Presentation") && contract.includes("loadProjectRecord")) {
    pass("Phase 4 contract", "Presentation → Application boundary documented");
  } else {
    warn("Phase 4 contract", "Contract reference incomplete");
  }
}

function auditAccessibility() {
  const a11yScript = path.join(ROOT, "scripts", "validate-a11y-tokens.mjs");
  if (fileExists(a11yScript)) {
    pass("Accessibility tokens", "validate-a11y-tokens.mjs present");
  } else {
    fail("Accessibility tokens", "Missing a11y validation script");
  }

  const lightbox = read(
    path.join(ROOT, "src", "components", "mdx", "engineering-record", "ScreenshotLightbox.tsx"),
  );
  if (lightbox.includes('role="dialog"') && lightbox.includes("aria-modal")) {
    pass("Gallery lightbox ARIA", "Modal dialog semantics present");
  } else {
    fail("Gallery lightbox ARIA", "ScreenshotLightbox missing dialog semantics");
  }
}

function auditEls() {
  const forbidden = ["amazing", "innovative", "cutting-edge", "world-class", "passionate"];
  let violations = [];

  for (const slug of P0_SLUGS) {
    const source = read(path.join(CONTENT_DIR, slug, "index.en.mdx"));
    for (const word of forbidden) {
      if (source.toLowerCase().includes(word)) {
        violations.push(`${slug}: ${word}`);
      }
    }
  }

  if (violations.length === 0) {
    pass("ELS forbidden adjectives", "P0 records clean");
  } else {
    fail("ELS forbidden adjectives", violations.join("; "));
  }
}

function auditPerformanceResponsiveness() {
  const registryCss = read(path.join(ROOT, "src", "styles", "registry.css"));
  const erCss = read(path.join(ROOT, "src", "styles", "engineering-record.css"));
  const mdxCss = read(path.join(ROOT, "src", "styles", "mdx-engineering-record.css"));

  if (registryCss.includes("prefers-reduced-motion") || erCss.includes("prefers-reduced-motion")) {
    pass("Reduced motion", "CSS gates motion under prefers-reduced-motion");
  } else {
    warn("Reduced motion", "Limited reduced-motion coverage detected");
  }

  if (mdxCss.includes("48rem") && mdxCss.includes("ds-mdx-interface-gallery")) {
    pass("Responsive gallery", "Interface gallery responsive breakpoint present");
  } else {
    warn("Responsive gallery", "Gallery responsive rules not confirmed");
  }

  if (erCss.includes("720px") || erCss.includes("--er-content-width")) {
    pass("Content width constraint", "Engineering Record prose width bounded");
  } else {
    warn("Content width constraint", "720px content width not confirmed in CSS");
  }
}

console.log("Codev_Tim — Phase 4 Release Gate Audit\n");

auditSeoLayer();
auditUiLayer();
auditContent();
auditArchitecture();
auditAccessibility();
auditEls();
auditPerformanceResponsiveness();

for (const result of results) {
  const prefix =
    result.level === "PASS" ? "[PASS]" : result.level === "WARN" ? "[WARN]" : "[FAIL]";
  console.log(`${prefix} ${result.name}${result.detail ? ` — ${result.detail}` : ""}`);
}

console.log(`\nSummary: ${errorCount} failure(s), ${warnCount} warning(s).`);

if (errorCount > 0) {
  console.log("\nRESULT: FAIL");
  process.exit(1);
}

console.log("\nRESULT: PASS");
if (warnCount > 0) {
  console.log("Warnings present — review recommended but gate cleared.");
}
