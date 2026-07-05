/**
 * Project meta loader — static JSON only, no fs.
 */
import type { ProjectContent, ProjectMeta } from "../types";
import { parseProjectMeta } from "./project-schema";
import {
  PROJECT_META_MANIFEST,
  PROJECT_REGISTRY_SLUGS,
} from "./project-meta-manifest";
import { assertValidProjectSlug } from "./slug";

function loadProjectMeta(directorySlug: string): ProjectMeta {
  assertValidProjectSlug(directorySlug, "project meta manifest");
  return parseProjectMeta(PROJECT_META_MANIFEST[directorySlug], directorySlug);
}

export function loadAllProjectMeta(): ProjectMeta[] {
  return PROJECT_REGISTRY_SLUGS.map(loadProjectMeta);
}

export function loadProjectMetaBySlug(slug: string): ProjectMeta | undefined {
  if (!(slug in PROJECT_META_MANIFEST)) {
    return undefined;
  }

  return loadProjectMeta(slug);
}

export function loadAllProjectRegistryEntries(): ProjectContent[] {
  return loadAllProjectMeta().map((meta) => ({
    meta,
    documents: {},
  }));
}

export function loadProjectRegistryEntryBySlug(
  slug: string
): ProjectContent | undefined {
  const meta = loadProjectMetaBySlug(slug);
  if (!meta) {
    return undefined;
  }

  return { meta, documents: {} };
}
