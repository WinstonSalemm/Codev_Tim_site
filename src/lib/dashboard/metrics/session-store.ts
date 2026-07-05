import { DASHBOARD_LIVE_METRICS } from "./constants";

function readAnimatedCards(): Set<string> {
  if (typeof window === "undefined") {
    return new Set();
  }

  try {
    const raw = sessionStorage.getItem(
      DASHBOARD_LIVE_METRICS.sessionStorageKey
    );
    if (!raw) {
      return new Set();
    }

    const parsed = JSON.parse(raw) as string[];
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

function writeAnimatedCards(cards: Set<string>): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    sessionStorage.setItem(
      DASHBOARD_LIVE_METRICS.sessionStorageKey,
      JSON.stringify([...cards])
    );
  } catch {
    /* best-effort session persistence */
  }
}

export function hasLiveMetricsAnimated(cardId: string): boolean {
  return readAnimatedCards().has(cardId);
}

export function markLiveMetricsAnimated(cardId: string): void {
  const cards = readAnimatedCards();
  cards.add(cardId);
  writeAnimatedCards(cards);
}
