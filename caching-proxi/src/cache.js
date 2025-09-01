import { LRUCache } from 'lru-cache';

const options = {
    max: 500, // Maximum number of items in cache
    ttl: 1000 * 60 * 60, // Time to live in milliseconds
}

const cache = new LRUCache(options);

export function getCache(key) {
  return cache.get(key);
}

export function setCache(key, value) {
  cache.set(key, value);
}

export function clearCache() {
  cache.clear();
}