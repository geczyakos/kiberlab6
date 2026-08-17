export function namespaced(cache, namespace) {
  const prefix = `${namespace}:`;
  return {
    get: (key) => cache.get(prefix + key),
    set: (key, value) => cache.set(prefix + key, value),
    delete: (key) => cache.delete(prefix + key),
  };
}