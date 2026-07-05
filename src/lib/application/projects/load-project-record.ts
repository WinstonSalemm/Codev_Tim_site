import "server-only";

import { buildProjectRecordVM } from "@/lib/domain/projects/record-loader";

export function loadProjectRecord(
  slug: string,
  locale: Parameters<typeof buildProjectRecordVM>[1]
) {
  return buildProjectRecordVM(slug, locale);
}
