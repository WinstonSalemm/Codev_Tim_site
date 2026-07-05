import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { ProjectDetailVM } from "@/lib/application";
import { buildPageMetadata } from "./metadata";
import { resolveProjectOgImagePath } from "./resolve-project-og-image";
import {
  getProjectAlternateLanguages,
  getProjectCanonicalUrl,
} from "./site-url";

export async function createProjectMetadata(
  locale: string,
  project: ProjectDetailVM
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const ogImagePath = resolveProjectOgImagePath(project.slug);

  return buildPageMetadata({
    locale,
    title: t("engineeringRecord.title", { title: project.title }),
    description: t("engineeringRecord.description", {
      summary: project.summary,
    }),
    canonical: getProjectCanonicalUrl(locale, project.slug),
    alternateLanguages: getProjectAlternateLanguages(project.slug),
    ogImageAlt: t("engineeringRecord.ogImageAlt", { title: project.title }),
    ogImagePath,
    ogType: "article",
  });
}
