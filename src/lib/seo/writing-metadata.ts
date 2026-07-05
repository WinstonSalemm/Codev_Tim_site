import { getTranslations } from "next-intl/server";
import { buildPageMetadata, NOINDEX_ROBOTS } from "./metadata";
import {
  getWritingAlternateLanguages,
  getWritingCanonicalUrl,
  getWritingFeedUrl,
} from "./site-url";

export async function createWritingMetadata(
  locale: string,
  options: { noindex?: boolean } = {}
) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return buildPageMetadata({
    locale,
    title: t("knowledgeBase.title"),
    description: t("knowledgeBase.description"),
    canonical: getWritingCanonicalUrl(locale),
    alternateLanguages: getWritingAlternateLanguages(),
    ogImageAlt: t("knowledgeBase.ogImageAlt"),
    rssFeedUrl: getWritingFeedUrl(locale),
    robots: options.noindex ? NOINDEX_ROBOTS : undefined,
  });
}
