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
} from "./activity-format";
import type { DashboardCardMetricVM, DashboardCardVM } from "./view-models";

function buildProjectsCard(): DashboardCardVM {
  const registry = buildProductRegistry();
  const latestProduct =
    buildProjectViewModel(registry.latestSlug) ?? registry.products[0];
  const latestTitle = latestProduct?.title;
  const metrics = registry.metrics;

  const preview = truncatePreview(
    `${metrics.registered} products · ${latestTitle ?? "No products"}`
  );

  const cardMetrics: DashboardCardMetricVM[] = [
    { label: "Registered", value: String(metrics.registered) },
    { label: "Production", value: String(metrics.production) },
    {
      label: "In Development",
      value: String(metrics.inDevelopment),
    },
    { label: "Latest", value: latestTitle ?? "—" },
  ];

  return {
    id: "projects",
    titleKey: "cards.projects.title",
    preview,
    href: "/projects",
    metrics: cardMetrics,
  };
}

function buildArticlesCard(): DashboardCardVM {
  const knowledgeBase = buildKnowledgeBase();
  const preview = truncatePreview(
    `${knowledgeBase.count} notes · No published notes`
  );

  return {
    id: "articles",
    titleKey: "cards.articles.title",
    preview,
    href: "/writing",
    metrics: [
      { label: "Published", value: String(knowledgeBase.count) },
      { label: "Status", value: "Registry empty" },
    ],
  };
}

function buildTechnologiesCard(): DashboardCardVM {
  const stack = getTechnologyStack();
  const layerSummary = stack.layers
    .slice(0, 3)
    .map((layer) => `${layer.label} ${layer.count}`)
    .join(" · ");
  const preview = truncatePreview(
    `${stack.layers.length} layers · ${layerSummary}`
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

function buildExperienceCard(): DashboardCardVM {
  const timeline = getTimeline();

  return {
    id: "experience",
    titleKey: "cards.experience.title",
    preview: truncatePreview(timeline.summary),
    href: "/about",
    metrics: [
      { label: "Period", value: timeline.period },
      { label: "Organization", value: timeline.organization },
    ],
  };
}

function buildArchitectureCard(): DashboardCardVM {
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
      { label: "Product", value: title },
      { label: "Blueprint", value: blueprint },
      { label: "Status", value: featured?.status ?? "—" },
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

function buildLatestActivityCard(): DashboardCardVM {
  const recentEntries = sortActivityRecordsLatestFirst(getActivity()).slice(
    0,
    ACTIVITY_CARD_PREVIEW_COUNT
  );

  const previewEntry = recentEntries[0];
  const preview = previewEntry
    ? (() => {
        const display = toActivityEntryVM(
          previewEntry,
          ACTIVITY_MESSAGE_TEMPLATES_EN
        );
        return truncatePreview(`${display.timeLabel} ${display.message}`);
      })()
    : "No activity recorded";

  const metrics: DashboardCardMetricVM[] = recentEntries.map((entry) => {
    const display = toActivityEntryVM(entry, ACTIVITY_MESSAGE_TEMPLATES_EN);

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

function buildPrinciplesCard(): DashboardCardVM {
  const count = getPrinciplesCount();
  const preview = truncatePreview(`${count} protocols registered`);

  return {
    id: "principles",
    titleKey: "cards.principles.title",
    preview,
    href: "/principles",
    metrics: [
      { label: "Registered", value: String(count) },
      { label: "Module", value: "Engineering Protocols" },
    ],
  };
}

export function buildDashboardCards(): DashboardCardVM[] {
  return [
    buildProjectsCard(),
    buildArticlesCard(),
    buildTechnologiesCard(),
    buildExperienceCard(),
    buildArchitectureCard(),
    buildCurrentStackCard(),
    buildLatestActivityCard(),
    buildPrinciplesCard(),
  ];
}
