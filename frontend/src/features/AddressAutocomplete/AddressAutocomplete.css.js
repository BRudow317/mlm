

/**
 * Object-based styles (theme-aware).
 * NOTE: Any state-driven variants (focus/active) are handled via args.
 */
export function AddressAutocompleteStyles({ isFocused }) {

  return {
    container: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      maxWidth: "800px",
      margin: "2rem auto",
      padding: "2rem",
      backgroundColor: "var(--GlassyBackground)",
      borderRadius: "14px",
      border: `1px solid var(--GlassyBorder)`,
    },

    title: {
      fontSize: "1.5rem",
      fontWeight: 700,
      margin: "0 0 0.75rem 0",
      color: "var(--GlobalTextColor)",
    },

    instructions: {
      fontSize: "0.875rem",
      color: "var(--GlobalTextColor)",
      margin: "0 0 1rem 0",
    },

    inputWrapper: {
      position: "relative",
      marginBottom: "1rem",
    },

    inputContainer: {
      position: "relative",
    },

    searchIcon: {
      position: "absolute",
      left: "1rem",
      top: "50%",
      transform: "translateY(-50%)",
      color: "var(--GlobalTextColor)",
    },

    input: {
      width: "100%",
      padding: "0.875rem 1rem 0.875rem 3rem",
      border: `2px solid ${isFocused ? "var(--mlmLightGreen)" : "var(--GlassyBorder)"}`,
      borderRadius: "10px",
      fontSize: "1rem",
      outline: "none",
      transition: "border-color 0.2s",
      boxSizing: "border-box",
      backgroundColor: "var(--GlassyBackground)",
      color: "var(--GlobalTextColor)",
    },

    suggestionsContainer: {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      backgroundColor: "var(--GlassyBackground)",
      border: `2px solid var(--GlassyBorder)`,
      borderTop: "none",
      borderRadius: "0 0 10px 10px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
      zIndex: 10,
      maxHeight: "240px",
      overflowY: "auto",
    },

    getSuggestionStyle: ({ isActive }) => ({
      padding: "1rem",
      cursor: "pointer",
      display: "flex",
      alignItems: "flex-start",
      gap: "0.75rem",
      borderBottom: `1px solid var(--GlassyBorder)`,
      backgroundColor: isActive
        ? "var(--mlmLightGreen)"
        : "transparent",
      transition: "background-color 0.15s",
    }),

    suggestionIcon: {
      marginTop: "0.25rem",
      flexShrink: 0,
      color: "var(--mlmOrange)",
    },

    suggestionText: {
      fontSize: "0.9375rem",
      color: "var(--GlobalTextColor)",
      flex: 1,
    },

    loadingText: {
      padding: "1rem",
      textAlign: "center",
      color: "var(--GlobalTextColor)",
      fontSize: "0.875rem",
    },

    mapContainer: {
      width: "100%",
      height: "400px",
      borderRadius: "10px",
      overflow: "hidden",
      border: `2px solid var(--GlassyBorder)`,
      marginTop: "1rem",
    },

    map: {
      width: "100%",
      height: "100%",
    },
  };
}
