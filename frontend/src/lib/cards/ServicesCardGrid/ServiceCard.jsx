import React, { useMemo } from "react";
import { ServiceCardStyles } from "./ServiceCard.css";

export function ServiceCard({ service, href, isHovered, isSmallScreen, onMouseEnter, onMouseLeave, onActivate }) {
  const styles = useMemo(
    () => ServiceCardStyles({ isHovered, isSmallScreen }),
    [isHovered, isSmallScreen]
  );

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
