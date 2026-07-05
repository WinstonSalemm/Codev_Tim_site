import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { loadHeaderInformation } from "@/lib/application";
import { buildPageMetadata } from "./metadata";
import {
  getDashboardAlternateLanguages,
  getDashboardCanonicalUrl,
  getWritingFeedUrl,
} from "./site-url";

export async function createDashboardMetadata(
  locale: string
): Promise<Metadata> {
  const [t, headerData] = await Promise.all([
    getTranslations({ locale, namespace: "metadata" }),
    Promise.resolve(loadHeaderInformation()),
  ]);

  return buildPageMetadata({
    locale,
    title: t("operationsCenter.title"),
    description: t("operationsCenter.description", {
      mission: headerData.mission,
    }),
    canonical: getDashboardCanonicalUrl(locale),
    alternateLanguages: getDashboardAlternateLanguages(),
    ogImageAlt: t("operationsCenter.ogImageAlt"),
    rssFeedUrl: getWritingFeedUrl(locale),
  });
}
