import { useState } from "react";
import { ServicesCardGrid } from "./components/ServicesCardGrid/ServicesCardGrid.jsx";
import { HomeCarouselCard } from "./components/CarouselCard/HomeCarouselCard";
import { MasterContactForm } from "./components/MasterContactForm/MasterContactForm.jsx";

export default function Home() {
  const [selectedService, setSelectedService] = useState("");
  return (
    <>
      <HomeCarouselCard />
      <ServicesCardGrid />
      <MasterContactForm serviceType={selectedService} mergeTop />
    </>
  );
}
