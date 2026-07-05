import {
  buildNavigationView,
  resolveNavigationItem,
} from "@/lib/domain/navigation";

export function loadNavigation() {
  return buildNavigationView();
}

export function loadNavigationItem(id: string) {
  return resolveNavigationItem(id);
}
