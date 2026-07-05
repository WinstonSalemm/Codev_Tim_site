type KnowledgeBaseEmptyStateProps = {
  message: string;
};

export function KnowledgeBaseEmptyState({
  message,
}: KnowledgeBaseEmptyStateProps) {
  return (
    <div className="ds-kb-empty" role="status">
      <p className="ds-kb-empty-message">{message}</p>
    </div>
  );
}
