import { CarouselCard } from "../"
import * as CMI from "../../assets/CarouselMedia";
/**
 * Demo implementation showing how to use the component
 */
export const BannerCarousel = () => {
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
      alt: 'Before and After',
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
        // cardWidth={"100%"} 
        // cardHeight={"100%"}
        autoPlay={true}
        autoPlayInterval={1000}
      /> 
  );
};

