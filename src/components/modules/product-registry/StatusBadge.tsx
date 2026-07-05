type StatusBadgeProps = {
  status: string;
  label: string;
};

function resolveStatusTone(status: string): string {
  switch (status) {
    case "In Development":
      return "in-development";
    case "Production":
      return "production";
    case "Experimental":
      return "experimental";
    case "Archived":
      return "archived";
    default:
      return "default";
  }
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const tone = resolveStatusTone(status);

  return (
    <span className={`ds-registry-status ds-registry-status--${tone}`}>
      <span className="ds-registry-status-dot" aria-hidden="true" />
      <span className="ds-registry-status-label">{label}</span>
    </span>
  );
}
