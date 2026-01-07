import React, { useMemo } from "react";
import { ServiceCardStyles } from "./ServiceCardStyles";

export function ServiceCard({ service, href, isHovered, isSmallScreen, onMouseEnter, onMouseLeave, onActivate }) {
  
  const baseBorder = "1px solid rgba(255,255,255,0.10)";

  const hoverBorder = "1px solid var(--mlmLightGreen)";

  const textSize = isSmallScreen ? "13px" : "15px";
  const lineHeight = isSmallScreen ? "16px" : "20px";
  const padding = isSmallScreen ? "10px" : "14px";
  const gap = isSmallScreen ? "8px" : "12px";
  const iconBox = isSmallScreen ? 38 : 46;
  const iconSize = isSmallScreen ? 18 : 22;


  const styles = useMemo( () => ServiceCardStyles({ 
    /**
     * Flex item sizing:
     * - grows to fill space
     * - wraps naturally
     * - minimum width keeps it "card-like" on desktop
     */
    card: {
      flex: isSmallScreen ? "1 1 calc(50% - 7px)" : "1 1 240px",
      minWidth: isSmallScreen ? "0" : "240px",
      maxWidth: isSmallScreen ? "none" : "540px",

      display: "flex",
      flexDirection: isSmallScreen ? "column" : "row",
      alignItems: "center",
      gap,

      padding,
      textDecoration: "none",
      borderRadius: "16px",
      border: isHovered ? hoverBorder : baseBorder,
      backgroundColor: "var(--GlassyBackground)",
      backdropFilter: "var(--BackBlur)",
      WebkitBackdropFilter: "var(--WebkitBackBlur)",
      boxShadow: "var(--GlassyBoxShadow)",
      boxShadow: isHovered
        ? "0 10px 26px rgba(0,0,0,0.18)"
        : "0 6px 18px rgba(0,0,0,0.12)",

      transform: isHovered ? "translateY(-2px)" : "translateY(0px)",
      transition: "transform 140ms ease, box-shadow 140ms ease, border 140ms ease",

      // Keyboard accessibility: browsers will show focus ring, but we avoid removing outlines.
      cursor: "pointer",
    },

    iconSvg: {
      color: "var(--mlmLightGreen)", // Lucide uses currentColor by default
    },

    iconWrap: {
      width: `${iconBox}px`,
      height: `${iconBox}px`,
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "var(--GlassyBackground)",
      border: "1px solid var(--mlmLightGreen)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.10)",
      flexShrink: 0,
    },

    iconSize,

    textWrap: {
      minWidth: 0, // allows text wrapping inside flex items
      textAlign: isSmallScreen ? "center" : "left",
    },

    title: {
      margin: 0,
      fontSize: textSize,
      lineHeight,
      color: "var(--GlobalTextColor)",
      wordBreak: "break-word",
    }
    
  }), [isHovered, isSmallScreen] );

  const Icon = service.Icon; // React component

  return (
    <a
      href={href}
      onClick={onActivate}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={styles.card}
      role="listitem"
      aria-label={`Get a quote for ${service.title}`}
    >
      <div style={styles.iconWrap} aria-hidden="true">
        {Icon ? <Icon size={styles.iconSize} style={styles.iconSvg} /> : null}
      </div>

      <div style={styles.textWrap}>
        <h3 style={styles.title}>{service.title}</h3>
      </div>
    </a>
  );
}
