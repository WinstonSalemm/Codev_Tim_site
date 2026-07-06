import { ProjectDocBackNav } from "./ProjectDocBackNav";
import { ProjectDocContent } from "./ProjectDocContent";
import { ProjectDocFooterNav } from "./ProjectDocFooterNav";
import { ProjectDocRelatedNotes } from "./ProjectDocRelatedNotes";
import { ProjectDocTitleBlock } from "./ProjectDocTitleBlock";
import { ProjectDocTocNav } from "./ProjectDocTocNav";
import { EngineeringRecordBreadcrumb } from "./EngineeringRecordPlaceholder";
import type { ProjectDocLayoutProps } from "./project-doc-types";
import type { EngineeringRecordMdxLabels } from "@/components/mdx/engineering-record";
import { buildDocumentToc } from "@/lib/mdx/build-document-toc";

export type ProjectDocLayoutFullProps = ProjectDocLayoutProps & {
  mdxLabels: EngineeringRecordMdxLabels;
};

export function ProjectDocLayout({
  record,
  navigation,
  links,
  labels,
  mdxLabels,
}: ProjectDocLayoutFullProps) {
  const tocEntries = buildDocumentToc(record.sections);

  return (
    <article className="ds-er-doc">
      <EngineeringRecordBreadcrumb
        productTitle={record.title}
        labels={labels.breadcrumb}
      />
      <ProjectDocBackNav label={labels.backToRegistry} />

      <div className="ds-er-doc-body">
        <ProjectDocTocNav
          entries={tocEntries}
          heading={labels.tocHeading}
          mobileLabels={labels.tocMobile}
        />

        <div className="ds-er-doc-main">
          <ProjectDocTitleBlock
            record={record}
            links={links}
            labels={labels.meta}
          />
          <ProjectDocContent sections={record.sections} mdxLabels={mdxLabels} />
          <ProjectDocRelatedNotes labels={labels.relatedNotes} />
          <ProjectDocFooterNav navigation={navigation} labels={labels.footer} />
        </div>
      </div>
    </article>
  );
}
