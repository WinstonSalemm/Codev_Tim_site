import "server-only";

import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import type { CompiledMdxContent } from "./engineering-record-mdx-components.server";

export async function compileEngineeringRecordSection(
  source: string
): Promise<CompiledMdxContent> {
  const { compile, run } = await import("@mdx-js/mdx");

  const compiled = await compile(source, {
    outputFormat: "function-body",
    development: process.env.NODE_ENV === "development",
    remarkPlugins: [remarkGfm],
  });

  const { default: MDXContent } = await run(String(compiled), {
    ...runtime,
    baseUrl: import.meta.url,
  });

  return MDXContent as CompiledMdxContent;
}
