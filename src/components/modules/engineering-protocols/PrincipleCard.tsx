type PrincipleCardProps = {
  number: string;
  title: string;
  description: string;
  protocolLabel: string;
};

export function PrincipleCard({
  number,
  title,
  description,
  protocolLabel,
}: PrincipleCardProps) {
  return (
    <article className="ds-principle-card">
      <p className="ds-principle-card-label ds-text-label">
        {protocolLabel} {number}
      </p>
      <h2 className="ds-principle-card-title">{title}</h2>
      <p className="ds-principle-card-description">{description}</p>
    </article>
  );
}
