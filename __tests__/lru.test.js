import { createLRUCache } from '../src/lru';

test('evicts the least recently used entry once over capacity', () => {
  const cache = createLRUCache(2);
  cache.set('a', 1);
  cache.set('b', 2);
  cache.get('a');
  cache.set('c', 3);

  expect(cache.get('b')).toBeUndefined();
  expect(cache.get('a')).toBe(1);
  expect(cache.get('c')).toBe(3);
});