import type { Article } from "@/lib/content/types";
import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "./metadata";
import {
  getArticleAlternateLanguages,
  getArticleCanonicalUrl,
} from "./site-url";

export async function createArticleMetadata(locale: string, article: Article) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return buildPageMetadata({
    locale,
    title: t("engineeringNote.title", { title: article.title }),
    description: t("engineeringNote.description", { summary: article.summary }),
    canonical: getArticleCanonicalUrl(locale, article.slug),
    alternateLanguages: getArticleAlternateLanguages(article.slug),
    ogImageAlt: t("engineeringNote.ogImageAlt", { title: article.title }),
    ogType: "article",
  });
}
