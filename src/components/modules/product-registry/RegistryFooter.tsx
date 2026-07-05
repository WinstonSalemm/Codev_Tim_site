import { Link } from "@/i18n/navigation";

type RegistryFooterProps = {
  recordCountLabel: string;
  labels: {
    source: string;
    returnOps: string;
  };
};

export function RegistryFooter({
  recordCountLabel,
  labels,
}: RegistryFooterProps) {
  return (
    <footer className="ds-registry-footer">
      <p className="ds-registry-footer-line">{labels.source}</p>
      <p className="ds-registry-footer-line">{recordCountLabel}</p>
      <Link href="/" className="ds-registry-footer-action">
        {labels.returnOps}
      </Link>
    </footer>
  );
}
