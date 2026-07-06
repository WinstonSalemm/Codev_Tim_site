import type {
  ProjectLinksVM,
  ProjectRecordNavigationVM,
  ProjectRecordVM,
} from "@/lib/domain/projects";

export type ProjectDocLayoutLabels = {
  breadcrumb: {
    ariaLabel: string;
    operationsCenter: string;
    productRegistry: string;
  };
  backToRegistry: string;
  tocHeading: string;
  tocMobile: {
    label: string;
    placeholder: string;
  };
  meta: {
    status: string;
    domain: string;
    version: string;
    stack: string;
    updated: string;
    versionUnset: string;
    github: string;
    website: string;
  };
  relatedNotes: {
    heading: string;
    placeholder: string;
  };
  footer: {
    ariaLabel: string;
    previous: string;
    next: string;
  };
};

export type ProjectDocLayoutProps = {
  record: ProjectRecordVM;
  navigation: ProjectRecordNavigationVM;
  links?: ProjectLinksVM;
  labels: ProjectDocLayoutLabels;
};
