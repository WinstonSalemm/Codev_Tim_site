import {
  getArticles,
  getPrinciplesCount,
  getTechnologyStack,
} from "@/lib/content";
import { calculateProductMetrics } from "../projects/registry";
import type { DashboardMetricsVM } from "./view-models";

export function calculateDashboardMetrics(): DashboardMetricsVM {
  const productMetrics = calculateProductMetrics();
  const stack = getTechnologyStack();

  return {
    products: {
      registered: productMetrics.registered,
      production: productMetrics.production,
      inDevelopment: productMetrics.inDevelopment,
    },
    articles: {
      published: getArticles().length,
    },
    principles: {
      registered: getPrinciplesCount(),
    },
    technologies: {
      layerCount: stack.layers.length,
    },
  };
}
