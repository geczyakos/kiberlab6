export function createLRUCache(maxSize = 100) {
  const store = new Map();

  return {
    get(key) {
      if (!store.has(key)) return undefined;
      const value = store.get(key);
      store.delete(key);
      store.set(key, value);
      return value;
    },
    set(key, value) {
      if (store.has(key)) store.delete(key);
      store.set(key, value);
      if (store.size > maxSize) {
        const oldestKey = store.keys().next().value;
        store.delete(oldestKey);
      }
    },
  };
}