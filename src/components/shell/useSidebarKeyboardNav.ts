"use client";

import { useCallback, useEffect, type RefObject } from "react";
import { useShellContext } from "@/context/shell";

export function useSidebarKeyboardNav(navRef: RefObject<HTMLElement | null>) {
  const { closeMobileNav } = useShellContext();

  const getNavLinks = useCallback(() => {
    const nav = navRef.current;
    if (!nav) {
      return [] as HTMLAnchorElement[];
    }

    return Array.from(
      nav.querySelectorAll<HTMLAnchorElement>("a.ds-sidebar-nav-item")
    );
  }, [navRef]);

  const focusLinkAt = useCallback(
    (index: number) => {
      const links = getNavLinks();
      if (links.length === 0) {
        return;
      }

      const normalized = ((index % links.length) + links.length) % links.length;
      links[normalized]?.focus();
    },
    [getNavLinks]
  );

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const links = getNavLinks();
      const activeIndex = links.indexOf(
        document.activeElement as HTMLAnchorElement
      );

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          focusLinkAt(activeIndex === -1 ? 0 : activeIndex + 1);
          break;
        case "ArrowUp":
          event.preventDefault();
          focusLinkAt(activeIndex === -1 ? links.length - 1 : activeIndex - 1);
          break;
        case "Home":
          event.preventDefault();
          focusLinkAt(0);
          break;
        case "End":
          event.preventDefault();
          focusLinkAt(links.length - 1);
          break;
        case "Escape":
          closeMobileNav();
          break;
        default:
          break;
      }
    };

    nav.addEventListener("keydown", handleKeyDown);
    return () => nav.removeEventListener("keydown", handleKeyDown);
  }, [closeMobileNav, focusLinkAt, getNavLinks, navRef]);

  return { getNavLinks, focusLinkAt };
}
