/* Browser acceptance checks for the independent demonstrations and their iframe viewer.
 * Run against an already started app:
 * BASE_URL=http://127.0.0.1:3100 CODEV_PLAYWRIGHT_MODULE=/path/to/playwright node scripts/test-showcases-browser.cjs
 * No enquiries, emails or other external messages are sent.
 */
/* eslint-disable @typescript-eslint/no-require-imports -- This portable CommonJS runner accepts an external Playwright installation. */
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const { chromium } = require(
  process.env.CODEV_PLAYWRIGHT_MODULE || "playwright"
);

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:3100";
const origin = new URL(baseUrl).origin;
const output = path.resolve(__dirname, "../data/showcase-qa");
const slugs = ["fire-safety-store", "codev-erp", "call-tracker"];
const locales = ["ru", "uz", "en"];
const report = { baseUrl, startedAt: new Date().toISOString(), cases: [] };

async function ready() {
  const deadline = Date.now() + 90000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(
        `${baseUrl}/showcases/fire-safety-store/ru/index.html`
      );
      if (response.ok) return;
    } catch {
      // The caller owns the server. Wait briefly for it to start.
    }
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }
  throw new Error(`The existing app did not become ready at ${baseUrl}`);
}

async function count(scope, selector, expected) {
  const actual = await scope.locator(selector).count();
  assert.equal(
    actual,
    expected,
    `${selector}: expected ${expected}, received ${actual}`
  );
}

async function noHorizontalOverflow(scope) {
  const size = await scope.locator("html").evaluate((element) => ({
    content: element.scrollWidth,
    viewport: element.clientWidth,
  }));
  assert(
    size.content <= size.viewport + 1,
    `Horizontal overflow: ${size.content}px > ${size.viewport}px`
  );
}

async function fireSafety(scope) {
  await scope.locator("#search").waitFor();
  await count(scope, ".product", 6);
  await scope.locator("#search").fill("FS-05");
  await count(scope, ".product", 1);
  assert.match(
    await scope.locator(".product-code").first().textContent(),
    /FS-05/
  );
  await scope.locator("#search").fill("no-such-demo-model");
  await count(scope, ".product", 0);
  assert(await scope.locator("#empty").isVisible());
  await scope.locator("#reset").click();
  await count(scope, ".product", 6);
  await scope.locator('[data-category="2"]').click();
  await count(scope, ".product", 2);
  await scope.locator('[data-category="0"]').click();
  await scope.locator("#sort").selectOption("ascending");
  assert.match(
    await scope.locator(".product-code").first().textContent(),
    /FS-06/
  );
  await scope.locator('[data-detail="FS-01"]').first().click();
  assert(await scope.locator("#product-dialog").isVisible());
  await scope.locator('#product-dialog [data-add="FS-01"]').click();
  assert.equal(await scope.locator("#basket-count").textContent(), "1");
  await scope.locator("#product-dialog .close-button").press("Escape");
  assert(!(await scope.locator("#product-dialog").isVisible()));
  await scope.locator("#basket-open").click();
  await scope.locator("#brief").fill("Fictional office, demo test only");
  await scope.locator("#request-button").click();
  assert(
    (await scope.locator("#request-status").textContent()).trim().length > 15,
    "Mock enquiry confirmation is missing"
  );
  await scope.locator('[data-remove="FS-01"]').click();
  assert.equal(await scope.locator("#basket-count").textContent(), "0");
  assert(await scope.locator("#request-button").isDisabled());
  await scope.locator("#basket-dialog .close-button").click();
}

async function workflow(scope, slug) {
  await scope.locator("#filter").waitFor();
  await count(scope, "[data-record]", 6);
  await scope.locator("#filter").selectOption("1");
  await count(scope, "[data-record]", 2);
  await scope.locator("#filter").selectOption("all");
  await scope.locator('[data-record="1"]').click();
  if (slug === "codev-erp") {
    for (let index = 0; index < 3; index += 1)
      await scope.locator("#advance").click();
    await count(scope, ".steps .reached", 4);
    await count(scope, "#advance", 0);
    assert.equal(
      await scope.locator(".metrics strong").last().textContent(),
      "01"
    );
    await scope.locator("#restore").click();
    await count(scope, ".steps .reached", 1);
    await scope.locator("#reject").click();
    await count(scope, ".steps .reached", 0);
    await scope.locator("#restore").click();
  } else {
    await scope.locator("#outcome").selectOption("3");
    await scope.locator("#followup").selectOption("2");
    await scope.locator("#note").fill("Demo <strong>literal note</strong>");
    await scope.locator("#outcome-form .primary").click();
    assert(await scope.locator(".saved").isVisible());
    assert.match(
      await scope.locator("#log").textContent(),
      /<strong>literal note<\/strong>/
    );
    await count(scope, "#log strong", 0);
    await scope.locator('[data-record="2"]').click();
    await scope.locator('[data-record="1"]').click();
    assert.equal(
      await scope.locator("#followup").inputValue(),
      "2",
      "Saved follow-up must survive record switching"
    );
  }
  await scope.locator("#reset").click();
  await count(scope, "[data-record]", 6);
  assert.equal(
    await scope.locator(".metrics strong").last().textContent(),
    "00"
  );
  await count(scope, "#log li", 1);
}

async function switchLanguage(scope, currentLocale, slug) {
  const nextLocale =
    locales[(locales.indexOf(currentLocale) + 1) % locales.length];
  await scope.locator(`a[href="../${nextLocale}/index.html"]`).click();
  await scope.locator(`html[lang="${nextLocale}"]`).waitFor();
  await scope
    .locator(slug === "fire-safety-store" ? "#search" : "#filter")
    .waitFor();
}

async function exercise(scope, slug) {
  if (slug === "fire-safety-store") await fireSafety(scope);
  else await workflow(scope, slug);
}

async function runCase(browser, name, action) {
  const result = {
    name,
    passed: false,
    consoleErrors: [],
    pageErrors: [],
    externalRequests: [],
    failedRequests: [],
    cancelledPrefetches: [],
    httpErrors: [],
  };
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  page.on("console", (message) => {
    if (message.type() === "error") result.consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => result.pageErrors.push(error.message));
  page.on("requestfailed", (request) => {
    const failed = { url: request.url(), error: request.failure()?.errorText };
    // Next may cancel an optional RSC prefetch when the viewer is reset or resized.
    if (
      failed.error === "net::ERR_ABORTED" &&
      new URL(failed.url).searchParams.has("_rsc")
    )
      result.cancelledPrefetches.push(failed);
    else result.failedRequests.push(failed);
  });
  page.on("response", (response) => {
    if (response.status() >= 400)
      result.httpErrors.push({
        url: response.url(),
        status: response.status(),
      });
  });
  await context.route("**/*", async (route) => {
    const url = route.request().url();
    if (/^https?:/i.test(url) && new URL(url).origin !== origin) {
      result.externalRequests.push(url);
      await route.abort();
    } else await route.continue();
  });
  page.setDefaultTimeout(10000);
  page.setDefaultNavigationTimeout(60000);
  try {
    await action(page);
    assert.deepEqual(
      result.externalRequests,
      [],
      "Unexpected external request"
    );
    assert.deepEqual(result.pageErrors, [], "Uncaught browser error");
    assert.deepEqual(result.consoleErrors, [], "Browser console error");
    assert.deepEqual(result.httpErrors, [], "HTTP error while loading demo");
    assert.deepEqual(result.failedRequests, [], "Failed asset or API request");
    result.passed = true;
  } catch (error) {
    result.error = error.stack || String(error);
    await page
      .screenshot({
        path: path.join(output, `${name}-failure.png`),
        fullPage: true,
      })
      .catch(() => {});
  } finally {
    report.cases.push(result);
    console.log(
      `${result.passed ? "PASS" : "FAIL"} ${name}${result.error ? `: ${result.error.split("\n")[0]}` : ""}`
    );
    await context.close();
  }
}

async function main() {
  await fs.mkdir(output, { recursive: true });
  await ready();
  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      ...(process.env.CODEV_CHROMIUM_EXECUTABLE
        ? { executablePath: process.env.CODEV_CHROMIUM_EXECUTABLE }
        : {}),
    });
  } catch {
    browser = await chromium.launch({ headless: true, channel: "chrome" });
  }
  try {
    for (const slug of slugs) {
      for (const locale of locales) {
        await runCase(browser, `direct-${slug}-${locale}`, async (page) => {
          const response = await page.goto(
            `${baseUrl}/showcases/${slug}/${locale}/index.html`
          );
          assert.equal(response.status(), 200);
          await page
            .locator(slug === "fire-safety-store" ? "#search" : "#filter")
            .waitFor();
          assert.equal(await page.locator("html").getAttribute("lang"), locale);
          await noHorizontalOverflow(page);
          if (locale === "ru")
            await page.screenshot({
              path: path.join(output, `${slug}-desktop.png`),
              fullPage: true,
            });
          await exercise(page, slug);
          await page.setViewportSize({ width: 390, height: 844 });
          await noHorizontalOverflow(page);
          if (slug === "fire-safety-store") {
            await page.locator("#menu-button").click();
            assert.equal(
              await page.locator("#menu-button").getAttribute("aria-expanded"),
              "true"
            );
            assert(await page.locator("#main-nav").isVisible());
            await page.locator("#menu-button").click();
          }
          if (locale === "ru")
            await page.screenshot({
              path: path.join(output, `${slug}-mobile.png`),
              fullPage: true,
            });
          await exercise(page, slug);
          await switchLanguage(page, locale, slug);
          await noHorizontalOverflow(page);
        });
      }
      await runCase(browser, `iframe-${slug}-ru`, async (page) => {
        const response = await page.goto(`${baseUrl}/ru/projects/${slug}/demo`);
        assert.equal(response.status(), 200);
        const element = page.locator("iframe.showcase-frame");
        await element.waitFor();
        assert.equal(await element.getAttribute("sandbox"), "allow-scripts");
        let frame = await element.contentFrame();
        await frame
          .locator(slug === "fire-safety-store" ? "#search" : "#filter")
          .waitFor();
        const isolation = await frame.locator("html").evaluate(() => {
          let parentBlocked = false;
          let storageBlocked = false;
          try {
            void window.parent.document.body;
          } catch {
            parentBlocked = true;
          }
          try {
            void window.localStorage.length;
          } catch {
            storageBlocked = true;
          }
          return { origin: globalThis.origin, parentBlocked, storageBlocked };
        });
        assert.deepEqual(isolation, {
          origin: "null",
          parentBlocked: true,
          storageBlocked: true,
        });
        await page.locator(".showcase-tools button").nth(1).click();
        await page.waitForFunction(() => Boolean(document.fullscreenElement));
        await page.evaluate(() => document.exitFullscreen());
        await exercise(frame, slug);
        for (const [index, mode] of ["desktop", "tablet", "mobile"].entries()) {
          await page.locator(".showcase-viewports button").nth(index).click();
          assert.equal(
            await page.locator(".showcase-stage").getAttribute("data-viewport"),
            mode
          );
          await noHorizontalOverflow(frame);
        }
        await page.screenshot({
          path: path.join(output, `${slug}-iframe-mobile.png`),
          fullPage: true,
        });
        await exercise(frame, slug);
        await switchLanguage(frame, "ru", slug);
        await page.locator(".showcase-tools button").first().click();
        frame = await page.locator("iframe.showcase-frame").contentFrame();
        await frame.locator('html[lang="ru"]').waitFor();
        await frame
          .locator(slug === "fire-safety-store" ? "#search" : "#filter")
          .waitFor();
        if (slug === "fire-safety-store")
          assert.equal(await frame.locator("#basket-count").textContent(), "0");
        else
          assert.equal(
            await frame.locator(".metrics strong").last().textContent(),
            "00"
          );
        await page.setViewportSize({ width: 390, height: 844 });
        await noHorizontalOverflow(page);
        await noHorizontalOverflow(frame);
        // Exercise the direct link with the keyboard as well as pointer controls above.
        await page.locator('.showcase-footer a[target="_blank"]').focus();
        const [directPage] = await Promise.all([
          page.context().waitForEvent("page"),
          page.keyboard.press("Enter"),
        ]);
        await directPage.waitForLoadState();
        assert.equal(
          new URL(directPage.url()).pathname,
          `/showcases/${slug}/ru/index.html`
        );
        await directPage.close();
        await page
          .locator(`.showcase-footer a[href="/ru/projects/${slug}"]`)
          .click();
        await page.waitForURL(`**/ru/projects/${slug}`);
        assert.equal(await page.locator(".work-detail-heading h1").count(), 1);
      });
    }
  } finally {
    await browser.close();
    report.finishedAt = new Date().toISOString();
    report.passed = report.cases.filter((item) => item.passed).length;
    report.failed = report.cases.length - report.passed;
    await fs.writeFile(
      path.join(output, "report.json"),
      `${JSON.stringify(report, null, 2)}\n`
    );
  }
  console.log(
    `${report.passed}/${report.cases.length} showcase browser cases passed. Report: ${path.join(output, "report.json")}`
  );
  if (report.failed) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
