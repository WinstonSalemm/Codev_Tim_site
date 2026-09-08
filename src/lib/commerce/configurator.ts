import rates from "../../../content/commerce/configurator.json";
import type { Locale, OfferId } from "./catalog";
import { CONFIGURATOR_COPY } from "./configurator-copy";
import { money, quoteOffer } from "./pricing";

export const PROJECT_KINDS = [
  "website",
  "crm",
  "ai",
  "bot",
  "support",
  "audit",
] as const;
export type ProjectKind = (typeof PROJECT_KINDS)[number];
export const WEBSITE_OPTIONS = [
  "contentCms",
  "catalog",
  "catalogCms",
  "cart",
  "payment",
  "booking",
  "account",
  "analytics",
  "seo",
  "migration",
] as const;
export type WebsiteOption = (typeof WEBSITE_OPTIONS)[number];
export const AI_OPTIONS = ["handoff", "updates", "preparation"] as const;
export type AiOption = (typeof AI_OPTIONS)[number];
export type ProjectConfiguration = {
  kind: ProjectKind;
  pages: number;
  languages: Locale[];
  website: Record<WebsiteOption, boolean>;
  products: "20" | "100" | "500" | "2000";
  activity: string;
  employees: "10" | "50" | "100" | "100+";
  scenario: "support" | "sales" | "knowledge" | "custom";
  channel: "web" | "telegram" | "crm";
  sources: number;
  requests: "1000" | "5000" | "20000" | "custom";
  integrations: number;
  ai: Record<AiOption, boolean>;
  details: string;
  supportPlan: "basic" | "extended";
};
export function defaultConfiguration(
  kind: ProjectKind = "website",
  locale: Locale = "ru"
): ProjectConfiguration {
  return {
    kind,
    pages: 1,
    languages: [locale],
    website: Object.fromEntries(
      WEBSITE_OPTIONS.map((id) => [id, false])
    ) as ProjectConfiguration["website"],
    products: "20",
    activity: "",
    employees: "10",
    scenario: "support",
    channel: "web",
    sources: 1,
    requests: "1000",
    integrations: 0,
    ai: { handoff: false, updates: false, preparation: false },
    details: "",
    supportPlan: "basic",
  };
}
function choice<T extends string>(value: unknown, values: readonly T[]): T {
  if (typeof value !== "string" || !values.includes(value as T))
    throw new Error("Invalid choice");
  return value as T;
}
function integer(value: unknown, min: number, max: number) {
  if (
    typeof value !== "number" ||
    !Number.isInteger(value) ||
    value < min ||
    value > max
  )
    throw new Error("Invalid number");
  return value;
}
function limitedText(value: unknown, max: number) {
  if (typeof value !== "string" || value.length > max)
    throw new Error("Invalid text");
  return value.trim();
}
function flags<K extends string>(
  raw: unknown,
  keys: readonly K[]
): Record<K, boolean> {
  if (!raw || typeof raw !== "object" || Array.isArray(raw))
    throw new Error("Invalid options");
  return Object.fromEntries(
    keys.map((k) => {
      const value = (raw as Record<string, unknown>)[k];
      if (typeof value !== "boolean") throw new Error("Invalid option");
      return [k, value];
    })
  ) as Record<K, boolean>;
}
// Only the active branch is accepted. Other branches, submitted totals and unknown keys cannot affect the quote.
export function parseConfiguration(
  raw: unknown,
  forSubmission = false
): ProjectConfiguration {
  if (!raw || typeof raw !== "object" || Array.isArray(raw))
    throw new Error("Invalid configuration");
  const data = raw as Record<string, unknown>;
  const kind = choice(data.kind, PROJECT_KINDS);
  const value = defaultConfiguration(kind);
  if (kind === "website" || kind === "ai") {
    if (
      !Array.isArray(data.languages) ||
      data.languages.length < 1 ||
      data.languages.length > 3
    )
      throw new Error("Select a language");
    value.languages = [
      ...new Set(
        data.languages.map((l) => choice(l, ["ru", "uz", "en"] as const))
      ),
    ];
  }
  if (kind === "website") {
    value.pages = integer(data.pages, 1, 50);
    value.website = flags(data.website, WEBSITE_OPTIONS);
    if (value.pages > 1) value.website.analytics = true;
    if (!value.website.catalog) {
      value.website.catalogCms = false;
      value.website.cart = false;
    }
    if (!value.website.cart) value.website.payment = false;
    value.products = value.website.catalog
      ? choice(data.products, ["20", "100", "500", "2000"] as const)
      : "20";
  }
  if (kind === "crm") {
    value.activity = limitedText(data.activity, 400);
    value.employees = choice(data.employees, [
      "10",
      "50",
      "100",
      "100+",
    ] as const);
    if (forSubmission && value.activity.length < 3)
      throw new Error("Describe your business");
  }
  if (kind === "ai") {
    value.scenario = choice(data.scenario, [
      "support",
      "sales",
      "knowledge",
      "custom",
    ] as const);
    value.channel = choice(data.channel, ["web", "telegram", "crm"] as const);
    value.sources = integer(data.sources, 1, 5);
    value.requests = choice(data.requests, [
      "1000",
      "5000",
      "20000",
      "custom",
    ] as const);
    value.integrations = integer(data.integrations, 0, 3);
    if (value.channel === "crm")
      value.integrations = Math.max(1, value.integrations);
    value.ai = flags(data.ai, AI_OPTIONS);
  }
  if (kind === "support")
    value.supportPlan = choice(data.supportPlan, [
      "basic",
      "extended",
    ] as const);
  if (["website", "ai", "support", "audit"].includes(kind))
    value.details = limitedText(data.details, 600);
  return value;
}
export function estimateConfiguration(
  raw: ProjectConfiguration,
  locale: Locale = "ru",
  now = new Date()
) {
  const value = parseConfiguration(raw);
  const t = CONFIGURATOR_COPY[locale];
  const offerId: OfferId =
    value.kind === "website"
      ? value.pages === 1
        ? "landing"
        : "corporate"
      : value.kind === "ai"
        ? "assistant-agent"
        : value.kind === "support"
          ? value.supportPlan === "basic"
            ? "support-basic"
            : "support-extended"
          : value.kind === "audit"
            ? "brief"
            : value.kind === "bot"
              ? "bot"
              : "system";
  const quote = quoteOffer(offerId, now);
  const lines: { label: string; amount: number }[] = [];
  const add = (label: string, amount: number) => {
    if (amount) lines.push({ label, amount });
  };
  const selections: { label: string; value: string }[] = [];
  const select = (label: string, detail: string | number) =>
    selections.push({ label, value: String(detail) });
  if (value.kind === "website") {
    select(t.pages, value.pages);
    select(
      t.languages,
      value.languages.map((l) => t.languageNames[l]).join(", ")
    );
    add(
      t.extraPages + ` (${Math.max(0, value.pages - 5)})`,
      Math.max(0, value.pages - 5) * rates.website.extraPage
    );
    add(
      t.extraLanguages,
      (value.languages.length - 1) * rates.website.extraLanguage
    );
    for (const key of WEBSITE_OPTIONS) {
      select(t[key], value.website[key] ? t.yes : t.no);
      if (value.website[key] && !(key === "analytics" && value.pages > 1))
        add(t[key], rates.website[key]);
    }
    if (value.website.catalog) {
      select(t.products, value.products);
      if (value.products !== "20")
        add(t.catalogVolume, rates.website[`products${value.products}`]);
    }
  }
  if (value.kind === "crm") {
    select(t.activity, value.activity);
    select(t.size, t.sizes[value.employees]);
  }
  if (value.kind === "ai") {
    select(t.scenario, t.scenarios[value.scenario]);
    select(t.channel, t.channels[value.channel]);
    select(t.sources, value.sources);
    select(t.requests, t.volumes[value.requests]);
    select(t.integrations, value.integrations);
    select(
      t.languages,
      value.languages.map((l) => t.languageNames[l]).join(", ")
    );
    add(
      t.sources + ` (+${value.sources - 1})`,
      (value.sources - 1) * rates.ai.extraSource
    );
    add(t.integrations, value.integrations * rates.ai.integration);
    add(
      t.extraLanguages,
      (value.languages.length - 1) * rates.ai.extraLanguage
    );
    for (const key of AI_OPTIONS) {
      select(t[key], value.ai[key] ? t.yes : t.no);
      if (value.ai[key]) add(t[key], rates.ai[key]);
    }
  }
  if (value.kind === "support")
    select(t.supportPlan, t.supportPlans[value.supportPlan]);
  const manual =
    value.kind === "crm" ||
    value.kind === "bot" ||
    (value.kind === "ai" &&
      (value.scenario === "custom" || value.requests === "custom"));
  return {
    value,
    offerId,
    quote,
    lines,
    selections,
    manual,
    total: manual
      ? null
      : quote.price + lines.reduce((sum, line) => sum + line.amount, 0),
    monthly: value.kind === "support",
  };
}
export function formatConfiguration(
  raw: ProjectConfiguration,
  locale: Locale = "ru",
  now = new Date()
) {
  const result = estimateConfiguration(raw, locale, now);
  const t = CONFIGURATOR_COPY[locale];
  return [
    `${t.kinds[result.value.kind]}`,
    ...result.selections.map((s) => `${s.label}: ${s.value}`),
    "",
    ...(result.manual
      ? [t.manual, t.manualNote]
      : [
          `${t.base}: ${money(result.quote.base, locale)}`,
          ...(result.quote.promotion
            ? [
                `${result.quote.promotion.title[locale]}: -${result.quote.percent}% (${money(result.quote.saving, locale)})`,
              ]
            : []),
          ...result.lines.map(
            (line) => `${line.label}: +${money(line.amount, locale)}`
          ),
          `${t.estimate}: ${money(result.total!, locale)} ${result.monthly ? t.monthly : t.once}`,
        ]),
    ...(result.value.details
      ? ["", `${t.details}: ${result.value.details}`]
      : []),
  ].join("\n");
}
