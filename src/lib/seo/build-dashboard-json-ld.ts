import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import {
  ENGAGEMENT_PRICES_USD,
  OFFER_CATALOG_IDS,
} from "@/lib/domain/contact/engagements";
import { SITE_ALTERNATE_NAME, SITE_NAME } from "./constants";
import type { DashboardJsonLdGraph } from "./schema";
import { getDashboardCanonicalUrl, getPersonId, getSiteUrl } from "./site-url";

export async function buildDashboardJsonLd(
  locale: string
): Promise<DashboardJsonLdGraph> {
  const t = await getTranslations({ locale, namespace: "services" });
  const siteUrl = getSiteUrl();
  const canonical = getDashboardCanonicalUrl(locale);
  const organizationId = `${siteUrl}/#organization`;
  const websiteId = `${canonical}#website`;
  const serviceId = `${canonical}#service`;
  const personId = getPersonId(locale);
  const description = `${t("hero.description")} ${t("intro")}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: SITE_NAME,
        alternateName: SITE_ALTERNATE_NAME,
        url: siteUrl,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: SITE_NAME,
        alternateName: SITE_ALTERNATE_NAME,
        url: canonical,
        description,
        inLanguage: [...routing.locales],
        publisher: { "@id": organizationId },
        author: { "@id": personId },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/${locale}/writing?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": serviceId,
        name: t("hero.title"),
        description,
        url: `${canonical}#engagements`,
        areaServed: [
          {
            "@type": "City",
            name: "Tashkent",
          },
          {
            "@type": "Country",
            name: "Uzbekistan",
          },
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Tashkent",
          addressCountry: "UZ",
        },
        provider: { "@id": personId },
        serviceType: [
          "Website development",
          "Corporate websites",
          "ERP development",
          "Business automation",
          "Telegram bots",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: t("heading"),
          itemListElement: OFFER_CATALOG_IDS.map((id, index) => {
            const isProduct = id !== "brief";
            return {
              "@type": "Offer",
              position: index + 1,
              name: isProduct ? t(`products.${id}.name`) : t("brief.heading"),
              description: isProduct
                ? t(`products.${id}.details`)
                : t("brief.body"),
              priceSpecification: {
                "@type": "PriceSpecification",
                price: ENGAGEMENT_PRICES_USD[id],
                priceCurrency: "USD",
                ...(id === "landing" || id === "corporate" || id === "system"
                  ? { minPrice: ENGAGEMENT_PRICES_USD[id] }
                  : {}),
              },
              url: `${siteUrl}/${locale}/contact?engagement=${id}`,
            };
          }),
        },
      },
    ],
  };
}
