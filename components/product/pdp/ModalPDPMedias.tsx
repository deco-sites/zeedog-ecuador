import HandleClickedImageScroll from "$islands/product/pdp/HandleClickedImageScroll.tsx";
import HandleImageSwapModal from "$islands/product/pdp/HandleImageSwapModal.tsx";
import { ComposedImages } from "$components/product/pdp/ProductImages.tsx";
import { Device } from "@deco/deco/utils";
import { ImageObject } from "apps/commerce/types.ts";

export interface ModalProductImagesProps {
  mainImages: ImageObject[];
  productName: string;
  imageClickedIndex: number;
  device: Device;
}

export function ModalProductMedias(
  { mainImages, productName, imageClickedIndex, device }:
    ModalProductImagesProps,
) {
  return (
    <div class="relative flex flex-col items-center w-full h-[100dvh] lg:h-full">
      <HandleClickedImageScroll imageClickedIndex={imageClickedIndex} />
      <HandleImageSwapModal />
      <div class="flex items-center justify-center shrink-0 w-full h-14 bg-gray-100 lg:bg-white lg:border-b border-gray-200">
        <h3 class="font-body-xs-bold lg:font-title-sm-bold text-black">
          {productName}
        </h3>
      </div>
      <div
        id="modal-main-images"
        class="flex lg:flex-col items-center lg:items-start justify-start lg:gap-4 w-full h-full overflow-auto lg:p-8 bg-gray-100 snap-both snap-mandatory scroll-pt-8"
      >
        <ComposedImages
          mainImages={mainImages}
          mainVideo={[]}
          whereabout="modal"
        />
      </div>
      {device === "mobile" && (
        <ul class="absolute top-16 flex items-center gap-2 lg:hidden">
          <li
            id="modal-image-marker"
            class="absolute bg-black w-2 h-2 rounded-full transition-all"
          >
          </li>
          {mainImages.map(() => (
            <li class="flex items-center justify-center w-2 h-2">
              <span class="border border-black w-1.5 h-1.5 rounded-full">
              </span>
            </li>
          ))}
        </ul>
      )}
      {device === "desktop" && (
        <div class="group absolute bottom-6 flex items-start justify-center w-12 h-20 py-4 rounded-full border-2 border-gray-300">
          <span class="relative top-0 flex items-center w-px h-3.5 bg-gray-300 animation-mousewheel group-hover:animation-infinite transition-all">
            <span class="absolute bottom-0 w-px h-0 animation-mousewheel-arrow group-hover:animation-infinite bg-gray-300 origin-bottom -rotate-45 transition-all">
            </span>
            <span class="absolute bottom-0 w-px h-0 animation-mousewheel-arrow group-hover:animation-infinite bg-gray-300 origin-bottom rotate-45 transition-all">
            </span>
          </span>
        </div>
      )}
    </div>
  );
}
