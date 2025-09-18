import { SKU } from "$sdk/types/global.ts";
import { Signal, useSignal } from "@preact/signals";
import { useId } from "$sdk/hooks/useId.ts";
import { useEffect, useRef } from "preact/hooks";
import {
  bundleItems,
  selectedBundleItems,
} from "site/sdk/global/signalStore.ts";
import { BundleItem } from "site/sdk/types/product.ts";

export interface ProductCardQuickBuyProps {
  productId: string;
  skus: SKU[];
  currentSku: Signal<SKU>;
  startingAt: Signal<boolean>;
  bgColor: string;
}

const getBorderRadius = (index: number, length: number) => {
  if (index === 0) {
    if (length === 1) return "rounded";
    if (length > 1) return "rounded-l";
  }
  if (index === length - 1) return "rounded-r";
  return "";
};

export default function ProductBundleCardSkus(
  { productId, skus, currentSku, startingAt, bgColor }:
    ProductCardQuickBuyProps,
) {
  const skusListId = useId();
  const hasSkuSelect = useSignal(false);

  const onSkuInput = (sku: SKU) => {
    currentSku.value = sku;
    startingAt.value = false;
    hasSkuSelect.value = true;
  };

  const getSelectedBundleItemIndex = (items: BundleItem[]) => {
    return items.findIndex((item) => item.productId === productId);
  };

  const updateSelectedBundleItemsOnSkuInput = (sku: SKU) => {
    if (!selectedBundleItems.value) return;
    const productSelectedInBundleIndex = getSelectedBundleItemIndex(
      selectedBundleItems.value,
    );
    const newUpdatedBundleItems = [...selectedBundleItems.value];
    if (
      productSelectedInBundleIndex !== undefined &&
      productSelectedInBundleIndex >= 0
    ) {
      newUpdatedBundleItems[productSelectedInBundleIndex] = {
        ...newUpdatedBundleItems[productSelectedInBundleIndex],
        skuId: sku.id,
        price: sku.lowPrice,
        skuSelected: true,
      };
      selectedBundleItems.value = newUpdatedBundleItems;
      const bundleCard = document.querySelector(
        `.bundle__card[data-product-id="${
          newUpdatedBundleItems[productSelectedInBundleIndex]
            .productId
        }"]`,
      );
      if (bundleCard) {
        bundleCard.classList.remove("bundle__card--no-sku-selected");
      }
    }
  };
  const updateBundleTotalItemsSku = (sku: SKU) => {
    if (!bundleItems.value) return;
    const productSelectedInBundleIndex = getSelectedBundleItemIndex(
      bundleItems.value,
    );
    const newUpdatedBundleItems = [...bundleItems.value];
    if (
      productSelectedInBundleIndex !== undefined &&
      productSelectedInBundleIndex >= 0
    ) {
      newUpdatedBundleItems[productSelectedInBundleIndex] = {
        ...newUpdatedBundleItems[productSelectedInBundleIndex],
        skuId: sku.id,
        price: sku.lowPrice,
      };
      bundleItems.value = newUpdatedBundleItems;
    }
  };

  return (
    <div
      class={`flex items-center justify-between w-full ${bgColor} px-3 lg:px-5`}
    >
      <ul class="relative bundle__skus flex">
        {skus.map((sku, index) => {
          const borderRadius = getBorderRadius(index, skus.length);

          const disabledStyle = sku.inventoryLevel > 0
            ? "cursor-pointer text-gray-500 bg-white md:hover:border-black md:hover:bg-black md:hover:bg-opacity-10"
            : "text-gray-300 bg-gradient-to-br from-white from-[calc(50%_-_1px)] via-gray-200 via-[calc(50%_-_1px)] to-white to-50%";

          // Regras de Refeições Naturais: marcar sku de 400g
          // Regra geral: marcar sempre quando houver somente um sku e válido
          const checked = sku.inventoryLevel > 0 &&
            (currentSku.value.id === sku.id ||
              (sku.dimension.toLowerCase() === "400g" ||
                skus.length === 1));
          if (checked && !hasSkuSelect.value) {
            hasSkuSelect.value = true;
          }

          const inputRef = useRef<HTMLInputElement>(null);
          useEffect(() => {
            if (inputRef.current) {
              inputRef.current.checked = checked;
            }
            if (checked) updateSelectedBundleItemsOnSkuInput(sku);
          }, []);

          useEffect(() => {
            if (inputRef.current?.checked) {
              hasSkuSelect.value = true;
            }
          }, [inputRef.current?.checked]);

          return (
            <li class="shrink-0 z-10" key={sku.id}>
              <input
                ref={inputRef}
                type="radio"
                name={skusListId + "-product-id-" + productId}
                id={skusListId + "-sku-id-" + sku.id}
                data-sku-id={sku.id}
                data-sku-price={sku.lowPrice}
                class="peer absolute invisible opacity-0"
                onInput={(e) => {
                  e.currentTarget.checked = true;
                  onSkuInput(sku);
                  updateSelectedBundleItemsOnSkuInput(sku);
                  updateBundleTotalItemsSku(sku);
                }}
                disabled={sku.inventoryLevel === 0}
                defaultChecked={checked}
              />
              <label
                htmlFor={skusListId + "-sku-id-" + sku.id}
                class={`relative flex items-center justify-center min-w-[32px] h-8 border ${borderRadius} border-gray-200 peer-checked:border-black peer-checked:bg-black peer-checked:bg-opacity-10 font-body-2xs-regular ${disabledStyle} px-1.5 transition-all`}
              >
                {sku.dimension === "U" ? "Único" : sku.dimension}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
