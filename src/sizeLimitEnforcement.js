export function withSizeLimit(cache, maxEntries = 1000) {
  let count = 0;
  return {
    ...cache,
    set(key, value) {
      if (!cache.has(key)) count += 1;
      if (count > maxEntries) {
        throw new Error('Cache size limit exceeded');
      }
      cache.set(key, value);
    },
  };
}