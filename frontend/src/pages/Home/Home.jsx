import React, { useState, useEffect } from "react";
import { ServicesCardGrid } from "./components/ServicesCardGrid/ServicesCardGrid";
import { 
  //AddressAutocomplete, 
  AddressAutocompleteExample
} from "./components/AddressAutocomplete/AddressAutocomplete.example";
import { HomeServicesCardGrid } from "./components/ServicesCardGrid/HomeServicesCard.jsx";
import {
  //CarouselCard,
  // CarouselCardDemo,
  HomeCarouselCard
} from "./components/CarouselCard/HomeCarouselCard";
//import { CustomerFormExample } from "./components/CustomerForm/CustomerForm.example.jsx";
import { MasterContactForm } from "./components/MasterContactForm/MasterContactForm.jsx";





export default function Home() {
  const [selectedService, setSelectedService] = useState("");
  return (
  <>
    <HomeCarouselCard />
    <div
      style={{
        backgroundColor: "transparent",
        backdropFilter: "none",
        WebkitBackdropFilter: "none",
        border: "none",
        boxShadow: "none",
        marginTop: "24px",
        marginInline: "0",
        padding: "0",
        width: "100%",
        maxWidth: "100%",
        borderRadius: "0",
      }}
    >
          <HomeServicesCardGrid
            quoteSectionId="get-quote"
            onSelectService={(serviceTitle) => setSelectedService(serviceTitle)}
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <iframe
              title="Facebook field update"
              src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F837399041969401%2F&show_text=false&width=267&t=0"
              width="100%"
              height="476"
              style={{
                border: "none",
                overflow: "hidden",
                borderRadius: "1rem",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.45)",
                maxWidth: "420px",
              }}
              scrolling="no"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <MasterContactForm 
            serviceType={selectedService}
            mergeTop
          />
          
        </div>
    <div>
      
    </div>
  </>
  );
}
