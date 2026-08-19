export function clearCache(cache, keys) {
  keys.forEach((key) => cache.delete(key));
}