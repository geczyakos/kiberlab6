export function withStats(cache) {
  let hits = 0;
  let misses = 0;

  return {
    ...cache,
    get(key) {
      const value = cache.get(key);
      if (value === undefined) misses += 1;
      else hits += 1;
      return value;
    },
    getStats() {
      return { hits, misses, hitRate: hits + misses === 0 ? 0 : hits / (hits + misses) };
    },
  };
}