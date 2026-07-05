import type { ActivityEntryVM } from "@/lib/application";

type ActivityEntryProps = {
  entry: ActivityEntryVM;
};

export function ActivityEntry({ entry }: ActivityEntryProps) {
  return (
    <li className="ds-activity-entry">
      <time className="ds-activity-entry-time" dateTime={entry.timestamp}>
        {entry.timeLabel}
      </time>
      <span className="ds-activity-entry-message">{entry.message}</span>
    </li>
  );
}
