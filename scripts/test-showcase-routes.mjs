import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const base = process.env.BASE_URL || "http://127.0.0.1:3100";
const results = [];
const locales = ["ru", "uz", "en"];
const mapping = {
  "poj-pro-site": "fire-safety-store",
  "poj-pro-platform": "business-operations",
  "poj-pro-api-contracts": "document-workflow",
  "poj-pro-telegram-bots": "staff-telegram-tools",
};
for (const [old, canonical] of Object.entries(mapping)) {
  for (const prefix of ["", ...locales.map((l) => `/${l}`)]) {
    const source = `${prefix}/projects/${old}?ref=legacy`;
    const response = await fetch(base + source, { redirect: "manual" });
    const destination = new URL(response.headers.get("location"), base);
    assert.equal(response.status, 308, source);
    assert.equal(
      destination.pathname,
      `${prefix || "/ru"}/projects/${canonical}`
    );
    assert.equal(destination.search, "?ref=legacy");
    results.push({
      path: source,
      status: response.status,
      destination: destination.pathname,
    });
  }
}
for (const slug of ["fire-safety-store", "codev-erp", "call-tracker"]) {
  for (const locale of locales) {
    const path = `/${locale}/projects/${slug}/demo`;
    const response = await fetch(base + path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert(
      html.includes('name="robots" content="noindex, follow"'),
      path + " robots"
    );
    assert(
      html.includes(`rel="canonical" href="https://www.codev-tim.uz${path}"`),
      path + " canonical"
    );
    assert(!/poj[\s_-]*pro|пож[\s_-]*про/i.test(html), path + " privacy");
    if (slug === "fire-safety-store") {
      const legacy = await fetch(`${base}/showcases/${slug}/${locale}/index.html`, { redirect: "manual" });
      assert.equal(legacy.status, 308);
      const mounted = new URL(legacy.headers.get("location"), base);
      assert.equal(mounted.pathname, "/fire-safety-store");
      assert.equal(mounted.searchParams.get("lang"), locale);
      const app = await fetch(`${base}${mounted.pathname}${mounted.search}`);
      assert.equal(app.status, 200);
      assert.match(app.headers.get("content-security-policy"), /connect-src 'self'/);
      assert.match(app.headers.get("content-security-policy"), /frame-ancestors 'self'/);
      assert.equal(app.headers.get("x-robots-tag"), "noindex, nofollow");
      assert(!/poj[\s_-]*pro|пож[\s_-]*про/i.test(await app.text()), "Mounted storefront privacy");
      results.push({ path, status: response.status, privacy: true, mountedApplication: true });
      continue;
    }
    const asset = await fetch(`${base}/showcases/${slug}/${locale}/index.html`);
    assert.equal(asset.status, 200);
    assert.match(
      asset.headers.get("content-security-policy"),
      /connect-src 'none'/
    );
    assert.match(
      asset.headers.get("content-security-policy"),
      /form-action 'none'/
    );
    assert.match(
      asset.headers.get("content-security-policy"),
      /frame-ancestors 'self'/
    );
    assert.equal(asset.headers.get("x-robots-tag"), "noindex, nofollow");
    assert.equal(asset.headers.get("referrer-policy"), "no-referrer");
    results.push({
      path,
      status: response.status,
      privacy: true,
      localAssetHeaders: true,
    });
  }
}
for (const path of [
  "/ru/projects/not-a-project/demo",
  "/uz/projects/assistant-agent/demo",
  "/en/projects/not-a-project",
]) {
  assert.equal((await fetch(base + path)).status, 404, path);
  results.push({ path, status: 404 });
}
await mkdir("data/showcase-qa", { recursive: true });
await writeFile(
  "data/showcase-qa/routes.json",
  JSON.stringify({ base, results }, null, 2)
);
console.log(
  `PASS ${results.length} showcase routes, redirects, metadata and privacy headers`
);
