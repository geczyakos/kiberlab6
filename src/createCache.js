export function createCache() {
  const store = new Map();

  return {
    get(key) {
      return store.has(key) ? store.get(key).value : undefined;
    },
    set(key, value) {
      store.set(key, { value });
    },
    delete(key) {
      return store.delete(key);
    },
    has(key) {
      return store.has(key);
    },
    size() {
      return store.size;
    },
  };
}