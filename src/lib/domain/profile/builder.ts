import {
  getEngineerIdentity,
  getEngineeringInterests,
  getSiteConfig,
  getTechnologyStack,
  getTimeline,
} from "@/lib/content";
import type {
  EngineerProfileContentVM,
  EngineerProfileVM,
  ProfileDataRowVM,
} from "./view-models";

function buildIdentityRows(
  content: EngineerProfileContentVM
): ProfileDataRowVM[] {
  return [
    { key: "displayName", value: content.displayName },
    { key: "fullName", value: content.fullName },
    { key: "brand", value: content.brand },
    { key: "location", value: content.location },
    { key: "timezone", value: content.timezone },
    { key: "focus", value: content.focus },
    { key: "roles", value: content.roles.join(" · ") },
    { key: "primaryLanguage", value: content.primaryLanguage },
    {
      key: "additionalLanguages",
      value: content.additionalLanguages.join(" · "),
    },
  ];
}

function buildAvailabilityRows(
  content: EngineerProfileContentVM
): ProfileDataRowVM[] {
  return [
    { key: "status", value: content.availabilityStatus },
    { key: "label", value: content.availabilityLabel },
    {
      key: "responseTime",
      value: `${content.responseTimeHours} hours`,
    },
  ];
}

function buildProfileContentVM(): EngineerProfileContentVM {
  const config = getSiteConfig();
  const identity = getEngineerIdentity();
  const timeline = getTimeline();
  const stack = getTechnologyStack();
  const interests = getEngineeringInterests();

  return {
    displayName: config.author.name,
    fullName: config.author.fullName,
    brand: config.name,
    location: config.author.location,
    timezone: config.author.timezone,
    focus: identity.focus,
    roles: identity.roles,
    primaryLanguage: identity.primaryLanguage,
    additionalLanguages: identity.additionalLanguages,
    availabilityStatus: config.availability.status,
    availabilityLabel: config.availability.label,
    responseTimeHours: config.availability.responseTimeHours,
    deploymentHistory: timeline.events.map((event) => ({
      id: event.id,
      period: event.period,
      role: event.role,
      context: event.context,
      focus: event.focus,
    })),
    technologyStack: {
      layers: stack.layers.map((layer) => ({
        id: layer.id,
        label: layer.label,
        count: layer.count,
      })),
      topTags: stack.topTags,
    },
    interests: interests.interests,
  };
}

export function buildEngineerProfile(): EngineerProfileVM {
  const content = buildProfileContentVM();

  return {
    identity: buildIdentityRows(content),
    deploymentHistory: content.deploymentHistory,
    technologyStack: content.technologyStack,
    availability: buildAvailabilityRows(content),
    interests: content.interests,
  };
}

export function buildEngineerProfileContent(): EngineerProfileContentVM {
  return buildProfileContentVM();
}
