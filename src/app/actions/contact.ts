"use server";

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
  | { status: "success" }
  | {
      status: "error";
      code: "validation" | "delivery" | "not_configured";
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
    return { status: "success" };
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
    await deliverContactSubmission(validation.data);
    return { status: "success" };
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
