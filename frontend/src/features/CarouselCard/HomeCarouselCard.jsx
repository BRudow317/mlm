import { useCallback, useState, useEffect, useMemo, useRef } from "react";
import { useTheme } from "../../../../theme/ThemeContext";
import { CarouselStyles } from "./CarouselStyles";
import * as CMI from "../../../../assets/CarouselMedia";
/**
 * Demo implementation showing how to use the component
 */
export const HomeCarouselCard = () => {
  // Example media items array
  const mediaItems = [
    {
      type: 'image',
      src: CMI.AfterYard,
      alt: 'Finished yard after repair',
    },
    {
      type: 'image',
      src: CMI.ClawDroppingDirt,
      alt: 'Excavator placing soil backfill',
    },
    {
      type: 'image',
      src: CMI.MlmBeforeAfter,
      alt: 'Foundation repair before and after',
    },
    {
      type: 'image',
      src: CMI.MlmMandRalphie,
      alt: 'Crew posing with Ralphie',
    },
    {
      type: 'image',
      src: CMI.MlmYardPipe,
      alt: 'Yard drain pipe installation',
    },
    {
      type: 'image',
      src: CMI.MlmYardPipeAfter,
      alt: 'Restored yard after pipe install',
    },
    {
      type: 'iframe',
      src: 'https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1438938453892064%2F&show_text=false&width=320&t=0&autoplay=1&mute=1&loop=1&playsinline=1',
      alt: 'Facebook highlight video',
      title: 'MLM Facebook Feature',
    },
    {
      type: 'iframe',
      src: 'https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F837399041969401%2F&show_text=false&width=267&t=0&autoplay=1&mute=1&loop=1&playsinline=1',
      alt: 'Facebook field update video',
      title: 'MLM Facebook Update',
    },
  ];

  return (
      <CarouselCard 
        items={mediaItems} 
        cardWidth={"100%"} 
        cardHeight={"100%"}
        autoPlay={true}
        autoPlayInterval={20000}
      /> 
  );
};
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
  const { theme } = useTheme();

  const initialHighlightIndex = items.findIndex(
    (item) => item.title === "MLM Facebook Update"
  );

  // State management for current slide index
  const [currentIndex, setCurrentIndex] = useState(
    initialHighlightIndex >= 0 ? initialHighlightIndex : 0
  );

  /**
   * Create styles once per render (memoized per theme).
   * Avoids creating a new styles object for every style usage.
   */
  const styles = useMemo(() => CarouselStyles({ theme }), [theme]);

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
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  /**
   * Navigation handler - moves to previous slide
   */
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  /**
   * Navigation handler - jumps to specific slide
   */
  // const goToSlide = (index) => {
  //   setCurrentIndex(index);
  // };

  /**
   * Auto-play effect
   * Note: It’s generally better to NOT depend on currentIndex to avoid interval reset every tick.
   */
  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, items.length, goToNext
  ]); // intentional: no currentIndex

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
