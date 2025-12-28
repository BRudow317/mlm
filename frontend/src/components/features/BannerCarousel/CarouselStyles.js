// import { GlobalCSS } from "../../../../";

/**
 * Pure style factory (NO hooks here).
 * All sizing is dynamic (100%) to fill the parent container.
 */
export const CarouselStyles = () => {
  return {
    // Main container - fills parent with flex: 1; aspect enforced at card level
    carouselContainer: {
      position: "relative",
      display: "flex",
      flex: 1,
      width: "100%",
      height: "100%",
      alignItems: "stretch",
    },

    /**
     * Card container - clips overflow to hide off-screen slides
     * Fills parent container with flex: 1
     */
    cardContainer: () => ({
      position: "relative",
      overflow: "hidden",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      backgroundColor: "var(--GlassyBackground)",
      width: "100%",
      height: "auto",
      aspectRatio: "16 / 9",
      maxHeight: "80vh",
      flex: 1,
    }),

    /**
     * Slides wrapper - translate based on currentIndex
     * Width must accommodate all slides horizontally
     * Height stretches to fill card
     */
    slidesWrapper: ({ currentIndex, items }) => {
      const slidePercentage = items?.length ? (currentIndex / items.length) * 100 : 0;
      return {
        display: "flex",
        transition: "transform 0.5s ease-in-out",
        width: items?.length ? `${items.length * 100}%` : "100%",
        height: "100%",
        transform: `translateX(-${slidePercentage}%)`,
      };
    },

    // Individual slide container - takes 1/n of wrapper width
    slide: ({ items }) => {
      const slideWidth = items?.length ? `calc(100% / ${items.length})` : "100%";
      return {
        flexShrink: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "var(--GlassyBackground)",
        width: slideWidth,
        height: "100%",
      };
    },

    // Media element (image/video) - stretches to fill slide
    media: {
      width: "100%",
      height: "100%",
      objectFit: "cover", // stretch to fill the available space
      display: "block",
    },

    // Placeholder for loading media
    placeholder: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "var(--GlobalTextColor)",
      fontSize: "18px",
    },

    // Base styles for navigation buttons
    navButton: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      backgroundColor: "var(--GlassyBackground)",
      color: "var(--GlobalTextColor)",
      border: "1px solid rgba(255, 255, 255, 0.12)",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      fontSize: "24px",
      cursor: "pointer",
      zIndex: 10,
      transition: "background-color 0.3s",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      userSelect: "none",
    },

    // Previous button position
    prevButton: {
      left: "10px",
    },

    // Next button position
    nextButton: {
      right: "10px",
    },

    // Container for dot indicators
    indicators: {
      position: "absolute",
      bottom: "15px",
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      gap: "8px",
      zIndex: 10,
    },

    // Individual dot indicator
    dot: {
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      border: "none",
      backgroundColor: "var(--GlobalTextColor)",
      cursor: "pointer",
      transition: "background-color 0.3s",
      padding: 0,
    },

    // Active dot indicator
    dotActive: {
      backgroundColor: "var(--GlobalTextColor)",
    },

    // Empty state message
    emptyState: {
      padding: "40px",
      textAlign: "center",
      color: "var(--GlobalTextColor)",
      fontSize: "18px",
    },
  };
};
