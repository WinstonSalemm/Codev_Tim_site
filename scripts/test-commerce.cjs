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
  formatPromotionDeadline,
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
  assert.equal(
    formatPromotionDeadline("2026-10-01T00:00:00+05:00", "ru"),
    "30 сентября"
  );
});
test("promotion deadlines keep RU UZ EN text stable across Tashkent date boundaries", () => {
  const originalDateTimeFormat = Intl.DateTimeFormat;
  try {
    Intl.DateTimeFormat = function () {
      throw new Error("Browser locale data unavailable");
    };
    const cases = [
      [
        "2026-10-01T00:00:00+05:00",
        ["30 сентября", "30-sentabr", "September 30"],
      ],
      ["2026-09-30T19:00:00Z", ["30 сентября", "30-sentabr", "September 30"]],
      ["2026-09-30T20:00:00Z", ["1 октября", "1-oktabr", "October 1"]],
      ["2027-01-01T00:00:00+05:00", ["31 декабря", "31-dekabr", "December 31"]],
      ["2028-03-01T00:00:00+05:00", ["29 февраля", "29-fevral", "February 29"]],
      [
        "2026-09-15T12:00:00+05:00",
        ["15 сентября", "15-sentabr", "September 15"],
      ],
    ];
    for (const [deadline, expected] of cases) {
      assert.deepEqual(
        ["ru", "uz", "en"].map((locale) =>
          formatPromotionDeadline(deadline, locale)
        ),
        expected
      );
    }
  } finally {
    Intl.DateTimeFormat = originalDateTimeFormat;
  }
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
test("portfolio and registry agree; commercial offers have positive UZS prices", () => {
  const { PORTFOLIO } = require("../src/lib/portfolio.ts");
  const slugs = fs
    .readdirSync(path.join(root, "content/projects"))
    .filter((slug) =>
      fs.existsSync(path.join(root, "content/projects", slug, "meta.json"))
    );
  assert.deepEqual(PORTFOLIO.map((p) => p.slug).sort(), slugs.sort());
  assert.deepEqual(
    PROJECT_OFFERS.map((o) => o.id).sort(),
    PORTFOLIO.filter((p) => !p.internal)
      .map((p) => p.slug)
      .sort()
  );
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
  const { PORTFOLIO } = require("../src/lib/portfolio.ts");
  assert.equal(projects.length, PORTFOLIO.length);
  assert.equal(
    projects.find((p) => p.slug === "codev-tim").status,
    "Production"
  );
  assert.equal(
    projects.find((p) => p.slug === "codev-erp").status,
    "Production"
  );
  const {
    loadProjectMdxBySlug,
  } = require("../src/lib/content/internal/project-mdx-sources.ts");
  for (const locale of ["ru", "uz", "en"]) {
    assert.ok(loadProjectMdxBySlug("call-tracker", locale));
  }
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
test("one selected contact is sufficient and required; Telegram input is normalized", () => {
  const telegram = validateContactForm({
    ...input,
    phone: "",
    telegram: "https://t.me/test_client",
  });
  assert.equal(telegram.ok, true);
  assert.equal(telegram.data.telegram, "@test_client");
  assert.match(
    formatContactTelegramHtml(telegram.data),
    /Telegram:.*@test_client/
  );
  assert.ok(!formatContactTelegramHtml(telegram.data).includes("Телефон:"));
  assert.equal(
    validateContactForm({
      ...input,
      phone: "",
      replyVia: "email",
      email: "client@example.com",
    }).ok,
    true
  );
  assert.equal(
    validateContactForm({ ...input, phone: "", telegram: "" }).ok,
    false
  );
  assert.equal(
    validateContactForm({
      ...input,
      phone: "",
      replyVia: "call",
      telegram: "@test_client",
    }).ok,
    false
  );
  for (const bad of [
    "@abc",
    "@invalid-name",
    "https://other.example/test_client",
    "@test_client?x=1",
    "@test_client\nspam",
  ]) {
    assert.equal(
      validateContactForm({ ...input, phone: "", telegram: bad }).ok,
      false
    );
  }
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
test("conversion events exclude contact data and query strings, and skip local audits", () => {
  const { trackPublicEvent } = require("../src/lib/analytics/events.ts");
  const previousWindow = global.window;
  const previousId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const events = [];
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "G-COMMERCE-TEST";
  try {
    global.window = {
      location: new URL(
        "https://codev-tim.uz/ru/contact?email=private@example.com#draft"
      ),
      gtag: (...event) => events.push(event),
    };
    assert.equal(
      trackPublicEvent("generate_lead", {
        locale: "ru",
        form_type: "contact",
        email: "private@example.com",
        message: "Private brief",
      }),
      true
    );
    assert.deepEqual(events[0], [
      "event",
      "generate_lead",
      {
        send_to: "G-COMMERCE-TEST",
        page_location: "https://codev-tim.uz/ru/contact",
        locale: "ru",
        form_type: "contact",
      },
    ]);
    assert.equal(trackPublicEvent("private_message", {}), false);
    global.window.location = new URL("http://127.0.0.1:3000/ru/contact");
    assert.equal(trackPublicEvent("generate_lead", {}), false);
    assert.equal(events.length, 1);
    global.window = { location: new URL("https://codev-tim.uz/uz") };
    assert.equal(
      trackPublicEvent("form_error", { locale: "uz", error_code: "delivery" }),
      true
    );
    assert.deepEqual(Array.from(global.window.dataLayer[0]), [
      "event",
      "form_error",
      {
        send_to: "G-COMMERCE-TEST",
        page_location: "https://codev-tim.uz/uz",
        locale: "uz",
        error_code: "delivery",
      },
    ]);
    delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    assert.equal(trackPublicEvent("generate_lead", {}), false);
    assert.equal(global.window.dataLayer.length, 1);
  } finally {
    if (previousWindow === undefined) delete global.window;
    else global.window = previousWindow;
    if (previousId === undefined)
      delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    else process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = previousId;
  }
});
let deliveryError;
test("service presets use calculator prices and include catalogue analytics once", () => {
  const {
    serviceConfiguration,
  } = require("../src/lib/commerce/service-preset.ts");
  const at = new Date("2026-10-22T00:00:00+05:00");
  for (const locale of ["ru", "uz", "en"]) {
    assert.equal(
      estimateConfiguration(serviceConfiguration("landing", locale), locale, at)
        .total,
      3000000
    );
    const catalogue = estimateConfiguration(
      serviceConfiguration("catalog", locale),
      locale,
      at
    );
    assert.equal(catalogue.total, 7000000);
    assert.equal(catalogue.value.website.analytics, true);
    assert.equal(catalogue.value.products, "20");
  }
});
test("acquisition retains categories and rejects arbitrary source paths", () => {
  const {
    acquisitionChannel,
    publicSourcePath,
  } = require("../src/lib/analytics/acquisition.ts");
  assert.equal(acquisitionChannel("?gclid=never-store-this", ""), "google-ads");
  assert.equal(
    acquisitionChannel("?utm_source=telegram&utm_campaign=private", ""),
    "telegram"
  );
  assert.equal(
    acquisitionChannel("", "https://www.google.com/search?q=private"),
    "google-search"
  );
  assert.equal(
    publicSourcePath("/ru/services/catalog-website"),
    "/ru/services/catalog-website"
  );
  for (const unsafe of [
    "/ru/contact?email=private",
    "https://evil.test/ru",
    "/api/secret",
    "/ru/services/constructor",
  ])
    assert.equal(publicSourcePath(unsafe), "");
});
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
  assert.equal(result.delivered, true);
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
  for (const locale of ["ru", "uz", "en"]) {
    const express = await submitContactForm(
      { status: "idle" },
      form({
        ...input,
        locale,
        preferredLanguage: locale,
        offerId: "web_start",
        extras: "language,analytics,integration",
        price: "1",
        currency: "UZS",
        discount: "99",
      })
    );
    assert.deepEqual(express, { status: "success", delivered: true });
    assert.ok(delivered.message.includes("(web_start)"));
    assert.ok(
      delivered.message.includes(
        OFFERS.find((o) => o.id === "web_start").name[locale]
      )
    );
    assert.ok(delivered.message.includes("$100"));
    assert.ok(
      delivered.message.includes(
        "Оплата в сумах по заранее согласованной смете"
      )
    );
    assert.ok(!delivered.message.includes("100 сум"));
    assert.ok(!delivered.message.includes("99%"));
    assert.ok(!delivered.message.includes("Второй язык"));
    assert.ok(!delivered.message.includes("700 000"));
  }
  passed++;
  console.log(
    "PASS Express Start sends its identity and fixed USD price for RU UZ EN; forged addons and totals are ignored"
  );
  const beforeInvalidExpress = delivered;
  assert.deepEqual(
    await submitContactForm(
      { status: "idle" },
      form({
        ...input,
        offerId: "web_start",
        configuration: JSON.stringify(defaultConfiguration("website")),
      })
    ),
    { status: "error", code: "configuration" }
  );
  assert.equal(delivered, beforeInvalidExpress);
  assert.equal(
    (
      await submitContactForm(
        { status: "idle" },
        form({
          ...input,
          offerId: "web_start",
          name: "",
          phone: "",
          telegram: "",
        })
      )
    ).code,
    "validation"
  );
  assert.equal(delivered, beforeInvalidExpress);
  passed++;
  console.log(
    "PASS Express Start rejects custom configuration and invalid required fields before delivery"
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
  const spam = await submitContactForm(
    { status: "idle" },
    form({ ...input, company: "spam" })
  );
  assert.deepEqual(spam, { status: "success", delivered: false });
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
  assert.equal(
    delivered.message,
    [formatConfiguration(c), input.message].filter(Boolean).join("\n\n")
  );
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
  await submitContactForm(
    { status: "idle" },
    form({
      ...input,
      sourcePath: "/ru/services/catalog-website",
      sourceChannel: "google-ads",
    })
  );
  assert.ok(delivered.message.includes("/ru/services/catalog-website"));
  assert.ok(delivered.message.includes("google-ads"));
  await submitContactForm(
    { status: "idle" },
    form({
      ...input,
      sourcePath: "/ru/contact?secret=private",
      sourceChannel: "malicious\nlabel",
    })
  );
  assert.ok(!(delivered.message ?? "").includes("secret"));
  assert.ok(!(delivered.message ?? "").includes("malicious"));
  passed++;
  console.log(
    "PASS lead delivery preserves safe page context and excludes arbitrary query data"
  );
  const telegramOnly = await submitContactForm(
    { status: "idle" },
    form({ ...input, phone: "", telegram: "t.me/test_client" })
  );
  assert.deepEqual(telegramOnly, { status: "success", delivered: true });
  assert.equal(delivered.telegram, "@test_client");
  assert.equal(delivered.phone, "");
  const emailOnly = await submitContactForm(
    { status: "idle" },
    form({
      ...input,
      phone: "",
      replyVia: "email",
      email: "client@example.com",
    })
  );
  assert.deepEqual(emailOnly, { status: "success", delivered: true });
  assert.equal(delivered.email, "client@example.com");
  const acknowledged = delivered;
  const noContact = await submitContactForm(
    { status: "idle" },
    form({ ...input, phone: "" })
  );
  assert.equal(noContact.code, "validation");
  assert.equal(delivered, acknowledged);
  passed++;
  console.log(
    "PASS Telegram-only and email-only enquiries deliver; no-contact enquiries do not"
  );
  console.log(passed + " commerce checks passed; external delivery mocked.");
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
