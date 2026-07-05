import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "./metadata";
import { getAboutAlternateLanguages, getAboutCanonicalUrl } from "./site-url";

export async function createAboutMetadata(locale: string) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return buildPageMetadata({
    locale,
    title: t("engineerProfile.title"),
    description: t("engineerProfile.description"),
    canonical: getAboutCanonicalUrl(locale),
    alternateLanguages: getAboutAlternateLanguages(),
    ogImageAlt: t("engineerProfile.ogImageAlt"),
  });
}
