import React, { useRef, useState } from 'react';
import { DEFAULT_SERVICES } from '../../utils/Constants';
import PageSection from '../../components/PageSection/PageSection';
import styles from './Services.module.css';

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState(null);
  const contentSectionRef = useRef(null);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    if (contentSectionRef.current) {
      contentSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <PageSection
      heading="Our Services"
      subtitle="Select a service and explore the work Miller Land Management delivers."
    >
      <div className={styles.contentWrapper}>
        {/* Service Buttons Sidebar */}
        <div className={styles.servicesSidebar}>
          {DEFAULT_SERVICES.map((service) => {
            const Icon = service.Icon;
            return (
              <button
                key={service.id}
                onClick={() => handleServiceClick(service)}
                className={`${styles.serviceButton} ${
                  selectedService?.id === service.id ? styles.active : ''
                }`}
              >
                <div className={styles.buttonIconWrap}>
                  {Icon && <Icon className={styles.buttonIcon} />}
                  <span className={styles.buttonOverlay}>{service.title}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Content Display Area */}
        <div className={styles.contentArea} ref={contentSectionRef}>
          {selectedService ? (
            <div className={styles.serviceContent}>
              <div className={styles.contentHeader}>
                {selectedService.Icon && (
                  <selectedService.Icon size={32} className={styles.contentIcon} />
                )}
                <h2 className={styles.contentTitle}>{selectedService.title}</h2>
              </div>
              <div className={styles.contentBody}>
                <p className={styles.placeholder}>
                  Detailed information about {selectedService.title} will go here.
                </p>
                <p className={styles.placeholder}>
                  This is a wiki-style content area where you can add comprehensive details,
                  images, pricing, and other relevant information about this service.
                </p>
              </div>
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>Select a service from the list to view details</p>
            </div>
          )}
        </div>
      </div>
    </PageSection>
  );
};

export default ServicesPage;
