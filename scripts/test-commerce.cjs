/* Behaviour tests: pure pricing and mocked delivery. No external messages are sent. */
/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS loader interception guarantees that delivery is mocked. */
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const Module = require("node:module");
const ts = require("typescript");
const root = path.resolve(__dirname, "..");
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (request, ...args) {
  return originalResolve.call(
    this,
    request.startsWith("@/")
      ? path.join(root, "src", request.slice(2))
      : request,
    ...args
  );
};
require.extensions[".ts"] = (module, filename) =>
  module._compile(
    ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
      },
    }).outputText,
    filename
  );
const {
  quoteOffer,
  calculateEstimate,
  promotionErrors,
  DEFAULT_PROMOTIONS,
  money,
  formatPromotionEnd,
} = require("../src/lib/commerce/pricing.ts");
const {
  OFFERS,
  BASE_PRICES,
  PROJECT_OFFERS,
} = require("../src/lib/commerce/catalog.ts");
const {
  validateContactForm,
} = require("../src/lib/domain/contact/validate.ts");
const {
  defaultConfiguration,
  estimateConfiguration,
  parseConfiguration,
  formatConfiguration,
  WEBSITE_OPTIONS,
} = require("../src/lib/commerce/configurator.ts");
const {
  formatContactTelegramHtml,
  formatContactPlainText,
} = require("../src/lib/application/contact/format.ts");
let passed = 0;
function test(name, fn) {
  fn();
  passed++;
  console.log("PASS " + name);
}
test("money and promotion dates are deterministic across locales and runtimes", () => {
  assert.equal(money(2700000, "uz"), "2 700 000 so‘m");
  assert.equal(money(2700000, "en"), "2 700 000 UZS");
  assert.equal(money(2700000, "ru"), "2 700 000 сум");
  assert.equal(formatPromotionEnd("2026-09-30T19:00:00Z"), "01.10.2026 00:00");
  assert.equal(
    formatPromotionEnd("2026-09-15T12:00:00+05:00"),
    "15.09.2026 12:00"
  );
});
const promo = {
  id: "test",
  enabled: true,
  title: { ru: "Тест", uz: "Sinov", en: "Test" },
  offerIds: ["landing"],
  percent: 10,
  startsAt: "2026-09-09T00:00:00+05:00",
  endsAt: "2026-10-01T00:00:00+05:00",
};
test("all registry projects have scoped offers and positive UZS prices", () => {
  const slugs = fs
    .readdirSync(path.join(root, "content/projects"))
    .filter((slug) =>
      fs.existsSync(path.join(root, "content/projects", slug, "meta.json"))
    );
  assert.deepEqual(PROJECT_OFFERS.map((o) => o.id).sort(), slugs.sort());
  for (const o of OFFERS) {
    assert.ok(BASE_PRICES[o.id] > 0);
    for (const locale of ["ru", "uz", "en"]) {
      assert.ok(o.name[locale].length);
      assert.ok(o.scope[locale].length >= 3);
    }
  }
});
test("promotion configuration is valid", () =>
  assert.deepEqual(promotionErrors(DEFAULT_PROMOTIONS), []));
test("portfolio metadata remains valid for existing registry consumers", () => {
  const {
    listProjectRegistryMeta,
  } = require("../src/lib/content/project-registry.ts");
  const projects = listProjectRegistryMeta();
  assert.equal(projects.length, 8);
  assert.equal(
    projects.find((p) => p.slug === "codev-tim").status,
    "Production"
  );
  assert.equal(
    projects.find((p) => p.slug === "codev-erp").status,
    "In Development"
  );
});
test("promotion starts at Tashkent midnight, not UTC midnight", () => {
  assert.equal(
    quoteOffer("landing", new Date("2026-09-08T18:59:59.999Z"), [promo]).price,
    3000000
  );
  assert.equal(
    quoteOffer("landing", new Date("2026-09-08T19:00:00.000Z"), [promo]).price,
    2700000
  );
});
test("promotion expires exactly at the exclusive end", () => {
  assert.equal(
    quoteOffer("landing", new Date("2026-09-30T18:59:59.999Z"), [promo]).price,
    2700000
  );
  assert.equal(
    quoteOffer("landing", new Date("2026-09-30T19:00:00.000Z"), [promo]).price,
    3000000
  );
});
test("disabled promotions and other packages keep base prices", () => {
  assert.equal(
    quoteOffer("landing", new Date("2026-09-10"), [
      { ...promo, enabled: false },
    ]).price,
    3000000
  );
  assert.equal(
    quoteOffer("corporate", new Date("2026-09-10"), [promo]).price,
    5500000
  );
});
test("overlapping promotions use the largest discount without stacking", () => {
  const stronger = { ...promo, id: "stronger", percent: 25 };
  assert.equal(
    quoteOffer("landing", new Date("2026-09-10"), [promo, stronger]).price,
    2250000
  );
});
test("malformed promotions fail closed", () => {
  for (const bad of [
    null,
    {},
    [{ ...promo, percent: 101 }],
    [{ ...promo, percent: -10 }],
    [{ ...promo, endsAt: promo.startsAt }],
    [{ ...promo, offerIds: ["typo"] }],
    [{ ...promo, startsAt: "2026-09-09" }],
    [promo, promo],
  ]) {
    assert.ok(promotionErrors(bad).length);
    assert.equal(
      quoteOffer("landing", new Date("2026-09-10"), bad).price,
      3000000
    );
  }
});
test("extras are full price, permitted for the package, and deduplicated", () => {
  const estimate = calculateEstimate(
    "landing",
    ["language", "language", "analytics", "integration", "fake"],
    new Date("2026-09-10")
  );
  assert.equal(estimate.total, 3900000);
  assert.equal(estimate.extraDays, 3);
  const switched = calculateEstimate(
    "system",
    ["language", "analytics", "integration"],
    new Date("2026-09-10")
  );
  assert.equal(switched.total, 9500000);
  assert.deepEqual(
    switched.addons.map((a) => a.id),
    ["integration"]
  );
});
const input = {
  name: "Test Client",
  phone: "+998 90 123 45 67",
  email: "",
  replyVia: "telegram",
  preferredLanguage: "ru",
  message: "",
  honeypot: "",
  locale: "ru",
};
test("email reply requires an email and phone input is bounded", () => {
  assert.equal(validateContactForm(input).ok, true);
  assert.equal(validateContactForm({ ...input, replyVia: "email" }).ok, false);
  assert.equal(validateContactForm({ ...input, phone: "123" }).ok, false);
  assert.equal(
    validateContactForm({ ...input, phone: "+1234567890123456" }).ok,
    false
  );
  assert.equal(
    validateContactForm({
      ...input,
      replyVia: "email",
      email: "test@example.com",
    }).ok,
    true
  );
});
let delivered;
const quoteDate = new Date("2026-09-15T10:00:00+05:00");
test("website pages select the correct base and charge only pages beyond five", () => {
  const c = defaultConfiguration();
  assert.equal(estimateConfiguration(c, "ru", quoteDate).total, 2700000);
  c.pages = 5;
  assert.equal(estimateConfiguration(c, "ru", quoteDate).total, 5500000);
  c.pages = 10;
  assert.equal(estimateConfiguration(c, "ru", quoteDate).total, 7500000);
});
test("website languages, admin panels and catalogue volume appear in the exact total", () => {
  const c = defaultConfiguration();
  c.pages = 10;
  c.languages = ["ru", "uz", "en"];
  c.website.contentCms = true;
  c.website.catalog = true;
  c.website.catalogCms = true;
  c.products = "100";
  const result = estimateConfiguration(c, "ru", quoteDate);
  assert.equal(
    result.total,
    5500000 + 2000000 + 1400000 + 1200000 + 1500000 + 1000000 + 800000
  );
  assert.ok(
    formatConfiguration(c, "ru", quoteDate).includes(
      "Языки: Русский, Узбекский, Английский"
    )
  );
  assert.ok(
    formatConfiguration(c, "ru", quoteDate).includes("Позиций в каталоге: 100")
  );
});
test("dependent catalogue options cannot remain charged when their parent is disabled", () => {
  const c = defaultConfiguration();
  c.website.catalogCms = true;
  c.website.cart = true;
  c.website.payment = true;
  c.products = "2000";
  const result = estimateConfiguration(c, "ru", quoteDate);
  assert.equal(result.total, 2700000);
  assert.equal(result.value.website.payment, false);
  assert.equal(result.value.products, "20");
  c.website.catalog = true;
  c.website.cart = false;
  assert.equal(parseConfiguration(c).website.payment, false);
});
test("corporate analytics is included once and language duplicates cannot increase price", () => {
  const c = defaultConfiguration();
  c.pages = 5;
  c.languages = ["ru", "ru", "uz"];
  const result = estimateConfiguration(c, "ru", quoteDate);
  assert.equal(result.value.website.analytics, true);
  assert.equal(result.total, 6200000);
  c.website.analytics = true;
  assert.equal(estimateConfiguration(c, "ru", quoteDate).total, 6200000);
});
test("calculator rejects out-of-range inputs and wrong types", () => {
  const c = defaultConfiguration();
  for (const pages of [-1, 0, 51, 1.5, "5", NaN])
    assert.throws(() => parseConfiguration({ ...c, pages }));
  assert.throws(() => parseConfiguration({ ...c, languages: [] }));
  assert.throws(() => parseConfiguration({ ...c, languages: ["xx"] }));
  assert.throws(() =>
    parseConfiguration({ ...c, website: { ...c.website, catalog: "true" } })
  );
  assert.throws(() => parseConfiguration({ ...c, details: "x".repeat(601) }));
});
test("custom CRM requires a real business description and never fabricates a price", () => {
  const c = defaultConfiguration("crm");
  c.activity = "  ";
  assert.throws(() => parseConfiguration(c, true));
  c.activity = "Турагентство";
  c.employees = "100+";
  assert.equal(estimateConfiguration(c).total, null);
  assert.ok(formatConfiguration(c).includes("Больше 100"));
});
test("AI pricing includes sources integrations and languages; CRM channel needs one integration", () => {
  const c = defaultConfiguration("ai");
  c.sources = 3;
  c.integrations = 2;
  c.languages = ["ru", "uz"];
  c.ai.handoff = true;
  assert.equal(
    estimateConfiguration(c, "ru", quoteDate).total,
    6000000 + 1200000 + 3000000 + 500000 + 700000
  );
  c.channel = "crm";
  c.integrations = 0;
  assert.equal(estimateConfiguration(c).value.integrations, 1);
  c.requests = "custom";
  assert.equal(estimateConfiguration(c).total, null);
  c.requests = "1000";
  c.scenario = "custom";
  assert.equal(estimateConfiguration(c).total, null);
});
test("Telegram brief discards website fields and support is clearly monthly", () => {
  const c = defaultConfiguration("bot");
  c.details = "unrelated website details";
  c.pages = 50;
  assert.equal(estimateConfiguration(c).total, null);
  assert.ok(!formatConfiguration(c).includes("unrelated"));
  const support = defaultConfiguration("support");
  support.supportPlan = "extended";
  const result = estimateConfiguration(support, "ru", quoteDate);
  assert.equal(result.total, 1500000);
  assert.equal(result.monthly, true);
});
test("full calculator enquiry fits Telegram and user text is escaped", () => {
  const c = defaultConfiguration();
  c.pages = 50;
  c.languages = ["ru", "uz", "en"];
  c.products = "2000";
  for (const key of WEBSITE_OPTIONS) c.website[key] = true;
  c.details = '<script>"&'.repeat(60);
  const data = {
    ...input,
    name: "<b>Client</b>",
    message: formatConfiguration(c),
  };
  assert.ok(formatContactPlainText(data).length < 4096);
  const html = formatContactTelegramHtml(data);
  assert.ok(!html.includes("<script>"));
  assert.ok(html.includes("&lt;script&gt;"));
  assert.ok(html.includes("&lt;b&gt;Client&lt;/b&gt;"));
});
let deliveryError;
class NotConfigured extends Error {}
class Failed extends Error {}
const originalLoad = Module._load;
Module._load = function (request, ...args) {
  if (request === "@/lib/application/contact")
    return {
      ContactDeliveryNotConfiguredError: NotConfigured,
      ContactDeliveryFailedError: Failed,
      deliverContactSubmission: async (data) => {
        if (deliveryError) throw deliveryError;
        delivered = data;
      },
    };
  return originalLoad.call(this, request, ...args);
};
const { submitContactForm } = require("../src/app/actions/contact.ts");
function form(values) {
  const f = new FormData();
  for (const [k, v] of Object.entries(values)) f.set(k, v);
  return f;
}
(async () => {
  const f = form({
    ...input,
    offerId: "landing",
    extras: "language,language,integration",
    price: "1",
    discount: "99",
  });
  const result = await submitContactForm({ status: "idle" }, f);
  assert.equal(result.status, "success");
  assert.ok(delivered.message.includes("landing"));
  assert.ok(delivered.message.includes("Второй язык"));
  assert.ok(!delivered.message.includes("интеграция"));
  assert.ok(!delivered.message.includes("99%"));
  passed++;
  console.log("PASS server recomputes quote and ignores forged totals");
  const expected = calculateEstimate("landing", ["language"]);
  assert.ok(
    delivered.message.includes(
      String(expected.total).replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    )
  );
  deliveryError = new NotConfigured();
  assert.deepEqual(await submitContactForm({ status: "idle" }, form(input)), {
    status: "error",
    code: "not_configured",
  });
  deliveryError = new Failed();
  assert.deepEqual(await submitContactForm({ status: "idle" }, form(input)), {
    status: "error",
    code: "delivery",
  });
  passed++;
  console.log("PASS delivery errors never return success");
  const before = delivered;
  deliveryError = undefined;
  await submitContactForm(
    { status: "idle" },
    form({ ...input, company: "spam" })
  );
  assert.equal(delivered, before);
  passed++;
  console.log("PASS honeypot does not send a message");
  const c = defaultConfiguration();
  c.pages = 10;
  c.languages = ["ru", "uz"];
  c.website.catalog = true;
  c.website.catalogCms = true;
  const configured = await submitContactForm(
    { status: "idle" },
    form({
      ...input,
      configuration: JSON.stringify({ ...c, total: 1, discount: 99 }),
      offerId: "bot",
      extras: "language",
      price: "1",
    })
  );
  assert.equal(configured.status, "success");
  assert.equal(delivered.message, formatConfiguration(c));
  passed++;
  console.log(
    "PASS server sends full configuration and recomputes every price"
  );
  const lastDelivered = delivered;
  for (const configuration of [
    "{broken",
    "x".repeat(10001),
    JSON.stringify({ ...c, pages: 999 }),
    JSON.stringify(defaultConfiguration("crm")),
  ]) {
    assert.deepEqual(
      await submitContactForm(
        { status: "idle" },
        form({ ...input, configuration })
      ),
      { status: "error", code: "configuration" }
    );
    assert.equal(delivered, lastDelivered);
  }
  passed++;
  console.log("PASS invalid configuration never reaches Telegram");
  console.log(passed + " commerce checks passed; external delivery mocked.");
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
