import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createRequire, Module } from "node:module";
import { join } from "node:path";
import ts from "typescript";

const root = process.cwd();
const require = createRequire(import.meta.url);
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (request, ...args) {
  return originalResolve.call(
    this,
    request.startsWith("@/") ? join(root, "src", request.slice(2)) : request,
    ...args
  );
};
require.extensions[".ts"] = (module, filename) =>
  module._compile(
    ts.transpileModule(readFileSync(filename, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
      },
    }).outputText,
    filename
  );

const {
  getSiteUrl,
  buildAlternateLanguages,
} = require("../src/lib/seo/site-url.ts");
const { buildPageMetadata } = require("../src/lib/seo/metadata.ts");
const {
  resolveProjectOgImagePath,
} = require("../src/lib/seo/resolve-project-og-image.ts");
const { buildOfferJsonLd } = require("../src/lib/seo/build-offer-json-ld.ts");
const { PUBLIC_OFFERS } = require("../src/lib/commerce/catalog.ts");
const {
  quoteOffer,
  DEFAULT_PROMOTIONS,
} = require("../src/lib/commerce/pricing.ts");
const {
  SERVICE_LANDINGS,
  getServiceLanding,
} = require("../src/lib/commerce/service-landings.ts");
const { PORTFOLIO } = require("../src/lib/portfolio.ts");
const { routing } = require("../src/i18n/routing.ts");
const sitemap = require("../src/app/sitemap.ts").default;
const robots = require("../src/app/robots.ts").default;
const read = (path) => readFileSync(join(root, path), "utf8");
const originalSiteUrl = process.env.SITE_URL;

try {
  delete process.env.SITE_URL;
  assert.equal(getSiteUrl(), "https://www.codev-tim.uz");
  process.env.SITE_URL = "  https://example.test/  ";
  assert.equal(getSiteUrl(), "https://example.test");
  process.env.SITE_URL = "https://example.test/subpath";
  assert.throws(getSiteUrl, /HTTP\(S\) origin/);
  process.env.SITE_URL = "https://www.codev-tim.uz";

  for (const slug of ["missing", "toString", "constructor", "__proto__"]) {
    assert.equal(
      getServiceLanding(slug),
      undefined,
      `${slug} must resolve as missing`
    );
  }

  const entries = sitemap();
  assert.equal(
    entries.length,
    (4 + PORTFOLIO.length + Object.keys(SERVICE_LANDINGS).length) *
      routing.locales.length
  );
  assert.equal(new Set(entries.map((entry) => entry.url)).size, entries.length);
  for (const entry of entries) {
    const url = new URL(entry.url);
    const [, locale, ...path] = url.pathname.split("/");
    const suffix = path.length ? `/${path.join("/")}` : "";
    assert.equal(url.origin, getSiteUrl());
    assert(!/\/(writing|principles|manage|api)(\/|$)/.test(url.pathname));
    assert.deepEqual(
      entry.alternates.languages,
      buildAlternateLanguages(suffix)
    );
    assert.equal(entry.alternates.languages[locale], entry.url);
    assert(Number.isFinite(new Date(entry.lastModified).getTime()));
  }

  const robotsData = robots();
  assert.equal(robotsData.sitemap, `${getSiteUrl()}/sitemap.xml`);
  for (const rule of robotsData.rules) {
    const denied = [rule.disallow].flat().filter(Boolean);
    assert(
      !denied.some(
        (path) => path === "/" || path.includes("_next") || path.includes("?")
      ),
      "Public rendering assets and canonical URLs must be crawlable"
    );
  }

  for (const locale of routing.locales) {
    const titles = new Set();
    for (const page of Object.values(SERVICE_LANDINGS)) {
      const canonical = `${getSiteUrl()}/${locale}/services/${page.slug}`;
      const metadata = buildPageMetadata({
        locale,
        title: `${page.seoTitle[locale]} | Codev_Tim`,
        description: page.description[locale],
        canonical,
        alternateLanguages: buildAlternateLanguages(`/services/${page.slug}`),
        ogImageAlt: page.title[locale],
      });
      assert(page.seoTitle[locale].trim().length > 0);
      assert(!titles.has(metadata.title.absolute));
      titles.add(metadata.title.absolute);
      assert.equal(metadata.alternates.languages[locale], canonical);
      assert.equal(metadata.openGraph.url, canonical);
      assert.equal(metadata.openGraph.alternateLocale.length, 2);
      assert.equal(metadata.twitter.card, "summary_large_image");
      assert.equal(metadata.robots.index, true);
      assert(
        existsSync(join(root, "public", metadata.openGraph.images[0].url))
      );
    }
  }

  const dates = [
    new Date(),
    ...DEFAULT_PROMOTIONS.flatMap((promotion) => [
      new Date(promotion.startsAt),
      new Date(promotion.endsAt),
    ]),
  ];
  for (const date of dates) {
    for (const offer of PUBLIC_OFFERS) {
      const schema = buildOfferJsonLd(offer, "ru", `${getSiteUrl()}/ru`, date);
      const quote = quoteOffer(offer.id, date);
      assert.equal(schema.priceSpecification.minPrice, quote.price);
      assert.equal(schema.priceSpecification.priceCurrency, "UZS");
      assert.equal(
        schema.priceSpecification.referenceQuantity?.unitCode,
        offer.kind === "support" ? "MON" : undefined
      );
      assert.equal(schema.validThrough, quote.promotion?.endsAt);
      assert.equal(new URL(schema.url).hash, `#offer-${offer.id}`);
    }
  }

  const serviceRoute = read("src/app/[locale]/services/[slug]/page.tsx");
  assert(
    serviceRoute.includes("buildPageMetadata") &&
      serviceRoute.includes("page.seoTitle")
  );
  assert(
    serviceRoute.includes("buildOfferJsonLd") &&
      serviceRoute.includes("notFound()")
  );
  for (const path of [
    "src/app/[locale]/writing/page.tsx",
    "src/app/[locale]/writing/[slug]/page.tsx",
  ]) {
    const source = read(path);
    assert(source.includes("index: false") && source.includes("notFound()"));
  }
  for (const path of ["public/og/default.png", "public/llms.txt"]) {
    assert(existsSync(join(root, path)), `Missing ${path}`);
  }
  for (const project of PORTFOLIO) {
    assert(
      existsSync(join(root, "public", resolveProjectOgImagePath(project.slug))),
      `Missing OG image for ${project.slug}`
    );
  }

  console.log(
    `SEO checks passed: ${entries.length} localized sitemap URLs, 9 service metadata variants, crawlable assets, valid service lookup, UZS offer prices and promotion boundaries.`
  );
  console.log(
    "Production HTTP status, rendered metadata and UI must also be checked on the running build."
  );
} finally {
  if (originalSiteUrl === undefined) delete process.env.SITE_URL;
  else process.env.SITE_URL = originalSiteUrl;
  Module._resolveFilename = originalResolve;
}
