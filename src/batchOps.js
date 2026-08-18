export function batchGet(cache, keys) {
  return keys.map((key) => cache.get(key));
}

export function batchSet(cache, entries) {
  entries.forEach(({ key, value }) => cache.set(key, value));
}