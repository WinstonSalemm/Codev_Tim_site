/** Engagement IDs — used in ?engagement= query and form prefill. */

export const PRODUCT_ENGAGEMENT_IDS = [
  "consult",
  "landing",
  "corporate",
  "system",
] as const;

export const BRIEF_ENGAGEMENT_ID = "brief" as const;

export const SUPPORT_ENGAGEMENT_IDS = [
  "support-basic",
  "support-extended",
] as const;

export const ENGAGEMENT_IDS = [
  ...PRODUCT_ENGAGEMENT_IDS,
  BRIEF_ENGAGEMENT_ID,
  ...SUPPORT_ENGAGEMENT_IDS,
] as const;

export type EngagementId = (typeof ENGAGEMENT_IDS)[number];

/** Legacy query values from previous pricing model */
const ENGAGEMENT_ALIASES: Record<string, EngagementId> = {
  signal: "consult",
  build: "system",
  continuity: "support-basic",
};

/** Primary offers for JSON-LD OfferCatalog (products + brief) */
export const OFFER_CATALOG_IDS = [
  ...PRODUCT_ENGAGEMENT_IDS,
  BRIEF_ENGAGEMENT_ID,
] as const;

export const ENGAGEMENT_PRICES_USD: Record<EngagementId, string> = {
  consult: "0",
  landing: "400",
  corporate: "700",
  system: "1200",
  brief: "100",
  "support-basic": "150",
  "support-extended": "300",
};

export const SERVICES_PROOF_SLUGS = [
  "poj-pro-site",
  "poj-pro-platform",
  "codev-erp",
] as const;

export function resolveEngagementId(
  value: string | undefined
): EngagementId | undefined {
  if (!value) {
    return undefined;
  }

  if ((ENGAGEMENT_IDS as readonly string[]).includes(value)) {
    return value as EngagementId;
  }

  return ENGAGEMENT_ALIASES[value];
}

export function isEngagementId(
  value: string | undefined
): value is EngagementId {
  return resolveEngagementId(value) !== undefined;
}
