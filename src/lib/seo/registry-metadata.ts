import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "./metadata";
import {
  getRegistryAlternateLanguages,
  getRegistryCanonicalUrl,
} from "./site-url";

export async function createRegistryMetadata(
  locale: string
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return buildPageMetadata({
    locale,
    title: t("productRegistry.title"),
    description: t("productRegistry.description"),
    canonical: getRegistryCanonicalUrl(locale),
    alternateLanguages: getRegistryAlternateLanguages(),
    ogImageAlt: t("productRegistry.ogImageAlt"),
  });
}
