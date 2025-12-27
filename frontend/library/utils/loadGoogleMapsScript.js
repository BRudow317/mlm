/**
 * Loads the Google Maps JS script once per page (idempotent).
 * Returns:
 *  - true  => maps loaded and available
 *  - false => maps intentionally not loaded (dev mode / missing key / placeholder key)
 */
export function loadGoogleMapsScript({ apiKey, enabled = true }) {
  const SCRIPT_ID = "google-maps-js";

  // Treat these as "not a real key" for dev/prototyping.
  // Adjust to match your placeholders.
  const looksLikePlaceholderKey = (key) => {
    if (!key) return true;
    const k = String(key).trim();
    if (k.length < 20) return true; // real Google API keys are typically longer than this
    const lower = k.toLowerCase();
    return (
      lower.includes("devkey") ||
      lower.includes("your_") ||
      lower.includes("placeholder") ||
      lower.includes("example")
    );
  };

  return new Promise((resolve, reject) => {
    // Already loaded
    if (window.google?.maps) {
      resolve(true);
      return;
    }

    // Explicitly disabled or key is missing/placeholder -> no-op
    if (!enabled || looksLikePlaceholderKey(apiKey)) {
      resolve(false);
      return;
    }

    // Script tag already created
    const existing = document.getElementById(SCRIPT_ID);
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", (e) => reject(e));
      return;
    }

    // Create script tag
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      apiKey
    )}&libraries=places`;

    script.onload = () => resolve(true);
    script.onerror = (e) => reject(e);

    document.head.appendChild(script);
  });
}
