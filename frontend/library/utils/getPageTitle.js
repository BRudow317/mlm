export const getPageTitle = (item) => {
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