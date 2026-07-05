import { getTranslations } from "next-intl/server";
import { buildPageMetadata, NOINDEX_ROBOTS } from "./metadata";
import { getDashboardCanonicalUrl } from "./site-url";

export async function createNotFoundMetadata(locale: string) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return buildPageMetadata({
    locale,
    title: t("missingModule.title"),
    description: t("missingModule.description"),
    canonical: getDashboardCanonicalUrl(locale),
    alternateLanguages: {},
    ogImageAlt: t("missingModule.title"),
    robots: NOINDEX_ROBOTS,
  });
}
