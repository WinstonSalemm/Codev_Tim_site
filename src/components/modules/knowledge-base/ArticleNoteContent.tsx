import { compileArticleNoteBody } from "@/lib/mdx/compile-article-note";

type ArticleNoteContentProps = {
  body: string;
};

export async function ArticleNoteContent({ body }: ArticleNoteContentProps) {
  const Content = await compileArticleNoteBody(body);

  return (
    <div className="ds-kb-note-prose">
      <Content />
    </div>
  );
}
