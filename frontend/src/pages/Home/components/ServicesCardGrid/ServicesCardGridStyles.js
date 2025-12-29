
export function ServicesCardGridStyles(isSmallScreen) {

  return {
  grid: {
      // maxWidth: "1100px",
      margin: "0 auto",
      display: "grid",
      // gridTemplateColumns: {isSmallScreen} ? "1fr 1fr" : "repeat(auto-fill, minmax(240px, 1fr))",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "14px",
      alignItems: "stretch",
    },
    section: {
      padding: "0",
    },
    headerRow: {
      // maxWidth: "1100px",
      margin: "0 auto 16px auto",
    },
    heading: {
      margin: "0 0 6px 0",
      fontSize: "28px",
      lineHeight: "34px",
    },
    subheading: {
      margin: 0,
      fontSize: "14px",
      lineHeight: "20px",
    },
   };
}
