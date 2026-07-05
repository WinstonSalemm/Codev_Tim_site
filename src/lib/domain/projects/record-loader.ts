import "server-only";

import { getProjectEngineeringRecord } from "@/lib/content/engineering-record";
import type { ContentLocale } from "@/lib/content/types";
import { mapProjectEngineeringRecordToVM } from "./record";
import type { ProjectRecordVM } from "./view-models";

export function buildProjectRecordVM(
  slug: string,
  locale: ContentLocale
): ProjectRecordVM | undefined {
  const record = getProjectEngineeringRecord(slug, locale);
  return record ? mapProjectEngineeringRecordToVM(record) : undefined;
}
