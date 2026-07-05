import { routing } from "@/i18n/routing";
import {
  SITE_ALTERNATE_NAME,
  SITE_JSON_LD_DESCRIPTION,
  SITE_NAME,
} from "./constants";
import type { DashboardJsonLdGraph } from "./schema";
import { getDashboardCanonicalUrl, getPersonId, getSiteUrl } from "./site-url";

export function buildDashboardJsonLd(locale: string): DashboardJsonLdGraph {
  const siteUrl = getSiteUrl();
  const canonical = getDashboardCanonicalUrl(locale);
  const organizationId = `${siteUrl}/#organization`;
  const websiteId = `${canonical}#website`;
  const personId = getPersonId(locale);

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
        description: SITE_JSON_LD_DESCRIPTION,
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
    ],
  };
}
