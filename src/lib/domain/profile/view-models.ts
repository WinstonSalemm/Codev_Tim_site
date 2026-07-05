export type ProfileDataRowVM = {
  key: string;
  value: string;
};

export type DeploymentEventVM = {
  id: string;
  period: string;
  role: string;
  context: string;
  focus: string;
};

export type TechnologyLayerVM = {
  id: string;
  label: string;
  count: number;
};

export type EngineerProfileVM = {
  identity: ProfileDataRowVM[];
  deploymentHistory: DeploymentEventVM[];
  technologyStack: {
    layers: TechnologyLayerVM[];
    topTags: string[];
  };
  availability: ProfileDataRowVM[];
  interests: string[];
};

export type EngineerProfileContentVM = {
  displayName: string;
  fullName: string;
  brand: string;
  location: string;
  timezone: string;
  focus: string;
  roles: string[];
  primaryLanguage: string;
  additionalLanguages: string[];
  availabilityStatus: string;
  availabilityLabel: string;
  responseTimeHours: number;
  deploymentHistory: DeploymentEventVM[];
  technologyStack: {
    layers: TechnologyLayerVM[];
    topTags: string[];
  };
  interests: string[];
};
