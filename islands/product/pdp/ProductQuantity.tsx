import { SKU } from "$sdk/types/global.ts";
import { MAXPRODUCTQUANTITY } from "$sdk/global/constants.ts";
import { Signal } from "@preact/signals";
import LazyIcon from "site/components/ui/LazyIcon.tsx";
// import { pdpSKUQuantity } from "$sdk/global/signalStore.ts";
// import { pdpSKUSelected } from "$sdk/global/signalStore.ts";

export interface ProductQuantityProps {
  available: boolean;
  isKitchen?: boolean;
  currentSku: SKU;
  whereabout?: string;
  skuQuantity: Signal<number>;
  skuSelected: Signal<SKU | null>;
  amountText: string;
}

export function ProductQuantity({
  available,
  isKitchen,
  currentSku,
  whereabout,
  skuSelected,
  skuQuantity,
  amountText,
}: ProductQuantityProps) {
  const onDecrement = () => {
    skuQuantity.value = Math.max(1, skuQuantity.value - 1);
    // console.log(skuQuantity.value);
  };

  const onIncrement = () => {
    skuQuantity.value = Math.min(skuQuantity.value + 1, MAXPRODUCTQUANTITY);
    // console.log(skuQuantity.value);
  };

  const shouldDisableIncrementButton =
    skuQuantity.value >= MAXPRODUCTQUANTITY ||
    skuQuantity.value >= currentSku?.inventoryLevel;
  const shouldDisableDecrementButton = skuQuantity.value === 1;

  const buttonStyle = isKitchen && whereabout !== "modal"
    ? "bg-sand-200 hover:bg-sand-300"
    : "bg-gray-100 hover:bg-gray-200";

  return !available ||
      (skuSelected.value && skuSelected.value.inventoryLevel === 0)
    ? <></>
    : (
      <div
        class={`flex justify-between items-center w-full p-6 ${
          whereabout === "modal" ? "border-y" : "lg:py-8 lg:px-10 2xl:px-14"
        } border-b border-gray-200`}
      >
        <span class="text-gray-500 font-body-xs-regular">{amountText}</span>
        <div class="flex items-center justify-center">
          <button
            onClick={onDecrement}
            disabled={shouldDisableDecrementButton}
            class={`not-focus-visible:outline-none w-7 flex items-center justify-center h-7 rounded-full cursor-pointer disabled:opacity-40 disabled:cursor-default ${buttonStyle}`}
          >
            {/* − */}
            <LazyIcon
              name="Minus"
              class="text-gray-700"
              width={18}
              height={18}
            />
          </button>
          <p class="flex items-center justify-center w-8 mx-6 p-1 font-body-sm-bold">
            {skuQuantity}
          </p>
          <button
            onClick={onIncrement}
            disabled={shouldDisableIncrementButton}
            class={`not-focus-visible:outline-none w-7 flex items-center justify-center h-7 rounded-full cursor-pointer disabled:opacity-40 disabled:cursor-default ${buttonStyle}`}
          >
            {/* + */}
            <LazyIcon
              name="Plus"
              class="text-gray-700"
              width={18}
              height={18}
            />
          </button>
        </div>
      </div>
    );
}
