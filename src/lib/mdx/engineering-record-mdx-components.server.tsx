import "server-only";

import {
  Children,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ComponentType,
  type ReactNode,
} from "react";
import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/mdx/engineering-record/Callout";
import { CodeBlock } from "@/components/mdx/engineering-record/CodeBlock";
import { ScreenshotFrame } from "@/components/mdx/engineering-record/ScreenshotFrame";
import { TradeoffTable } from "@/components/mdx/engineering-record/TradeoffTable";
import { MdxHeading } from "@/components/mdx/engineering-record/MdxHeading";
import { ArchitectureDiagram } from "@/components/mdx/engineering-record/ArchitectureDiagram";
import { InterfaceRecordGallery } from "@/components/mdx/engineering-record/InterfaceRecordGallery";

export type EngineeringRecordMdxLabels = {
  codeBlock: {
    copy: string;
    copied: string;
  };
};

function extractCodeFromPreChildren(children: ReactNode): {
  code: string;
  language: string;
} | null {
  const child = Children.toArray(children)[0];

  if (!isValidElement<{ className?: string; children?: ReactNode }>(child)) {
    return null;
  }

  const className = child.props.className ?? "";
  const match = /language-([\w-]+)/.exec(className);

  if (!match?.[1]) {
    return null;
  }

  const code = String(child.props.children ?? "").replace(/\n$/, "");

  return {
    code,
    language: match[1],
  };
}

function createMdxPre(labels: EngineeringRecordMdxLabels) {
  return function MdxPre({ children }: { children?: ReactNode }) {
    const extracted = extractCodeFromPreChildren(children);

    if (extracted) {
      return (
        <CodeBlock
          code={extracted.code}
          language={extracted.language}
          labels={labels.codeBlock}
        />
      );
    }

    return <pre className="ds-mdx-pre-fallback">{children}</pre>;
  };
}

function MdxCode(props: ComponentPropsWithoutRef<"code">) {
  const { className, children, ...rest } = props;

  if (typeof className === "string" && className.includes("language-")) {
    return (
      <code className={className} {...rest}>
        {children}
      </code>
    );
  }

  return (
    <code className="ds-mdx-inline-code" {...rest}>
      {children}
    </code>
  );
}

function MdxCodeBlock(
  props: {
    children?: ReactNode;
    language?: string;
    title?: string;
  } & EngineeringRecordMdxLabels
) {
  const { children, language = "text", title, codeBlock } = props;
  const code = String(children ?? "").replace(/\n$/, "");

  return (
    <CodeBlock
      code={code}
      language={language}
      title={title}
      labels={codeBlock}
    />
  );
}

export function createEngineeringRecordMdxComponents(
  labels: EngineeringRecordMdxLabels,
  sectionId: string,
  usedHeadingIds: Set<string>
): MDXComponents {
  const CodeBlockComponent = (props: {
    children?: ReactNode;
    language?: string;
    title?: string;
  }) => <MdxCodeBlock {...props} codeBlock={labels.codeBlock} />;

  return {
    Callout,
    TradeoffTable,
    CodeBlock: CodeBlockComponent,
    ScreenshotFrame,
    ArchitectureDiagram,
    InterfaceRecordGallery,
    pre: createMdxPre(labels),
    code: MdxCode,
    p: (props) => <p className="ds-mdx-paragraph" {...props} />,
    a: (props) => <a className="ds-mdx-link" {...props} />,
    ul: (props) => <ul className="ds-mdx-list" {...props} />,
    ol: (props) => (
      <ol className="ds-mdx-list ds-mdx-list--ordered" {...props} />
    ),
    li: (props) => <li className="ds-mdx-list-item" {...props} />,
    h3: (props) => (
      <MdxHeading
        level={3}
        sectionId={sectionId}
        usedIds={usedHeadingIds}
        {...props}
      />
    ),
    h4: (props) => (
      <MdxHeading
        level={4}
        sectionId={sectionId}
        usedIds={usedHeadingIds}
        {...props}
      />
    ),
    blockquote: (props) => (
      <blockquote className="ds-mdx-blockquote" {...props} />
    ),
    hr: () => <hr className="ds-mdx-divider" />,
  };
}

export function getEngineeringRecordMdxComponentNames(): string[] {
  return [
    "Callout",
    "TradeoffTable",
    "CodeBlock",
    "ScreenshotFrame",
    "ArchitectureDiagram",
    "InterfaceRecordGallery",
  ];
}

export type CompiledMdxContent = ComponentType<{ components?: MDXComponents }>;
