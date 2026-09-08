"use client";
import { useEffect, useState } from "react";
import { type OfferId, type Locale } from "@/lib/commerce/catalog";
import {
  quoteOffer,
  money,
  DEFAULT_PROMOTIONS,
  formatPromotionEnd,
} from "@/lib/commerce/pricing";
import { COPY } from "@/lib/commerce/copy";
export function usePricingTime(initialTime: string) {
  const [now, setNow] = useState(initialTime);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const current = Date.now();
      setNow(new Date(current).toISOString());
      const nextBoundary = DEFAULT_PROMOTIONS.flatMap((p) => [
        Date.parse(p.startsAt),
        Date.parse(p.endsAt),
      ])
        .filter((t) => t > current)
        .sort((a, b) => a - b)[0];
      timer = setTimeout(
        tick,
        Math.min(60000, nextBoundary ? nextBoundary - current + 5 : 60000)
      );
    };
    tick();
    return () => clearTimeout(timer);
  }, []);
  return new Date(now);
}
export function OfferPrice({
  id,
  locale,
  at,
  compact = false,
}: {
  id: OfferId;
  locale: Locale;
  at: string;
  compact?: boolean;
}) {
  const now = usePricingTime(at);
  const q = quoteOffer(id, now);
  const t = COPY[locale];
  return (
    <div
      className={compact ? "sales-price sales-price-compact" : "sales-price"}
    >
      {q.percent > 0 && (
        <div className="sales-price-before">
          <del>{money(q.base, locale)}</del>
          <span className="sales-badge">-{q.percent}%</span>
        </div>
      )}
      <strong>
        {locale !== "uz" && <small>{t.from} </small>}
        {money(q.price, locale)}
        {locale === "uz" ? "dan" : ""}
      </strong>
      {!compact && (
        <span className="sales-price-caption">
          {id.startsWith("support-") ? t.perMonth : t.once}
        </span>
      )}
      {!compact && q.promotion && (
        <span className="sales-price-expiry">
          {q.promotion.title[locale]} · {locale !== "uz" ? t.until + " " : ""}
          {formatPromotionEnd(q.promotion.endsAt)}{" "}
          {locale === "uz" ? "gacha " : ""}(UTC+5)
        </span>
      )}
    </div>
  );
}
