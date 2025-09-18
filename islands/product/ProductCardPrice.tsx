import { type ReadonlySignal } from "@preact/signals";
import { SKU } from "$sdk/types/global.ts";
import { formatPrice } from "$sdk/global/format.ts";

export interface ProductCardPriceProps {
  currentSku: ReadonlySignal<SKU>;
  startingAt: ReadonlySignal<boolean>;
  startingAtText: string;
  available?: boolean;
}

export default function ProductCardPrice(
  { currentSku, startingAt, startingAtText, available }: ProductCardPriceProps,
) {
  const { lowPrice, highPrice, discount } = currentSku.value;
  const priceColor = lowPrice !== highPrice ? "text-red-300" : "text-gray-500";

  return (
    <div class="flex flex-col px-3 md:px-5">
      {/* normal price */}
      <div class="flex flex-wrap items-baseline gap-x-1">
        {startingAt.value && (
          <span class="font-body-2xs-regular text-gray-500">
            {startingAtText}
          </span>
        )}
        <div class="flex gap-1 font-body-2xs-bold md:font-body-xs-bold">
          {!available
            ? (
              <span class=" text-gray-500">
                {formatPrice(highPrice)}
              </span>
            )
            : (
              <>
                {discount !== 0 && highPrice > 0 && (
                  <span class="text-gray-300 line-through">
                    {formatPrice(highPrice)}
                  </span>
                )}
                {
                  <span class={`${priceColor}`}>
                    {formatPrice(lowPrice)}
                  </span>
                }
              </>
            )}
        </div>
      </div>
    </div>
  );
}
