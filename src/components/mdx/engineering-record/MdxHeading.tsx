import { Children, isValidElement, type ReactNode } from "react";
import { createScopedHeadingId } from "@/lib/mdx/heading-id";

type MdxHeadingProps = {
  level: 3 | 4;
  sectionId: string;
  usedIds: Set<string>;
  children?: ReactNode;
};

function extractHeadingText(children: ReactNode): string {
  const parts: string[] = [];

  Children.forEach(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      parts.push(String(child));
      return;
    }

    if (isValidElement<{ children?: ReactNode }>(child)) {
      parts.push(extractHeadingText(child.props.children));
    }
  });

  return parts.join("").trim();
}

function assignUniqueId(baseId: string, usedIds: Set<string>): string {
  if (!usedIds.has(baseId)) {
    usedIds.add(baseId);
    return baseId;
  }

  let index = 2;

  while (usedIds.has(`${baseId}-${index}`)) {
    index += 1;
  }

  const uniqueId = `${baseId}-${index}`;
  usedIds.add(uniqueId);
  return uniqueId;
}

export function MdxHeading({
  level,
  sectionId,
  usedIds,
  children,
}: MdxHeadingProps) {
  const text = extractHeadingText(children);
  const baseId = createScopedHeadingId(text, sectionId);
  const id = assignUniqueId(baseId, usedIds);
  const className = level === 3 ? "ds-mdx-heading-3" : "ds-mdx-heading-4";
  const Tag = level === 3 ? "h3" : "h4";

  return (
    <Tag id={id} data-toc-heading={level} className={className}>
      {children}
    </Tag>
  );
}
