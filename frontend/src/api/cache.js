/**
 * Lightweight cache for GET requests.
 * - TTL-based
 * - optional ETag revalidation support (If-None-Match / 304)
 *
 * NOTE:
 * This is intentionally minimal. For “real” app caching + dedupe + retries,
 * consider RTK Query or TanStack Query later.
 */

const cacheStore = new Map();

/**
 * @param {string} key
 * @returns {{ expiresAt: number, data: any, etag?: string } | null}
 */
export function cacheGet(key) {
  const entry = cacheStore.get(key);
  if (!entry) return null;

  if (Date.now() > entry.expiresAt) {
    cacheStore.delete(key);
    return null;
  }

  return entry;
}

/**
 * @param {string} key
 * @param {any} data
 * @param {number} ttlMs
 * @param {string | undefined} etag
 */
export function cacheSet(key, data, ttlMs, etag) {
  cacheStore.set(key, {
    data,
    etag,
    expiresAt: Date.now() + ttlMs,
  });
}

export function cacheDelete(key) {
  cacheStore.delete(key);
}

export function cacheClear() {
  cacheStore.clear();
}

/**
 * Stable cache key generator for GET requests.
 * You can customize to include headers if needed.
 */
export function buildCacheKey({ url, params }) {
  const paramsString = params ? JSON.stringify(sortObject(params)) : "";
  return `${url}::${paramsString}`;
}

function sortObject(obj) {
  if (!obj || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(sortObject);

  return Object.keys(obj)
    .sort()
    .reduce((acc, k) => {
      acc[k] = sortObject(obj[k]);
      return acc;
    }, {});
}
