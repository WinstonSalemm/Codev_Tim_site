export type DashboardCardId =
  | "projects"
  | "articles"
  | "technologies"
  | "experience"
  | "architecture"
  | "currentStack"
  | "latestActivity"
  | "principles";

export type DashboardCardMetricVM = {
  label: string;
  value: string;
};

export type DashboardCardVM = {
  id: DashboardCardId;
  titleKey: string;
  preview: string;
  href: string;
  metrics: DashboardCardMetricVM[];
};

export type HeaderVM = {
  status: "operational";
  mission: string;
  version: string;
  location: string;
  timezone: string;
};

export type ActivityEntryVM = {
  id: string;
  timestamp: string;
  timeLabel: string;
  message: string;
};

export type DashboardMetricsVM = {
  products: {
    registered: number;
    production: number;
    inDevelopment: number;
  };
  articles: {
    published: number;
  };
  principles: {
    registered: number;
  };
  technologies: {
    layerCount: number;
  };
};

export type OperationsCenterVM = {
  header: HeaderVM;
  cards: DashboardCardVM[];
  metrics: DashboardMetricsVM;
  activityFeed: ActivityEntryVM[];
};
