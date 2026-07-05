"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/components/modules/dashboard/motion/useReducedMotion";
import {
  resolveTocHashTarget,
  type DocumentTocEntry,
} from "@/lib/mdx/document-toc";

const SCROLL_ROOT_ID = "content";
const SCROLL_OFFSET_PX = 24;

function getScrollRoot(): HTMLElement | null {
  return document.getElementById(SCROLL_ROOT_ID);
}

function scrollToHeadingId(id: string, reducedMotion: boolean): void {
  const root = getScrollRoot();
  const target = document.getElementById(id);

  if (!root || !target) {
    return;
  }

  const rootRect = root.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const nextTop =
    targetRect.top - rootRect.top + root.scrollTop - SCROLL_OFFSET_PX;

  root.scrollTo({
    top: Math.max(nextTop, 0),
    behavior: reducedMotion ? "auto" : "smooth",
  });
}

export function useDocumentTocSpy(
  entryIds: string[],
  entries: DocumentTocEntry[]
) {
  const reducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIdRef = useRef<string | null>(null);
  const isProgrammaticScrollRef = useRef(false);
  const programmaticTimerRef = useRef<number | null>(null);

  const syncHash = useCallback((id: string) => {
    const nextHash = `#${id}`;
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, "", nextHash);
    }
  }, []);

  const navigateToHeading = useCallback(
    (id: string) => {
      isProgrammaticScrollRef.current = true;

      if (programmaticTimerRef.current !== null) {
        window.clearTimeout(programmaticTimerRef.current);
      }

      scrollToHeadingId(id, reducedMotion);
      activeIdRef.current = id;
      setActiveId(id);
      syncHash(id);

      programmaticTimerRef.current = window.setTimeout(
        () => {
          isProgrammaticScrollRef.current = false;
        },
        reducedMotion ? 0 : 450
      );
    },
    [reducedMotion, syncHash]
  );

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    const root = getScrollRoot();
    if (!root || entryIds.length === 0) {
      return;
    }

    const elements = entryIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) {
      return;
    }

    const visibility = new Map<string, boolean>();

    const pickActiveId = () => {
      if (isProgrammaticScrollRef.current) {
        return;
      }

      let nextActive: string | null = null;
      let closestTop = Number.POSITIVE_INFINITY;

      for (const element of elements) {
        if (!visibility.get(element.id)) {
          continue;
        }

        const top = element.getBoundingClientRect().top;

        if (top >= SCROLL_OFFSET_PX - 4 && top < closestTop) {
          closestTop = top;
          nextActive = element.id;
        }
      }

      if (!nextActive) {
        for (let index = elements.length - 1; index >= 0; index -= 1) {
          const element = elements[index];
          if (element && visibility.get(element.id)) {
            nextActive = element.id;
            break;
          }
        }
      }

      if (nextActive && nextActive !== activeIdRef.current) {
        activeIdRef.current = nextActive;
        setActiveId(nextActive);
        syncHash(nextActive);
      }
    };

    const observer = new IntersectionObserver(
      (records) => {
        for (const record of records) {
          visibility.set(record.target.id, record.isIntersecting);
        }
        pickActiveId();
      },
      {
        root,
        rootMargin: "-96px 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 1],
      }
    );

    for (const element of elements) {
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
      if (programmaticTimerRef.current !== null) {
        window.clearTimeout(programmaticTimerRef.current);
      }
    };
  }, [entryIds, syncHash]);

  useEffect(() => {
    const handleHashChange = () => {
      const targetId = resolveTocHashTarget(window.location.hash, entries);

      if (!targetId) {
        return;
      }

      navigateToHeading(targetId);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [entries, navigateToHeading]);

  useEffect(() => {
    const targetId = resolveTocHashTarget(window.location.hash, entries);

    if (!targetId) {
      return;
    }

    requestAnimationFrame(() => {
      navigateToHeading(targetId);
    });
  }, [entries, navigateToHeading]);

  return {
    activeId,
    navigateToHeading,
    reducedMotion,
  };
}
