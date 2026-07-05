import {
  loadAllProjectRegistryEntries,
  loadProjectMetaBySlug,
  loadProjectRegistryEntryBySlug,
} from "./internal/project-meta-sources";
import { resolveProjectSlug } from "./internal/slug";
import type {
  ProjectContent,
  ProjectMeta,
  ProjectRegistrySource,
} from "./types";

const filesystemRegistrySource: ProjectRegistrySource = {
  listAll() {
    return loadAllProjectRegistryEntries();
  },
  getBySlug(slug: string) {
    return loadProjectRegistryEntryBySlug(slug);
  },
  resolveSlug(slug: string) {
    return resolveProjectSlug(slug);
  },
};

let activeRegistrySource: ProjectRegistrySource = filesystemRegistrySource;

/** Replace filesystem adapter with API/DB implementation. */
export function setProjectRegistrySource(source: ProjectRegistrySource): void {
  activeRegistrySource = source;
}

export function getProjectRegistrySource(): ProjectRegistrySource {
  return activeRegistrySource;
}

export function listProjectRegistry(): ProjectContent[] {
  return activeRegistrySource.listAll();
}

export function getProjectRegistryEntry(
  slug: string
): ProjectContent | undefined {
  return activeRegistrySource.getBySlug(slug);
}

export function resolveProjectRegistrySlug(slug: string): string {
  return activeRegistrySource.resolveSlug(slug);
}

export function listProjectRegistryMeta(): ProjectMeta[] {
  return listProjectRegistry().map((entry) => entry.meta);
}

export function getProjectRegistryMeta(slug: string): ProjectMeta | undefined {
  const resolved = resolveProjectRegistrySlug(slug);
  return loadProjectMetaBySlug(resolved);
}
