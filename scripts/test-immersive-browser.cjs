const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const { chromium } = require(
  process.env.CODEV_PLAYWRIGHT_MODULE || "playwright"
);

(async () => {
  const base = process.env.BASE_URL || "http://127.0.0.1:3100";
  const out = path.join(process.cwd(), "data/showcase-qa");
  await fs.mkdir(out, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.CODEV_CHROMIUM_EXECUTABLE,
  });
  const errors = [];
  const results = [];
  const measurements = [];
  const context = await browser.newContext({ colorScheme: "dark" });
  await context.addInitScript(() => {
    window.__showcaseMetrics = { lcp: 0, cls: 0 };
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries())
        window.__showcaseMetrics.lcp = entry.startTime;
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries())
        if (!entry.hadRecentInput) window.__showcaseMetrics.cls += entry.value;
    }).observe({ type: "layout-shift", buffered: true });
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  async function overflow(label) {
    const sizes = await page.evaluate(() => {
      const main = document.querySelector(".ds-shell-content-main");
      return {
        body: document.documentElement.scrollWidth,
        width: innerWidth,
        main: main?.scrollWidth,
        mainWidth: main?.clientWidth,
      };
    });
    assert(
      sizes.body <= sizes.width + 1 && sizes.main <= sizes.mainWidth + 1,
      `${label}: horizontal overflow ${JSON.stringify(sizes)}`
    );
  }
  try {
    for (const [width, height] of [
      [1440, 1000],
      [1920, 1080],
      [1024, 768],
      [768, 1024],
      [390, 844],
      [360, 800],
    ]) {
      await page.setViewportSize({ width, height });
      for (const locale of ["ru", "uz", "en"]) {
        const response = await page.goto(`${base}/${locale}`, {
          waitUntil: "networkidle",
        });
        assert.equal(response.status(), 200);
        await page.locator(".living-title h1").waitFor();
        await page.evaluate(() => document.fonts.ready);
        await overflow(`${locale} ${width}`);
        measurements.push({
          locale,
          width,
          ...(await page.evaluate(() => ({
            ...window.__showcaseMetrics,
            transferBytes: performance
              .getEntriesByType("resource")
              .reduce((sum, entry) => sum + entry.transferSize, 0),
          }))),
        });
        assert.equal(
          await page.locator(".living-project-controls button").count(),
          3
        );
        await page.locator(".living-project-controls button").nth(1).click();
        await page.waitForFunction(
          () =>
            document
              .querySelectorAll(".living-project-controls button")[1]
              ?.getAttribute("aria-pressed") === "true"
        );
        assert.equal(
          await page
            .locator(".living-project-controls button")
            .nth(1)
            .getAttribute("aria-pressed"),
          "true"
        );
        assert.match(
          await page
            .locator(".living-project-links a")
            .first()
            .getAttribute("href"),
          /codev-erp\/demo$/
        );
        await page.locator(".living-project-controls button").first().click();
        await page.evaluate(() => {
          document
            .querySelector(".ds-shell-content-main")
            .scrollTo({ top: 0, behavior: "instant" });
        });
        await page.waitForFunction(
          () => document.querySelector(".ds-shell-content-main").scrollTop === 0
        );
        if (locale === "ru" && [1440, 390, 360, 768].includes(width))
          await page.screenshot({
            path: path.join(out, `home-${locale}-${width}.png`),
          });
        results.push({ locale, width, status: "passed" });
        console.log(`PASS homepage ${locale} ${width}px`);
      }
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${base}/ru`, { waitUntil: "networkidle" });
    await page.locator(".scene-navigation a[href='#engineering']").click();
    await page.locator("#engineering").waitFor({ state: "visible" });
    await page.locator(".engineering-model-picker button").nth(1).click();
    await page.waitForFunction(
      () =>
        document
          .querySelectorAll(".engineering-model-picker button")[1]
          ?.getAttribute("aria-pressed") === "true"
    );
    assert.equal(
      await page
        .locator(".engineering-model-picker button")
        .nth(1)
        .getAttribute("aria-pressed"),
      "true"
    );
    await page.screenshot({ path: path.join(out, "engineering-1440.png") });
    await page.locator(".studio-theme").click();
    await page.evaluate(() =>
      Promise.all(
        document
          .getAnimations()
          .filter((a) => a.effect?.getTiming().iterations !== Infinity)
          .map((a) => a.finished.catch(() => {}))
      )
    );
    assert.equal(
      await page.locator("html").getAttribute("data-theme"),
      "light"
    );
    await page.evaluate(() => {
      document
        .querySelector(".ds-shell-content-main")
        .scrollTo({ top: 0, behavior: "instant" });
    });
    await page.screenshot({ path: path.join(out, "home-light-1440.png") });
    await page.goto(`${base}/ru/projects`, { waitUntil: "networkidle" });
    assert.equal(await page.locator(".work-item").count(), 9);
    assert.equal(await page.locator(".work-demo-link").count(), 3);
    await overflow("projects desktop");
    await page.screenshot({ path: path.join(out, "projects-1440.png") });
    await page.goto(`${base}/ru/projects/fire-safety-store`, {
      waitUntil: "networkidle",
    });
    assert.equal(await page.locator("iframe").count(), 0);
    await page.locator(".showcase-launch").click();
    await page
      .frameLocator("iframe")
      .locator("#products .product")
      .first()
      .waitFor();
    assert.match(
      await page.locator(".work-next-project").getAttribute("href"),
      /projects\//
    );
    await page.screenshot({ path: path.join(out, "fire-case-1440.png") });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${base}/ru`, { waitUntil: "networkidle" });
    await page.locator(".ds-header-menu-button").click();
    assert.equal(
      await page
        .locator(".ds-header-menu-button")
        .getAttribute("aria-expanded"),
      "true"
    );
    await page.keyboard.press("Escape");
    assert.equal(
      await page
        .locator(".ds-header-menu-button")
        .getAttribute("aria-expanded"),
      "false"
    );
    await page.locator(".studio-estimate-link").click();
    assert.equal(
      await page.evaluate(() => document.activeElement.id),
      "calculator-title"
    );
    await page.screenshot({ path: path.join(out, "calculator-390.png") });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`${base}/ru`, { waitUntil: "networkidle" });
    await page.locator(".living-canvas").hover();
    assert.equal(
      await page
        .locator(".living-hero")
        .evaluate((el) =>
          getComputedStyle(el).getPropertyValue("--canvas-x").trim()
        ),
      "0deg"
    );
    assert.deepEqual(errors, [], `Browser errors: ${errors.join("; ")}`);
    console.log(
      `PASS ${results.length} localized viewport checks, scene controls, theme, lazy demo, menu, calculator, reduced motion.`
    );
    await fs.writeFile(
      path.join(out, "immersive-results.json"),
      JSON.stringify({ base, results, measurements, errors }, null, 2)
    );
  } catch (error) {
    await page.screenshot({ path: path.join(out, "immersive-failure.png") });
    console.error({ url: page.url(), errors, completed: results.length });
    throw error;
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
