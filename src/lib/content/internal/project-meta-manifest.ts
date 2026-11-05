/**
 * Static project meta manifest - no fs, safe for any bundle boundary.
 */
import assistantAgentMetaJson from "../../../../content/projects/assistant-agent/meta.json";
import callTrackerMetaJson from "../../../../content/projects/call-tracker/meta.json";
import codevErpMetaJson from "../../../../content/projects/codev-erp/meta.json";
import codevTimTravelMetaJson from "../../../../content/projects/codev-tim-travel/meta.json";
import codevTimMetaJson from "../../../../content/projects/codev-tim/meta.json";
import documentWorkflowMetaJson from "../../../../content/projects/document-workflow/meta.json";
import businessOperationsMetaJson from "../../../../content/projects/business-operations/meta.json";
import fireSafetyStoreMetaJson from "../../../../content/projects/fire-safety-store/meta.json";
import staffTelegramToolsMetaJson from "../../../../content/projects/staff-telegram-tools/meta.json";

export const PROJECT_META_MANIFEST: Readonly<Record<string, unknown>> = {
  "call-tracker": callTrackerMetaJson,
  "codev-erp": codevErpMetaJson,
  "codev-tim-travel": codevTimTravelMetaJson,
  "business-operations": businessOperationsMetaJson,
  "fire-safety-store": fireSafetyStoreMetaJson,
  "codev-tim": codevTimMetaJson,
  "assistant-agent": assistantAgentMetaJson,
  "document-workflow": documentWorkflowMetaJson,
  "staff-telegram-tools": staffTelegramToolsMetaJson,
};

export const PROJECT_REGISTRY_SLUGS = Object.keys(PROJECT_META_MANIFEST);
