/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS test harness loads a configurable local Playwright installation. */
/* Acceptance test for the copied storefront mounted below /fire-safety-store.
 * Runs against an existing server. Never submits a real order or account form.
 * BASE_URL=http://127.0.0.1:3100 CODEV_PLAYWRIGHT_MODULE=/path/to/playwright node scripts/test-mounted-storefront.cjs
 */
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const { chromium } = require(process.env.CODEV_PLAYWRIGHT_MODULE || "playwright");

const baseUrl = (process.env.BASE_URL || "http://127.0.0.1:3100").replace(/\/$/, "");
const mount = "/fire-safety-store";
const origin = new URL(baseUrl).origin;
const output = process.env.STOREFRONT_REPORT_DIR ? path.resolve(process.env.STOREFRONT_REPORT_DIR) : path.resolve(__dirname, "../data/mounted-storefront-qa");
const caseFilter = process.env.STOREFRONT_CASE_FILTER ? new RegExp(process.env.STOREFRONT_CASE_FILTER) : null;
const report = { baseUrl, startedAt: new Date().toISOString(), cases: [] };
const privateBrand = /poj[\s_-]*pro|пож[\s_-]*про|pojsystema|pojpro2012|993936616|993091001|712536616|909791218|99\s*393\s*66\s*16|99\s*309\s*10\s*01|71\s*253\s*66\s*16|90\s*979\s*12\s*18/i;

async function capturePage(page, name) {
  // Visit the entire page so lazy images and reveal-on-scroll sections render.
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 650) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    await page.waitForTimeout(120);
  }
  await page.waitForLoadState("networkidle");
  const broken = await page.locator("img").evaluateAll((images) => images.filter((image) => image.getBoundingClientRect().width > 0 && image.complete && image.naturalWidth === 0).map((image) => image.currentSrc || image.src));
  assert.deepEqual(broken, [], "Broken images after scrolling the full page");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: path.join(output, `${name}.png`), fullPage: true });
}

async function layoutCheck(page) {
  await page.locator("main").first().waitFor();
  const text = await page.locator("body").innerText();
  assert(text.length > 150, "Rendered page is unexpectedly empty");
  assert(!privateBrand.test(text), "Original company/contact details remain in rendered text");
  const publicAttributes = await page.locator("a[href], img[src], img[alt], meta[content]").evaluateAll((nodes) => nodes.map((node) => [node.getAttribute("href"), node.getAttribute("src"), node.getAttribute("alt"), node.getAttribute("content")].filter(Boolean).join(" ")).join("\n"));
  assert(!privateBrand.test(publicAttributes), "Original identity remains in public attributes or metadata");
  const dimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, content: document.documentElement.scrollWidth }));
  assert(dimensions.content <= dimensions.width + 2, `Horizontal overflow ${dimensions.content} > ${dimensions.width}`);
  const invalidLinks = await page.locator("a[href]").evaluateAll((nodes, { origin, mount }) => nodes.map((node) => node.href).filter((href) => {
    const url = new URL(href, origin);
    return url.origin === origin && !url.pathname.startsWith(mount) && !/^\/(ru|en|uz)(\/|$)/.test(url.pathname) && url.pathname !== "/";
  }), { origin, mount });
  assert.deepEqual([...new Set(invalidLinks)], [], "Storefront links escape its mounted route");
}

async function main() {
  await fs.mkdir(output, { recursive: true });
  const listResponse = await fetch(`${baseUrl}${mount}/api/products?locale=ru&limit=1000`);
  assert.equal(listResponse.status, 200, "Local product API must respond");
  const catalog = await listResponse.json();
  const products = catalog.data?.products || catalog.products || [];
  assert(products.length >= 12, "Storefront catalog data is missing");
  const product = products.find((item) => item.slug && item.category?.slug);
  assert(product, "No routable product in the local dataset");
  report.catalogItems = products.length;
  const categoryRoute = `/catalog/${product.category.slug}`;
  const productRoute = `${categoryRoute}/${product.slug}`;
  const routes = ["", "/catalog", categoryRoute, productRoute, "/catalog/ognetushiteli/type/op", "/cart", "/cart/success", "/guide", "/about", "/contacts", "/documents", "/documents/certificates", "/promotions", "/login", "/register", "/profile", "/en/blog", "/uz/blog", "/en/blog/vybor-ognetushitelya", "/uz/blog/vybor-ognetushitelya"];

  let browser;
  try {
    browser = await chromium.launch({ headless: true, ...(process.env.CODEV_CHROMIUM_EXECUTABLE ? { executablePath: process.env.CODEV_CHROMIUM_EXECUTABLE } : {}) });
  } catch { browser = await chromium.launch({ headless: true, channel: "chrome" }); }
  async function run(name, width, action) {
    if (caseFilter && !caseFilter.test(name)) return;
    const result = { name, executedAt: new Date().toISOString(), passed: false, pageErrors: [], httpErrors: [], externalRequests: [] };
    const context = await browser.newContext({ viewport: { width, height: width < 600 ? 844 : 1000 }, reducedMotion: "reduce" });
    const page = await context.newPage();
    page.setDefaultTimeout(15000);
    page.setDefaultNavigationTimeout(60000);
    page.on("pageerror", (error) => result.pageErrors.push(error.message));
    page.on("response", (response) => { if (response.status() >= 400) result.httpErrors.push({ url: response.url(), status: response.status() }); });
    await context.route("**/*", async (route) => {
      const url = new URL(route.request().url());
      if (/^https?:$/.test(url.protocol) && url.origin !== origin) {
        result.externalRequests.push(url.href);
        await route.abort();
      } else await route.continue();
    });
    try {
      await action(page);
      assert.deepEqual(result.pageErrors, [], "Uncaught browser errors");
      assert.deepEqual(result.externalRequests, [], "Storefront made external requests");
      assert.deepEqual(result.httpErrors, [], "HTTP errors in page resources");
      result.passed = true;
    } catch (error) {
      result.error = error.stack || String(error);
      await page.screenshot({ path: path.join(output, `${name}-failure.png`), fullPage: true }).catch(() => {});
    } finally {
      report.cases.push(result);
      console.log(`${result.passed ? "PASS" : "FAIL"} ${name}${result.error ? `: ${result.error.split("\n")[0]}` : ""}`);
      await context.close();
    }
  }

  try {
    for (const width of [1440, 390]) {
      for (const route of routes) {
        const name = `${width}-${route.replace(/[^a-z0-9]+/gi, "-") || "home"}`;
        await run(name, width, async (page) => {
          const response = await page.goto(`${baseUrl}${mount}${route}`, { waitUntil: "networkidle" });
          assert.equal(response.status(), 200);
          assert(new URL(page.url()).pathname.startsWith(mount), "Direct URL escaped mount");
          await layoutCheck(page);
          if (["", "/catalog", productRoute, "/contacts"].includes(route)) await capturePage(page, name);
          if (route === "" && width === 1440 && process.env.UPDATE_STOREFRONT_PREVIEW === "1") {
            await page.screenshot({ path: path.resolve(__dirname, "../public/projects/fire-safety-store/demo-preview.png") });
          }
        });
      }
      await run(`shopping-flow-${width}`, width, async (page) => {
        await page.goto(`${baseUrl}${mount}${categoryRoute}`, { waitUntil: "networkidle" });
        const add = page.locator('[data-testid="product-card-add"]').first();
        const addedTitle = (await add.locator('xpath=ancestor::div[h3][1]').locator('h3').innerText()).trim();
        await add.click();
        const cart = page.locator('a[aria-label="Shopping Cart"]').filter({ visible: true }).first();
        await cart.click();
        await page.waitForURL(`**${mount}/cart`);
        await page.locator('[data-testid="cart-checkout-button"]').waitFor();
        assert((await page.locator("main").first().innerText()).includes(addedTitle), "Added product is absent from cart");
        await page.reload({ waitUntil: "networkidle" });
        await page.locator('[data-testid="cart-checkout-button"]').waitFor();
        await layoutCheck(page);
        const plus = page.locator("main").first().getByRole("button", { name: "+", exact: true }).first();
        await plus.click();
        assert.equal((await plus.locator("..").locator("span").innerText()).trim(), "2");
        await page.locator("main").first().getByRole("button", { name: "-", exact: true }).first().click();
        assert.equal((await plus.locator("..").locator("span").innerText()).trim(), "1");
        await page.locator("main").first().getByRole("button", { name: /Удалить|Remove/i }).first().click();
        await page.getByRole("dialog").getByRole("button", { name: "Удалить", exact: true }).click();
        await page.waitForFunction(() => JSON.parse(localStorage.getItem("firesafe-cart") || '{"items":[]}').items.length === 0);
        assert.equal(await page.locator('[data-testid="cart-checkout-button"]').count(), 0);
        // Re-add through the real UI, then use the deliberately local account/checkout adapters.
        await page.goto(`${baseUrl}${mount}${categoryRoute}`, { waitUntil: "networkidle" });
        await page.locator('[data-testid="product-card-add"]').first().click();
        await page.locator('a[aria-label="Shopping Cart"]').filter({ visible: true }).first().click();
        await page.locator('[data-testid="cart-checkout-button"]').click();
        await page.waitForURL(`**${mount}/login?**`);
        await page.locator('#email').fill('storefront-qa@example.invalid');
        await page.locator('#password').fill('Synthetic-demo-input-4728');
        await page.locator('form button[type="submit"]').click();
        await page.waitForURL((url) => url.pathname.replace(/\/$/, "") === mount);
        await page.goto(`${baseUrl}${mount}/cart`, { waitUntil: "networkidle" });
        await page.locator('[data-testid="cart-checkout-button"]').click();
        const checkout = page.getByRole("dialog", { name: "Оформление заявки" });
        await checkout.getByLabel("Имя", { exact: true }).fill("Demo Test Visitor");
        await checkout.getByLabel("Email", { exact: true }).fill("storefront-qa@example.invalid");
        await checkout.getByLabel("Телефон", { exact: true }).fill("+000427315826");
        await checkout.getByLabel("Адрес или способ получения", { exact: true }).fill("Demo City, Sample Street 47");
        const responsePromise = page.waitForResponse((response) => response.url() === `${baseUrl}${mount}/api/orders` && response.request().method() === "POST");
        await checkout.locator('button[type="submit"]').click();
        const orderResponse = await responsePromise;
        assert.equal((await orderResponse.json()).demo, true, "Order endpoint must explicitly mark its mock response");
        await page.waitForURL(`**${mount}/cart/success?**`);
        assert.match(new URL(page.url()).searchParams.get("orderId"), /^DEMO-/);
        await layoutCheck(page);
      });
    }
    await run("catalog-search-and-language", 1440, async (page) => {
      await page.goto(`${baseUrl}${mount}/catalog`, { waitUntil: "networkidle" });
      const search = page.locator("#catalog-search-input");
      await search.fill(product.title || product.name || product.slug);
      await search.locator("xpath=../..").locator("ul button").first().waitFor();
      await search.press("Enter");
      await page.waitForURL(`**${mount}${productRoute}`);
      await layoutCheck(page);
      for (const lang of ["en", "uz", "ru"]) {
        await page.getByRole("button", { name: `Language: ${lang.toUpperCase()}`, exact: true }).filter({ visible: true }).first().click();
        await page.locator(`html[lang="${lang}"]`).waitFor();
        await page.waitForLoadState("networkidle");
        await layoutCheck(page);
      }
    });
    await run("iframe-navigation", 1440, async (page) => {
      const response = await page.goto(`${baseUrl}/ru/projects/fire-safety-store/demo`, { waitUntil: "networkidle" });
      assert.equal(response.status(), 200);
      const element = page.locator("iframe.showcase-frame");
      await element.waitFor();
      assert((await element.getAttribute("src")).startsWith(mount));
      const frame = page.frameLocator("iframe.showcase-frame");
      await frame.locator("main").first().waitFor();
      const catalogueLink = frame.locator(`a[href="${mount}/catalog"]`).filter({ visible: true }).first();
      await catalogueLink.click();
      await frame.locator("#catalog-search-input").waitFor();
      assert(new URL(page.url()).pathname === "/ru/projects/fire-safety-store/demo", "Iframe navigation changed host route");
      await page.screenshot({ path: path.join(output, "iframe-catalog.png"), fullPage: true });
    });
  } finally {
    await browser.close();
    report.finishedAt = new Date().toISOString();
    report.passed = report.cases.filter((item) => item.passed).length;
    report.failed = report.cases.length - report.passed;
    await fs.writeFile(path.join(output, caseFilter ? "report-focused.json" : "report.json"), `${JSON.stringify(report, null, 2)}\n`);
    if (caseFilter) {
      const full = await fs.readFile(path.join(output, "report.json"), "utf8").then(JSON.parse).catch(() => null);
      if (full && full.baseUrl === report.baseUrl) {
        const replacements = new Map(report.cases.map((item) => [item.name, item]));
        const cases = full.cases.map((item) => replacements.get(item.name) || { ...item, executedAt: item.executedAt || full.startedAt });
        const aggregate = { baseUrl, fullRunStartedAt: full.startedAt, focusedRunStartedAt: report.startedAt, finishedAt: report.finishedAt, cases, passed: cases.filter((item) => item.passed).length, failed: cases.filter((item) => !item.passed).length };
        await fs.writeFile(path.join(output, "acceptance-report.json"), `${JSON.stringify(aggregate, null, 2)}\n`);
      }
    }
  }
  console.log(`${report.passed}/${report.cases.length} mounted storefront checks passed`);
  if (report.failed) process.exitCode = 1;
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
