import { routing } from "@/i18n/routing";
import { PUBLIC_OFFERS, lang } from "@/lib/commerce/catalog";
import { COPY } from "@/lib/commerce/copy";
import config from "../../../content/site/config.json";
import { getDashboardCanonicalUrl, getSiteUrl } from "./site-url";
import { buildOfferJsonLd } from "./build-offer-json-ld";
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
        "@id": siteUrl + "/#website",
        name: "Codev_Tim",
        url: canonical,
        description: t.lead,
        inLanguage: [...routing.locales],
      },
      {
        "@type": "ProfessionalService",
        "@id": siteUrl + "/#business",
        name: "Codev_Tim",
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
          itemListElement: PUBLIC_OFFERS.map((offer) =>
            buildOfferJsonLd(offer, language, canonical, now)
          ),
        },
      },
    ],
  };
}
