const EVENT_NAMES = ["generate_lead", "form_error", "contact_click"] as const;
const PROPERTY_VALUES = {
  locale: ["ru", "uz", "en"],
  form_type: ["contact", "calculator"],
  contact_method: ["telegram", "phone", "email", "whatsapp", "instagram"],
  error_code: ["validation", "configuration", "delivery", "not_configured"],
} as const;

type PublicEvent = (typeof EVENT_NAMES)[number];
type EventProperties = {
  [K in keyof typeof PROPERTY_VALUES]?: (typeof PROPERTY_VALUES)[K][number];
};
type Gtag = (
  command: "event",
  name: PublicEvent,
  parameters: Record<string, string>
) => void;
type AnalyticsWindow = Window & { gtag?: Gtag; dataLayer?: unknown[] };

/** Only fixed event labels enter analytics; contact values and URL queries do not. */
export function trackPublicEvent(
  name: PublicEvent,
  properties: EventProperties = {}
) {
  if (
    typeof window === "undefined" ||
    !process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ||
    ["localhost", "127.0.0.1", "[::1]", "::1"].includes(
      window.location.hostname
    ) ||
    !EVENT_NAMES.includes(name)
  )
    return false;

  try {
    const target = window as AnalyticsWindow;
    const parameters: Record<string, string> = {
      send_to: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
      page_location: target.location.origin + target.location.pathname,
    };
    for (const key of Object.keys(PROPERTY_VALUES) as Array<
      keyof EventProperties
    >) {
      const value = properties[key];
      if (value && (PROPERTY_VALUES[key] as readonly string[]).includes(value))
        parameters[key] = value;
    }

    // Preserve gtag's Arguments queue format when its lazy script is not ready.
    const enqueue: Gtag = function () {
      // eslint-disable-next-line prefer-rest-params -- gtag consumes this exact queue format.
      (target.dataLayer ??= []).push(arguments);
    };
    (target.gtag ?? enqueue)("event", name, parameters);
    return true;
  } catch {
    // An unavailable analytics provider must never break the enquiry form.
    return false;
  }
}
