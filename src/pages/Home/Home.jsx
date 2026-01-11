/**
 * Home Page Component
 * 
 * 
 */


// import { useState, useRef } from "react";
// import { SERVICE_OFFERINGS, DEFAULT_SERVICES } from "./Constants";
import {FooterSection} from './Features/FooterSection/FooterSection';
import {HeroSection} from './Features/HeroSection/HeroSection';
import { ServicesSection } from "./Features/ServicesSection/ServicesSection";
import { ContactForm } from "./Features/ContactForm/ContactForm";
// import { ContactFormFix1 } from "./components/ContactForm/ContactFormFix1";
// import { ContactFormFix2 } from "./components/ContactForm/ContactFormFix2";
// import { ContactFormFix3 } from "./components/ContactForm/ContactFormFix3";

// import * as HomeStyles from "./HomeStyles.module.css";


export { Home };

function Home() {

  return (
    <>
      <HeroSection />

      <ServicesSection />

      <ContactForm />

      {/* <ContactFormFix1 /> */}

      <FooterSection />
    </>
  );
}
