import { apiClient } from "./apiClient";
import { buildCacheKey, cacheGet, cacheSet } from "./cache";

/**
 * Normalizes Axios errors into a consistent shape for the app.
 */
function normalizeAxiosError(err) {
  const status = err?.response?.status ?? null;
  const data = err?.response?.data ?? null;

  return {
    status,
    message:
      data?.message ||
      err?.message ||
      "Request failed",
    data,
    isNetworkError: !err?.response,
  };
}

/**
 * http.get(url, { params, cache: { ttlMs, revalidateWithEtag } })
 */
async function get(url, options = {}) {
  const { params, headers, cache } = options;

  // Optional caching behavior for GET
  const cacheEnabled = Boolean(cache?.ttlMs);
  const ttlMs = cache?.ttlMs ?? 0;
  const revalidateWithEtag = Boolean(cache?.revalidateWithEtag);

  let cacheKey;
  let cached;

  if (cacheEnabled) {
    cacheKey = buildCacheKey({ url, params });
    cached = cacheGet(cacheKey);

    // If we have fresh cached data and no revalidation requested, return it immediately
    if (cached && !revalidateWithEtag) {
      return cached.data;
    }
  }

  try {
    const requestHeaders = { ...(headers || {}) };

    // If revalidating and we have an ETag, ask server if it changed
    if (revalidateWithEtag && cached?.etag) {
      requestHeaders["If-None-Match"] = cached.etag;
    }

    const res = await apiClient.get(url, { params, headers: requestHeaders });

    // Cache success response if enabled
    if (cacheEnabled) {
      const etag = res.headers?.etag;
      cacheSet(cacheKey, res.data, ttlMs, etag);
    }

    return res.data;
  } catch (err) {
    // If server says "Not Modified" and we have cache, serve it
    if (err?.response?.status === 304 && cached) {
      return cached.data;
    }

    throw normalizeAxiosError(err);
  }
}

async function post(url, body, options = {}) {
  try {
    const res = await apiClient.post(url, body, options);
    return res.data;
  } catch (err) {
    throw normalizeAxiosError(err);
  }
}

async function put(url, body, options = {}) {
  try {
    const res = await apiClient.put(url, body, options);
    return res.data;
  } catch (err) {
    throw normalizeAxiosError(err);
  }
}

async function del(url, options = {}) {
  try {
    const res = await apiClient.delete(url, options);
    return res.data;
  } catch (err) {
    throw normalizeAxiosError(err);
  }
}

export const http = { get, post, put, delete: del };
