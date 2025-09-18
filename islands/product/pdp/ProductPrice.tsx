import { SKU, SlimCartItem } from "$sdk/types/global.ts";
import { computed, Signal } from "@preact/signals";
import ProductAddToCart from "$islands/product/pdp/ProductAddToCart.tsx";
import { formatPrice } from "site/sdk/global/format.ts";
import { clx } from "site/sdk/clx.ts";

export interface ProductPriceTextsProps {
  startingAtText: string;
  addToCartText: string;
}

// inicializando formatação de preço
interface ProductPriceProps {
  available: boolean;
  mainSku: SKU;
  hasDiffPrices: boolean;
  whereabout?: string;
  currentCartItem?: SlimCartItem;
  skuSelected: Signal<SKU | null>;
  skuQuantity: Signal<number>;
  startingAt: Signal<boolean | undefined>;
  noSkuSelectedAlert: Signal<boolean>;
  texts: ProductPriceTextsProps;
}

export default function ProductPrice({
  available,
  mainSku,
  hasDiffPrices,
  whereabout,
  currentCartItem,
  skuSelected,
  skuQuantity,
  startingAt,
  noSkuSelectedAlert,
  texts,
}: ProductPriceProps) {
  const sku = computed(() => (skuSelected?.value) || mainSku);
  const hasStartingAt = startingAt.value === undefined
    ? hasDiffPrices
    : startingAt.value;

  const productPrice = {
    unit_list_price: sku.value?.highPrice * 100 || 0,
    unit_sale_price: sku.value?.lowPrice * 100 || 0,
  };

  const productWithDiscount =
    productPrice?.unit_sale_price < productPrice?.unit_list_price;

  // TODO: Pegar max_installments da Shopify
  // const maxInstallments = DEFAULT_MAX_INSTALLMENTS;

  return !available ||
      (skuSelected?.value &&
        skuSelected.value.inventoryLevel === 0)
    ? <></>
    : (
      <div
        class={clx(
          whereabout === "modal"
            ? "border-t bg-white"
            : "lg:py-8 lg:px-10 2xl:px-14",
          "flex flex-col md:flex-row gap-y-4 lg:gap-y-3 md:justify-between md:items-center w-full p-6 border-b border-gray-200",
        )}
      >
        <div class="flex flex-col h-full group relative overflow-hidden">
          {/* product info */}
          <div
            class={clx(
              sku.value.discount ? "flex-col items-start" : "",
              "flex relative max-content justify-start flex-wrap items-baseline",
            )}
          >
            {hasStartingAt && (
              <span class="font-body-xs-regular text-gray-500 leading-5 mr-1">
                {texts.startingAtText}
              </span>
            )}
            {!sku.value.discount
              ? (
                <div class="flex gap-1 items-center justify-normal">
                  {(productWithDiscount &&
                    whereabout === "modal") && (
                    <span class="font-body-sm-bold text-black">
                      {formatPrice(
                        productPrice
                          .unit_sale_price / 100,
                      )}
                    </span>
                  )}
                  <h2
                    class={clx(
                      (productWithDiscount &&
                          whereabout === "modal")
                        ? "font-body-2xs-regular md:font-body-xs-regular line-through text-gray-500"
                        : "font-body-sm-bold text-black",
                    )}
                  >
                    {formatPrice(sku.value.highPrice)}
                  </h2>
                </div>
              )
              : (
                <div class="font-title-sm-bold flex gap-x-1.5 items-center">
                  {sku.value.highPrice > 0 && (
                    <span class="mr-1 line-through text-gray-500">
                      {formatPrice(sku.value.highPrice)}
                    </span>
                  )}
                  <span class="text-red-300">
                    {formatPrice(sku.value.lowPrice)}
                  </span>
                  <span class="flex items-center h-6 px-1.5 rounded font-body-2xs-bold text-white bg-red-300">
                    {sku.value.discount}% OFF
                  </span>
                </div>
              )}
          </div>
        </div>
        <ProductAddToCart
          whereabout={whereabout}
          currentCartItem={currentCartItem}
          skuSelected={skuSelected}
          skuQuantity={skuQuantity}
          noSkuSelectedAlert={noSkuSelectedAlert}
          addToCartText={texts.addToCartText}
        />
      </div>
    );
}
