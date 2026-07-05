export type { ActivityAction, ActivityRecord } from "@/lib/application";
export type { ActivityEntryVM } from "@/lib/application";
export {
  mergeActivityFeed,
  ACTIVITY_MESSAGE_TEMPLATES_EN,
  ACTIVITY_FEED_MAX_VISIBLE,
} from "@/lib/application";
export {
  appendSessionActivityEntry,
  clearSessionActivityEntries,
  readSessionActivityEntries,
  writeSessionActivityEntries,
  ACTIVITY_LOG_SESSION_STORAGE_KEY,
  ACTIVITY_LOG_MAX_VISIBLE,
  type AppendSessionActivityInput,
} from "./session-store";

/** @deprecated Use loadStaticActivityRecords from @/lib/application */
export { loadStaticActivityRecords as getStaticActivityLogEntries } from "@/lib/application";
