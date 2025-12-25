import React from "react";
import styles from "./PageSection.module.css";

const PageSection = ({
  heading,
  subtitle,
  headerAction,
  children,
  className = "",
  ...sectionProps
}) => (
  <section
    className={`${styles.pageSection} ${className}`.trim()}
    {...sectionProps}
  >
    {(heading || subtitle || headerAction) && (
      <header className={styles.pageSectionHeader}>
        <div className={styles.pageSectionTitleGroup}>
          {heading && <h1 className={styles.pageSectionTitle}>{heading}</h1>}
          {subtitle && (
            <p className={styles.pageSectionSubtitle}>{subtitle}</p>
          )}
        </div>
        {headerAction && (
          <div className={styles.pageSectionAction}>{headerAction}</div>
        )}
      </header>
    )}

    <div className={styles.pageSectionBody}>{children}</div>
  </section>
);

export default PageSection;
