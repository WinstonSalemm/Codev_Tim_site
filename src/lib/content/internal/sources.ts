/**
 * Sole JSON import boundary — docs/16_CONTENT_LAYER.md
 * No other file in the application may import content/*.json directly.
 */
import activityLogJson from "../../../../content/activity/log.json";
import principlesIndexJson from "../../../../content/principles/index.json";
import profileIdentityJson from "../../../../content/profile/identity.json";
import profileInterestsJson from "../../../../content/profile/interests.json";
import profileStackJson from "../../../../content/profile/stack.json";
import profileTimelineJson from "../../../../content/profile/timeline.json";
import siteConfigJson from "../../../../content/site/config.json";
import writingIndexJson from "../../../../content/writing/index.json";
import type {
  ActivityAction,
  ActivityLog,
  ActivityRecord,
  Article,
  ArticlesIndex,
  ContentLocale,
  EngineerIdentity,
  EngineeringInterests,
  ExperienceTimeline,
  TimelineEvent,
  Principle,
  PrinciplesIndex,
  PublishStatus,
  SiteConfig,
  SiteStatus,
  TechnologyStack,
  ArticleCategory,
} from "../types";
import { ARTICLE_CATEGORIES, PUBLISH_STATUSES } from "./article-meta-schema";

const CONTENT_LOCALES: ContentLocale[] = ["en", "ru", "uz"];

const ACTIVITY_ACTIONS: ActivityAction[] = [
  "session_started",
  "session_restored",
  "module_accessed",
  "query_executed",
  "system_event",
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isContentLocale(value: string): value is ContentLocale {
  return CONTENT_LOCALES.includes(value as ContentLocale);
}

function isSiteStatus(value: string): value is SiteStatus {
  return value === "operational";
}

function isActivityAction(value: string): value is ActivityAction {
  return ACTIVITY_ACTIONS.includes(value as ActivityAction);
}

function parseSiteConfig(raw: unknown): SiteConfig {
  if (!isRecord(raw)) {
    throw new Error("Invalid site config: expected object.");
  }

  const author = raw.author;
  const availability = raw.availability;
  const social = raw.social;
  const locales = raw.locales;

  if (
    typeof raw.name !== "string" ||
    typeof raw.version !== "string" ||
    typeof raw.status !== "string" ||
    !isSiteStatus(raw.status) ||
    typeof raw.mission !== "string" ||
    typeof raw.defaultLocale !== "string" ||
    !isContentLocale(raw.defaultLocale) ||
    !Array.isArray(locales) ||
    !locales.every(
      (locale) => typeof locale === "string" && isContentLocale(locale)
    ) ||
    !isRecord(author) ||
    typeof author.name !== "string" ||
    typeof author.fullName !== "string" ||
    typeof author.location !== "string" ||
    typeof author.timezone !== "string" ||
    typeof author.email !== "string" ||
    typeof author.github !== "string" ||
    !isRecord(availability) ||
    typeof availability.status !== "string" ||
    typeof availability.label !== "string" ||
    typeof availability.responseTimeHours !== "number" ||
    !isRecord(social) ||
    typeof social.github !== "string" ||
    typeof social.email !== "string"
  ) {
    throw new Error("Invalid site config shape.");
  }

  return {
    name: raw.name,
    version: raw.version,
    status: raw.status,
    mission: raw.mission,
    defaultLocale: raw.defaultLocale,
    locales,
    author: {
      name: author.name,
      fullName: author.fullName,
      location: author.location,
      timezone: author.timezone,
      email: author.email,
      github: author.github,
    },
    availability: {
      status: availability.status,
      label: availability.label,
      responseTimeHours: availability.responseTimeHours,
    },
    social: {
      github: social.github,
      email: social.email,
    },
  };
}

function isArticleCategory(value: string): value is ArticleCategory {
  return ARTICLE_CATEGORIES.includes(value as ArticleCategory);
}

function isPublishStatus(value: string): value is PublishStatus {
  return PUBLISH_STATUSES.includes(value as PublishStatus);
}

function parseArticle(raw: unknown): Article {
  if (!isRecord(raw) || typeof raw.slug !== "string") {
    throw new Error("Invalid article entry.");
  }

  if (
    typeof raw.title !== "string" ||
    typeof raw.summary !== "string" ||
    typeof raw.category !== "string" ||
    !isArticleCategory(raw.category) ||
    typeof raw.cluster !== "string" ||
    typeof raw.datePublished !== "string" ||
    typeof raw.dateModified !== "string" ||
    typeof raw.publishStatus !== "string" ||
    !isPublishStatus(raw.publishStatus)
  ) {
    throw new Error(`Invalid article entry for slug "${raw.slug}".`);
  }

  return {
    slug: raw.slug,
    previousSlugs: Array.isArray(raw.previousSlugs)
      ? raw.previousSlugs.filter(
          (item): item is string => typeof item === "string"
        )
      : [],
    title: raw.title,
    summary: raw.summary,
    category: raw.category,
    cluster: raw.cluster,
    tags: Array.isArray(raw.tags)
      ? raw.tags.filter((tag): tag is string => typeof tag === "string")
      : [],
    relatedProjects: Array.isArray(raw.relatedProjects)
      ? raw.relatedProjects.filter(
          (item): item is string => typeof item === "string"
        )
      : [],
    relatedNotes: Array.isArray(raw.relatedNotes)
      ? raw.relatedNotes.filter(
          (item): item is string => typeof item === "string"
        )
      : [],
    principles: Array.isArray(raw.principles)
      ? raw.principles.filter(
          (item): item is string => typeof item === "string"
        )
      : [],
    datePublished: raw.datePublished,
    dateModified: raw.dateModified,
    readingTime: typeof raw.readingTime === "number" ? raw.readingTime : null,
    featured: raw.featured === true,
    order: typeof raw.order === "number" ? raw.order : null,
    publishStatus: raw.publishStatus,
    author: typeof raw.author === "string" ? raw.author : "Timur",
  };
}

function parseArticlesIndex(raw: unknown): ArticlesIndex {
  if (!isRecord(raw) || !Array.isArray(raw.notes)) {
    throw new Error("Invalid articles index.");
  }

  return {
    notes: raw.notes.map(parseArticle),
  };
}

function parseTechnologyStack(raw: unknown): TechnologyStack {
  if (
    !isRecord(raw) ||
    !Array.isArray(raw.layers) ||
    !Array.isArray(raw.topTags)
  ) {
    throw new Error("Invalid technology stack.");
  }

  const layers = raw.layers.map((layer) => {
    if (
      !isRecord(layer) ||
      typeof layer.id !== "string" ||
      typeof layer.label !== "string" ||
      typeof layer.count !== "number"
    ) {
      throw new Error("Invalid technology layer.");
    }

    return {
      id: layer.id,
      label: layer.label,
      count: layer.count,
    };
  });

  const topTags = raw.topTags.filter(
    (tag): tag is string => typeof tag === "string"
  );

  return { layers, topTags };
}

function parseTimelineEvent(raw: unknown): TimelineEvent {
  if (
    !isRecord(raw) ||
    typeof raw.id !== "string" ||
    typeof raw.period !== "string" ||
    typeof raw.role !== "string" ||
    typeof raw.context !== "string" ||
    typeof raw.focus !== "string" ||
    typeof raw.order !== "number"
  ) {
    throw new Error("Invalid timeline event.");
  }

  return {
    id: raw.id,
    period: raw.period,
    role: raw.role,
    context: raw.context,
    focus: raw.focus,
    order: raw.order,
  };
}

function parseTimeline(raw: unknown): ExperienceTimeline {
  if (
    !isRecord(raw) ||
    typeof raw.summary !== "string" ||
    typeof raw.period !== "string" ||
    typeof raw.organization !== "string" ||
    !Array.isArray(raw.events)
  ) {
    throw new Error("Invalid experience timeline.");
  }

  const events = raw.events
    .map(parseTimelineEvent)
    .sort((left, right) => left.order - right.order);

  return {
    summary: raw.summary,
    period: raw.period,
    organization: raw.organization,
    events,
  };
}

function parseIdentity(raw: unknown): EngineerIdentity {
  if (
    !isRecord(raw) ||
    !Array.isArray(raw.roles) ||
    typeof raw.focus !== "string" ||
    typeof raw.primaryLanguage !== "string" ||
    !Array.isArray(raw.additionalLanguages) ||
    !raw.roles.every((role): role is string => typeof role === "string") ||
    !raw.additionalLanguages.every(
      (language): language is string => typeof language === "string"
    )
  ) {
    throw new Error("Invalid engineer identity.");
  }

  return {
    roles: raw.roles,
    focus: raw.focus,
    primaryLanguage: raw.primaryLanguage,
    additionalLanguages: raw.additionalLanguages,
  };
}

function parseInterests(raw: unknown): EngineeringInterests {
  if (!isRecord(raw) || !Array.isArray(raw.interests)) {
    throw new Error("Invalid engineering interests.");
  }

  const interests = raw.interests.filter(
    (interest): interest is string => typeof interest === "string"
  );

  return { interests };
}

function parsePrinciple(raw: unknown): Principle {
  if (
    !isRecord(raw) ||
    typeof raw.id !== "string" ||
    typeof raw.number !== "string" ||
    typeof raw.order !== "number"
  ) {
    throw new Error("Invalid principle entry.");
  }

  return {
    id: raw.id,
    number: raw.number,
    order: raw.order,
  };
}

function parsePrinciplesIndex(raw: unknown): PrinciplesIndex {
  if (
    !isRecord(raw) ||
    typeof raw.count !== "number" ||
    !Array.isArray(raw.items)
  ) {
    throw new Error("Invalid principles index.");
  }

  const items = raw.items
    .map(parsePrinciple)
    .sort((left, right) => left.order - right.order);

  if (items.length !== raw.count) {
    throw new Error("Principles count does not match items length.");
  }

  return { count: raw.count, items };
}

function parseActivityRecord(raw: unknown): ActivityRecord {
  if (
    !isRecord(raw) ||
    typeof raw.id !== "string" ||
    typeof raw.timestamp !== "string" ||
    typeof raw.action !== "string" ||
    !isActivityAction(raw.action)
  ) {
    throw new Error("Invalid activity record.");
  }

  return {
    id: raw.id,
    timestamp: raw.timestamp,
    action: raw.action,
    target: typeof raw.target === "string" ? raw.target : undefined,
    href: typeof raw.href === "string" ? raw.href : undefined,
  };
}

function parseActivityLog(raw: unknown): ActivityLog {
  if (!isRecord(raw) || !Array.isArray(raw.entries)) {
    throw new Error("Invalid activity log.");
  }

  return {
    entries: raw.entries.map(parseActivityRecord),
  };
}

export const loadSiteConfig = (): SiteConfig => parseSiteConfig(siteConfigJson);
export const loadArticlesIndex = (): ArticlesIndex =>
  parseArticlesIndex(writingIndexJson);
export const loadTechnologyStack = (): TechnologyStack =>
  parseTechnologyStack(profileStackJson);
export const loadExperienceTimeline = (): ExperienceTimeline =>
  parseTimeline(profileTimelineJson);
export const loadEngineerIdentity = (): EngineerIdentity =>
  parseIdentity(profileIdentityJson);
export const loadEngineeringInterests = (): EngineeringInterests =>
  parseInterests(profileInterestsJson);
export const loadActivityLog = (): ActivityLog =>
  parseActivityLog(activityLogJson);
export const loadPrinciplesIndex = (): PrinciplesIndex =>
  parsePrinciplesIndex(principlesIndexJson);
