"use server";

import { findOffer, lang } from "@/lib/commerce/catalog";
import { calculateEstimate, money } from "@/lib/commerce/pricing";
import {
  formatConfiguration,
  parseConfiguration,
} from "@/lib/commerce/configurator";

import {
  ContactDeliveryFailedError,
  ContactDeliveryNotConfiguredError,
  deliverContactSubmission,
} from "@/lib/application/contact";
import {
  validateContactForm,
  type ContactFormFieldError,
  type ContactFormInput,
} from "@/lib/domain/contact";

export type ContactFormState =
  | { status: "idle" }
  | { status: "success"; delivered: boolean }
  | {
      status: "error";
      code: "validation" | "configuration" | "delivery" | "not_configured";
      fieldErrors?: Partial<
        Record<keyof ContactFormInput, ContactFormFieldError>
      >;
    };

function parseContactFormInput(formData: FormData): ContactFormInput {
  return {
    name: String(formData.get("name") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    replyVia: String(formData.get("replyVia") ?? ""),
    preferredLanguage: String(formData.get("preferredLanguage") ?? ""),
    message: String(formData.get("message") ?? ""),
    honeypot: String(formData.get("company") ?? ""),
    locale: String(formData.get("locale") ?? "en"),
  };
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const input = parseContactFormInput(formData);

  if (input.honeypot.trim().length > 0) {
    return { status: "success", delivered: false };
  }

  const validation = validateContactForm(input);

  if (!validation.ok) {
    return {
      status: "error",
      code: "validation",
      fieldErrors: validation.fieldErrors,
    };
  }

  try {
    const rawConfiguration = formData.get("configuration");
    if (rawConfiguration !== null) {
      try {
        if (
          typeof rawConfiguration !== "string" ||
          rawConfiguration.length > 10000
        )
          throw new Error("Invalid configuration");
        const configuration = parseConfiguration(
          JSON.parse(rawConfiguration),
          true
        );
        validation.data.message = formatConfiguration(configuration, "ru");
      } catch {
        return { status: "error", code: "configuration" };
      }
    }
    // Resolve price and permitted extras on the server; never trust a submitted total.
    const offer = findOffer(String(formData.get("offerId") ?? ""));
    if (offer && rawConfiguration === null) {
      const locale = lang(input.locale);
      const extras = String(formData.get("extras") ?? "")
        .slice(0, 200)
        .split(",");
      const estimate = calculateEstimate(offer.id, extras);
      const context = [
        `Пакет: ${offer.name[locale]} (${offer.id})`,
        `Базовая цена: ${money(estimate.base)}`,
        ...(estimate.promotion
          ? [
              `Акция: ${estimate.promotion.id}, -${estimate.percent}% (${money(estimate.saving)})`,
            ]
          : []),
        ...estimate.addons.map((a) => `${a.name[locale]}: ${money(a.price)}`),
        `Ориентир: от ${money(estimate.total)}; точная смета после обсуждения.`,
      ].join("\n");
      validation.data.message = [context, validation.data.message]
        .filter(Boolean)
        .join("\n\n");
    }
    await deliverContactSubmission(validation.data);
    return { status: "success", delivered: true };
  } catch (error) {
    if (error instanceof ContactDeliveryNotConfiguredError) {
      return { status: "error", code: "not_configured" };
    }

    if (error instanceof ContactDeliveryFailedError) {
      return { status: "error", code: "delivery" };
    }

    return { status: "error", code: "delivery" };
  }
}
