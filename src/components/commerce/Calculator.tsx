"use client";
import { useState } from "react";
import {
  PRIMARY_IDS,
  findOffer,
  ADDONS,
  type Locale,
  type OfferId,
} from "@/lib/commerce/catalog";
import { COPY } from "@/lib/commerce/copy";
import { calculateEstimate, money } from "@/lib/commerce/pricing";
import { usePricingTime } from "./OfferPrice";
export function Calculator({
  locale,
  at,
  onChoose,
}: {
  locale: Locale;
  at: string;
  onChoose: (id: string, extras: string[]) => void;
}) {
  const t = COPY[locale];
  const [id, setId] = useState<OfferId>("landing");
  const [selected, setSelected] = useState<string[]>([]);
  const now = usePricingTime(at);
  const estimate = calculateEstimate(id, selected, now);
  const offer = findOffer(id)!;
  return (
    <section
      className="sales-section"
      id="calculator"
      aria-labelledby="calculator-title"
    >
      <p className="sales-eyebrow">{t.calcEyebrow}</p>
      <h2 id="calculator-title">{t.calcTitle}</h2>
      <p className="sales-section-lead">{t.calcLead}</p>
      <div className="sales-calculator">
        <div className="sales-calculator-controls">
          <fieldset>
            <legend>{t.calcPackage}</legend>
            <div className="sales-package-options">
              {PRIMARY_IDS.map((p) => (
                <label key={p} className={id === p ? "is-selected" : ""}>
                  <input
                    type="radio"
                    name="calculator-package"
                    value={p}
                    checked={id === p}
                    onChange={() => {
                      setId(p);
                      setSelected([]);
                    }}
                  />
                  <span>{findOffer(p)!.name[locale]}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>{t.calcAddons}</legend>
            <div className="sales-addon-options">
              {ADDONS.filter((a) => a.allowed.includes(id)).map((a) => (
                <label key={a.id}>
                  <input
                    type="checkbox"
                    checked={selected.includes(a.id)}
                    onChange={(e) =>
                      setSelected((prev) =>
                        e.target.checked
                          ? [...prev, a.id]
                          : prev.filter((x) => x !== a.id)
                      )
                    }
                  />
                  <span>
                    <strong>{a.name[locale]}</strong>
                    <small>{a.note[locale]}</small>
                  </span>
                  <b>+{money(a.price, locale)}</b>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
        <div className="sales-calculator-result">
          <span>{t.calcTotal}</span>
          <output
            aria-live="polite"
            aria-atomic="true"
            className="sales-estimate-total"
          >
            {money(estimate.total, locale)}
          </output>
          <dl>
            <div>
              <dt>{offer.name[locale]}</dt>
              <dd>{money(estimate.base, locale)}</dd>
            </div>
            {estimate.percent > 0 && (
              <div className="sales-estimate-discount">
                <dt>
                  {t.discount} {estimate.percent}%
                </dt>
                <dd>−{money(estimate.saving, locale)}</dd>
              </div>
            )}
            {estimate.addons.map((a) => (
              <div key={a.id}>
                <dt>{a.name[locale]}</dt>
                <dd>{money(a.price, locale)}</dd>
              </div>
            ))}
          </dl>
          <p className="sales-timeline">
            {offer.days
              .split("–")
              .map((n) => Number(n) + estimate.extraDays)
              .join("–")}{" "}
            {t.workingDays}
          </p>
          <button
            type="button"
            className="sales-button"
            onClick={() =>
              onChoose(
                id,
                estimate.addons.map((a) => a.id)
              )
            }
          >
            {t.calcAction} ↗
          </button>
          <p className="sales-small-note">{t.calcNote}</p>
        </div>
      </div>
    </section>
  );
}
