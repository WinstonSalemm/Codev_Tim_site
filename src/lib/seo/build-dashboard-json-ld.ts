import { routing } from "@/i18n/routing";
import { OFFERS, lang } from "@/lib/commerce/catalog";
import { quoteOffer } from "@/lib/commerce/pricing";
import { COPY } from "@/lib/commerce/copy";
import config from "../../../content/site/config.json";
import { getDashboardCanonicalUrl, getSiteUrl } from "./site-url";
export async function buildDashboardJsonLd(locale: string) {
  const siteUrl = getSiteUrl();
  const canonical = getDashboardCanonicalUrl(locale);
  const language = lang(locale);
  const t = COPY[language];
  const now = new Date();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": siteUrl + "/#organization",
        name: "Codev_Tim",
        url: siteUrl,
        email: config.contacts.email,
        telephone: config.contacts.phones[0]!.href.replace("tel:", ""),
      },
      {
        "@type": "WebSite",
        "@id": canonical + "#website",
        name: "Codev_Tim",
        url: canonical,
        description: t.lead,
        inLanguage: [...routing.locales],
      },
      {
        "@type": "ProfessionalService",
        "@id": canonical + "#service",
        name: t.headline,
        description: t.lead,
        url: canonical + "#prices",
        areaServed: { "@type": "Country", name: "Uzbekistan" },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Tashkent",
          addressCountry: "UZ",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: t.navPrices,
          itemListElement: OFFERS.filter((o) => !o.project).map((o) => {
            const q = quoteOffer(o.id, now);
            return {
              "@type": "Offer",
              name: o.name[language],
              description: o.scope[language].join("; "),
              priceSpecification: {
                "@type": "PriceSpecification",
                minPrice: q.price,
                priceCurrency: "UZS",
              },
              ...(q.promotion ? { validThrough: q.promotion.endsAt } : {}),
              url: siteUrl + "/" + locale + "/contact?offer=" + o.id,
            };
          }),
        },
      },
    ],
  };
}
