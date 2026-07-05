import type { ActivityAction, ActivityRecord } from "@/lib/content/types";
import {
  ACTIVITY_FEED_MAX_VISIBLE,
  ACTIVITY_CARD_PREVIEW_COUNT,
} from "../shared/constants";

export type ActivityMessageTemplates = Record<ActivityAction, string>;

const DEFAULT_TARGETS: Partial<Record<ActivityAction, string>> = {
  module_accessed: "Unknown",
  session_started: "System",
  session_restored: "System",
  system_event: "Update",
  query_executed: "Query",
};

/** ELS-canonical English templates for server-side compile-time formatting. */
export const ACTIVITY_MESSAGE_TEMPLATES_EN: ActivityMessageTemplates = {
  module_accessed: "Module accessed: {target}",
  session_started: "Session started: {target}",
  session_restored: "Session restored: {target}",
  system_event: "System event: {target}",
  query_executed: "Query executed: {target}",
};

export function formatActivityTimestamp(timestamp: string): string {
  return new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date(timestamp));
}

export function formatActivityTimestampLabel(timestamp: string): string {
  return `[${formatActivityTimestamp(timestamp)}]`;
}

export function formatActivityMessage(
  action: ActivityAction,
  target: string | undefined,
  templates: ActivityMessageTemplates
): string {
  const resolvedTarget = target ?? DEFAULT_TARGETS[action] ?? "System";
  return templates[action].replace("{target}", resolvedTarget);
}

export function toActivityEntryVM(
  entry: ActivityRecord,
  templates: ActivityMessageTemplates
) {
  return {
    id: entry.id,
    timestamp: entry.timestamp,
    timeLabel: formatActivityTimestampLabel(entry.timestamp),
    message: formatActivityMessage(entry.action, entry.target, templates),
  };
}

export function sortActivityRecordsLatestFirst(
  entries: ActivityRecord[]
): ActivityRecord[] {
  return [...entries].sort(
    (left, right) =>
      new Date(right.timestamp).getTime() - new Date(left.timestamp).getTime()
  );
}

export function mergeActivityFeedEntries(
  staticEntries: ActivityRecord[],
  sessionEntries: ActivityRecord[],
  templates: ActivityMessageTemplates,
  limit = ACTIVITY_FEED_MAX_VISIBLE
) {
  const mergedById = new Map<string, ActivityRecord>();

  for (const entry of staticEntries) {
    mergedById.set(entry.id, entry);
  }

  for (const entry of sessionEntries) {
    mergedById.set(entry.id, entry);
  }

  return sortActivityRecordsLatestFirst([...mergedById.values()])
    .slice(0, limit)
    .map((entry) => toActivityEntryVM(entry, templates));
}

export { ACTIVITY_CARD_PREVIEW_COUNT, ACTIVITY_FEED_MAX_VISIBLE };
