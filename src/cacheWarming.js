export async function warmCache(cache, entries) {
  await Promise.all(
    entries.map(async ({ key, loader }) => {
      const value = await loader();
      cache.set(key, value);
    })
  );
}