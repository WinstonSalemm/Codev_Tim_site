type PrincipleCardProps = {
  number: string;
  title: string;
  summary: string;
  body: string;
  example: string;
  protocolLabel: string;
  exampleLabel: string;
};

export function PrincipleCard({
  number,
  title,
  summary,
  body,
  example,
  protocolLabel,
  exampleLabel,
}: PrincipleCardProps) {
  return (
    <article className="ds-principle-card">
      <p className="ds-principle-card-label ds-text-label">
        {protocolLabel} {number}
      </p>
      <h2 className="ds-principle-card-title">{title}</h2>
      <p className="ds-principle-card-summary">{summary}</p>
      <p className="ds-principle-card-body">{body}</p>
      <div className="ds-principle-card-example">
        <p className="ds-principle-card-example-label ds-text-label">
          {exampleLabel}
        </p>
        <p className="ds-principle-card-example-text">{example}</p>
      </div>
    </article>
  );
}
