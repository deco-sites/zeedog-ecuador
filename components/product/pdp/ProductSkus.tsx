import { useEffect, useId } from "preact/hooks";
import { preSelectedSize } from "$sdk/global/signalStore.ts";
import { SKU } from "$sdk/types/global.ts";
import { Signal } from "@preact/signals";
import { useUI } from "$sdk/global/useUI.ts";
import { sortOrder } from "$sdk/global/constants.ts";
import { clx } from "site/sdk/clx.ts";

export interface ProductSkusTextsProps {
  lastUnitsText: string;
  chooseAnOptionText: string;
}

export interface ProductSKUSProps {
  listOfSKUs: SKU[];
  department: string;
  ulClass?: string;
  liClass?: string;
  onChange?: (sku: SKU, value: string) => void;
  labelClass?: string;
  skuSelected: Signal<SKU | null>;
  noSkuSelectedAlert: Signal<boolean>;
  startingAt: Signal<boolean | undefined>;
  whereabout?: string;
  selectedSkuIdFromCart?: string;
  texts: ProductSkusTextsProps;
}

export default function ProductSKUS(
  {
    listOfSKUs,
    department,
    ulClass,
    liClass,
    labelClass,
    onChange,
    skuSelected,
    noSkuSelectedAlert,
    startingAt,
    whereabout = "pdp",
    selectedSkuIdFromCart,
    texts,
  }: ProductSKUSProps,
) {
  const lastUnits = department === "human" ? 5 : 10;
  const inputId = useId();
  const { resetBreedSelect } = useUI();

  const handleInputChange = (item: any) => ({ target }: any) => {
    noSkuSelectedAlert.value = false;
    startingAt.value = false;
    onChange?.(item, target.value);
    skuSelected.value = item;
    if (preSelectedSize.value !== item.dimension.toLowerCase()) {
      preSelectedSize.value = item.dimension.toLowerCase();
      resetBreedSelect();
    }
  };

  const handlePreSelectSKU = (listOfSKUs: SKU[]) => {
    const availableSKUs = listOfSKUs.filter((
      sku,
    ) => (sku.inventoryLevel > 0));
    if (
      whereabout !== "modal" &&
      (availableSKUs.length === 1 ||
        availableSKUs?.[0]?.dimension.toLowerCase() === "400g")
    ) {
      skuSelected.value = availableSKUs[0];
      preSelectedSize.value = availableSKUs[0].dimension.toLowerCase();
    }
    if (whereabout === "modal" && selectedSkuIdFromCart) {
      availableSKUs.forEach((sku) => {
        if (Number(sku.id) === Number(selectedSkuIdFromCart)) {
          skuSelected.value = sku;
        }
      });
    }
  };

  useEffect(() => handlePreSelectSKU(listOfSKUs), []);

  return (
    <ul
      id={`${whereabout}-skus-list`}
      class={clx(
        "relative flex gap-x-1.5",
        noSkuSelectedAlert.value && "border border-red-300 p-1 rounded",
        ulClass,
      )}
    >
      {listOfSKUs?.sort(
        (a, b) =>
          sortOrder.indexOf(a.dimension) - sortOrder.indexOf(b.dimension),
      )?.map(
        (sku: SKU) => {
          const disabledStyle = sku.inventoryLevel > 0
            ? "text-gray-500 cursor-pointer text-black bg-transparent md:hover:border-black md:hover:bg-black md:hover:bg-opacity-10 peer-checked:bg-black peer-checked:bg-opacity-10"
            : "text-gray-300 bg-gradient-to-br from-transparent peer-checked:from-black/10 from-[calc(50%_-_1px)] via-gray-200 md:hover:via-black peer-checked:via-black via-[calc(50%_-_1px)] to-transparent peer-checked:to-black/10 md:hover:to-transparent to-50%";

          return (
            <li
              key={`${inputId}-li-${sku.id}`}
              class={clx("relative min-w-[50px] min-h-[50px] rounded", liClass)}
            >
              <input
                type="radio"
                id={`${inputId}-input-${sku.id}`}
                name={`${whereabout}-radio-size-sku`}
                class={clx(
                  "peer absolute invisible opacity-0",
                  sku.inventoryLevel > 0 ? "" : "sku-soldout",
                )}
                onInput={handleInputChange(sku)}
                value={sku.dimension.toLowerCase()}
                checked={sku.id === skuSelected?.value?.id}
              />
              <label
                class={clx(
                  "relative flex items-center justify-center w-full h-full cursor-pointer px-3.5 rounded border border-gray-200 font-body-xs-regular hover:text-black hover:border-black peer-checked:border-black peer-checked:text-black",
                  disabledStyle,
                  labelClass,
                )}
                htmlFor={`${inputId}-input-${sku.id}`}
              >
                {sku.dimension === "U" ? "ÚNICO" : sku.dimension.toUpperCase()}
                {(sku.inventoryLevel! > 0 &&
                  lastUnits > sku.inventoryLevel!) &&
                  (
                    <p class="absolute -bottom-9 hidden justify-center items-center w-auto h-6 px-2.5 bg-red-300 text-white font-body-2xs-regular rounded whitespace-nowrap children:absolute children:block children:bg-red-300 children:-top-1 children:w-2.5 children:h-2.5 children:rotate-45">
                      <span>{texts.lastUnitsText}</span>
                    </p>
                  )}
              </label>
            </li>
          );
        },
      )}
      {noSkuSelectedAlert.value && (
        <li class="absolute -bottom-5 w-auto whitespace-nowrap font-body-2xs-regular text-red-300">
          {texts.chooseAnOptionText}
        </li>
      )}
    </ul>
  );
}
