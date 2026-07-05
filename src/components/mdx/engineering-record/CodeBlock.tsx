import { highlightCode } from "@/lib/mdx/highlight-code";
import { CodeBlockCopyButton } from "./CodeBlockCopyButton";
import type { CodeBlockProps } from "./types";

type CodeBlockLabels = {
  copy: string;
  copied: string;
};

type CodeBlockWithLabelsProps = CodeBlockProps & {
  labels: CodeBlockLabels;
};

export async function CodeBlock({
  code,
  language = "text",
  title,
  labels,
}: CodeBlockWithLabelsProps) {
  const normalizedCode = code.replace(/\n$/, "");
  const highlightedHtml = await highlightCode(normalizedCode, language);
  const displayLanguage = language === "text" ? "plain text" : language;

  return (
    <figure className="ds-mdx-codeblock">
      <figcaption className="ds-mdx-codeblock-header">
        <span className="ds-mdx-codeblock-label">
          {title ?? displayLanguage}
        </span>
        <CodeBlockCopyButton
          code={normalizedCode}
          copyLabel={labels.copy}
          copiedLabel={labels.copied}
        />
      </figcaption>
      <div
        className="ds-mdx-codeblock-body"
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      />
    </figure>
  );
}
