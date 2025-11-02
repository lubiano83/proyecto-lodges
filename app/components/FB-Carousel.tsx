import { Carousel } from "flowbite-react";

export function FB_Carousel() {
  return (
    <div className="w-full max-w-6xl aspect-video shadow-sm shadow-gray-700 overflow-hidden rounded-2xl">
      <Carousel slideInterval={3000}>
        <img className="w-full h-full object-cover" src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..."/>
        <img className="w-full h-full object-cover" src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..."/>
        <img className="w-full h-full object-cover" src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..."/>
        <img className="w-full h-full object-cover" src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..."/>
        <img className="w-full h-full object-cover" src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..."/>
      </Carousel>
    </div>
  );
}
