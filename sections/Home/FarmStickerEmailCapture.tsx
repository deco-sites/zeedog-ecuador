import { ImageWidget } from "apps/admin/widgets.ts";
import StickerArea from "site/islands/StickerArea.tsx";
import { useDevice } from "@deco/deco/hooks";
import Image from "apps/website/components/Image.tsx";
import FarmEmailCapture from "site/islands/emailCapture/FarmEmailCapture.tsx";
import FarmPromoBar from "site/islands/promobar/FarmPromoBar.tsx";

export interface Sticker {
  image: ImageWidget;
  mobile: { width: number; height: number };
  desktop: { width: number; height: number };
}

export interface StickerBackground {
  mobile: { image: ImageWidget; width: number; height: number };
  desktop: { image: ImageWidget; width: number; height: number };
}

export interface StickerBanner {
  stickersImages: Sticker[];
  background: StickerBackground;
}

export default function FarmStickerEmailCapture(
  { stickersImages, background }: StickerBanner,
) {
  const device = useDevice() === "mobile" ? "mobile" : "desktop";
  const headerHeight = device === "mobile"
    ? "h-[calc(100dvh_-_142px)]"
    : "h-[calc(100dvh_-_152px)]";
  return (
    <section
      class={`relative flex items-center justify-center w-full ${headerHeight}`}
      style={{ maxHeight: background[device].height }}
    >
      <FarmPromoBar device={device} />
      <Image
        class="absolute object-cover w-full h-full max-container z-0"
        src={background[device].image}
        width={background[device].width}
        height={background[device].height}
      />
      {stickersImages && stickersImages.length > 0 && (
        <div class="relative flex justify-center w-full h-full max-container overflow-hidden">
          <StickerArea
            stickersImages={stickersImages}
            device={device}
          />
          <p class="absolute left-0 bottom-4 lg:bottom-6 font-body-2xs-regular px-2.5 py-1 bg-white bg-opacity-80 rounded-r z-30">
            *Ao enviar, você concorda em receber<br class="md:hidden" />{" "}
            novidades e promoções da Zee.Dog
          </p>
        </div>
      )}
      <div class="absolute flex flex-col items-center justify-center gap-y-4 max-lg:w-full max-md:px-8 z-30">
        <FarmEmailCapture device={device} />
      </div>
    </section>
  );
}
