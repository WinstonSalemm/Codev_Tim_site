type ProjectDocRelatedNotesProps = {
  labels: {
    heading: string;
    placeholder: string;
  };
};

export function ProjectDocRelatedNotes({
  labels,
}: ProjectDocRelatedNotesProps) {
  return (
    <aside
      className="ds-er-doc-related"
      aria-labelledby="er-doc-related-heading"
    >
      <h2 id="er-doc-related-heading" className="ds-er-doc-related-heading">
        {labels.heading}
      </h2>
      <p className="ds-er-doc-related-placeholder">{labels.placeholder}</p>
    </aside>
  );
}
