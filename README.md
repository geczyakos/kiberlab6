# cache-toolkit

A small, dependency-light in-memory caching library for Node.js:
TTL expiration, LRU eviction, memoization, namespacing, and more.

## Installation

​```
npm install cache-toolkit
​```

## Utilities

- `createCache` – basic get/set/delete in-memory cache
- `withTTL` – adds time-to-live expiration to a cache
- `createLRUCache` – a cache with least-recently-used eviction
- `withStats` – tracks hit/miss statistics for a cache
- `memoize` – memoizes an expensive function
- `namespaced` – prefixes cache keys with a namespace
- `warmCache` – pre-populates a cache from async loaders
- `batchGet` / `batchSet` – batched cache operations
- `scopeToTenant` – scopes cache keys to a tenant
- `clearCache` – removes a list of keys from a cache
- `withEvents` – emits events on cache set/delete
- `withSizeLimit` – caps the number of entries in a cache

## Usage

​```js
import { createCache, withTTL } from 'cache-toolkit';

const cache = withTTL(createCache(), 30000);
cache.set('user:42', { name: 'Ada' });
cache.get('user:42'); // { name: 'Ada' } until it expires
​```

## License

MIT