import { Link } from "@/i18n/navigation";
import { ModuleHeader } from "@/components/ui/ModuleHeader";
import type { EngineeringRecordShellVM } from "./types";

type EngineeringRecordBreadcrumbProps = {
  productTitle: string;
  labels: {
    ariaLabel: string;
    operationsCenter: string;
    productRegistry: string;
  };
};

export function EngineeringRecordBreadcrumb({
  productTitle,
  labels,
}: EngineeringRecordBreadcrumbProps) {
  return (
    <nav className="ds-er-breadcrumb" aria-label={labels.ariaLabel}>
      <ol className="ds-er-breadcrumb-list">
        <li className="ds-er-breadcrumb-item">
          <Link href="/" className="ds-er-breadcrumb-link">
            {labels.operationsCenter}
          </Link>
        </li>
        <li className="ds-er-breadcrumb-separator" aria-hidden="true">
          /
        </li>
        <li className="ds-er-breadcrumb-item">
          <Link href="/projects" className="ds-er-breadcrumb-link">
            {labels.productRegistry}
          </Link>
        </li>
        <li className="ds-er-breadcrumb-separator" aria-hidden="true">
          /
        </li>
        <li className="ds-er-breadcrumb-item">
          <span className="ds-er-breadcrumb-current" aria-current="page">
            {productTitle}
          </span>
        </li>
      </ol>
    </nav>
  );
}

type EngineeringRecordPlaceholderProps = {
  project: EngineeringRecordShellVM;
  module: {
    label: string;
    description: string;
  };
  labels: {
    breadcrumb: EngineeringRecordBreadcrumbProps["labels"];
    placeholderMessage: string;
    returnRegistry: string;
  };
};

export function EngineeringRecordPlaceholder({
  project,
  module,
  labels,
}: EngineeringRecordPlaceholderProps) {
  return (
    <div className="ds-engineering-record-page">
      <EngineeringRecordBreadcrumb
        productTitle={project.title}
        labels={labels.breadcrumb}
      />

      <ModuleHeader
        label={module.label}
        name={project.title}
        description={project.summary}
      />

      <div className="ds-er-placeholder">
        <p className="ds-er-placeholder-message">{labels.placeholderMessage}</p>
        <dl className="ds-er-placeholder-meta">
          <div className="ds-er-placeholder-row">
            <dt>Status</dt>
            <dd>{project.status}</dd>
          </div>
          <div className="ds-er-placeholder-row">
            <dt>Domain</dt>
            <dd>{project.domain}</dd>
          </div>
          <div className="ds-er-placeholder-row">
            <dt>Stack</dt>
            <dd>{project.stack.join(" · ")}</dd>
          </div>
          <div className="ds-er-placeholder-row">
            <dt>Blueprint</dt>
            <dd>{project.blueprintPreview}</dd>
          </div>
        </dl>
        <Link href="/projects" className="ds-er-placeholder-action">
          {labels.returnRegistry}
        </Link>
      </div>
    </div>
  );
}
