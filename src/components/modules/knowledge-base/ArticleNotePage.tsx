import { Link } from "@/i18n/navigation";
import { ModuleHeader } from "@/components/ui/ModuleHeader";
import type { ArticleNoteVM } from "@/lib/application";
import { ArticleNoteContent } from "./ArticleNoteContent";

type ArticleNotePageProps = {
  header: {
    label: string;
    name: string;
    description: string;
  };
  note: ArticleNoteVM;
  translations: {
    meta: {
      category: string;
      cluster: string;
      published: string;
      modified: string;
      readingTime: string;
      readingTimeValue: string;
    };
    actions: {
      returnKnowledgeBase: string;
    };
  };
};

export async function ArticleNotePage({
  header,
  note,
  translations,
}: ArticleNotePageProps) {
  return (
    <div className="ds-kb-note-page">
      <ModuleHeader
        label={header.label}
        name={note.title}
        description={note.summary}
      />

      <div className="ds-kb-note-body">
        <dl className="ds-kb-note-meta">
          <div className="ds-kb-note-meta-item">
            <dt className="ds-kb-note-meta-label">
              {translations.meta.category}
            </dt>
            <dd className="ds-kb-note-meta-value">{note.category}</dd>
          </div>
          <div className="ds-kb-note-meta-item">
            <dt className="ds-kb-note-meta-label">
              {translations.meta.cluster}
            </dt>
            <dd className="ds-kb-note-meta-value">{note.cluster}</dd>
          </div>
          <div className="ds-kb-note-meta-item">
            <dt className="ds-kb-note-meta-label">
              {translations.meta.published}
            </dt>
            <dd className="ds-kb-note-meta-value">{note.datePublished}</dd>
          </div>
          <div className="ds-kb-note-meta-item">
            <dt className="ds-kb-note-meta-label">
              {translations.meta.modified}
            </dt>
            <dd className="ds-kb-note-meta-value">{note.dateModified}</dd>
          </div>
          {note.readingTime !== null ? (
            <div className="ds-kb-note-meta-item">
              <dt className="ds-kb-note-meta-label">
                {translations.meta.readingTime}
              </dt>
              <dd className="ds-kb-note-meta-value">
                {translations.meta.readingTimeValue.replace(
                  "{minutes}",
                  String(note.readingTime)
                )}
              </dd>
            </div>
          ) : null}
        </dl>

        <ArticleNoteContent body={note.body} />

        <Link href="/writing" className="ds-kb-note-return">
          {translations.actions.returnKnowledgeBase}
        </Link>
      </div>
    </div>
  );
}
