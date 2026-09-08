export function animateChange(change: () => void) {
  if (
    typeof document === "undefined" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    change();
    return;
  }
  const target = document as Document & {
    startViewTransition?: (callback: () => void) => { finished: Promise<void> };
  };
  if (target.startViewTransition) {
    try {
      void target.startViewTransition(change).finished.catch(() => {});
    } catch {
      change();
    }
  } else {
    change();
  }
}
