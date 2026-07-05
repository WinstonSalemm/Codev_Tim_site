import { getTranslations } from "next-intl/server";
import { getPrinciples } from "@/lib/content";
import type { PrinciplesJsonLdGraph } from "./schema";
import {
  getDashboardCanonicalUrl,
  getPrinciplesCanonicalUrl,
} from "./site-url";

export async function buildPrinciplesJsonLd(
  locale: string
): Promise<PrinciplesJsonLdGraph> {
  const [t, tModules] = await Promise.all([
    getTranslations({ locale, namespace: "metadata" }),
    getTranslations({ locale, namespace: "modules" }),
  ]);

  const canonical = getPrinciplesCanonicalUrl(locale);
  const dashboardUrl = getDashboardCanonicalUrl(locale);
  const breadcrumbId = `${canonical}#breadcrumb`;
  const collectionId = `${canonical}#collection`;
  const itemListId = `${canonical}#itemlist`;
  const protocols = getPrinciples();

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
            name: tModules("engineeringProtocols.name"),
            item: canonical,
          },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": collectionId,
        name: tModules("engineeringProtocols.name"),
        description: t("engineeringProtocols.description"),
        url: canonical,
        inLanguage: locale,
        breadcrumb: { "@id": breadcrumbId },
        mainEntity: { "@id": itemListId },
      },
      {
        "@type": "ItemList",
        "@id": itemListId,
        name: tModules("engineeringProtocols.name"),
        numberOfItems: protocols.length,
        itemListElement: protocols.map((protocol, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${protocol.number} — ${protocol.title}`,
        })),
      },
    ],
  };
}
