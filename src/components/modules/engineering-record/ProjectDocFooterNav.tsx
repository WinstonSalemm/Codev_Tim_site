import { Link } from "@/i18n/navigation";
import type { ProjectRecordNavigationVM } from "@/lib/domain/projects";

type ProjectDocFooterNavProps = {
  navigation: ProjectRecordNavigationVM;
  labels: {
    ariaLabel: string;
    previous: string;
    next: string;
  };
};

export function ProjectDocFooterNav({
  navigation,
  labels,
}: ProjectDocFooterNavProps) {
  const { previous, next } = navigation;

  if (!previous && !next) {
    return null;
  }

  return (
    <nav className="ds-er-doc-footer" aria-label={labels.ariaLabel}>
      <div className="ds-er-doc-footer-slot">
        {previous ? (
          <Link
            href={`/projects/${previous.slug}`}
            className="ds-er-doc-footer-link"
          >
            <span className="ds-er-doc-footer-direction" aria-hidden="true">
              ←
            </span>
            <span className="ds-er-doc-footer-copy">
              <span className="ds-er-doc-footer-label">{labels.previous}</span>
              <span className="ds-er-doc-footer-title">{previous.title}</span>
            </span>
          </Link>
        ) : null}
      </div>

      <div className="ds-er-doc-footer-slot ds-er-doc-footer-slot--end">
        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="ds-er-doc-footer-link ds-er-doc-footer-link--next"
          >
            <span className="ds-er-doc-footer-copy">
              <span className="ds-er-doc-footer-label">{labels.next}</span>
              <span className="ds-er-doc-footer-title">{next.title}</span>
            </span>
            <span className="ds-er-doc-footer-direction" aria-hidden="true">
              →
            </span>
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
