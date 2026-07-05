/**
 * Module-scoped memoization for content loaders.
 * Single parse per process — compatible with SSG/ISR build workers.
 */
export function createCachedLoader<T>(loader: () => T): () => T {
  let cached: T | undefined;

  return () => {
    if (cached === undefined) {
      cached = loader();
    }

    return cached;
  };
}
