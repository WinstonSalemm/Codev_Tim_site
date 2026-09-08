"use client";
import { useActionState, useEffect, useId, useState } from "react";
import { submitContactForm } from "@/app/actions/contact";
import { PUBLIC_OFFERS, findOffer, type Locale } from "@/lib/commerce/catalog";
import { COPY } from "@/lib/commerce/copy";
import { calculateEstimate, money } from "@/lib/commerce/pricing";
import {
  formatConfiguration,
  type ProjectConfiguration,
} from "@/lib/commerce/configurator";
import { CONFIGURATOR_COPY } from "@/lib/commerce/configurator-copy";
import config from "../../../content/site/config.json";
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
  const uid = useId();
  const [state, action, pending] = useActionState(submitContactForm, {
    status: "idle",
  });
  useEffect(() => {
    onStatusChange?.(pending, state.status === "success");
  }, [pending, state.status, onStatusChange]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("telegram");
  const selected = findOffer(offerId);
  const estimate = selected
    ? calculateEstimate(selected.id, extras)
    : undefined;
  const errors = state.status === "error" ? state.fieldErrors : undefined;
  const draft = [
    name,
    phone,
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
      <div className="sales-success" role="status">
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
      <form id={formId} action={action} className="sales-form">
        {configuration && (
          <input
            type="hidden"
            name="configuration"
            value={JSON.stringify(configuration)}
          />
        )}
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="preferredLanguage" value={locale} />
        <input type="hidden" name="offerId" value={offerId} />
        <input type="hidden" name="extras" value={extras.join(",")} />
        <div className="sales-honeypot" aria-hidden="true">
          <label htmlFor={uid + "company"}>
            Company
            <input
              id={uid + "company"}
              name="company"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>
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
              placeholder={
                locale === "ru"
                  ? "Как к вам обращаться"
                  : locale === "uz"
                    ? "Ismingiz"
                    : "Your name"
              }
            />
          </label>
          <label htmlFor={uid + "phone"}>
            {t.phone}
            <input
              id={uid + "phone"}
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={pending}
              autoComplete="tel"
              maxLength={24}
              required
              aria-invalid={Boolean(errors?.phone)}
              placeholder="+998 90 123 45 67"
            />
          </label>
        </div>
        {compact ? (
          <input type="hidden" name="replyVia" value="call" />
        ) : (
          <label htmlFor={uid + "reply"}>
            {t.reply}
            <select
              id={uid + "reply"}
              disabled={pending}
              name="replyVia"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            >
              <option value="telegram">Telegram</option>
              <option value="call">{t.call}</option>
              <option value="email">{t.email}</option>
            </select>
          </label>
        )}
        {reply === "email" && (
          <label htmlFor={uid + "email"}>
            Email
            <input
              id={uid + "email"}
              name="email"
              type="email"
              disabled={pending}
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={254}
              aria-invalid={Boolean(errors?.email)}
            />
          </label>
        )}
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
            />
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
                href={
                  config.contacts.telegram[0]!.href +
                  "?text=" +
                  encodeURIComponent(draft)
                }
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
