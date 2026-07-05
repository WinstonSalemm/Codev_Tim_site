import { getTranslations } from "next-intl/server";
import type { RegistryJsonLdGraph } from "./schema";
import {
  getDashboardCanonicalUrl,
  getProjectCanonicalUrl,
  getRegistryCanonicalUrl,
} from "./site-url";

export type RegistryJsonLdProduct = {
  slug: string;
  title: string;
};

export async function buildRegistryJsonLd(
  locale: string,
  products: RegistryJsonLdProduct[]
): Promise<RegistryJsonLdGraph> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const tModules = await getTranslations({ locale, namespace: "modules" });

  const canonical = getRegistryCanonicalUrl(locale);
  const dashboardUrl = getDashboardCanonicalUrl(locale);
  const breadcrumbId = `${canonical}#breadcrumb`;
  const collectionId = `${canonical}#collection`;
  const itemListId = `${canonical}#itemlist`;

  const pageName = tModules("productRegistry.name");
  const pageDescription = t("productRegistry.description");
  const operationsCenter = tModules("operationsCenter.name");
  const productRegistry = pageName;

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
            name: operationsCenter,
            item: dashboardUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: productRegistry,
            item: canonical,
          },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": collectionId,
        name: pageName,
        description: pageDescription,
        url: canonical,
        inLanguage: locale,
        breadcrumb: { "@id": breadcrumbId },
        mainEntity: { "@id": itemListId },
      },
      {
        "@type": "ItemList",
        "@id": itemListId,
        name: pageName,
        numberOfItems: products.length,
        itemListElement: products.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: product.title,
          url: getProjectCanonicalUrl(locale, product.slug),
        })),
      },
    ],
  };
}
