import {
  getEngineerIdentity,
  getSiteConfig,
  getTechnologyStack,
  getTimeline,
} from "@/lib/content";
import { buildKnowledgeBase } from "../articles/knowledge-base";
import { buildProductRegistry } from "../projects/registry";
import { MODULE_LABELS, MODULE_OPEN_ALIASES } from "./aliases";
import type { TerminalContextVM, TerminalModuleTargetVM } from "./view-models";

function buildModuleTargets(): TerminalModuleTargetVM[] {
  const unique = new Map<string, TerminalModuleTargetVM>();

  for (const [alias, href] of Object.entries(MODULE_OPEN_ALIASES)) {
    unique.set(`${alias}:${href}`, {
      alias,
      href,
      label: MODULE_LABELS[href] ?? href,
    });
  }

  return [...unique.values()];
}

export function buildTerminalContext(): TerminalContextVM {
  const config = getSiteConfig();
  const identity = getEngineerIdentity();
  const timeline = getTimeline();
  const stack = getTechnologyStack();
  const registry = buildProductRegistry();
  const knowledgeBase = buildKnowledgeBase();

  return {
    version: config.version,
    statusLabel:
      config.status === "operational" ? "Operational" : config.status,
    mission: config.mission,
    location: config.author.location,
    timezone: config.author.timezone,
    availability: config.availability.label,
    authorName: config.author.name,
    email: config.author.email,
    github: config.author.github,
    roles: identity.roles,
    focus: identity.focus,
    timelineSummary: timeline.summary,
    products: registry.products.map((product) => ({
      slug: product.slug,
      title: product.title,
      subtitle: product.subtitle,
      status: product.status,
    })),
    stackLayers: stack.layers.map((layer) => ({
      label: layer.label,
      count: layer.count,
    })),
    topTags: stack.topTags,
    modules: buildModuleTargets(),
    noteTitles: knowledgeBase.notes.map((note) => note.title).filter(Boolean),
  };
}
