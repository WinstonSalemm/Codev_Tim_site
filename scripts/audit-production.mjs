/**
 * Read-only HTTP audit of a running production build (no browser or form sends).
 * BASE_URL=http://localhost:3100 EXPECTED_SITE_URL=https://www.codev-tim.uz \
 *   node scripts/audit-production.mjs
 * Optional: AUDIT_OUTPUT=data/production-http-audit.json, EXPECTED_URL_COUNT=48.
 * Metadata may use a production origin while every internal GET stays on BASE_URL.
 * HTML checks inspect the completed server response, not the hydrated DOM.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const baseUrl = new URL(process.env.BASE_URL || "http://localhost:3100");
const expectedSiteUrl = new URL(
  process.env.EXPECTED_SITE_URL || "https://www.codev-tim.uz"
);
const expectedCount = Number(process.env.EXPECTED_URL_COUNT || 48);
const output = path.resolve(
  process.env.AUDIT_OUTPUT || "data/production-http-audit.json"
);
const origins = new Set([
  baseUrl.origin,
  expectedSiteUrl.origin,
  "https://www.codev-tim.uz",
  "https://codev-tim.uz",
]);
const startedAt = new Date().toISOString();
const failures = [];
const warnings = [];
const cache = new Map();
const documents = new Map();
const links = new Map();
const assets = new Map();
const externalUrls = new Set();
const expectedRoutes = [];
const decode = (value) =>
  value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt);/gi, (_, entity) => {
    if (entity[0] === "#") {
      const code =
        entity[1].toLowerCase() === "x"
          ? parseInt(entity.slice(2), 16)
          : parseInt(entity.slice(1), 10);
      return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : "�";
    }
    return { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">" }[
      entity.toLowerCase()
    ];
  });
const fail = (code, url, detail) => failures.push({ code, url, detail });
const keyOf = (url) => `${url.pathname}${url.search}`;
const internal = (url) => origins.has(url.origin);
const resolveUrl = (value, source) => {
  if (!value || /^(?:data:|mailto:|tel:|javascript:|blob:)/i.test(value))
    return;
  try {
    const url = new URL(decode(value), source);
    if (!/^https?:$/.test(url.protocol)) return;
    if (!internal(url)) {
      externalUrls.add(url.href);
      return;
    }
    return url;
  } catch {
    fail("invalid-url", source, value);
  }
};
const physicalUrl = (logical) => {
  const url = new URL(logical);
  return new URL(`${url.pathname}${url.search}`, baseUrl).href;
};
async function request(url) {
  const logical = new URL(url, expectedSiteUrl);
  const key = keyOf(logical);
  if (cache.has(key)) return cache.get(key);
  const work = (async () => {
    const physical = physicalUrl(logical);
    try {
      const response = await fetch(physical, {
        redirect: "manual",
        signal: AbortSignal.timeout(20000),
        headers: { "User-Agent": "Codev-Production-HTTP-Audit/1.0" },
      });
      const contentType = response.headers.get("content-type") || "";
      const bytes = new Uint8Array(await response.arrayBuffer());
      const text = /(?:html|xml|css|json|text\/)/i.test(contentType)
        ? new TextDecoder().decode(bytes)
        : "";
      return {
        url: logical.href,
        physicalUrl: physical,
        status: response.status,
        contentType,
        bytes: bytes.length,
        location: response.headers.get("location"),
        robots: response.headers.get("x-robots-tag"),
        text,
      };
    } catch (error) {
      return {
        url: logical.href,
        physicalUrl: physical,
        status: 0,
        error: error.message,
      };
    }
  })();
  cache.set(key, work);
  return work;
}
async function follow(url) {
  let current = new URL(url, expectedSiteUrl);
  let fragment = current.hash;
  const hops = [];
  for (let index = 0; index < 8; index += 1) {
    const response = await request(current.href);
    hops.push({
      url: keyOf(current),
      status: response.status,
      location: response.location,
    });
    if (response.status >= 300 && response.status < 400 && response.location) {
      const next = new URL(response.location, current);
      if (!internal(next))
        return { ...response, hops, externalRedirect: next.href };
      if (next.hash) fragment = next.hash;
      current = next;
      continue;
    }
    return { ...response, hops, finalUrl: current.href, fragment };
  }
  return { status: 0, hops, error: "Redirect limit exceeded" };
}
function attributes(raw) {
  const values = {};
  const pattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  for (const match of raw.matchAll(pattern)) {
    values[match[1].toLowerCase()] = decode(
      match[2] ?? match[3] ?? match[4] ?? ""
    );
  }
  return values;
}
function addRef(collection, value, source, kind) {
  const url = resolveUrl(value, source);
  if (!url) return;
  const key = collection === assets ? keyOf(url) : `${keyOf(url)}${url.hash}`;
  const item = collection.get(key) || { url: url.href, kind, sources: [] };
  if (!item.sources.includes(source)) item.sources.push(source);
  collection.set(key, item);
}
function addCssRefs(css, source) {
  for (const match of css.matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/gi)) {
    if (!match[1].startsWith("#")) addRef(assets, match[1], source, "css-url");
  }
  for (const match of css.matchAll(/@import\s+["']([^"']+)["']/gi)) {
    addRef(assets, match[1], source, "css-import");
  }
}
function parseHtml(response, sitemapEntry) {
  const url = response.finalUrl || response.url;
  const jsonLd = [];
  const scriptPattern =
    /<script\b((?:"[^"]*"|'[^']*'|[^'">])*)>([\s\S]*?)<\/script\s*>/gi;
  for (const match of response.text.matchAll(scriptPattern)) {
    const attrs = attributes(match[1]);
    if (attrs.src) addRef(assets, attrs.src, url, "script");
    if (attrs.type?.toLowerCase() === "application/ld+json") {
      try {
        const parsed = JSON.parse(match[2]);
        if (!parsed || typeof parsed !== "object")
          throw new Error("JSON-LD is not an object/array");
        jsonLd.push(parsed);
      } catch (error) {
        fail("invalid-jsonld", url, error.message);
      }
    }
  }
  const html = response.text
    .replace(scriptPattern, "")
    .replace(/<!--[\s\S]*?-->/g, "");
  const tags = [
    ...html.matchAll(/<([a-z][\w:-]*)\b((?:"[^"]*"|'[^']*'|[^'">])*)>/gi),
  ].map((match) => ({
    name: match[1].toLowerCase(),
    attrs: attributes(match[2]),
  }));
  const ids = new Set();
  const canonicals = [];
  const alternates = {};
  const descriptions = [];
  const robotValues = [response.robots || ""];
  let language;
  for (const { name, attrs } of tags) {
    if (attrs.id) ids.add(attrs.id);
    if (name === "a" && attrs.name) ids.add(attrs.name);
    if (name === "html") language = attrs.lang;
    if (name === "a" || name === "area") addRef(links, attrs.href, url, "link");
    if (name === "link") {
      const rel = (attrs.rel || "").toLowerCase().split(/\s+/);
      if (rel.includes("canonical")) canonicals.push(attrs.href);
      if (rel.includes("alternate") && attrs.hreflang) {
        if (alternates[attrs.hreflang])
          fail("duplicate-hreflang", url, attrs.hreflang);
        alternates[attrs.hreflang] = attrs.href;
      }
      if (
        rel.some((item) =>
          ["stylesheet", "preload", "icon", "apple-touch-icon"].includes(item)
        )
      ) {
        addRef(assets, attrs.href, url, rel.join(" "));
      }
    }
    if (["img", "source", "video", "audio", "iframe", "input"].includes(name)) {
      addRef(assets, attrs.src, url, name);
      if (attrs.poster) addRef(assets, attrs.poster, url, "poster");
      if (attrs.srcset && !attrs.srcset.startsWith("data:")) {
        for (const candidate of attrs.srcset.split(",")) {
          addRef(assets, candidate.trim().split(/\s+/)[0], url, "srcset");
        }
      }
    }
    if (name === "meta") {
      if (attrs.name === "description") descriptions.push(attrs.content || "");
      if (["robots", "googlebot"].includes(attrs.name?.toLowerCase()))
        robotValues.push(attrs.content || "");
      if (
        ["og:image", "twitter:image"].includes(attrs.property || attrs.name)
      ) {
        addRef(assets, attrs.content, url, "social-image");
      }
    }
    if (attrs.style) addCssRefs(attrs.style, url);
  }
  for (const match of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi))
    addCssRefs(match[1], url);
  const h1Count = tags.filter(({ name }) => name === "h1").length;
  const titles = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)].map(
    (match) => decode(match[1]).trim()
  );
  const summary = {
    path: keyOf(new URL(url)),
    status: response.status,
    language,
    title: titles[0],
    description: descriptions[0],
    h1Count,
    canonical: canonicals[0],
    alternates,
    jsonLdCount: jsonLd.length,
    idCount: ids.size,
    noindex: robotValues.some((value) => /\b(?:noindex|none)\b/i.test(value)),
    ids,
  };
  if (sitemapEntry) {
    if (h1Count !== 1) fail("h1-count", url, h1Count);
    if (titles.length !== 1 || !titles[0]) fail("title-count", url, titles);
    if (descriptions.length !== 1 || !descriptions[0])
      fail("description-count", url, descriptions);
    if (canonicals.length !== 1 || canonicals[0] !== sitemapEntry.url)
      fail("canonical", url, canonicals);
    if (!jsonLd.length) fail("missing-jsonld", url, "No valid JSON-LD block");
    if (summary.noindex) fail("public-noindex", url, robotValues);
    const parsedUrl = new URL(sitemapEntry.url);
    const locale = parsedUrl.pathname.split("/")[1];
    if (language !== locale)
      fail("html-language", url, { expected: locale, actual: language });
    const suffix = parsedUrl.pathname.replace(/^\/(?:ru|uz|en)/, "");
    for (const lang of ["en", "ru", "uz", "x-default"]) {
      const target = new URL(
        `/${lang === "x-default" ? "ru" : lang}${suffix}`,
        expectedSiteUrl
      ).href;
      if (alternates[lang] !== target)
        fail("hreflang", url, {
          lang,
          expected: target,
          actual: alternates[lang],
        });
      if (sitemapEntry.alternates[lang] !== target)
        fail("sitemap-hreflang", url, {
          lang,
          expected: target,
          actual: sitemapEntry.alternates[lang],
        });
    }
  }
  documents.set(keyOf(new URL(url)), summary);
  return summary;
}
async function mapLimit(items, work, count = 6) {
  let cursor = 0;
  await Promise.all(
    Array.from({ length: Math.min(count, items.length) }, async () => {
      while (cursor < items.length) {
        const item = items[cursor++];
        await work(item);
      }
    })
  );
}
function compact(response) {
  const { text: ignored, ...rest } = response;
  void ignored;
  return rest;
}

const sitemapResponse = await request(
  new URL("/sitemap.xml", expectedSiteUrl).href
);
if (sitemapResponse.status !== 200)
  fail("sitemap-status", "/sitemap.xml", compact(sitemapResponse));
const entries = [
  ...(sitemapResponse.text || "").matchAll(/<url>([\s\S]*?)<\/url>/g),
].map((match) => {
  const loc = match[1].match(/<loc>([^<]+)<\/loc>/)?.[1];
  const alternates = {};
  for (const link of match[1].matchAll(/<xhtml:link\b([^>]+)>/g)) {
    const attrs = attributes(link[1]);
    alternates[attrs.hreflang] = attrs.href;
  }
  return { url: decode(loc || ""), alternates };
});
if (entries.length !== expectedCount)
  fail("sitemap-count", "/sitemap.xml", {
    expected: expectedCount,
    actual: entries.length,
  });
if (new Set(entries.map((entry) => entry.url)).size !== entries.length)
  fail("sitemap-duplicates", "/sitemap.xml", "Duplicate URLs");
await mapLimit(entries, async (entry) => {
  let parsed;
  try {
    parsed = new URL(entry.url);
  } catch {
    fail("sitemap-url", entry.url, "Invalid URL");
    return;
  }
  if (parsed.origin !== expectedSiteUrl.origin)
    fail("sitemap-origin", entry.url, expectedSiteUrl.origin);
  // The sitemap origin is validated above; requests always use the configured local base.
  const response = await request(entry.url);
  if (response.status !== 200)
    fail("public-status", entry.url, compact(response));
  if (!/html/.test(response.contentType || ""))
    fail("public-content-type", entry.url, response.contentType);
  else parseHtml(response, entry);
});
console.log(
  `Public pages: ${entries.length}; discovered links: ${links.size}; assets: ${assets.size}`
);

const checkedLinks = new Map();
while (checkedLinks.size < links.size) {
  const pending = [...links].filter(([key]) => !checkedLinks.has(key));
  if (checkedLinks.size + pending.length > 1500)
    throw new Error("Safety limit: more than 1500 internal links");
  await mapLimit(pending, async ([key, item]) => {
    const response = await follow(item.url);
    const result = { ...item, ...compact(response), requestedUrl: item.url };
    checkedLinks.set(key, result);
    if (response.status !== 200 || response.externalRedirect) {
      fail("internal-link", item.url, {
        sources: item.sources,
        ...compact(response),
      });
      return;
    }
    if (response.hops.length > 1)
      warnings.push({
        code: "internal-link-redirect",
        url: item.url,
        hops: response.hops,
      });
    if (/html/.test(response.contentType || "")) {
      const targetKey = keyOf(new URL(response.finalUrl));
      const doc = documents.get(targetKey) || parseHtml(response);
      if (
        response.fragment &&
        response.fragment !== "#top" &&
        !response.fragment.startsWith("#:~:text=")
      ) {
        let targetId;
        try {
          targetId = decodeURIComponent(response.fragment.slice(1));
        } catch {
          targetId = response.fragment.slice(1);
        }
        if (!doc.ids.has(targetId))
          fail("missing-fragment", item.url, {
            finalUrl: response.finalUrl,
            fragment: targetId,
            sources: item.sources,
          });
      }
    }
  });
}

const checkedAssets = new Map();
while (checkedAssets.size < assets.size) {
  const pending = [...assets].filter(([key]) => !checkedAssets.has(key));
  if (checkedAssets.size + pending.length > 1500)
    throw new Error("Safety limit: more than 1500 internal assets");
  await mapLimit(pending, async ([key, item]) => {
    const response = await follow(item.url);
    checkedAssets.set(key, {
      ...item,
      ...compact(response),
      requestedUrl: item.url,
    });
    if (
      response.status !== 200 ||
      response.externalRedirect ||
      !response.bytes
    ) {
      fail("asset", item.url, { sources: item.sources, ...compact(response) });
      return;
    }
    if (/html/.test(response.contentType || "") && item.kind !== "iframe")
      fail("asset-is-html", item.url, response.contentType);
    if (/css/.test(response.contentType || ""))
      addCssRefs(response.text, response.finalUrl);
  });
}

for (const locale of ["en", "ru", "uz", ""]) {
  const prefix = locale ? `/${locale}` : "";
  const destination = `/${locale || "ru"}`;
  for (const [oldPath, target] of [
    ["/services/website-development-tashkent", "/services/websites"],
    ["/services/corporate-website", "/services/websites#offer-corporate"],
    ["/services/business-automation", "/services/crm-automation"],
    ["/services", "#prices"],
    ["/principles", "/about#process"],
    ["/projects/erp-platform", "/projects/codev-erp"],
  ])
    expectedRoutes.push({
      path: `${prefix}${oldPath}`,
      status: 308,
      destination: `${destination}${target}`,
    });
}
for (const locale of ["en", "ru", "uz"]) {
  for (const suffix of [
    "/writing",
    "/writing/audit-missing-article",
    "/manage/promotions",
    "/projects/audit-missing-project",
    "/services/audit-missing-service",
    "/audit-page-that-does-not-exist",
  ]) {
    expectedRoutes.push({ path: `/${locale}${suffix}`, status: 404 });
  }
}
for (const pathname of [
  "/feed.xml",
  "/ru/feed.xml",
  "/uz/feed.xml",
  "/projects/feed.xml",
])
  expectedRoutes.push({ path: pathname, status: 410 });
const routeResults = [];
await mapLimit(expectedRoutes, async (route) => {
  const response = await request(new URL(route.path, expectedSiteUrl).href);
  const result = { expected: route, ...compact(response) };
  routeResults.push(result);
  if (response.status !== route.status)
    fail("expected-route-status", route.path, {
      expected: route.status,
      actual: response.status,
    });
  if (route.status === 308) {
    const actual = response.location
      ? new URL(response.location, expectedSiteUrl)
      : null;
    if (
      !actual ||
      `${actual.pathname}${actual.search}${actual.hash}` !== route.destination
    )
      fail("redirect-destination", route.path, {
        expected: route.destination,
        actual: response.location,
      });
    const final = await follow(new URL(route.path, expectedSiteUrl).href);
    if (final.status !== 200)
      fail("redirect-target-status", route.path, compact(final));
    if (final.fragment) {
      const targetKey = keyOf(new URL(final.finalUrl));
      const doc =
        documents.get(targetKey) ||
        (/html/.test(final.contentType || "") ? parseHtml(final) : null);
      const id = decodeURIComponent(final.fragment.slice(1));
      if (!doc?.ids.has(id))
        fail("redirect-target-fragment", route.path, {
          destination: route.destination,
          id,
        });
    }
  }
  if (route.status === 410 && !/noindex/i.test(response.robots || ""))
    fail("gone-noindex", route.path, response.robots);
  if (
    route.status === 404 &&
    !/noindex/i.test(`${response.robots || ""} ${response.text || ""}`)
  )
    fail("not-found-noindex", route.path, "No noindex instruction in response");
});
const robotsResponse = await request(
  new URL("/robots.txt", expectedSiteUrl).href
);
if (robotsResponse.status !== 200)
  fail("robots-status", "/robots.txt", robotsResponse.status);
if (
  !robotsResponse.text?.includes(new URL("/sitemap.xml", expectedSiteUrl).href)
)
  fail("robots-sitemap", "/robots.txt", "Expected sitemap origin missing");
if (/Disallow:\s*\/_next\//i.test(robotsResponse.text || ""))
  fail(
    "blocked-next-resources",
    "/robots.txt",
    "Next CSS/JS directory blocked"
  );

const report = {
  startedAt,
  completedAt: new Date().toISOString(),
  baseUrl: baseUrl.origin,
  expectedSiteUrl: expectedSiteUrl.origin,
  scope:
    "GET-only server HTML, internal links/fragments/assets, metadata and legacy route audit; no browser hydration, external checks or form submissions",
  counts: {
    sitemapUrls: entries.length,
    parsedDocuments: documents.size,
    internalLinks: checkedLinks.size,
    fragmentTargets: [...checkedLinks.values()].filter((item) => item.fragment)
      .length,
    crossPageFragmentTargets: [...checkedLinks.values()].filter(
      (item) =>
        item.fragment &&
        item.sources.some(
          (source) => keyOf(new URL(source)) !== keyOf(new URL(item.finalUrl))
        )
    ).length,
    internalAssets: checkedAssets.size,
    expectedRoutes: routeResults.length,
    externalUrlsNotFetched: externalUrls.size,
    failures: failures.length,
    warnings: warnings.length,
  },
  failures,
  warnings,
  pages: [...documents.values()].map(({ ids: ignored, ...summary }) => {
    void ignored;
    return summary;
  }),
  links: [...checkedLinks.values()],
  assets: [...checkedAssets.values()],
  routes: routeResults,
  robots: { status: robotsResponse.status, text: robotsResponse.text },
  externalUrlsNotFetched: [...externalUrls].sort(),
};
await mkdir(path.dirname(output), { recursive: true });
await writeFile(output, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ output, ...report.counts }, null, 2));
if (failures.length)
  console.log(JSON.stringify(failures.slice(0, 30), null, 2));
process.exitCode = failures.length ? 1 : 0;
