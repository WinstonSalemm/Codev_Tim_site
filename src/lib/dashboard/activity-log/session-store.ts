import type { ActivityAction, ActivityRecord } from "@/lib/application";
import {
  sortActivityRecordsLatestFirst,
  ACTIVITY_FEED_MAX_VISIBLE,
} from "@/lib/application";

export const ACTIVITY_LOG_SESSION_STORAGE_KEY =
  "codev-tim-activity-log-session";

export { ACTIVITY_FEED_MAX_VISIBLE as ACTIVITY_LOG_MAX_VISIBLE };

export type AppendSessionActivityInput = {
  action: ActivityAction;
  target?: string;
  href?: string;
  timestamp?: string;
};

function createSessionEntryId(timestamp: string): string {
  return `session-${timestamp.replace(/[:.]/g, "-")}`;
}

export function readSessionActivityEntries(): ActivityRecord[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.sessionStorage.getItem(ACTIVITY_LOG_SESSION_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as ActivityRecord[];
    return Array.isArray(parsed) ? sortActivityRecordsLatestFirst(parsed) : [];
  } catch {
    return [];
  }
}

export function writeSessionActivityEntries(entries: ActivityRecord[]): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.setItem(
      ACTIVITY_LOG_SESSION_STORAGE_KEY,
      JSON.stringify(entries)
    );
  } catch {
    /* best-effort session persistence */
  }
}

export function appendSessionActivityEntry(
  input: AppendSessionActivityInput
): ActivityRecord {
  const timestamp = input.timestamp ?? new Date().toISOString();
  const entry: ActivityRecord = {
    id: createSessionEntryId(timestamp),
    timestamp,
    action: input.action,
    target: input.target,
    href: input.href,
  };

  const nextEntries = sortActivityRecordsLatestFirst([
    entry,
    ...readSessionActivityEntries(),
  ]);

  writeSessionActivityEntries(nextEntries);
  return entry;
}

export function clearSessionActivityEntries(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.removeItem(ACTIVITY_LOG_SESSION_STORAGE_KEY);
  } catch {
    /* best-effort clear */
  }
}
