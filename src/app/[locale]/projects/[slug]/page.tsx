import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { ProjectDocLayout } from "@/components/modules/engineering-record";
import { JsonLdScript } from "@/components/seo";
import { routing } from "@/i18n/routing";
import {
  loadAdjacentProjectRecords,
  loadProductRegistry,
  loadProject,
} from "@/lib/application";
import { loadProjectRecord } from "@/lib/application/projects/load-project-record";
import type { ContentLocale } from "@/lib/content/types";
import { buildProjectJsonLd, createProjectMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const registry = loadProductRegistry();

  return routing.locales.flatMap((locale) =>
    registry.products.map((product) => ({
      locale,
      slug: product.slug,
    }))
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  const project = loadProject(slug);

  if (!project) {
    return {};
  }

  return createProjectMetadata(locale, project);
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const contentLocale = locale as ContentLocale;
  const record = loadProjectRecord(slug, contentLocale);

  if (!record) {
    notFound();
  }

  const navigation = loadAdjacentProjectRecords(slug);
  const project = loadProject(slug);

  if (!project) {
    notFound();
  }

  const jsonLd = await buildProjectJsonLd(locale, project, record);
  const t = await getTranslations("engineeringRecord");

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <div className="ds-engineering-record-page">
        <ProjectDocLayout
          record={record}
          navigation={navigation}
          links={project.links}
          labels={{
            breadcrumb: {
              ariaLabel: t("breadcrumb.ariaLabel"),
              operationsCenter: t("breadcrumb.operationsCenter"),
              productRegistry: t("breadcrumb.productRegistry"),
            },
            backToRegistry: t("doc.backToRegistry"),
            tocHeading: t("doc.tocHeading"),
            tocMobile: {
              label: t("doc.tocMobile.label"),
              placeholder: t("doc.tocMobile.placeholder"),
            },
            meta: {
              status: t("doc.meta.status"),
              domain: t("doc.meta.domain"),
              version: t("doc.meta.version"),
              stack: t("doc.meta.stack"),
              updated: t("doc.meta.updated"),
              versionUnset: t("doc.meta.versionUnset"),
              github: t("doc.meta.github"),
              website: t("doc.meta.website"),
            },
            relatedNotes: {
              heading: t("doc.relatedNotes.heading"),
              placeholder: t("doc.relatedNotes.placeholder"),
            },
            footer: {
              ariaLabel: t("doc.footer.ariaLabel"),
              previous: t("doc.footer.previous"),
              next: t("doc.footer.next"),
            },
          }}
          mdxLabels={{
            codeBlock: {
              copy: t("mdx.codeBlock.copy"),
              copied: t("mdx.codeBlock.copied"),
            },
          }}
        />
      </div>
    </>
  );
}
