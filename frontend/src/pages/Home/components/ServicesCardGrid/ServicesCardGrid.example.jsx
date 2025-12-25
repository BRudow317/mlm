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
export function ServicesCardGridExample() {

  const [selectedService, setSelectedService] = useState("");

  return (
    <div
      style={{
        backgroundColor: "var(--GlobalBackground)",
      }}
    >
      <ServicesCardGrid
        quoteSectionId="get-quote"
        onSelectService={(serviceTitle) => setSelectedService(serviceTitle)}
      />

      {/* This is the section your cards link/scroll to. */}
      <section
        id="get-quote"
        style={{
          padding: "24px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
        aria-label="Get a Quote"
      >
        <h2
          style={{
            margin: "0 0 10px 0",
            color: "var(--GlobalTextColor)",
          }}
        >
          Get a Quote
        </h2>

        <div
          style={{
            borderRadius: "16px",
            padding: "16px",
            border: "var(--GlassyBorder)",
            backgroundColor: "var(--GlassyBackground)",
          }}
        >
          <div style={{ marginBottom: "12px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                marginBottom: "6px",
                color: "var(--GlobalTextColor)",
              }}
            >
              Selected Service
            </label>
            <input
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              placeholder="Click a service card above..."
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "10px",
                border: "var(--GlassyBorder)",
                backgroundColor: "var(--GlassyBackground)",
                color: "var(--GlobalTextColor)",
                outline: "none",
              }}
            />
          </div>

          <p
            style={{
              margin: 0,
              fontSize: "13px",
              lineHeight: "18px",
              color: "var(--GlobalTextColor)",
            }}
          >
            Replace this demo with your real quote form section. The key is keeping the section id as
            <code style={{ marginLeft: "6px" }}>get-quote</code> (or pass a different quoteSectionId).
          </p>
        </div>
      </section>
    </div>
  );
}
