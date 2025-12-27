// Barrel exports for API module
// Central export point for all API clients, utilities, endpoints, and services

// Axios utilities and client
export { apiClient } from "./axios/apiClient";
export {
  cacheGet,
  cacheSet,
  cacheDelete,
  cacheClear,
  buildCacheKey,
} from "./axios/cache";
export { http } from "./axios/http";

// Endpoint definitions
export {
  NAV_ITEMS,
  ROUTES,
  CUSTOMER_API_ENDPOINTS,
  AUTH_ENDPOINTS
} from "./endpoints/endpoints";

// Security/Auth services
export { authAPI } from "./security/auth.api";

// Business services
export { quoteAPI } from "./service/quote.api";
