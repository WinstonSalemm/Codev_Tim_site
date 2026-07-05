import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "./metadata";
import {
  getContactAlternateLanguages,
  getContactCanonicalUrl,
} from "./site-url";

export async function createContactMetadata(locale: string) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return buildPageMetadata({
    locale,
    title: t("communicationModule.title"),
    description: t("communicationModule.description"),
    canonical: getContactCanonicalUrl(locale),
    alternateLanguages: getContactAlternateLanguages(),
    ogImageAlt: t("communicationModule.ogImageAlt"),
  });
}
