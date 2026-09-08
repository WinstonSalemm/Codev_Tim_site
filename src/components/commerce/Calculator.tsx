"use client";
import {
  useCallback,
  useId,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Locale } from "@/lib/commerce/catalog";
import { CONFIGURATOR_COPY } from "@/lib/commerce/configurator-copy";
import {
  AI_OPTIONS,
  defaultConfiguration,
  estimateConfiguration,
  PROJECT_KINDS,
  type ProjectConfiguration,
  type WebsiteOption,
} from "@/lib/commerce/configurator";
import rates from "../../../content/commerce/configurator.json";
import { money } from "@/lib/commerce/pricing";
import { LeadForm } from "./LeadForm";
import { usePricingTime } from "./OfferPrice";

export function Calculator({
  locale,
  at,
  configuration: c,
  onChange,
  onLockChange,
}: {
  locale: Locale;
  at: string;
  configuration: ProjectConfiguration;
  onChange: Dispatch<SetStateAction<ProjectConfiguration>>;
  onLockChange?: (locked: boolean) => void;
}) {
  const t = CONFIGURATOR_COPY[locale];
  const [locked, setLocked] = useState(false);
  const onStatusChange = useCallback(
    (pending: boolean, submitted: boolean) => {
      setLocked(pending || submitted);
      onLockChange?.(pending || submitted);
    },
    [onLockChange]
  );
  const formId = useId();
  const now = usePricingTime(at);
  const result = estimateConfiguration(c, locale, now);
  const set = <K extends keyof ProjectConfiguration>(
    key: K,
    value: ProjectConfiguration[K]
  ) => onChange((previous) => ({ ...previous, [key]: value }));
  const option = (key: WebsiteOption) => (
    <label className="config-option" key={key}>
      <span>
        <strong>{t[key]}</strong>
        <small>{t[`${key}Note`]}</small>
      </span>
      <span className="config-option-end">
        <span>
          {key === "analytics" && c.pages > 1
            ? t.included
            : "+" + money(rates.website[key], locale)}
        </span>
        <input
          type="checkbox"
          role="switch"
          disabled={key === "analytics" && c.pages > 1}
          checked={result.value.website[key]}
          onChange={(event) =>
            onChange((previous) => {
              const website = {
                ...previous.website,
                [key]: event.target.checked,
              };
              if (!website.catalog) {
                website.catalogCms = false;
                website.cart = false;
              }
              if (!website.cart) website.payment = false;
              return { ...previous, website };
            })
          }
        />
        <span className="config-switch" aria-hidden="true" />
      </span>
    </label>
  );
  const languages = (
    <fieldset className="config-field">
      <legend>{t.languages}</legend>
      <div className="config-language-options">
        {(["ru", "uz", "en"] as const).map((l) => (
          <label key={l}>
            <input
              type="checkbox"
              checked={c.languages.includes(l)}
              disabled={c.languages.length === 1 && c.languages[0] === l}
              onChange={(e) =>
                set(
                  "languages",
                  e.target.checked
                    ? [...c.languages, l]
                    : c.languages.filter((x) => x !== l)
                )
              }
            />
            <span>{t.languageNames[l]}</span>
          </label>
        ))}
      </div>
      <p className="config-help">{t.languagesNote}</p>
    </fieldset>
  );
  return (
    <section
      className="sales-section configurator"
      id="calculator"
      aria-labelledby="calculator-title"
    >
      <div className="config-heading">
        <p className="sales-eyebrow">
          {locale === "ru"
            ? "Калькулятор проекта"
            : locale === "uz"
              ? "Loyiha kalkulyatori"
              : "Project calculator"}
        </p>
        <h2 id="calculator-title" tabIndex={-1}>
          {t.title}
        </h2>
        <p className="sales-section-lead">{t.lead}</p>
      </div>
      <fieldset disabled={locked} className="config-kind-picker">
        <legend className="sr-only">
          {locale === "ru"
            ? "Тип проекта"
            : locale === "uz"
              ? "Loyiha turi"
              : "Project type"}
        </legend>
        {PROJECT_KINDS.map((kind) => (
          <label key={kind}>
            <input
              type="radio"
              name={formId + "kind"}
              checked={c.kind === kind}
              onChange={() => onChange(defaultConfiguration(kind, locale))}
            />
            <span>{t.kinds[kind]}</span>
          </label>
        ))}
      </fieldset>
      <div className={`config-layout config-layout--${c.kind}`}>
        <fieldset disabled={locked} className="config-controls" key={c.kind}>
          <legend className="sr-only">{t.selected}</legend>
          {c.kind === "website" && (
            <>
              <div className="config-group">
                <h3>{t.website}</h3>
                <label className="config-field">
                  {t.pages}
                  <div className="config-page-count">
                    <input
                      form={formId}
                      aria-label={t.pages}
                      type="number"
                      min={1}
                      max={50}
                      step={1}
                      required
                      value={c.pages}
                      onChange={(e) => {
                        const n = Number(e.target.value);
                        if (Number.isInteger(n) && n >= 1 && n <= 50)
                          set("pages", n);
                      }}
                    />
                    <div className="config-presets">
                      {[1, 5, 10, 20, 50].map((n) => (
                        <button
                          key={n}
                          type="button"
                          aria-pressed={c.pages === n}
                          onClick={() => set("pages", n)}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                  <small>{t.pagesNote}</small>
                </label>
                {languages}
              </div>
              <div className="config-group">
                <h3>{t.functionality}</h3>
                {option("contentCms")}
                {option("catalog")}
                {c.website.catalog && (
                  <div className="config-nested">
                    <label className="config-field">
                      {t.products}
                      <select
                        form={formId}
                        value={c.products}
                        onChange={(e) =>
                          set(
                            "products",
                            e.target.value as ProjectConfiguration["products"]
                          )
                        }
                      >
                        {["20", "100", "500", "2000"].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                      <small>{t.productsNote}</small>
                    </label>
                    {option("catalogCms")}
                    {option("cart")}
                    {c.website.cart && option("payment")}
                  </div>
                )}
                {option("booking")}
                {option("account")}
              </div>
              <details className="config-more">
                <summary>
                  {t.more}
                  <span aria-hidden="true">+</span>
                </summary>
                <div>
                  {option("analytics")}
                  {option("seo")}
                  {option("migration")}
                </div>
              </details>
            </>
          )}
          {c.kind === "crm" && (
            <div className="config-group">
              <h3>{t.kinds.crm}</h3>
              <p className="config-help">{t.crmNote}</p>
              <label className="config-field">
                {t.activity}
                <textarea
                  form={formId}
                  name="businessActivity"
                  rows={4}
                  required
                  minLength={3}
                  maxLength={400}
                  value={c.activity}
                  placeholder={t.activityPlaceholder}
                  onChange={(e) => set("activity", e.target.value)}
                />
              </label>
              <label className="config-field">
                {t.size}
                <select
                  form={formId}
                  value={c.employees}
                  onChange={(e) =>
                    set(
                      "employees",
                      e.target.value as ProjectConfiguration["employees"]
                    )
                  }
                >
                  {Object.entries(t.sizes).map(([id, label]) => (
                    <option key={id} value={id}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}
          {c.kind === "ai" && (
            <>
              <div className="config-group">
                <h3>{t.kinds.ai}</h3>
                <div className="config-field-pair">
                  <label className="config-field">
                    {t.scenario}
                    <select
                      form={formId}
                      value={c.scenario}
                      onChange={(e) =>
                        set(
                          "scenario",
                          e.target.value as ProjectConfiguration["scenario"]
                        )
                      }
                    >
                      {Object.entries(t.scenarios).map(([id, label]) => (
                        <option key={id} value={id}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="config-field">
                    {t.channel}
                    <select
                      form={formId}
                      value={c.channel}
                      onChange={(e) =>
                        set(
                          "channel",
                          e.target.value as ProjectConfiguration["channel"]
                        )
                      }
                    >
                      {Object.entries(t.channels).map(([id, label]) => (
                        <option key={id} value={id}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                {languages}
                <label className="config-field">
                  {t.sources}
                  <select
                    form={formId}
                    value={c.sources}
                    onChange={(e) => set("sources", Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n}>{n}</option>
                    ))}
                  </select>
                  <small>{t.sourcesNote}</small>
                </label>
                <div className="config-field-pair">
                  <label className="config-field">
                    {t.requests}
                    <select
                      form={formId}
                      value={c.requests}
                      onChange={(e) =>
                        set(
                          "requests",
                          e.target.value as ProjectConfiguration["requests"]
                        )
                      }
                    >
                      {Object.entries(t.volumes).map(([id, label]) => (
                        <option key={id} value={id}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="config-field">
                    {t.integrations}
                    <select
                      form={formId}
                      value={result.value.integrations}
                      onChange={(e) =>
                        set("integrations", Number(e.target.value))
                      }
                    >
                      {(c.channel === "crm" ? [1, 2, 3] : [0, 1, 2, 3]).map(
                        (n) => (
                          <option key={n}>{n}</option>
                        )
                      )}
                    </select>
                    <small>{t.integrationsNote}</small>
                  </label>
                </div>
              </div>
              <div className="config-group">
                {AI_OPTIONS.map((key) => (
                  <label className="config-option" key={key}>
                    <span>
                      <strong>{t[key]}</strong>
                      <small>{t[`${key}Note`]}</small>
                    </span>
                    <span className="config-option-end">
                      <span>+{money(rates.ai[key], locale)}</span>
                      <input
                        type="checkbox"
                        role="switch"
                        checked={c.ai[key]}
                        onChange={(e) =>
                          set("ai", { ...c.ai, [key]: e.target.checked })
                        }
                      />
                      <span className="config-switch" aria-hidden="true" />
                    </span>
                  </label>
                ))}
                <p className="config-help">{t.aiNote}</p>
              </div>
            </>
          )}
          {c.kind === "bot" && (
            <div className="config-brief">
              <span className="config-brief-symbol" aria-hidden="true">
                ↗
              </span>
              <h3>{t.kinds.bot}</h3>
              <p>{t.botNote}</p>
            </div>
          )}
          {c.kind === "support" && (
            <div className="config-group">
              <h3>{t.kinds.support}</h3>
              <label className="config-field">
                {t.supportPlan}
                <select
                  form={formId}
                  value={c.supportPlan}
                  onChange={(e) =>
                    set(
                      "supportPlan",
                      e.target.value as ProjectConfiguration["supportPlan"]
                    )
                  }
                >
                  {Object.entries(t.supportPlans).map(([id, label]) => (
                    <option key={id} value={id}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}
          {c.kind === "audit" && (
            <div className="config-group">
              <h3>{t.kinds.audit}</h3>
              <p>{t.auditNote}</p>
            </div>
          )}
          {["website", "ai", "support", "audit"].includes(c.kind) && (
            <label className="config-field config-details">
              {t.details}
              <textarea
                form={formId}
                rows={3}
                maxLength={600}
                value={c.details}
                placeholder={t.detailsPlaceholder}
                onChange={(e) => set("details", e.target.value)}
              />
            </label>
          )}
        </fieldset>
        <aside className="config-result">
          {c.kind !== "bot" && (
            <div className="config-summary">
              <span className="config-result-label">{t.estimate}</span>
              <output
                className="config-total"
                aria-live="polite"
                aria-atomic="true"
              >
                {result.total === null ? t.manual : money(result.total, locale)}
              </output>
              {!result.manual ? (
                <>
                  <span className="config-billing">
                    {result.monthly ? t.monthly : t.once}
                  </span>
                  <dl>
                    <div>
                      <dt>{t.base}</dt>
                      <dd>{money(result.quote.base, locale)}</dd>
                    </div>
                    {result.quote.saving > 0 && (
                      <div className="config-discount">
                        <dt>
                          {t.discount} {result.quote.percent}%
                        </dt>
                        <dd>-{money(result.quote.saving, locale)}</dd>
                      </div>
                    )}
                    {result.lines.map((line) => (
                      <div key={line.label}>
                        <dt>{line.label}</dt>
                        <dd>{money(line.amount, locale)}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="config-help">{t.totalNote}</p>
                </>
              ) : (
                <p className="config-help">{t.manualNote}</p>
              )}
            </div>
          )}
          <LeadForm
            locale={locale}
            configuration={c}
            compact
            formId={formId}
            onStatusChange={onStatusChange}
          />
        </aside>
      </div>
    </section>
  );
}
