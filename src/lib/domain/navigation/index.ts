import { getNavigation as getContentNavigation } from "@/lib/content";
import type { ContentNavigationItem } from "@/lib/content/types";

export type NavigationItemVM = ContentNavigationItem;

export function buildNavigationView(): NavigationItemVM[] {
  return getContentNavigation();
}

export function resolveNavigationItem(
  id: string
): NavigationItemVM | undefined {
  return getContentNavigation().find((item) => item.id === id);
}
