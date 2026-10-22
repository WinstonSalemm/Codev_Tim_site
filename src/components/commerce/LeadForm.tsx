"use client";
import { useActionState, useEffect, useId, useRef, useState } from "react";
import { submitContactForm } from "@/app/actions/contact";
import { PUBLIC_OFFERS, findOffer, type Locale } from "@/lib/commerce/catalog";
import { COPY } from "@/lib/commerce/copy";
import { calculateEstimate, money } from "@/lib/commerce/pricing";
import {
  formatConfiguration,
  type ProjectConfiguration,
} from "@/lib/commerce/configurator";
import { CONFIGURATOR_COPY } from "@/lib/commerce/configurator-copy";
import { trackPublicEvent } from "@/lib/analytics/events";
import { publicSourcePath, visitChannel } from "@/lib/analytics/acquisition";
import config from "../../../content/site/config.json";

const FIELD_COPY = {
  ru: {
    name: "Введите имя: от 2 до 80 символов.",
    phone: "Введите номер с 7–15 цифрами, например +998 90 123 45 67.",
    telegram:
      "Введите Telegram username, например @username, или ссылку t.me/username.",
    email: "Введите корректный email, например name@example.com.",
    message: "Сократите описание до 1500 символов.",
  },
  uz: {
    name: "Ismingizni kiriting: 2–80 ta belgi.",
    phone: "7–15 ta raqamli telefon kiriting, masalan +998 90 123 45 67.",
    telegram:
      "Telegram username kiriting, masalan @username yoki t.me/username havolasi.",
    email: "To‘g‘ri email kiriting, masalan name@example.com.",
    message: "Tavsifni 1500 ta belgigacha qisqartiring.",
  },
  en: {
    name: "Enter a name between 2 and 80 characters.",
    phone: "Enter a phone number with 7–15 digits, e.g. +998 90 123 45 67.",
    telegram:
      "Enter your Telegram username, e.g. @username, or a t.me/username link.",
    email: "Enter a valid email, e.g. name@example.com.",
    message: "Shorten the description to 1500 characters.",
  },
};
type LeadFormProps = {
  locale: Locale;
  offerId?: string;
  extras?: string[];
  onOfferChange?: (id: string) => void;
  configuration?: ProjectConfiguration;
  compact?: boolean;
  formId?: string;
  onStatusChange?: (pending: boolean, submitted: boolean) => void;
};
export function LeadForm(props: LeadFormProps) {
  const [attempt, setAttempt] = useState(0);
  return (
    <LeadFormAttempt
      key={attempt}
      {...props}
      onRestart={() => setAttempt((n) => n + 1)}
    />
  );
}
function LeadFormAttempt({
  locale,
  offerId = "",
  extras = [],
  onOfferChange,
  onRestart,
  configuration,
  compact = false,
  formId,
  onStatusChange,
}: LeadFormProps & { onRestart: () => void }) {
  const t = COPY[locale];
  const ct = CONFIGURATOR_COPY[locale];
  const fieldCopy = FIELD_COPY[locale];
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [state, action, pending] = useActionState(submitContactForm, {
    status: "idle",
  });
  const trackedState = useRef<typeof state | null>(null);
  useEffect(() => {
    onStatusChange?.(pending, state.status === "success");
  }, [pending, state.status, onStatusChange]);
  useEffect(() => {
    if (pending) return;
    if (state.status === "error") {
      formRef.current
        ?.querySelector<HTMLElement>('[aria-invalid="true"]')
        ?.focus();
    } else if (state.status === "success") {
      successRef.current?.focus();
    }
  }, [pending, state]);
  useEffect(() => {
    if (pending || state.status === "idle" || trackedState.current === state)
      return;
    trackedState.current = state;
    const properties = {
      locale,
      form_type: compact ? ("calculator" as const) : ("contact" as const),
    };
    if (state.status === "success" && state.delivered) {
      trackPublicEvent("generate_lead", properties);
    } else if (state.status === "error") {
      trackPublicEvent("form_error", { ...properties, error_code: state.code });
    }
  }, [pending, state, locale, compact]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [telegram, setTelegram] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState<"telegram" | "call" | "email">("telegram");
  const contactKey = reply === "call" ? "phone" : reply;
  const [source, setSource] = useState({ path: "", channel: "direct" });
  const started = useRef(false);
  useEffect(() => {
    setSource({
      path: publicSourcePath(window.location.pathname),
      channel: visitChannel(),
    });
  }, []);
  const selected = findOffer(offerId);
  const estimate = selected
    ? calculateEstimate(selected.id, extras)
    : undefined;
  const errors = state.status === "error" ? state.fieldErrors : undefined;
  const draft = [
    name,
    reply === "call" ? phone : "",
    reply === "telegram" ? telegram : "",
    reply === "email" ? email : "",
    selected?.name[locale],
    ...(estimate?.addons.map(
      (a) => a.name[locale] + ": " + money(a.price, locale)
    ) ?? []),
    estimate ? t.calcTotal + ": " + money(estimate.total, locale) : "",
    estimate?.promotion
      ? estimate.promotion.title[locale] + " -" + estimate.percent + "%"
      : "",
    message,
    configuration ? formatConfiguration(configuration, locale) : "",
  ]
    .filter(Boolean)
    .join("\n");
  if (state.status === "success" && !pending)
    return (
      <div
        className="sales-success"
        role="status"
        ref={successRef}
        tabIndex={-1}
      >
        <span>✓</span>
        <h2>{ct.success}</h2>
        <p>{ct.successNote}</p>
        <a
          className="sales-button"
          href={config.contacts.telegram[0]!.href}
          target="_blank"
          rel="noreferrer"
        >
          Telegram ↗
        </a>
        <button type="button" className="sales-text-button" onClick={onRestart}>
          {t.again}
        </button>
      </div>
    );
  return (
    <div className="sales-form-wrap">
      <div className="sales-form-heading">
        <div>
          <h2>{compact ? ct.sendTitle : t.formTitle}</h2>
          <p>{compact ? ct.sendNote : t.formIntro}</p>
        </div>
      </div>
      <form
        id={formId}
        ref={formRef}
        action={action}
        onInput={() => {
          if (started.current) return;
          started.current = true;
          trackPublicEvent("form_start", {
            locale,
            form_type: compact ? "calculator" : "contact",
          });
        }}
        className="sales-form"
        aria-busy={pending}
      >
        {configuration && (
          <input
            type="hidden"
            name="configuration"
            value={JSON.stringify(configuration)}
          />
        )}
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="sourcePath" value={source.path} />
        <input type="hidden" name="sourceChannel" value={source.channel} />
        <input type="hidden" name="preferredLanguage" value={locale} />
        <input type="hidden" name="offerId" value={offerId} />
        <input type="hidden" name="extras" value={extras.join(",")} />
        <div className="sales-honeypot" aria-hidden="true">
          <label htmlFor={uid + "company"}>
            {locale === "ru"
              ? "Компания"
              : locale === "uz"
                ? "Kompaniya"
                : "Company"}
            <input
              id={uid + "company"}
              name="company"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>
        <label htmlFor={uid + "reply"}>
          {t.reply}
          <select
            id={uid + "reply"}
            disabled={pending}
            name="replyVia"
            value={reply}
            onChange={(e) => setReply(e.target.value as typeof reply)}
          >
            <option value="telegram">Telegram</option>
            <option value="email">{t.email}</option>
            <option value="call">{t.call}</option>
          </select>
        </label>
        <div className="sales-form-pair">
          <label htmlFor={uid + "name"}>
            {t.name}
            <input
              id={uid + "name"}
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={pending}
              autoComplete="name"
              minLength={2}
              maxLength={80}
              required
              aria-invalid={Boolean(errors?.name)}
              aria-describedby={errors?.name ? uid + "name-error" : undefined}
              placeholder={
                locale === "ru"
                  ? "Как к вам обращаться"
                  : locale === "uz"
                    ? "Ismingiz"
                    : "Your name"
              }
            />
            {errors?.name && (
              <small id={uid + "name-error"} className="sales-field-error">
                {fieldCopy.name}
              </small>
            )}
          </label>
          <label htmlFor={uid + contactKey}>
            {reply === "call"
              ? t.phone
              : reply === "email"
                ? "Email"
                : "Telegram"}
            <input
              key={contactKey}
              id={uid + contactKey}
              name={contactKey}
              type={
                reply === "call" ? "tel" : reply === "email" ? "email" : "text"
              }
              value={
                reply === "call" ? phone : reply === "email" ? email : telegram
              }
              onChange={(e) => {
                if (reply === "call") setPhone(e.target.value);
                else if (reply === "email") setEmail(e.target.value);
                else setTelegram(e.target.value);
              }}
              disabled={pending}
              autoComplete={
                reply === "call" ? "tel" : reply === "email" ? "email" : "off"
              }
              autoCapitalize="none"
              spellCheck={false}
              minLength={
                reply === "call" ? 7 : reply === "telegram" ? 5 : undefined
              }
              maxLength={reply === "call" ? 24 : reply === "email" ? 254 : 50}
              pattern={
                reply === "call"
                  ? String.raw`\+?[0-9\s.\(\)\-]{7,24}`
                  : reply === "telegram"
                    ? String.raw`(?:@|(?:https?://)?t\.me/)?[A-Za-z][A-Za-z0-9_]{4,31}`
                    : undefined
              }
              title={fieldCopy[contactKey]}
              required
              aria-invalid={Boolean(errors?.[contactKey])}
              aria-describedby={
                errors?.[contactKey] ? uid + contactKey + "-error" : undefined
              }
              placeholder={
                reply === "call"
                  ? "+998 90 123 45 67"
                  : reply === "email"
                    ? "name@example.com"
                    : "@username"
              }
            />
            {errors?.[contactKey] && (
              <small
                id={uid + contactKey + "-error"}
                className="sales-field-error"
              >
                {fieldCopy[contactKey]}
              </small>
            )}
          </label>
        </div>
        {onOfferChange ? (
          <label htmlFor={uid + "offer"}>
            {t.selected}
            <select
              id={uid + "offer"}
              disabled={pending}
              value={offerId}
              onChange={(e) => onOfferChange(e.target.value)}
            >
              <option value="">{t.none}</option>
              {PUBLIC_OFFERS.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name[locale]}
                </option>
              ))}
            </select>
          </label>
        ) : (
          selected && (
            <p className="sales-selection">
              {t.selected}: <strong>{selected.name[locale]}</strong>
            </p>
          )
        )}
        {!!estimate?.addons.length && (
          <p className="sales-small-note">
            {estimate.addons.map((a) => a.name[locale]).join(" · ")} -{" "}
            {t.calcTotal.toLowerCase()}: {money(estimate.total, locale)}
          </p>
        )}
        {!compact && (
          <label htmlFor={uid + "message"}>
            {t.message}
            <textarea
              id={uid + "message"}
              name="message"
              disabled={pending}
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={1500}
              aria-invalid={Boolean(errors?.message)}
              aria-describedby={
                errors?.message ? uid + "message-error" : undefined
              }
            />
            {errors?.message && (
              <small id={uid + "message-error"} className="sales-field-error">
                {fieldCopy.message}
              </small>
            )}
          </label>
        )}
        {state.status === "error" && (
          <div className="sales-form-error" role="alert">
            <p>
              {state.code === "configuration"
                ? ct.required +
                  (configuration?.kind === "crm" ? " " + ct.activity : "")
                : state.code === "validation"
                  ? t.invalid
                  : t.error}
            </p>
            {state.code !== "validation" && state.code !== "configuration" && (
              <a
                href={config.contacts.telegram[0]!.href}
                onClick={(event) => {
                  event.preventDefault();
                  const url = new URL(config.contacts.telegram[0]!.href);
                  url.searchParams.set("text", draft);
                  window.open(url.toString(), "_blank", "noopener,noreferrer");
                }}
                target="_blank"
                rel="noreferrer"
              >
                {t.telegram} ↗
              </a>
            )}
          </div>
        )}
        <button className="sales-button" type="submit" disabled={pending}>
          {pending ? t.sending : ct.submit}
        </button>
        <p className="sales-consent">{t.consent}</p>
      </form>
    </div>
  );
}
