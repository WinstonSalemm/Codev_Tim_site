import { getTranslations } from "next-intl/server";
import { getArticles } from "@/lib/content";
import type { WritingJsonLdGraph } from "./schema";
import {
  getArticleCanonicalUrl,
  getDashboardCanonicalUrl,
  getWritingCanonicalUrl,
} from "./site-url";

export async function buildWritingJsonLd(
  locale: string
): Promise<WritingJsonLdGraph> {
  const [t, tModules] = await Promise.all([
    getTranslations({ locale, namespace: "metadata" }),
    getTranslations({ locale, namespace: "modules" }),
  ]);

  const canonical = getWritingCanonicalUrl(locale);
  const dashboardUrl = getDashboardCanonicalUrl(locale);
  const breadcrumbId = `${canonical}#breadcrumb`;
  const collectionId = `${canonical}#collection`;
  const itemListId = `${canonical}#itemlist`;
  const notes = getArticles();

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
            name: tModules("knowledgeBase.name"),
            item: canonical,
          },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": collectionId,
        name: tModules("knowledgeBase.name"),
        description: t("knowledgeBase.description"),
        url: canonical,
        inLanguage: locale,
        breadcrumb: { "@id": breadcrumbId },
        mainEntity: { "@id": itemListId },
      },
      {
        "@type": "ItemList",
        "@id": itemListId,
        name: tModules("knowledgeBase.name"),
        numberOfItems: notes.length,
        itemListElement: notes.map((note, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: note.title,
          url: getArticleCanonicalUrl(locale, note.slug),
        })),
      },
    ],
  };
}
