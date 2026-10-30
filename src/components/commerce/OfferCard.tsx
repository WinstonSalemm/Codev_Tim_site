"use client";
import { useEffect, useRef } from "react";
import { Link } from "@/i18n/navigation";
import { type Offer, type Locale } from "@/lib/commerce/catalog";
import { COPY } from "@/lib/commerce/copy";
import { OfferPrice } from "./OfferPrice";
import { EXPRESS_START_COPY } from "@/lib/commerce/express-start";
import { trackPublicEvent } from "@/lib/analytics/events";
import { ExpressStartDetails } from "./ExpressStartDetails";
export function OfferCard({
  offer,
  locale,
  at,
  onChoose,
  disabled = false,
}: {
  offer: Offer;
  locale: Locale;
  at: string;
  onChoose?: (id: string) => void;
  disabled?: boolean;
}) {
  const t = COPY[locale];
  const express = offer.id === "web_start";
  const start = EXPRESS_START_COPY[locale];
  const cardRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!express || !cardRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          trackPublicEvent("offer_view", { locale, offer_id: "web_start" });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [express, locale]);
  const trackChoice = () => {
    if (express)
      trackPublicEvent("offer_cta", { locale, offer_id: "web_start" });
  };
  return (
    <article
      ref={cardRef}
      className={
        "sales-offer" +
        (offer.id === "corporate" ? " sales-offer-featured" : "")
      }
      id={"offer-" + offer.id}
    >
      <div className="sales-offer-top">
        <span className="sales-offer-index">
          {express
            ? "WEB / START"
            : offer.kind === "pilot"
              ? t.pilot
              : offer.project
                ? t.case
                : offer.id === "system"
                  ? t.crm
                  : offer.id === "bot"
                    ? "TELEGRAM"
                    : offer.id.startsWith("support-")
                      ? "SUPPORT"
                      : "WEB / BUSINESS"}
        </span>
      </div>
      <h3>{offer.name[locale]}</h3>
      <p className="sales-offer-result">{offer.result[locale]}</p>
      <OfferPrice id={offer.id} locale={locale} at={at} />
      {express && <p className="sales-small-note">{start.paymentNote}</p>}
      <ul className="sales-scope">
        {(express ? start.cardScope : offer.scope[locale]).map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      {offer.days && (
        <p className="sales-timeline">
          {express ? (
            start.deliveryNote
          ) : (
            <>
              {t.timeline}: {offer.days} {t.workingDays}
            </>
          )}
        </p>
      )}
      {express && <ExpressStartDetails locale={locale} />}
      {offer.kind === "pilot" && (
        <p className="sales-small-note">{t.pilotNote}</p>
      )}
      <div className="sales-offer-actions">
        {onChoose ? (
          <button
            type="button"
            disabled={disabled}
            className="sales-button sales-button-secondary"
            onClick={() => {
              trackChoice();
              onChoose(offer.id);
            }}
          >
            {express ? start.order : t.order}
          </button>
        ) : (
          <Link
            className="sales-button sales-button-secondary"
            href={"/contact?offer=" + offer.id}
            onClick={trackChoice}
          >
            {express
              ? start.order
              : locale === "ru"
                ? "Обсудить этот вариант"
                : locale === "uz"
                  ? "Shu variantni muhokama qilish"
                  : "Discuss this option"}
          </Link>
        )}
        {offer.project && (
          <Link
            href={"/projects/" + offer.project}
            className="sales-detail-link"
          >
            {t.detail} →
          </Link>
        )}
      </div>
    </article>
  );
}
