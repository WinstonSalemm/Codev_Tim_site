import { getTranslations } from "next-intl/server";
import type { Article } from "@/lib/content/types";
import type { ArticleJsonLdGraph } from "./schema";
import { DEFAULT_OG_IMAGE_PATH } from "./constants";
import {
  getArticleCanonicalUrl,
  getDashboardCanonicalUrl,
  getPersonId,
  getSiteUrl,
  getWritingCanonicalUrl,
} from "./site-url";

export async function buildArticleJsonLd(
  locale: string,
  article: Article
): Promise<ArticleJsonLdGraph> {
  const tModules = await getTranslations({ locale, namespace: "modules" });
  const canonical = getArticleCanonicalUrl(locale, article.slug);
  const breadcrumbId = `${canonical}#breadcrumb`;
  const techArticleId = `${canonical}#techarticle`;
  const blogPostingId = `${canonical}#blogposting`;
  const image = `${getSiteUrl()}${DEFAULT_OG_IMAGE_PATH}`;

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
            item: getDashboardCanonicalUrl(locale),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: tModules("knowledgeBase.name"),
            item: getWritingCanonicalUrl(locale),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: canonical,
          },
        ],
      },
      {
        "@type": "TechArticle",
        "@id": techArticleId,
        headline: article.title,
        description: article.summary,
        author: { "@id": getPersonId(locale) },
        datePublished: article.datePublished,
        dateModified: article.dateModified,
        inLanguage: locale,
        url: canonical,
        image,
        breadcrumb: { "@id": breadcrumbId },
      },
      {
        "@type": "BlogPosting",
        "@id": blogPostingId,
        headline: article.title,
        description: article.summary,
        author: { "@id": getPersonId(locale) },
        datePublished: article.datePublished,
        dateModified: article.dateModified,
        inLanguage: locale,
        url: canonical,
        image,
        breadcrumb: { "@id": breadcrumbId },
      },
    ],
  };
}
