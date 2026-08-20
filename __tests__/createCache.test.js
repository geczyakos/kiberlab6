import { createCache } from '../src/createCache';

test('stores and retrieves values', () => {
  const cache = createCache();
  cache.set('a', 1);
  expect(cache.get('a')).toBe(1);
  expect(cache.get('missing')).toBeUndefined();
});

test('deletes values', () => {
  const cache = createCache();
  cache.set('a', 1);
  cache.delete('a');
  expect(cache.has('a')).toBe(false);
});