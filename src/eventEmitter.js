export function withEvents(cache) {
  const listeners = { set: [], delete: [] };

  return {
    ...cache,
    set(key, value) {
      cache.set(key, value);
      listeners.set.forEach((fn) => fn(key, value));
    },
    delete(key) {
      const result = cache.delete(key);
      listeners.delete.forEach((fn) => fn(key));
      return result;
    },
    on(event, fn) {
      if (listeners[event]) listeners[event].push(fn);
    },
  };
}