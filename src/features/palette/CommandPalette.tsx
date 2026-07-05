"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useShellContext } from "@/context/shell";
import { searchCommandPalette } from "@/lib/application/search/command-palette-actions";
import type {
  PaletteSearchGroup,
  PaletteSearchResultVM,
} from "@/lib/domain/search/palette-types";

type PaletteRow =
  | { type: "group"; key: PaletteSearchGroup; label: string }
  | { type: "item"; result: PaletteSearchResultVM; index: number };

const GROUP_ORDER: PaletteSearchGroup[] = ["module", "project", "article"];

function sortResults(
  results: PaletteSearchResultVM[]
): PaletteSearchResultVM[] {
  const groupRank = new Map(GROUP_ORDER.map((group, index) => [group, index]));

  return [...results].sort((left, right) => {
    const leftRank = groupRank.get(left.group) ?? 0;
    const rightRank = groupRank.get(right.group) ?? 0;

    if (leftRank !== rightRank) {
      return leftRank - rightRank;
    }

    return left.title.localeCompare(right.title);
  });
}

function buildPaletteRows(
  results: PaletteSearchResultVM[],
  groupLabel: (group: PaletteSearchGroup) => string
): PaletteRow[] {
  const rows: PaletteRow[] = [];
  let lastGroup: PaletteSearchGroup | null = null;

  results.forEach((result, index) => {
    if (result.group !== lastGroup) {
      rows.push({
        type: "group",
        key: result.group,
        label: groupLabel(result.group),
      });
      lastGroup = result.group;
    }

    rows.push({ type: "item", result, index });
  });

  return rows;
}

export function CommandPalette() {
  const t = useTranslations("palette");
  const locale = useLocale();
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const tAnnouncer = useTranslations("shell.announcer");
  const { closeCommandPalette, setNavigationAnnouncement } = useShellContext();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PaletteSearchResultVM[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    let cancelled = false;
    const delay = query.trim() ? 150 : 0;

    const timer = window.setTimeout(async () => {
      setIsPending(true);

      try {
        const nextResults = await searchCommandPalette(query, locale);

        if (!cancelled) {
          setResults(sortResults(nextResults));
          setActiveIndex(0);
        }
      } finally {
        if (!cancelled) {
          setIsPending(false);
        }
      }
    }, delay);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [locale, query]);

  const paletteRows = useMemo(
    () =>
      buildPaletteRows(results, (group) =>
        t(`groups.${group}` as "groups.module")
      ),
    [results, t]
  );

  const selectItem = useCallback(
    (index: number) => {
      const item = results[index];
      if (!item) {
        return;
      }

      setNavigationAnnouncement(
        tAnnouncer("navigatedTo", { module: item.title })
      );
      closeCommandPalette();
      router.push(item.href);
    },
    [
      closeCommandPalette,
      results,
      router,
      setNavigationAnnouncement,
      tAnnouncer,
    ]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((current) =>
          results.length === 0 ? 0 : (current + 1) % results.length
        );
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((current) =>
          results.length === 0
            ? 0
            : (current - 1 + results.length) % results.length
        );
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        selectItem(activeIndex);
      }
    };

    const node = dialogRef.current;
    node?.addEventListener("keydown", handleKeyDown);
    return () => node?.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, results.length, selectItem]);

  return (
    <div className="ds-palette-backdrop" onClick={closeCommandPalette}>
      <div
        ref={dialogRef}
        className="ds-palette"
        role="dialog"
        aria-modal="true"
        aria-label={t("title")}
        onClick={(event) => event.stopPropagation()}
      >
        <input
          ref={inputRef}
          type="search"
          className="ds-palette-input"
          placeholder={t("placeholder")}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-controls="command-palette-list"
          aria-busy={isPending}
        />

        <ul
          id="command-palette-list"
          className="ds-palette-list"
          role="listbox"
        >
          {results.length === 0 && !isPending ? (
            <li className="ds-palette-empty">{t("noResults")}</li>
          ) : (
            paletteRows.map((row) => {
              if (row.type === "group") {
                return (
                  <li
                    key={`group-${row.key}`}
                    className="ds-palette-group"
                    aria-hidden="true"
                  >
                    {row.label}
                  </li>
                );
              }

              const { result, index } = row;

              return (
                <li key={result.id}>
                  <button
                    type="button"
                    className={`ds-palette-item ${index === activeIndex ? "ds-palette-item--active" : ""}`}
                    role="option"
                    aria-selected={index === activeIndex}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => selectItem(index)}
                  >
                    <span className="ds-palette-item-title">
                      {result.title}
                    </span>
                    {result.subtitle ? (
                      <span className="ds-palette-item-subtitle">
                        {result.subtitle}
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}
