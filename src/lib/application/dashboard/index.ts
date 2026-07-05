import type { ActivityRecord } from "@/lib/domain/dashboard";
import {
  ACTIVITY_FEED_MAX_VISIBLE,
  ACTIVITY_MESSAGE_TEMPLATES_EN,
  buildDashboardCards,
  buildHeaderInformation,
  calculateDashboardMetrics,
  extractCurrentMission,
  formatActivityFeed,
  mergeActivityFeedEntries,
  selectStaticActivityRecords,
  type ActivityMessageTemplates,
  type OperationsCenterVM,
} from "@/lib/domain/dashboard";

export function loadOperationsCenter(): OperationsCenterVM {
  return {
    header: buildHeaderInformation(),
    cards: buildDashboardCards(),
    metrics: calculateDashboardMetrics(),
    activityFeed: formatActivityFeed(),
  };
}

export function loadDashboardCards() {
  return buildDashboardCards();
}

export function loadDashboardMetrics() {
  return calculateDashboardMetrics();
}

export function loadActivityFeed() {
  return formatActivityFeed();
}

export function loadStaticActivityRecords() {
  return selectStaticActivityRecords();
}

export function loadHeaderInformation() {
  return buildHeaderInformation();
}

export function loadCurrentMission() {
  return extractCurrentMission();
}

export function mergeActivityFeed(
  staticEntries: ActivityRecord[],
  sessionEntries: ActivityRecord[],
  templates: ActivityMessageTemplates = ACTIVITY_MESSAGE_TEMPLATES_EN,
  limit = ACTIVITY_FEED_MAX_VISIBLE
) {
  return mergeActivityFeedEntries(
    staticEntries,
    sessionEntries,
    templates,
    limit
  );
}

export { ACTIVITY_MESSAGE_TEMPLATES_EN, ACTIVITY_FEED_MAX_VISIBLE };
