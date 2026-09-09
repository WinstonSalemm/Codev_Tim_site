import type { Locale, Offer } from "@/lib/commerce/catalog";
import { quoteOffer } from "@/lib/commerce/pricing";

export function buildOfferJsonLd(
  offer: Offer,
  locale: Locale,
  pageUrl: string,
  at: Date
) {
  const quote = quoteOffer(offer.id, at);
  const monthly = offer.kind === "support";

  return {
    "@type": "Offer",
    name: offer.name[locale],
    description: offer.scope[locale].join("; "),
    priceSpecification: {
      "@type": monthly ? "UnitPriceSpecification" : "PriceSpecification",
      minPrice: quote.price,
      priceCurrency: "UZS",
      ...(monthly
        ? {
            referenceQuantity: {
              "@type": "QuantitativeValue",
              value: 1,
              unitCode: "MON",
            },
          }
        : {}),
    },
    ...(quote.promotion ? { validThrough: quote.promotion.endsAt } : {}),
    url: `${pageUrl}#offer-${offer.id}`,
  };
}
