import type { ProjectLinksVM, ProjectRecordVM } from "@/lib/domain/projects";
import type { ProjectDocLayoutLabels } from "./project-doc-types";

type ProjectDocTitleBlockProps = {
  record: ProjectRecordVM;
  links?: ProjectLinksVM;
  labels: ProjectDocLayoutLabels["meta"];
};

function formatVersion(version: string | null, unsetLabel: string): string {
  if (!version) {
    return unsetLabel;
  }

  return version.startsWith("v") ? version : `v${version}`;
}

export function ProjectDocTitleBlock({
  record,
  links,
  labels,
}: ProjectDocTitleBlockProps) {
  return (
    <header className="ds-er-doc-title">
      <p className="ds-er-doc-subtitle">{record.subtitle}</p>
      <h1 className="ds-er-doc-heading">{record.title}</h1>

      <dl className="ds-er-doc-meta">
        <div className="ds-er-doc-meta-row">
          <dt>{labels.status}</dt>
          <dd>{record.status}</dd>
        </div>
        <div className="ds-er-doc-meta-row">
          <dt>{labels.domain}</dt>
          <dd>{record.domain}</dd>
        </div>
        <div className="ds-er-doc-meta-row">
          <dt>{labels.version}</dt>
          <dd>{formatVersion(record.version, labels.versionUnset)}</dd>
        </div>
        <div className="ds-er-doc-meta-row">
          <dt>{labels.stack}</dt>
          <dd>
            <ul className="ds-er-doc-stack">
              {record.stack.map((item) => (
                <li key={item} className="ds-er-doc-stack-item">
                  {item}
                </li>
              ))}
            </ul>
          </dd>
        </div>
        <div className="ds-er-doc-meta-row">
          <dt>{labels.updated}</dt>
          <dd>
            <time dateTime={record.updatedAt}>{record.updatedAt}</time>
          </dd>
        </div>
        {links?.github ? (
          <div className="ds-er-doc-meta-row">
            <dt>{labels.github}</dt>
            <dd>
              <a
                className="ds-er-doc-link"
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                {links.github.replace("https://github.com/", "")}
              </a>
            </dd>
          </div>
        ) : null}
        {links?.external ? (
          <div className="ds-er-doc-meta-row">
            <dt>{labels.website}</dt>
            <dd>
              <a
                className="ds-er-doc-link"
                href={links.external}
                target="_blank"
                rel="noopener noreferrer"
              >
                {links.external.replace(/^https?:\/\//, "")}
              </a>
            </dd>
          </div>
        ) : null}
      </dl>
    </header>
  );
}
