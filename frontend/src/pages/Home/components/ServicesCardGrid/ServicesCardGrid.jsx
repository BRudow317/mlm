import { useState, useCallback, useEffect } from "react";
import { ServicesCardGridStyles} from "./ServicesCardGridStyles.js";
import { ServiceCard } from "./ServiceCard";
import { DEFAULT_SERVICES } from "../../../../utils/Constants";

export function ServicesCardGrid({
  quoteSectionId = "get-quote",
  onSelectService,
  services = DEFAULT_SERVICES,
  heading = "Services",
}) {

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 640px)");
    const handler = (e) => setIsSmallScreen(e.matches);
    handler(mql);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Retrieve styles for the current screen size
  const styles = ServicesCardGridStyles(isSmallScreen);

  // Hover state (inline-style friendly alternative to :hover in CSS)
  const [hoveredId, setHoveredId] = useState(null);

  /**
   * Smooth-scroll to the quote section and optionally pre-select a service.
   * We keep an href for accessibility and fallback, but intercept for smooth scrolling.
   */
  const handleActivate = useCallback(
    (service, e) => {
      // Allow normal behavior if JavaScript is disabled; with JS enabled we smooth-scroll.
      e.preventDefault();

      console.log("Service card clicked:", service.title);

      // Tell the quote form what service was clicked (optional).
      if (typeof onSelectService === "function") {
        onSelectService(service.title);
      }

      // Smooth-scroll to the quote section if it exists.
      const target = document.getElementById(quoteSectionId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        // Update URL hash without jumping (nice for shareable links).
        window.history.replaceState(null, "", `#${quoteSectionId}`);
      } else {
        // Fallback: update hash (may jump if the element appears later)
        window.location.hash = quoteSectionId;
      }
    },
    [onSelectService, quoteSectionId]
  );

  return (
    <section style={styles.section} aria-label={heading}>
      <div style={styles.headerRow}>
        <h2 style={styles.heading}>{heading}</h2>
        <p style={styles.subheading}>
          Tap a service to jump to the quote form.
        </p>
      </div>

      <div style={styles.grid} role="list">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            href={`#${quoteSectionId}`}
            isHovered={hoveredId === service.id}
            isSmallScreen={isSmallScreen}
            onMouseEnter={() => setHoveredId(service.id)}
            onMouseLeave={() => setHoveredId(null)}
            onActivate={(e) => handleActivate(service, e)}
          />
        ))}
      </div>
    </section>
  );
}
