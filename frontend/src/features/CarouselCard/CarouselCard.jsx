import { useState, useEffect, useMemo, useRef } from "react";
import { CarouselCardStyles as styles } from "./CarouselCardStyles";
/**
 * CarouselCard Component
 * A reusable carousel component that displays images and videos in card format
 *
 * Props:
 * @param {Array} items
 * @param {number} cardWidth 
 * @param {number} cardHeight 
 * @param {boolean} autoPlay 
 * @param {number} autoPlayInterval
 */
export const CarouselCard = ({
  items = [],
  // cardWidth = 400,
  // cardHeight = 300,
  autoPlay = true,
  autoPlayInterval = 3000,
}) => {
  const initialHighlightIndex = items.findIndex(
    (item) => item.title === "MLM Facebook Update"
  );

  // State management for current slide index
  const [currentIndex, setCurrentIndex] = useState(
    initialHighlightIndex >= 0 ? initialHighlightIndex : 0
  );

    // State for tracking loaded media to enable lazy loading
  const [loadedMedia, setLoadedMedia] = useState(new Set());

  // Ref for video elements to control playback
  const videoRefs = useRef({});
  const renderSlideContent = (item, index) => {
    if (item.type === "video") {
      return (
        <video
          ref={(el) => (videoRefs.current[index] = el)}
          src={item.src}
          style={styles.media}
          loop
          muted
          playsInline
        />
      );
    }

    if (item.type === "iframe") {
      return (
        <iframe
            title={item.title || `Slide ${index + 1}`}
            src={item.src}
            style={{ ...styles.media, border: "none" }}
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            data-autoplay="true"
          />
        );
      }

    return (
      <img
        src={item.src}
        alt={item.alt || `Slide ${index + 1}`}
        style={styles.media}
        loading="lazy"
      />
    );
  };

  /**
   * Navigation handler - moves to next slide
   */
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  /**
   * Navigation handler - moves to previous slide
   */
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  /**
   * Navigation handler - jumps to specific slide
   */
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  /**
   * Auto-play effect
   * Note: It’s generally better to NOT depend on currentIndex to avoid interval reset every tick.
   */
  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, items.length]); // intentional: no currentIndex

  /**
   * Lazy loading effect - loads current, previous, and next slides
   */
  useEffect(() => {
    if (items.length === 0) return;

    const indicesToLoad = [
      currentIndex,
      (currentIndex - 1 + items.length) % items.length,
      (currentIndex + 1) % items.length,
    ];

    setLoadedMedia((prev) => {
      const newSet = new Set(prev);
      indicesToLoad.forEach((idx) => newSet.add(idx));
      return newSet;
    });
  }, [currentIndex, items.length]);

  /**
   * Video playback control - pauses non-visible videos
   */
  useEffect(() => {
    Object.keys(videoRefs.current).forEach((key) => {
      const video = videoRefs.current[key];
      if (!video) return;

      if (parseInt(key, 10) === currentIndex) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [currentIndex]);

  // Return empty state if no items provided
  if (!items || items.length === 0) {
    return <div style={styles.emptyState}>No media to display</div>;
  }

  return (
    <div style={styles.carouselContainer}>
      {/* Main card container with overflow hidden for slide effect */}
      <div style={styles.cardContainer()}>
        {/* Slides wrapper - translates horizontally to show current slide */}
        <div style={styles.slidesWrapper({ currentIndex, items })}>
          {items.map((item, index) => (
        <div
          key={index}
          style={styles.slide({ items })}
        >
              {loadedMedia.has(index) ? (
                renderSlideContent(item, index)
              ) : (
                <div style={styles.placeholder}>Loading...</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation controls - only show if multiple items */}
      {items.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            style={{ ...styles.navButton, ...styles.prevButton }}
            aria-label="Previous slide"
          >
            ‹
          </button>

          <button
            onClick={goToNext}
            style={{ ...styles.navButton, ...styles.nextButton }}
            aria-label="Next slide"
          >
            ›
          </button>

        </>
      )}
    </div>
  );
};