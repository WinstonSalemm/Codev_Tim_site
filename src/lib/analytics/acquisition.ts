export const ACQUISITION_CHANNELS = [
  "direct",
  "google-search",
  "google-ads",
  "yandex",
  "telegram",
  "instagram",
  "referral",
] as const;
export type AcquisitionChannel = (typeof ACQUISITION_CHANNELS)[number];

export function publicSourcePath(value: string) {
  return /^\/(en|ru|uz)(?:\/(?:contact|about|projects(?:\/[a-z0-9-]+)?|services\/(?:websites|crm-automation|telegram-bots|landing-page|catalog-website)))?$/.test(
    value
  )
    ? value
    : "";
}

// Retain only a channel category, never click IDs, arbitrary UTM values or a referrer URL.
export function acquisitionChannel(
  search: string,
  referrer: string
): AcquisitionChannel {
  const params = new URLSearchParams(search);
  const source = (params.get("utm_source") ?? "").toLowerCase();
  const medium = (params.get("utm_medium") ?? "").toLowerCase();
  if (
    params.has("gclid") ||
    (source === "google" && ["cpc", "ppc", "paidsearch"].includes(medium))
  )
    return "google-ads";
  if (source === "telegram" || source === "tg") return "telegram";
  if (source === "instagram") return "instagram";
  if (source === "google") return "google-search";
  if (source === "yandex") return "yandex";
  try {
    const host = new URL(referrer).hostname;
    if (/(^|\.)google\.[a-z.]+$/.test(host)) return "google-search";
    if (/(^|\.)yandex\.[a-z.]+$/.test(host)) return "yandex";
    if (host === "t.me" || host === "telegram.org") return "telegram";
    if (/(^|\.)instagram\.com$/.test(host)) return "instagram";
    if (host !== "www.codev-tim.uz" && host !== "codev-tim.uz")
      return "referral";
  } catch {
    /* An empty referrer is a direct or unknown visit. */
  }
  return "direct";
}

export function visitChannel(): AcquisitionChannel {
  const current = acquisitionChannel(window.location.search, document.referrer);
  try {
    const previous = sessionStorage.getItem("codev:channel");
    if (
      current === "direct" &&
      ACQUISITION_CHANNELS.includes(previous as AcquisitionChannel)
    )
      return previous as AcquisitionChannel;
    sessionStorage.setItem("codev:channel", current);
  } catch {
    /* Contact forms work even when browser storage is unavailable. */
  }
  return current;
}
