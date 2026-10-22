import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";

const base = new URL(process.argv[2] || "http://127.0.0.1:3102");
const results = [];
for (const path of [
  "/",
  "/contact",
  "/projects/poj-pro-site",
  "/services/websites",
]) {
  for (const language of ["ru", "en-US,en;q=0.9", "uz"]) {
    const response = await fetch(new URL(`${path}?utm_source=telegram`, base), {
      redirect: "manual",
      headers: { "Accept-Language": language, Cookie: "NEXT_LOCALE=uz" },
      signal: AbortSignal.timeout(15000),
    });
    const destination = new URL(response.headers.get("location"), base);
    assert.equal(response.status, 308, `${path}: permanent redirect`);
    assert.equal(destination.pathname, `/ru${path === "/" ? "" : path}`);
    assert.equal(destination.search, "?utm_source=telegram");
    assert.equal(
      destination.hostname === "localhost" ||
        destination.hostname === "www.codev-tim.uz" ||
        destination.hostname === base.hostname,
      true
    );
    results.push({
      path,
      language,
      status: response.status,
      destination: destination.href,
    });
  }
}
if (["127.0.0.1", "localhost"].includes(base.hostname)) {
  const response = await fetch(
    new URL("/ru/contact?utm_source=telegram", base),
    {
      redirect: "manual",
      headers: { "x-forwarded-host": "codev-tim.uz" },
      signal: AbortSignal.timeout(15000),
    }
  );
  assert.equal(response.status, 308);
  assert.equal(
    response.headers.get("location"),
    "https://www.codev-tim.uz/ru/contact?utm_source=telegram"
  );
  results.push({
    check: "apex handler behind proxy",
    status: response.status,
    note: "Simulated host only; actual DNS and certificate need separate verification",
  });
}
for (const userAgent of ["Googlebot", "Google-InspectionTool", "bingbot"]) {
  for (const path of ["/ru", "/ru/services/catalog-website"]) {
    const response = await fetch(new URL(path, base), {
      headers: { "User-Agent": userAgent },
      signal: AbortSignal.timeout(15000),
    });
    assert.equal(response.status, 200);
    const html = await response.text();
    const head = html.slice(0, html.toLowerCase().indexOf("</head>"));
    assert(
      head.includes(`rel="canonical" href="https://www.codev-tim.uz${path}"`)
    );
    for (const locale of ["ru", "uz", "en", "x-default"])
      assert(
        head.includes(`hrefLang="${locale}"`) ||
          head.includes(`hreflang="${locale}"`)
      );
    results.push({
      path,
      userAgent,
      canonicalInInitialHead: true,
      languageLinksInInitialHead: true,
    });
  }
}
await mkdir("data/seo-leads-2026-10-22", { recursive: true });
await writeFile(
  "data/seo-leads-2026-10-22/routing-checks.json",
  JSON.stringify({ base: base.href, results }, null, 2)
);
console.log(
  `${results.length} routing and crawler checks passed. DNS, certificates and actual Google indexing are separate checks.`
);
