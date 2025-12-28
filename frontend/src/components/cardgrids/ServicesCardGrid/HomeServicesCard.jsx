import React, { useState } from "react";
import { ServicesCardGrid } from "./ServicesCardGrid";
//import { GlobalCSS } from "../../../../";

/**
 * Demo wiring:
 * - clicking a card scrolls to #get-quote
 * - we also pre-fill "Selected Service" in the quote section
 *
 * NOTE: This example assumes your app already provides the ThemeProvider
 * behind useTheme() (per your project setup).
 */
export function HomeServicesCardGrid() {

  const [selectedService, setSelectedService] = useState("");

  return (
    <div
      style={{
        background: "var(--mlmNavy)",
        color: "var(--GlobalTextColor)",
        border: "1px solid var(--mlmOrange)",
        borderBottom: "none",
        /* remove glow so the seam between sections doesn't show */
        boxShadow: "none",
        borderTopLeftRadius: "16px",
        borderTopRightRadius: "16px",
        borderBottomLeftRadius: "0",
        borderBottomRightRadius: "0",
        padding: "24px",
        boxSizing: "border-box",
        margin: "0",
      }}
    >
      <ServicesCardGrid
        quoteSectionId="get-quote"
        onSelectService={(serviceTitle) => setSelectedService(serviceTitle)}
      />
    </div>
  );
}
