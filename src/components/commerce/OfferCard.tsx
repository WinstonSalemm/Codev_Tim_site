"use client";
import { Link } from "@/i18n/navigation";
import { type Offer, type Locale } from "@/lib/commerce/catalog";
import { COPY } from "@/lib/commerce/copy";
import { OfferPrice } from "./OfferPrice";
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
  return (
    <article
      className={
        "sales-offer" +
        (offer.id === "corporate" ? " sales-offer-featured" : "")
      }
      id={"offer-" + offer.id}
    >
      <div className="sales-offer-top">
        <span className="sales-offer-index">
          {offer.kind === "pilot"
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
      <ul className="sales-scope">
        {offer.scope[locale].map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      {offer.days && (
        <p className="sales-timeline">
          {t.timeline}: {offer.days} {t.workingDays}
        </p>
      )}
      {offer.kind === "pilot" && (
        <p className="sales-small-note">{t.pilotNote}</p>
      )}
      <div className="sales-offer-actions">
        {onChoose ? (
          <button
            type="button"
            disabled={disabled}
            className="sales-button sales-button-secondary"
            onClick={() => onChoose(offer.id)}
          >
            {t.order}
          </button>
        ) : (
          <Link
            className="sales-button sales-button-secondary"
            href={"/contact?offer=" + offer.id}
          >
            {locale === "ru"
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
