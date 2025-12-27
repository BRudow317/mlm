import { http } from "../";

/**
 * Example DTO:
 * {
 *   name, phone, email,
 *   serviceType, address, lat, lng,
 *   notes
 * }
 */
export const quoteAPI = {
  submitQuote: (quoteRequest) => http.post("/quotes", quoteRequest),

  // Example: admin list with caching
  listQuotes: (params) =>
    http.get("/quotes", {
      params,
      cache: { ttlMs: 10_000, revalidateWithEtag: true },
    }),
};
