import { getTranslations } from "next-intl/server";
import type { ContactJsonLdGraph } from "./schema";
import {
  getContactCanonicalUrl,
  getDashboardCanonicalUrl,
  getPersonId,
} from "./site-url";

export async function buildContactJsonLd(
  locale: string
): Promise<ContactJsonLdGraph> {
  const [t, tModules] = await Promise.all([
    getTranslations({ locale, namespace: "metadata" }),
    getTranslations({ locale, namespace: "modules" }),
  ]);

  const canonical = getContactCanonicalUrl(locale);
  const dashboardUrl = getDashboardCanonicalUrl(locale);
  const breadcrumbId = `${canonical}#breadcrumb`;
  const contactPageId = `${canonical}#contactpage`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: tModules("operationsCenter.name"),
            item: dashboardUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: tModules("communicationModule.name"),
            item: canonical,
          },
        ],
      },
      {
        "@type": "ContactPage",
        "@id": contactPageId,
        name: tModules("communicationModule.name"),
        description: t("communicationModule.description"),
        url: canonical,
        inLanguage: locale,
        breadcrumb: { "@id": breadcrumbId },
        mainEntity: { "@id": getPersonId(locale) },
      },
    ],
  };
}
