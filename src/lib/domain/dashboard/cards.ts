import {
  getActivity,
  getPrinciplesCount,
  getTechnologyStack,
  getTimeline,
} from "@/lib/content";
import { buildKnowledgeBase } from "../articles/knowledge-base";
import {
  buildProductRegistry,
  buildProjectViewModel,
  resolveLatestProjectSlug,
} from "../projects/registry";
import { truncatePreview } from "../shared";
import {
  ACTIVITY_CARD_PREVIEW_COUNT,
  ACTIVITY_MESSAGE_TEMPLATES_EN,
  sortActivityRecordsLatestFirst,
  toActivityEntryVM,
  type ActivityMessageTemplates,
} from "./activity-format";
import type { DashboardCardMetricVM, DashboardCardVM } from "./view-models";

/** Locale-facing texts for card previews and metric labels. */
export type DashboardCardTexts = {
  productsPreview: string; // "{count} products · {latest}"
  noProducts: string;
  registered: string;
  production: string;
  inDevelopment: string;
  latest: string;
  notesPreview: string; // "{count} notes · {status}"
  noPublishedNotes: string;
  published: string;
  status: string;
  registryEmpty: string;
  layersPreview: string; // "{count} layers · {summary}"
  period: string;
  organization: string;
  product: string;
  blueprint: string;
  noActivity: string;
  protocolsPreview: string; // "{count} protocols registered"
  module: string;
  engineeringProtocols: string;
};

export const DASHBOARD_CARD_TEXTS_EN: DashboardCardTexts = {
  productsPreview: "{count} products · {latest}",
  noProducts: "No products",
  registered: "Registered",
  production: "Production",
  inDevelopment: "In Development",
  latest: "Latest",
  notesPreview: "{count} notes · {status}",
  noPublishedNotes: "No published notes",
  published: "Published",
  status: "Status",
  registryEmpty: "Registry empty",
  layersPreview: "{count} layers · {summary}",
  period: "Period",
  organization: "Organization",
  product: "Product",
  blueprint: "Blueprint",
  noActivity: "No activity recorded",
  protocolsPreview: "{count} protocols registered",
  module: "Module",
  engineeringProtocols: "Engineering Protocols",
};

function fill(
  template: string,
  values: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match
  );
}

function buildProjectsCard(texts: DashboardCardTexts): DashboardCardVM {
  const registry = buildProductRegistry();
  const latestProduct =
    buildProjectViewModel(registry.latestSlug) ?? registry.products[0];
  const latestTitle = latestProduct?.title;
  const metrics = registry.metrics;

  const preview = truncatePreview(
    fill(texts.productsPreview, {
      count: metrics.registered,
      latest: latestTitle ?? texts.noProducts,
    })
  );

  const cardMetrics: DashboardCardMetricVM[] = [
    { label: texts.registered, value: String(metrics.registered) },
    { label: texts.production, value: String(metrics.production) },
    {
      label: texts.inDevelopment,
      value: String(metrics.inDevelopment),
    },
    { label: texts.latest, value: latestTitle ?? "—" },
  ];

  return {
    id: "projects",
    titleKey: "cards.projects.title",
    preview,
    href: "/projects",
    metrics: cardMetrics,
  };
}

function buildArticlesCard(texts: DashboardCardTexts): DashboardCardVM {
  const knowledgeBase = buildKnowledgeBase();
  const preview = truncatePreview(
    fill(texts.notesPreview, {
      count: knowledgeBase.count,
      status: texts.noPublishedNotes,
    })
  );

  return {
    id: "articles",
    titleKey: "cards.articles.title",
    preview,
    href: "/writing",
    metrics: [
      { label: texts.published, value: String(knowledgeBase.count) },
      { label: texts.status, value: texts.registryEmpty },
    ],
  };
}

function buildTechnologiesCard(texts: DashboardCardTexts): DashboardCardVM {
  const stack = getTechnologyStack();
  const layerSummary = stack.layers
    .slice(0, 3)
    .map((layer) => `${layer.label} ${layer.count}`)
    .join(" · ");
  const preview = truncatePreview(
    fill(texts.layersPreview, {
      count: stack.layers.length,
      summary: layerSummary,
    })
  );

  const metrics: DashboardCardMetricVM[] = stack.layers.map((layer) => ({
    label: layer.label,
    value: String(layer.count),
  }));

  return {
    id: "technologies",
    titleKey: "cards.technologies.title",
    preview,
    href: "/about#stack",
    metrics,
  };
}

function buildExperienceCard(texts: DashboardCardTexts): DashboardCardVM {
  const timeline = getTimeline();

  return {
    id: "experience",
    titleKey: "cards.experience.title",
    preview: truncatePreview(timeline.summary),
    href: "/about",
    metrics: [
      { label: texts.period, value: timeline.period },
      { label: texts.organization, value: timeline.organization },
    ],
  };
}

function buildArchitectureCard(texts: DashboardCardTexts): DashboardCardVM {
  const slug = resolveLatestProjectSlug();
  const featured = buildProjectViewModel(slug);
  const blueprint = featured?.blueprintPreview ?? "—";
  const title = featured?.title ?? "—";

  return {
    id: "architecture",
    titleKey: "cards.architecture.title",
    preview: truncatePreview(`${title} · ${blueprint}`),
    href: `/projects/${slug}`,
    metrics: [
      { label: texts.product, value: title },
      { label: texts.blueprint, value: blueprint },
      { label: texts.status, value: featured?.status ?? "—" },
    ],
  };
}

function buildCurrentStackCard(): DashboardCardVM {
  const { topTags } = getTechnologyStack();
  const preview = truncatePreview(topTags.join(" · "));

  return {
    id: "currentStack",
    titleKey: "cards.currentStack.title",
    preview,
    href: "/about#stack",
    metrics: topTags.map((tag, index) => ({
      label: `#${index + 1}`,
      value: tag,
    })),
  };
}

function buildLatestActivityCard(
  texts: DashboardCardTexts,
  activityTemplates: ActivityMessageTemplates
): DashboardCardVM {
  const recentEntries = sortActivityRecordsLatestFirst(getActivity()).slice(
    0,
    ACTIVITY_CARD_PREVIEW_COUNT
  );

  const previewEntry = recentEntries[0];
  const preview = previewEntry
    ? (() => {
        const display = toActivityEntryVM(previewEntry, activityTemplates);
        return truncatePreview(`${display.timeLabel} ${display.message}`);
      })()
    : texts.noActivity;

  const metrics: DashboardCardMetricVM[] = recentEntries.map((entry) => {
    const display = toActivityEntryVM(entry, activityTemplates);

    return {
      label: display.timeLabel,
      value: display.message,
    };
  });

  return {
    id: "latestActivity",
    titleKey: "cards.latestActivity.title",
    preview,
    href: "/#activity-log",
    metrics,
  };
}

function buildPrinciplesCard(texts: DashboardCardTexts): DashboardCardVM {
  const count = getPrinciplesCount();
  const preview = truncatePreview(fill(texts.protocolsPreview, { count }));

  return {
    id: "principles",
    titleKey: "cards.principles.title",
    preview,
    href: "/principles",
    metrics: [
      { label: texts.registered, value: String(count) },
      { label: texts.module, value: texts.engineeringProtocols },
    ],
  };
}

export function buildDashboardCards(
  texts: DashboardCardTexts = DASHBOARD_CARD_TEXTS_EN,
  activityTemplates: ActivityMessageTemplates = ACTIVITY_MESSAGE_TEMPLATES_EN
): DashboardCardVM[] {
  return [
    buildProjectsCard(texts),
    buildArticlesCard(texts),
    buildTechnologiesCard(texts),
    buildExperienceCard(texts),
    buildArchitectureCard(texts),
    buildCurrentStackCard(),
    buildLatestActivityCard(texts, activityTemplates),
    buildPrinciplesCard(texts),
  ];
}
