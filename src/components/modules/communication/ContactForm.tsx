"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  submitContactForm,
  type ContactFormState,
} from "@/app/actions/contact";
import {
  type ContactFormFieldError,
  type ContactFormInput,
} from "@/lib/domain/contact";

const INITIAL_STATE: ContactFormState = { status: "idle" };

type ContactFormProps = {
  responseTimeMinutes: number;
  initialMessage?: string;
};

export function ContactForm({
  responseTimeMinutes,
  initialMessage = "",
}: ContactFormProps) {
  const t = useTranslations("contact.form");
  const locale = useLocale();
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    INITIAL_STATE
  );

  if (state.status === "success") {
    return (
      <section
        className="ds-contact-section ds-contact-form-success"
        aria-labelledby="contact-form-success"
      >
        <h2 id="contact-form-success" className="ds-contact-section-title">
          {t("success.title")}
        </h2>
        <p className="ds-contact-form-success-body">
          {t("success.body", { minutes: responseTimeMinutes })}
        </p>
        <p className="ds-contact-form-success-note">{t("success.note")}</p>
      </section>
    );
  }

  const fieldErrors =
    state.status === "error" && state.code === "validation"
      ? state.fieldErrors
      : undefined;

  return (
    <section
      id="contact-form"
      className="ds-contact-section ds-contact-form-section"
      aria-labelledby="contact-form-heading"
    >
      <h2 id="contact-form-heading" className="ds-contact-section-title">
        {t("heading")}
      </h2>
      <p className="ds-contact-form-intro">{t("intro")}</p>

      <form action={formAction} className="ds-contact-form" noValidate>
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="replyVia" value="telegram" />
        <input type="hidden" name="preferredLanguage" value={locale} />

        <div className="ds-contact-form-honeypot" aria-hidden="true">
          <label htmlFor="contact-company">{t("honeypot")}</label>
          <input
            id="contact-company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="ds-contact-form-grid">
          <FormField
            id="contact-name"
            name="name"
            label={t("fields.name")}
            placeholder={t("placeholders.name")}
            required
            error={resolveFieldError(t, fieldErrors?.name, "name")}
          />

          <FormField
            id="contact-phone"
            name="phone"
            label={t("fields.phone")}
            placeholder={t("placeholders.phone")}
            type="tel"
            autoComplete="tel"
            required
            error={resolveFieldError(t, fieldErrors?.phone, "phone")}
          />
        </div>

        <div className="ds-contact-form-field">
          <label htmlFor="contact-message" className="ds-contact-form-label">
            {t("fields.message")}
          </label>
          <textarea
            key={initialMessage || "empty"}
            id="contact-message"
            name="message"
            className="ds-contact-form-textarea"
            placeholder={t("placeholders.message")}
            rows={5}
            defaultValue={initialMessage}
          />
        </div>

        {state.status === "error" && state.code === "delivery" ? (
          <p className="ds-contact-form-alert" role="alert">
            {t("errors.delivery")}
          </p>
        ) : null}

        {state.status === "error" && state.code === "not_configured" ? (
          <p className="ds-contact-form-alert" role="alert">
            {t("errors.notConfigured")}
          </p>
        ) : null}

        <div className="ds-contact-form-actions">
          <button
            type="submit"
            className="ds-contact-form-submit"
            disabled={isPending}
            aria-busy={isPending}
          >
            {isPending ? t("submit.pending") : t("submit.default")}
          </button>
        </div>
      </form>
    </section>
  );
}

type FormFieldProps = {
  id: string;
  name: keyof ContactFormInput;
  label: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  hint?: string;
  error?: string;
};

function FormField({
  id,
  name,
  label,
  placeholder,
  type = "text",
  autoComplete,
  required,
  hint,
  error,
}: FormFieldProps) {
  return (
    <div className="ds-contact-form-field">
      <label htmlFor={id} className="ds-contact-form-label">
        {label}
        {required ? (
          <span className="ds-contact-form-required" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </label>
      {hint ? <p className="ds-contact-form-hint">{hint}</p> : null}
      <input
        id={id}
        name={name}
        type={type}
        className="ds-contact-form-input"
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error ? (
        <p id={`${id}-error`} className="ds-contact-form-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function resolveFieldError(
  t: ReturnType<typeof useTranslations<"contact.form">>,
  error: ContactFormFieldError | undefined,
  field: "name" | "phone" | "email" | "message"
) {
  if (!error) {
    return undefined;
  }

  if (error === "required") {
    return t("errors.required", { field: t(`fields.${field}`) });
  }

  if (error === "invalid_email") {
    return t("errors.invalidEmail");
  }

  if (error === "invalid_phone") {
    return t("errors.invalidPhone");
  }

  return undefined;
}
