// CustomerForm.css.js
//import { GlobalCSS } from "../../layouts/GlobalCSS";

/**
 * CustomerForm.css.js
 * Theme-aware object styles.
 * NO hooks here — pass theme in from parent/component props.
 */
export const CustomerFormStyles = () => {
  // const isDark = theme === "dark";

  

  // Use your “glass” object if present; otherwise use a safe fallback.
  

  

  return {
    container: {
      maxWidth: "900px",
      margin: "0 auto",
      padding: "20px",
      borderRadius: "16px",
      backgroundColor: "var(--GlassyBackgroundDarker)",
      border: `1px solid var(--mlmGray)`,
      boxShadow: "25px 25px 50px -12px rgba(3, 54, 14, 0.5)",
      boxSizing: "border-box",
    },

    header: { marginBottom: "16px" },

    title: {
      margin: "0 0 8px 0",
      fontSize: "24px",
      lineHeight: "30px",
      color: "var(--GlobalTextColor)",
    },

    subtitle: {
      margin: 0,
      fontSize: "14px",
      lineHeight: "20px",
      color: "var(--GlobalTextColor)",
    },

    form: {
      display: "flex",
      flexDirection: "column",
      gap: "14px",
    },

    honeypotWrap: {
      position: "absolute",
      left: "-10000px",
      top: "auto",
      width: "1px",
      height: "1px",
      overflow: "hidden",
    },

    /**
     * Grid remains in object styles; responsive behavior handled in module CSS via css.grid.
     */
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gap: "12px",
    },

    field: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      minWidth: 0,
    },

    fieldFull: {
      gridColumn: "1 / -1",
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      minWidth: 0,
    },

    label: {
      fontSize: "13px",
      color: "var(--GlobalTextColor)",
      fontWeight: 600,
    },

    requiredMark: {
      color: "var(--mlmOrange)",
    },

    input: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: "12px",
      border: `1px solid var(--mlmGray)`,
      backgroundColor: "var(--GlobalBackground)",
      color: "var(--GlobalTextColor)",
      boxSizing: "border-box",
      fontSize: "14px",
    },

    select: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: "12px",
      border: `1px solid var(--mlmGray)`,
      backgroundColor: "var(--GlobalBackground)",
      color: "var(--GlobalTextColor)",
      boxSizing: "border-box",
      fontSize: "14px",
      appearance: "auto",
    },

    textarea: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: "12px",
      border: `1px solid var(--mlmGray)`,
      backgroundColor: "var(--GlobalBackground)",
      color: "var(--GlobalTextColor)",
      boxSizing: "border-box",
      fontSize: "14px",
      resize: "vertical",
    },

    helperText: {
      fontSize: "12px",
      color: textMuted,
      lineHeight: "16px",
    },

    errorText: {
      fontSize: "12px",
      color: isDark ? "rgba(255, 150, 150, 0.95)" : "rgba(180, 0, 0, 0.90)",
      lineHeight: "16px",
    },

    successText: {
      fontSize: "12px",
      color: isDark ? "rgba(120, 255, 180, 0.95)" : "rgba(0, 120, 60, 0.90)",
      lineHeight: "16px",
    },

    actions: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      flexWrap: "wrap",
      marginTop: "6px",
    },

    button: {
      padding: "10px 14px",
      borderRadius: "12px",
      border: "1px solid var(--mlmGray)",
      backgroundColor: "var(--NavyBlue)",
      color: "var(--mlmWhite)",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: "14px",
    },
  };
};
