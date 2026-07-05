import type { ProjectRecordSectionVM } from "@/lib/domain/projects";
import { EngineeringRecordMdxProvider } from "@/components/mdx/engineering-record/EngineeringRecordMdxProvider";
import { compileEngineeringRecordSection } from "@/lib/mdx/compile-engineering-record-section";
import {
  createEngineeringRecordMdxComponents,
  type EngineeringRecordMdxLabels,
} from "@/lib/mdx/engineering-record-mdx-components.server";
import { warmMdxHighlighter } from "@/lib/mdx/highlight-code";

type ProjectDocContentProps = {
  sections: ProjectRecordSectionVM[];
  mdxLabels: EngineeringRecordMdxLabels;
};

export async function ProjectDocContent({
  sections,
  mdxLabels,
}: ProjectDocContentProps) {
  await warmMdxHighlighter();

  const compiledSections = await Promise.all(
    sections.map(async (section) => {
      const usedHeadingIds = new Set<string>();
      const components = createEngineeringRecordMdxComponents(
        mdxLabels,
        section.id,
        usedHeadingIds
      );

      return {
        section,
        Content: await compileEngineeringRecordSection(section.body),
        components,
      };
    })
  );

  return (
    <EngineeringRecordMdxProvider labels={mdxLabels}>
      <div className="ds-er-doc-content">
        {compiledSections.map(({ section, Content, components }) => (
          <section
            key={section.id}
            className="ds-er-doc-section"
            aria-labelledby={section.id}
          >
            <h2
              id={section.id}
              data-toc-heading="2"
              className="ds-er-doc-section-heading"
            >
              {section.title}
            </h2>
            <div className="ds-er-doc-section-body ds-mdx">
              <Content components={components} />
            </div>
          </section>
        ))}
      </div>
    </EngineeringRecordMdxProvider>
  );
}
