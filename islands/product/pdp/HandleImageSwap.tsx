// import { pdpSkuSelected, preSelectedSize } from "$sdk/global/signalStore.ts";
import { effect, Signal } from "@preact/signals";
import { SKU } from "site/sdk/types/global.ts";

export interface HandleImageSwapProps {
  skuSelected: Signal<SKU | null>;
}

const HandleImageSwap = ({ skuSelected }: HandleImageSwapProps) => {
  effect(() => {
    if (globalThis.document && skuSelected.value) {
      const mainImages = document.querySelectorAll(".pdp-main-img img");

      if (mainImages && mainImages.length > 0) {
        mainImages.forEach((image) => {
          const attr = image.getAttribute("data-sku-trigger");
          if (
            attr?.toLowerCase() &&
            skuSelected.value?.dimension.toLowerCase() === attr
          ) {
            image.classList.remove("z-0");
            image.classList.add("z-10");
          } else {
            image.classList.remove("z-10");
            image.classList.add("z-0");
          }
        });
      }
    }
  });
  return <></>;
};

export default HandleImageSwap;
