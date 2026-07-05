import { getActivity } from "@/lib/content";
import {
  ACTIVITY_FEED_MAX_VISIBLE,
  ACTIVITY_MESSAGE_TEMPLATES_EN,
  sortActivityRecordsLatestFirst,
  toActivityEntryVM,
} from "./activity-format";
import type { ActivityEntryVM } from "./view-models";

export function selectStaticActivityRecords() {
  return sortActivityRecordsLatestFirst(getActivity()).slice(
    0,
    ACTIVITY_FEED_MAX_VISIBLE
  );
}

export function formatActivityFeed(): ActivityEntryVM[] {
  return selectStaticActivityRecords().map((entry) =>
    toActivityEntryVM(entry, ACTIVITY_MESSAGE_TEMPLATES_EN)
  );
}
