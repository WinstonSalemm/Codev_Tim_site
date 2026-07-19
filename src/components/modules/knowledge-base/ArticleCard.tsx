import { Link } from "@/i18n/navigation";
import type { ArticleCardVM } from "@/lib/application";

type ArticleCardProps = {
  article: ArticleCardVM;
  labels: {
    category: string;
    cluster: string;
    published: string;
    readingTime: string;
    readingTimeValue: string;
    openNote: string;
  };
};

export function ArticleCard({ article, labels }: ArticleCardProps) {
  return (
    <article className="ds-kb-card">
      <p className="ds-kb-card-label ds-text-label">{labels.category}</p>
      <h2 className="ds-kb-card-title">
        <Link href={`/writing/${article.slug}`} className="ds-kb-card-link">
          {article.title}
        </Link>
      </h2>
      <p className="ds-kb-card-summary">{article.summary}</p>
      <dl className="ds-kb-card-meta">
        <div className="ds-kb-card-meta-item">
          <dt className="ds-kb-card-meta-label">{labels.category}</dt>
          <dd className="ds-kb-card-meta-value">{article.category}</dd>
        </div>
        <div className="ds-kb-card-meta-item">
          <dt className="ds-kb-card-meta-label">{labels.cluster}</dt>
          <dd className="ds-kb-card-meta-value">{article.cluster}</dd>
        </div>
        <div className="ds-kb-card-meta-item">
          <dt className="ds-kb-card-meta-label">{labels.published}</dt>
          <dd className="ds-kb-card-meta-value">{article.datePublished}</dd>
        </div>
        {article.readingTime !== null ? (
          <div className="ds-kb-card-meta-item">
            <dt className="ds-kb-card-meta-label">{labels.readingTime}</dt>
            <dd className="ds-kb-card-meta-value">
              {labels.readingTimeValue.replace(
                "{minutes}",
                String(article.readingTime)
              )}
            </dd>
          </div>
        ) : null}
      </dl>
      <Link href={`/writing/${article.slug}`} className="ds-kb-card-action">
        {labels.openNote}
      </Link>
    </article>
  );
}
