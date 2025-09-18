import Image from "apps/website/components/Image.tsx";
import { Device } from "@deco/deco/utils";
import { CarouselControls } from "$islands/CarouselControls.tsx";

export interface ProductLifestyleImagesProps {
  images: string[];
  productName: string;
  device: Device;
  viewMoreText: string;
}

export default function ProductLifestyleImages(
  { images, productName, device, viewMoreText }: ProductLifestyleImagesProps,
) {
  const aspectRatioValue = device === "desktop" ? "1920/650" : "1/1";
  const size = device === "desktop"
    ? { width: 1440, height: 487 }
    : { width: 300, height: 300 };
  const carouselSelector = "lifestyle-carousel";

  // se for desktop, pega as imagens pares, se for mobile, pega as ímpares
  const indexByDevice = device === "desktop" ? 0 : 1;
  const filteredImages = images.filter((_, index) =>
    indexByDevice === index % 2
  );

  return filteredImages.length > 0
    ? (
      <section
        class="relative flex items-center justify-center max-w-full overflow-hidden"
        style={{ aspectRatio: aspectRatioValue }}
      >
        <div
          class={`${carouselSelector} relative flex flex-nowrap order-1 w-full h-full transition-all ease-out duration-500`}
        >
          {filteredImages.map((image) => (
            <Image
              width={size.width}
              height={size.height}
              class="snap-start w-full h-full object-cover"
              src={image}
              alt={`${productName} | Lifestyle Images`}
            />
          ))}
        </div>
        {filteredImages.length > 1 && (
          <CarouselControls
            carouselSelector={carouselSelector}
            totalItems={filteredImages.length}
            itemsPerSlide={1}
            hasBullets={true}
            viewMoreText={viewMoreText}
          />
        )}
      </section>
    )
    : <></>;
}
