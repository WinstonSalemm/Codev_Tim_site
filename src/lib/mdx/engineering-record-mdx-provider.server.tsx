/**
 * Engineering Record MDX provider registry — server-only.
 * Import from `@/lib/mdx/engineering-record-mdx-provider.server`.
 */
import "server-only";

import { MDXProvider } from "@mdx-js/react";
import type { ReactNode } from "react";
import {
  createEngineeringRecordMdxComponents,
  getEngineeringRecordMdxComponentNames,
  type EngineeringRecordMdxLabels,
} from "./engineering-record-mdx-components.server";

export type { EngineeringRecordMdxLabels };

export {
  createEngineeringRecordMdxComponents,
  getEngineeringRecordMdxComponentNames,
};

export type EngineeringRecordMdxProviderRegistryProps = {
  labels: EngineeringRecordMdxLabels;
  children: ReactNode;
};

/**
 * Client-capable MDXProvider registration for Engineering Record components.
 * Use in client MDX islands; server sections pass `components` directly to compiled MDX.
 */
export function EngineeringRecordMdxProviderRegistry({
  labels,
  children,
}: EngineeringRecordMdxProviderRegistryProps) {
  const components = createEngineeringRecordMdxComponents(
    labels,
    "registry",
    new Set()
  );

  return <MDXProvider components={components}>{children}</MDXProvider>;
}

export const ENGINEERING_RECORD_MDX_COMPONENT_NAMES =
  getEngineeringRecordMdxComponentNames();
