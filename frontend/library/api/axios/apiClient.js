import axios from "axios";

/**
 * Central Axios instance.
 * - baseURL should point to your Spring Boot API host (or proxy via Vite).
 * - withCredentials true if you use session cookies (recommended).
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api", // e.g. "https://miller-land-management.com/api"
  timeout: 15000,
  withCredentials: true, // REQUIRED for cookie-based sessions across origins
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request interceptor:
 * - Attach correlation id for tracing
 * - Attach CSRF header if you’re using Spring Security CSRF tokens
 */
apiClient.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};

    // Correlation id for logs (optional)
    const correlationId = crypto?.randomUUID?.() || String(Date.now());
    config.headers["X-Correlation-Id"] = correlationId;

    // CSRF (only if you implement it on backend)
    // Example: store CSRF token in a meta tag or a cookie that JS can read (NOT HttpOnly).
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
    if (csrfToken) config.headers["X-CSRF-Token"] = csrfToken;

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor:
 * - Centralize auth/session failure handling
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    // Common pattern: backend returns 401 when session expires
    if (status === 401) {
      // You can dispatch a Redux logout here, or emit an event.
      // Keep it side-effect-light in this file unless you explicitly want it coupled.
      // Example:
      // window.dispatchEvent(new CustomEvent("auth:unauthorized"));
    }

    return Promise.reject(error);
  }
);
