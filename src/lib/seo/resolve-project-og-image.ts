import fs from "node:fs";
import path from "node:path";
import { DEFAULT_OG_IMAGE_PATH } from "./constants";
import { getSiteUrl } from "./site-url";

const PROJECT_OG_DIR = path.join(process.cwd(), "public", "og", "projects");

export function resolveProjectOgImagePath(slug: string): string {
  const projectImagePath = path.join(PROJECT_OG_DIR, `${slug}.png`);

  if (fs.existsSync(projectImagePath)) {
    return `/og/projects/${slug}.png`;
  }

  return DEFAULT_OG_IMAGE_PATH;
}

export function resolveProjectOgImageUrl(slug: string): string {
  return `${getSiteUrl()}${resolveProjectOgImagePath(slug)}`;
}
