import { getSiteShellConfig as getContentSiteShellConfig } from "@/lib/content";
import type { SiteShellConfig } from "@/lib/shell";

export function buildShellConfiguration(): SiteShellConfig {
  return getContentSiteShellConfig();
}
