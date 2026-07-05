import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "./metadata";
import {
  getPrinciplesAlternateLanguages,
  getPrinciplesCanonicalUrl,
} from "./site-url";

export async function createPrinciplesMetadata(locale: string) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return buildPageMetadata({
    locale,
    title: t("engineeringProtocols.title"),
    description: t("engineeringProtocols.description"),
    canonical: getPrinciplesCanonicalUrl(locale),
    alternateLanguages: getPrinciplesAlternateLanguages(),
    ogImageAlt: t("engineeringProtocols.ogImageAlt"),
  });
}
