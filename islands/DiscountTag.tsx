import { type Signal } from "@preact/signals";
import { SKU } from "$sdk/types/global.ts";

export interface ProductCardtagsProps {
  currentSku: Signal<SKU>;
}

export default function DiscountTag(
  { currentSku }: ProductCardtagsProps,
) {
  return (
    currentSku.value.discount > 0
      ? (
        <span class="relative flex items-center h-5 px-1.5 rounded text-white font-body-3xs-regular-bold md:font-body-2xs-bold bg-red-300">
          {currentSku.value.discount}% OFF
        </span>
      )
      : <></>
  );
}
