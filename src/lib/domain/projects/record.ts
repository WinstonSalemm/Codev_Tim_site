import type {
  EngineeringRecordSectionId,
  ProjectEngineeringRecord,
} from "@/lib/content/types";
import type { ProjectRecordSectionVM, ProjectRecordVM } from "./view-models";

function mapRecordSections(
  sections: { id: EngineeringRecordSectionId; title: string; body: string }[]
): ProjectRecordSectionVM[] {
  return sections.map((section) => ({
    id: section.id,
    title: section.title,
    body: section.body,
  }));
}

export function mapProjectEngineeringRecordToVM(
  record: ProjectEngineeringRecord
): ProjectRecordVM {
  const { frontmatter } = record;

  return {
    slug: record.slug,
    locale: record.locale,
    title: frontmatter.title,
    subtitle: frontmatter.subtitle,
    version: frontmatter.version,
    status: frontmatter.status,
    domain: frontmatter.domain,
    stack: [...frontmatter.stack],
    updatedAt: frontmatter.updatedAt,
    sections: mapRecordSections(record.sections),
  };
}
