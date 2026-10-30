/* Fixed-package currency and product boundaries. No external requests or delivery. */
/* eslint-disable @typescript-eslint/no-require-imports -- Load TypeScript with the existing commerce test convention. */
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
  formatOfferMoney,
  offerCurrency,
} = require("../src/lib/commerce/pricing.ts");
const {
  BASE_PRICES,
  PRIMARY_IDS,
  PUBLIC_OFFERS,
  findOffer,
  resolvePublicOfferId,
} = require("../src/lib/commerce/catalog.ts");
const { EXPRESS_START_COPY } = require("../src/lib/commerce/express-start.ts");
const { SERVICE_LANDINGS } = require("../src/lib/commerce/service-landings.ts");
const { buildOfferJsonLd } = require("../src/lib/seo/build-offer-json-ld.ts");
const { trackPublicEvent } = require("../src/lib/analytics/events.ts");

let passed = 0;
function test(name, fn) {
  fn();
  passed++;
  console.log("PASS " + name);
}
const at = new Date("2026-10-30T12:00:00+05:00");
const offer = findOffer("web_start");

test("Express Start is public and precedes custom landing without changing old prices", () => {
  assert(offer);
  assert.equal(resolvePublicOfferId("web_start"), "web_start");
  assert.equal(
    PUBLIC_OFFERS.filter((item) => item.id === "web_start").length,
    1
  );
  assert(PRIMARY_IDS.indexOf("web_start") < PRIMARY_IDS.indexOf("landing"));
  assert.deepEqual(SERVICE_LANDINGS.websites.offerIds, [
    "web_start",
    "landing",
    "corporate",
  ]);
  assert.equal(BASE_PRICES.web_start, 100);
  assert.equal(BASE_PRICES.landing, 3000000);
  assert.equal(BASE_PRICES.corporate, 5500000);
  assert.equal(BASE_PRICES.bot, 2500000);
  assert.equal(BASE_PRICES.system, 8000000);
});

test("fixed USD price stays separate from UZS in every locale", () => {
  assert.equal(offerCurrency("web_start"), "USD");
  assert.equal(offerCurrency("landing"), "UZS");
  for (const locale of ["ru", "uz", "en"]) {
    assert.equal(formatOfferMoney("web_start", 100, locale), "$100");
  }
  assert.equal(formatOfferMoney("landing", 3000000, "ru"), "3 000 000 сум");
  assert.equal(formatOfferMoney("landing", 3000000, "uz"), "3 000 000 so‘m");
  assert.equal(formatOfferMoney("landing", 3000000, "en"), "3 000 000 UZS");
});

test("fixed package ignores forged discounts and disallowed extras", () => {
  const promotion = {
    id: "attempted-discount",
    enabled: true,
    title: { ru: "Тест", uz: "Sinov", en: "Test" },
    offerIds: ["web_start"],
    percent: 70,
    startsAt: "2026-10-01T00:00:00+05:00",
    endsAt: "2026-11-01T00:00:00+05:00",
  };
  assert(promotionErrors([promotion]).length > 0);
  for (const rules of [[promotion], null, [], { arbitrary: true }]) {
    assert.deepEqual(quoteOffer("web_start", at, rules), {
      base: 100,
      price: 100,
      saving: 0,
      percent: 0,
      promotion: null,
    });
  }
  const estimate = calculateEstimate(
    "web_start",
    ["language", "language", "analytics", "integration", "fake"],
    at
  );
  assert.equal(estimate.total, 100);
  assert.equal(estimate.extraDays, 0);
  assert.deepEqual(estimate.addons, []);
  assert.equal(quoteOffer("landing", at).price, 3000000);
  assert.equal(quoteOffer("landing", at).promotion, null);
});

test("structured data describes fixed USD separately from custom minimum UZS", () => {
  for (const locale of ["ru", "uz", "en"]) {
    const pageUrl = `https://www.codev-tim.uz/${locale}/services/websites`;
    const fixed = buildOfferJsonLd(offer, locale, pageUrl, at);
    assert.equal(fixed.priceSpecification.price, 100);
    assert.equal(fixed.priceSpecification.minPrice, undefined);
    assert.equal(fixed.priceSpecification.priceCurrency, "USD");
    assert.equal(fixed.validThrough, undefined);
    assert.equal(fixed.url, pageUrl + "#offer-web_start");
    const custom = buildOfferJsonLd(findOffer("landing"), locale, pageUrl, at);
    assert.equal(custom.priceSpecification.minPrice, 3000000);
    assert.equal(custom.priceSpecification.price, undefined);
    assert.equal(custom.priceSpecification.priceCurrency, "UZS");
  }
});

test("package scope and terms are fully localized without Russian fallback", () => {
  for (const locale of ["ru", "uz", "en"]) {
    const copy = EXPRESS_START_COPY[locale];
    assert.equal(offer.name[locale], copy.name);
    assert.equal(copy.scope.length, 8);
    assert(copy.paymentNote.includes("$100"));
    assert(copy.deliveryNote.includes("2–3"));
    assert(copy.scope.some((item) => item.includes("14")));
    for (const value of Object.values(copy).flat()) {
      assert.equal(typeof value, "string");
      assert(value.trim().length > 0);
      if (locale !== "ru") assert(!/[А-Яа-яЁё]/.test(value));
    }
  }
});

test("offer events keep a fixed product ID and exclude contact details", () => {
  const previousWindow = global.window;
  const previousId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const events = [];
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "G-EXPRESS-TEST";
  try {
    global.window = {
      location: new URL(
        "https://www.codev-tim.uz/en/services/websites?email=private@example.com"
      ),
      gtag: (...event) => events.push(event),
    };
    for (const name of ["offer_view", "offer_cta", "generate_lead"]) {
      assert.equal(
        trackPublicEvent(name, {
          locale: "en",
          offer_id: "web_start",
          email: "private@example.com",
          message: "Private brief",
        }),
        true
      );
    }
    assert.equal(events.length, 3);
    for (const event of events) {
      assert.equal(event[2].offer_id, "web_start");
      assert.equal(event[2].service, "websites");
      assert.equal(event[2].email, undefined);
      assert.equal(event[2].message, undefined);
      assert.equal(
        event[2].page_location,
        "https://www.codev-tim.uz/en/services/websites"
      );
    }
    trackPublicEvent("offer_cta", { offer_id: "forged-private-value" });
    assert.equal(events[3][2].offer_id, undefined);
  } finally {
    if (previousWindow === undefined) delete global.window;
    else global.window = previousWindow;
    if (previousId === undefined)
      delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    else process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = previousId;
  }
});

Module._resolveFilename = originalResolve;
console.log(passed + " Express Start checks passed; no external requests.");
