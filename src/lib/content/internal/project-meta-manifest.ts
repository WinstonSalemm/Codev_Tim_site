/**
 * Static project meta manifest — no fs, safe for any bundle boundary.
 */
import assistantAgentMetaJson from "../../../../content/projects/assistant-agent/meta.json";
import codevErpMetaJson from "../../../../content/projects/codev-erp/meta.json";
import codevTimMetaJson from "../../../../content/projects/codev-tim/meta.json";
import pojProApiContractsMetaJson from "../../../../content/projects/poj-pro-api-contracts/meta.json";
import pojProPlatformMetaJson from "../../../../content/projects/poj-pro-platform/meta.json";
import pojProSiteMetaJson from "../../../../content/projects/poj-pro-site/meta.json";
import pojProTelegramBotsMetaJson from "../../../../content/projects/poj-pro-telegram-bots/meta.json";

export const PROJECT_META_MANIFEST: Readonly<Record<string, unknown>> = {
  "codev-erp": codevErpMetaJson,
  "poj-pro-platform": pojProPlatformMetaJson,
  "poj-pro-site": pojProSiteMetaJson,
  "codev-tim": codevTimMetaJson,
  "assistant-agent": assistantAgentMetaJson,
  "poj-pro-api-contracts": pojProApiContractsMetaJson,
  "poj-pro-telegram-bots": pojProTelegramBotsMetaJson,
};

export const PROJECT_REGISTRY_SLUGS = Object.keys(PROJECT_META_MANIFEST);
