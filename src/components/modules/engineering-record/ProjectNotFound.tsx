import { Link } from "@/i18n/navigation";

type ProjectNotFoundProps = {
  labels: {
    message: string;
    returnRegistry: string;
  };
};

export function ProjectNotFound({ labels }: ProjectNotFoundProps) {
  return (
    <div className="ds-engineering-record-page">
      <div className="ds-er-not-found">
        <p className="ds-er-not-found-message">{labels.message}</p>
        <Link href="/projects" className="ds-er-placeholder-action">
          {labels.returnRegistry}
        </Link>
      </div>
    </div>
  );
}
