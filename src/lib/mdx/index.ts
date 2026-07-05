import "server-only";

export { compileEngineeringRecordSection } from "./compile-engineering-record-section";
export { compileArticleNoteBody } from "./compile-article-note";
export type { CompiledMdxContent } from "./engineering-record-mdx-components.server";
export { buildDocumentToc, type DocumentTocEntry } from "./build-document-toc";
export { resolveTocHashTarget } from "./document-toc";
export {
  createScopedHeadingId,
  ensureUniqueHeadingId,
  slugifyHeadingText,
} from "./heading-id";
export {
  createEngineeringRecordMdxComponents,
  getEngineeringRecordMdxComponentNames,
  ENGINEERING_RECORD_MDX_COMPONENT_NAMES,
  EngineeringRecordMdxProviderRegistry,
} from "./engineering-record-mdx-provider.server";
export type { EngineeringRecordMdxLabels } from "./engineering-record-mdx-provider.server";
export { highlightCode, warmMdxHighlighter } from "./highlight-code";
