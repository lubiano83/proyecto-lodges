import { Carousel } from "flowbite-react";

export function FB_Carousel({ images }: { images: string[] }) {
  return (
    <div className="w-full max-w-6xl aspect-video shadow-sm shadow-gray-700 overflow-hidden rounded-2xl">
      <Carousel slideInterval={3000}>
        <img
          className="w-full h-full object-cover"
          src={images[4]}
          alt="..."
        />
        <img
          className="w-full h-full object-cover"
          src={images[3]}
          alt="..."
        />
        <img
          className="w-full h-full object-cover"
          src={images[2]}
          alt="..."
        />
        <img
          className="w-full h-full object-cover"
          src={images[1]}
          alt="..."
        />
        <img
          className="w-full h-full object-cover"
          src={images[0]}
          alt="..."
        />
      </Carousel>
    </div>
  );
}
