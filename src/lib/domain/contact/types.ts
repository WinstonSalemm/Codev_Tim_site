export const CONTACT_REPLY_VIA = ["email", "call", "telegram"] as const;
export const CONTACT_LANGUAGES = ["en", "ru", "uz"] as const;

export type ContactReplyVia = (typeof CONTACT_REPLY_VIA)[number];
export type ContactLanguage = (typeof CONTACT_LANGUAGES)[number];

export type ContactFormFieldError =
  "required" | "invalid_email" | "invalid_phone";

export type ContactFormInput = {
  name: string;
  phone: string;
  email: string;
  replyVia: string;
  preferredLanguage: string;
  message: string;
  honeypot: string;
  locale: string;
};

export type ValidatedContactForm = {
  name: string;
  phone: string;
  email: string | null;
  replyVia: ContactReplyVia;
  preferredLanguage: ContactLanguage;
  message: string | null;
  locale: string;
};

export type ContactValidationResult =
  | { ok: true; data: ValidatedContactForm }
  | {
      ok: false;
      fieldErrors: Partial<
        Record<keyof ContactFormInput, ContactFormFieldError>
      >;
    };
