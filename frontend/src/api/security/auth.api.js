import { http } from "../";

/**
 * If you’re using cookie-based sessions:
 * - login typically sets a session cookie
 * - logout invalidates session
 * - me returns current user/session info
 *
 * These endpoints are implemented in Spring Boot (controllers).
 */
export const authAPI = {
  /**
   * Returns session/user info (or 401 if not logged in).
   * Cache lightly to avoid spamming the server on route changes.
   */
  me: () =>
    http.get("/auth/me", {
      cache: { ttlMs: 30_000, revalidateWithEtag: true },
    }),

  login: (payload) => http.post("/auth/login", payload),

  logout: () => http.post("/auth/logout", {}), // or DELETE /auth/session, depending on your backend
};
