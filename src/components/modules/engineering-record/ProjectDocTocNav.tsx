"use client";

import type { DocumentTocEntry } from "@/lib/mdx/document-toc";
import { useDocumentTocSpy } from "./useDocumentTocSpy";

type ProjectDocTocNavProps = {
  entries: DocumentTocEntry[];
  heading: string;
  mobileLabels: {
    label: string;
    placeholder: string;
  };
};

function tocLinkClassName(entry: DocumentTocEntry, isActive: boolean): string {
  const classes = ["ds-er-doc-toc-link"];

  if (entry.level === 3) {
    classes.push("ds-er-doc-toc-link--level-3");
  }

  if (entry.level === 4) {
    classes.push("ds-er-doc-toc-link--level-4");
  }

  if (isActive) {
    classes.push("ds-er-doc-toc-link--active");
  }

  return classes.join(" ");
}

export function ProjectDocTocNav({
  entries,
  heading,
  mobileLabels,
}: ProjectDocTocNavProps) {
  const entryIds = entries.map((entry) => entry.id);
  const { activeId, navigateToHeading } = useDocumentTocSpy(entryIds, entries);

  function handleLinkClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) {
    event.preventDefault();
    navigateToHeading(id);
  }

  function handleMobileSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    const id = event.target.value.replace(/^#/, "");

    if (!id) {
      return;
    }

    navigateToHeading(id);
  }

  return (
    <>
      <nav className="ds-er-doc-toc-desktop" aria-label={heading}>
        <p className="ds-er-doc-toc-label">{heading}</p>
        <ol className="ds-er-doc-toc-list">
          {entries.map((entry) => {
            const isActive = activeId === entry.id;

            return (
              <li
                key={entry.id}
                className={`ds-er-doc-toc-item ds-er-doc-toc-item--level-${entry.level}`}
              >
                <a
                  href={`#${entry.id}`}
                  className={tocLinkClassName(entry, isActive)}
                  aria-current={isActive ? "location" : undefined}
                  onClick={(event) => handleLinkClick(event, entry.id)}
                >
                  {entry.title}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="ds-er-doc-toc-mobile">
        <label
          className="ds-er-doc-toc-mobile-label"
          htmlFor="er-doc-toc-select"
        >
          {mobileLabels.label}
        </label>
        <select
          id="er-doc-toc-select"
          className="ds-er-doc-toc-mobile-select"
          value={activeId ? `#${activeId}` : ""}
          onChange={handleMobileSelect}
        >
          <option value="" disabled>
            {mobileLabels.placeholder}
          </option>
          {entries.map((entry) => (
            <option key={entry.id} value={`#${entry.id}`}>
              {`${entry.level > 2 ? "— ".repeat(entry.level - 2) : ""}${entry.title}`}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
