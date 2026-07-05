import { Link } from "@/i18n/navigation";

type RegistryBreadcrumbProps = {
  labels: {
    ariaLabel: string;
    operationsCenter: string;
    productRegistry: string;
  };
};

export function RegistryBreadcrumb({ labels }: RegistryBreadcrumbProps) {
  return (
    <nav className="ds-registry-breadcrumb" aria-label={labels.ariaLabel}>
      <ol className="ds-registry-breadcrumb-list">
        <li className="ds-registry-breadcrumb-item">
          <Link href="/" className="ds-registry-breadcrumb-link">
            {labels.operationsCenter}
          </Link>
        </li>
        <li className="ds-registry-breadcrumb-separator" aria-hidden="true">
          /
        </li>
        <li className="ds-registry-breadcrumb-item">
          <span className="ds-registry-breadcrumb-current" aria-current="page">
            {labels.productRegistry}
          </span>
        </li>
      </ol>
    </nav>
  );
}
