export type TerminalProductVM = {
  slug: string;
  title: string;
  subtitle: string;
  status: string;
};

export type TerminalStackLayerVM = {
  label: string;
  count: number;
};

export type TerminalModuleTargetVM = {
  alias: string;
  label: string;
  href: string;
};

export type TerminalContextVM = {
  version: string;
  statusLabel: string;
  mission: string;
  location: string;
  timezone: string;
  availability: string;
  authorName: string;
  email: string;
  github: string;
  roles: string[];
  focus: string;
  timelineSummary: string;
  products: TerminalProductVM[];
  stackLayers: TerminalStackLayerVM[];
  topTags: string[];
  modules: TerminalModuleTargetVM[];
  noteTitles: string[];
};
