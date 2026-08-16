export function withTTL(cache, defaultTtlMs = 60000) {
  const expiries = new Map();

  return {
    ...cache,
    set(key, value, ttlMs = defaultTtlMs) {
      cache.set(key, value);
      expiries.set(key, Date.now() + ttlMs);
    },
    get(key) {
      const expiresAt = expiries.get(key);
      if (expiresAt !== undefined && Date.now() > expiresAt) {
        cache.delete(key);
        expiries.delete(key);
        return undefined;
      }
      return cache.get(key);
    },
  };
}