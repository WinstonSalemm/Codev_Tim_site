import { getTranslations } from "next-intl/server";
import type { ProjectDetailVM, ProjectRecordVM } from "@/lib/domain/projects";
import type { ProjectJsonLdGraph } from "./schema";
import { resolveProjectOgImageUrl } from "./resolve-project-og-image";
import {
  getDashboardCanonicalUrl,
  getProjectCanonicalUrl,
  getRegistryCanonicalUrl,
  getSiteUrl,
} from "./site-url";

function toIsoDateTime(date: string): string {
  return `${date}T00:00:00+05:00`;
}

export async function buildProjectJsonLd(
  locale: string,
  project: ProjectDetailVM,
  record: ProjectRecordVM
): Promise<ProjectJsonLdGraph> {
  const tModules = await getTranslations({ locale, namespace: "modules" });

  const siteUrl = getSiteUrl();
  const canonical = getProjectCanonicalUrl(locale, project.slug);
  const breadcrumbId = `${canonical}#breadcrumb`;
  const articleId = `${canonical}#article`;
  const softwareId = `${canonical}#software`;
  const personId = `${siteUrl}/${locale}/about#person`;

  const operationsCenter = tModules("operationsCenter.name");
  const productRegistry = tModules("productRegistry.name");
  const dateModified = toIsoDateTime(record.updatedAt);
  const datePublished = project.since
    ? toIsoDateTime(project.since)
    : dateModified;
  const ogImageUrl = resolveProjectOgImageUrl(project.slug);

  const softwareApplication: ProjectJsonLdGraph["@graph"][2] = {
    "@type": "SoftwareApplication",
    "@id": softwareId,
    name: project.title,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    author: { "@id": personId },
    description: project.summary,
    url: canonical,
  };

  if (project.version) {
    softwareApplication.softwareVersion = project.version;
  }

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
            name: operationsCenter,
            item: getDashboardCanonicalUrl(locale),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: productRegistry,
            item: getRegistryCanonicalUrl(locale),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: canonical,
          },
        ],
      },
      {
        "@type": "TechArticle",
        "@id": articleId,
        headline: project.title,
        description: project.summary,
        author: { "@id": personId },
        datePublished,
        dateModified,
        inLanguage: locale,
        url: canonical,
        image: ogImageUrl,
        breadcrumb: { "@id": breadcrumbId },
      },
      softwareApplication,
    ],
  };
}
