"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import type {
  ActivityEntryVM,
  ActivityMessageTemplates,
  ActivityRecord,
} from "@/lib/application";
import { mergeActivityFeed } from "@/lib/application";
import { readSessionActivityEntries } from "@/lib/dashboard/activity-log/session-store";
import { ActivityEntry } from "./ActivityEntry";

type ActivityFeedProps = {
  staticEntries: ActivityRecord[];
};

function buildMessageTemplates(
  raw: (key: string) => string
): ActivityMessageTemplates {
  return {
    module_accessed: raw("actions.module_accessed"),
    session_started: raw("actions.session_started"),
    session_restored: raw("actions.session_restored"),
    system_event: raw("actions.system_event"),
    query_executed: raw("actions.query_executed"),
  };
}

export function ActivityFeed({ staticEntries }: ActivityFeedProps) {
  const t = useTranslations("dashboard.activityLog");
  const messageTemplates = useMemo(
    () => buildMessageTemplates((key) => t.raw(key) as string),
    [t]
  );

  const [entries, setEntries] = useState<ActivityEntryVM[]>(() =>
    mergeActivityFeed(staticEntries, [], messageTemplates)
  );

  useEffect(() => {
    setEntries(
      mergeActivityFeed(
        staticEntries,
        readSessionActivityEntries(),
        messageTemplates
      )
    );
  }, [staticEntries, messageTemplates]);

  if (entries.length === 0) {
    return <p className="ds-activity-feed-empty">{t("empty")}</p>;
  }

  return (
    <ol className="ds-activity-feed" aria-live="off">
      {entries.map((entry) => (
        <ActivityEntry key={entry.id} entry={entry} />
      ))}
    </ol>
  );
}
