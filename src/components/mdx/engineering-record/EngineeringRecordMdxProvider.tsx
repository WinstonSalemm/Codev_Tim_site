import type { ReactNode } from "react";
import type { EngineeringRecordMdxLabels } from "@/lib/mdx/engineering-record-mdx-components.server";
import { getEngineeringRecordMdxComponentNames } from "@/lib/mdx/engineering-record-mdx-components.server";

export type EngineeringRecordMdxProviderProps = {
  labels: EngineeringRecordMdxLabels;
  children: ReactNode;
};

/**
 * Engineering Record MDX scope — server-side provider boundary.
 * Component registration: `createEngineeringRecordMdxComponents(labels)` passed
 * to compiled MDX via the `components` prop (RSC-safe MDXProvider equivalent).
 */
export function EngineeringRecordMdxProvider({
  labels,
  children,
}: EngineeringRecordMdxProviderProps) {
  void labels;

  return (
    <div
      className="ds-mdx-provider"
      data-mdx-provider="engineering-record"
      data-mdx-components={getEngineeringRecordMdxComponentNames().join(",")}
    >
      {children}
    </div>
  );
}

export type { EngineeringRecordMdxLabels };
