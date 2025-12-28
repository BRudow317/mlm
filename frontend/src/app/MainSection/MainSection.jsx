import React from "react";
import styles from "./MainSectionStyles.module.css";

const MainSection = ({
  heading,
  subtitle,
  headerAction,
  children,
  className = "",
  ...sectionProps
}) => (
  <section
    className={`${styles.mainSection} ${className}`.trim()}
    {...sectionProps}
  >
    {(heading || subtitle || headerAction) && (
      <header className={styles.mainSectionHeader}>
        <div className={styles.mainSectionTitleGroup}>
          {heading && <h1 className={styles.mainSectionTitle}>{heading}</h1>}
          {subtitle && (
            <p className={styles.mainSectionSubtitle}>{subtitle}</p>
          )}
        </div>
        {headerAction && (
          <div className={styles.mainSectionAction}>{headerAction}</div>
        )}
      </header>
    )}

    <div className={styles.mainSectionBody}>{children}</div>
  </section>
);

export default MainSection;
