import "server-only";

import { createHighlighter, type Highlighter } from "shiki";

const SUPPORTED_LANGS = [
  "typescript",
  "tsx",
  "javascript",
  "jsx",
  "json",
  "bash",
  "shell",
  "csharp",
  "python",
  "sql",
  "yaml",
  "markdown",
  "text",
] as const;

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-dark"],
      langs: [...SUPPORTED_LANGS],
    });
  }

  return highlighterPromise;
}

export async function highlightCode(
  code: string,
  language: string
): Promise<string> {
  const highlighter = await getHighlighter();
  const lang = SUPPORTED_LANGS.includes(
    language as (typeof SUPPORTED_LANGS)[number]
  )
    ? language
    : "text";

  return highlighter.codeToHtml(code, {
    lang,
    theme: "github-dark",
  });
}

export async function warmMdxHighlighter(): Promise<void> {
  await getHighlighter();
}
