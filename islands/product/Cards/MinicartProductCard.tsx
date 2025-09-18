import Image from "apps/website/components/Image.tsx";
import { Device } from "@deco/deco/utils";
import { formatPrice } from "$sdk/global/format.ts";
import { Signal, useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import QuantitySelector from "$components/ui/QuantitySelector.tsx";
import { MinicartProduct } from "$sdk/types/order.ts";
import { useCart } from "zee/sdk/hooks/useCart.ts";
import { clx } from "site/sdk/clx.ts";
import { RichText } from "apps/admin/widgets.ts";
import { RemoveProductTexts } from "site/islands/bag/RemoveProduct.tsx";
import { addLanguageToUrl } from "site/sdk/global/formatUrls.ts";
import { AvailableLanguages } from "site/sdk/hooks/useLanguage.ts";

export interface MinicartProductCardProps {
  product: MinicartProduct;
  index: number;
  disableSkuButton?: boolean;
  disableRemoveOption?: boolean;
  removeSubscriptionCTA?: boolean;
  dynamicQuantity?: Signal<number>;
  class?: string;
  device?: Device;
  deleteProductText: RichText;
  productCartTexts: RemoveProductTexts;
  language: AvailableLanguages;
}

export default function MinicartProductCard(
  {
    product,
    disableSkuButton,
    disableRemoveOption,
    removeSubscriptionCTA,
    dynamicQuantity,
    class: _class = "",
    deleteProductText,
    productCartTexts,
    language,
  }: MinicartProductCardProps,
) {
  const { updateItems } = useCart();

  const {
    unit_list_price,
    unit_sale_price,
    unit_discount_price,
    quantity,
  } = product;
  const uQuantity = useSignal(quantity);

  const loading = useSignal(false);
  const withLoading = useCallback(
    <A,>(cb: (args: A) => Promise<void>) => async (e: A) => {
      try {
        loading.value = true;
        await cb(e);
      } finally {
        loading.value = false;
      }
    },
    [],
  );
  const mainImage = product.thumb || product.images?.[0];

  const productURL = addLanguageToUrl({
    url: product.url,
    language,
  });

  return (
    <div
      class={clx(
        "flex flex-col w-full max-w-full rounded max-lg:border border-gray-200 bg-white",
        _class,
      )}
    >
      <div class="flex flex-nowrap">
        <a
          href={productURL}
          class="shrink-0 h-32 w-32 max-lg:rounded overflow-hidden bg-gray-100"
        >
          {mainImage && (
            <Image
              // USANDO A THUMB E COMO FALLBACK A MAIN_IMAGE PDP
              src={mainImage}
              style={{ aspectRatio: "1 / 1" }}
              width={80}
              height={80}
              class="h-full w-full object-cover"
              decoding="async"
              fetchPriority="auto"
              loading="lazy"
            />
          )}
        </a>
        <div class="flex flex-col justify-between w-full max-w-full p-3.5 lg:p-4">
          {/* NAME AND PRICE */}
          <div class="flex items-start justify-between flex-nowrap gap-x-3">
            <div class="flex flex-col">
              <p
                class="font-body-2xs-regular md:font-body-xs-regular text-gray-700 line-clamp-2"
                title={product.name}
              >
                {product.name}
              </p>
            </div>

            {unit_sale_price && (
              <div class="flex flex-col items-end justify-center shrink-0">
                <span class="font-body-2xs-bold md:font-body-xs-bold text-black">
                  {unit_sale_price !== unit_discount_price
                    ? formatPrice(unit_discount_price)
                    : formatPrice(unit_sale_price)}
                </span>

                {unit_list_price && unit_list_price > 0 &&
                    unit_sale_price !== unit_list_price
                  ? (
                    <span class="font-body-2xs-regular md:font-body-xs-regular line-through text-gray-500">
                      {formatPrice(unit_list_price)}
                    </span>
                  )
                  : (
                    <span class="font-body-2xs-regular md:font-body-xs-regular line-through text-gray-500">
                      {formatPrice(
                        unit_sale_price !== unit_discount_price
                          ? unit_sale_price
                          : undefined,
                      )}
                    </span>
                  )}
              </div>
            )}
          </div>

          {/* SIZE AND QUANTITY */}
          <div class="flex justify-between gap-x-3 w-full">
            <button
              disabled={disableSkuButton}
              class={clx(
                "flex items-center justify-center h-9 lg:h-10 lg:min-w-10 rounded border border-gray-200 font-body-xs-regular text-gray-500 transition-all disabled:pointer-events-none",
                product.dimension === "U" ? "px-2" : "px-2.5",
                !disableSkuButton &&
                  "hover:border-black hover:bg-black hover:bg-opacity-10 hover:text-black",
              )}
            >
              {product.dimension === "U" ? "Único" : product.dimension}
            </button>

            <div class="flex gap-x-3">
              <QuantitySelector
                quantity={quantity}
                dynamicQuantity={dynamicQuantity}
                disableRemoveOption={disableRemoveOption}
                productToBeDeleted={product}
                loading={loading.value}
                uQuantity={uQuantity}
                deleteProductText={deleteProductText}
                productCartTexts={productCartTexts}
                onChange={!removeSubscriptionCTA
                  ? withLoading(async (quantity) => {
                    const _diff = quantity - product.quantity;

                    await updateItems({
                      lines: [
                        {
                          id: String(product.product_id),
                          quantity,
                        },
                      ],
                    });
                  })
                  : undefined}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
