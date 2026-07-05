import type { CalloutProps } from "./types";

export function Callout({
  variant = "neutral",
  title,
  children,
}: CalloutProps) {
  return (
    <aside className={`ds-mdx-callout ds-mdx-callout--${variant}`} role="note">
      {title ? <p className="ds-mdx-callout-title">{title}</p> : null}
      <div className="ds-mdx-callout-body">{children}</div>
    </aside>
  );
}
