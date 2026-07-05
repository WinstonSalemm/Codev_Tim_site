import { getSiteConfig } from "@/lib/content";
import type { HeaderVM } from "./view-models";

export function buildHeaderInformation(): HeaderVM {
  const config = getSiteConfig();

  if (config.status !== "operational") {
    throw new Error(
      `Unsupported site status "${config.status}" — extend status mapping before display.`
    );
  }

  return {
    status: config.status,
    mission: config.mission,
    version: config.version,
    location: config.author.location,
    timezone: config.author.timezone,
  };
}

export function extractCurrentMission(): string {
  return buildHeaderInformation().mission;
}
