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
  const telegram = (input.telegram ?? "")
    .trim()
    .replace(/^(?:https?:\/\/)?t\.me\//i, "")
    .replace(/^@/, "");
  const message = input.message.trim();

  if (name.length < 2 || name.length > 80) {
    fieldErrors.name = "required";
  }

  if (
    (input.replyVia === "call" && phone.length === 0) ||
    (phone.length > 0 &&
      (!PHONE_PATTERN.test(phone) ||
        countDigits(phone) < 7 ||
        countDigits(phone) > 15))
  ) {
    fieldErrors.phone = "invalid_phone";
  }

  if (
    (email.length > 0 && (!EMAIL_PATTERN.test(email) || email.length > 254)) ||
    (input.replyVia === "email" && email.length === 0)
  ) {
    fieldErrors.email = "invalid_email";
  }

  if (
    (telegram.length > 0 && !/^[A-Za-z][A-Za-z0-9_]{4,31}$/.test(telegram)) ||
    // Keep accepting already-open legacy forms that supplied a phone for Telegram.
    (input.replyVia === "telegram" && !telegram && !phone)
  ) {
    fieldErrors.telegram = "invalid_telegram";
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
      ...(telegram ? { telegram: `@${telegram}` } : {}),
      email: email.length > 0 ? email : null,
      replyVia,
      preferredLanguage,
      message: message.length > 0 ? message : null,
      locale: (CONTACT_LANGUAGES as readonly string[]).includes(input.locale)
        ? input.locale
        : "ru",
    },
  };
}
