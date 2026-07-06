import {
  CONTACT_LANGUAGES,
  CONTACT_REPLY_VIA,
  type ContactFormFieldError,
  type ContactFormInput,
  type ContactValidationResult,
  type ValidatedContactForm,
} from "./types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+]?[\d\s().-]{7,24}$/;

function countDigits(value: string) {
  return value.replace(/\D/g, "").length;
}

function isReplyVia(value: string): value is ValidatedContactForm["replyVia"] {
  return (CONTACT_REPLY_VIA as readonly string[]).includes(value);
}

function isPreferredLanguage(
  value: string
): value is ValidatedContactForm["preferredLanguage"] {
  return (CONTACT_LANGUAGES as readonly string[]).includes(value);
}

export function validateContactForm(
  input: ContactFormInput
): ContactValidationResult {
  const fieldErrors: Partial<
    Record<keyof ContactFormInput, ContactFormFieldError>
  > = {};

  const name = input.name.trim();
  const phone = input.phone.trim();
  const email = input.email.trim();
  const message = input.message.trim();

  if (name.length < 2 || name.length > 80) {
    fieldErrors.name = "required";
  }

  if (
    phone.length === 0 ||
    !PHONE_PATTERN.test(phone) ||
    countDigits(phone) < 7
  ) {
    fieldErrors.phone = "invalid_phone";
  }

  if (email.length > 0 && !EMAIL_PATTERN.test(email)) {
    fieldErrors.email = "invalid_email";
  }

  if (!isReplyVia(input.replyVia)) {
    fieldErrors.replyVia = "required";
  }

  if (!isPreferredLanguage(input.preferredLanguage)) {
    fieldErrors.preferredLanguage = "required";
  }

  if (message.length > 2000) {
    fieldErrors.message = "required";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  const replyVia = input.replyVia as ValidatedContactForm["replyVia"];
  const preferredLanguage =
    input.preferredLanguage as ValidatedContactForm["preferredLanguage"];

  return {
    ok: true,
    data: {
      name,
      phone,
      email: email.length > 0 ? email : null,
      replyVia,
      preferredLanguage,
      message: message.length > 0 ? message : null,
      locale: input.locale,
    },
  };
}
