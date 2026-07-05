/** Canonical Engineering Record section order — Phase 4 contract. */
export const ENGINEERING_RECORD_SECTION_ORDER = [
  "overview",
  "problem-statement",
  "business-context",
  "system-blueprint",
  "technology-stack",
  "trade-offs",
  "roadmap",
  "interface-record",
  "lessons-recorded",
] as const;

export type EngineeringRecordSectionId =
  (typeof ENGINEERING_RECORD_SECTION_ORDER)[number];

/** MDX heading label → canonical section id. */
export const ENGINEERING_RECORD_SECTION_HEADINGS: Record<
  EngineeringRecordSectionId,
  string
> = {
  overview: "Overview",
  "problem-statement": "Problem Statement",
  "business-context": "Business Context",
  "system-blueprint": "System Blueprint",
  "technology-stack": "Technology Stack",
  "trade-offs": "Trade-offs",
  roadmap: "Roadmap",
  "interface-record": "Interface Record",
  "lessons-recorded": "Lessons Recorded",
};

const HEADING_TO_SECTION_ID = new Map<string, EngineeringRecordSectionId>(
  Object.entries(ENGINEERING_RECORD_SECTION_HEADINGS).map(([id, heading]) => [
    heading,
    id as EngineeringRecordSectionId,
  ])
);

export function resolveEngineeringRecordSectionId(
  heading: string
): EngineeringRecordSectionId | undefined {
  return HEADING_TO_SECTION_ID.get(heading.trim());
}
