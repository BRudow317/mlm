/**
 * @file getPageTitle.js
 * @description Utility function to derive a page title from an item object or the current URL path.
 * 
 * @param {Object} item - An optional object that may contain 'label' or 'name' properties.
 * @returns {string} - The derived page title.
 * 
 * @example
 * const title = getPageTitle({ label: "Dashboard" });
 * console.log(title); // Outputs: "Dashboard"
 * const titleFromUrl = getPageTitle();
 */

export { getPageTitle };

const getPageTitle = (item) => {
  if (item) {
    const name = item.label || item.name;
    if (name && typeof name === "string" && name.trim().length) return name;
  }
  if (typeof window !== "undefined" && window.location) {
    const segments = window.location.pathname.split("/").filter(Boolean);
    if (segments.length === 0) return "Home";
    const last = segments[segments.length - 1];
    const pretty = last
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return pretty;
  }
  return "Home";
};