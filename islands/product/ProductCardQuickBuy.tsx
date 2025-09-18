import { SKU } from "$sdk/types/global.ts";
import { Signal, useSignal } from "@preact/signals";
import { useId } from "$sdk/hooks/useId.ts";
import { useEffect, useRef, useState } from "preact/hooks";
import AddToCartButton from "$components/AddToCartButton.tsx";
import { useUI } from "$sdk/global/useUI.ts";
import { Loading } from "$components/ui/Loading.tsx";
import { useCart } from "zee/sdk/hooks/useCart.ts";
import { sortOrder } from "$sdk/global/constants.ts";
import { clx } from "../../sdk/clx.ts";
import LazyIcon from "site/components/ui/LazyIcon.tsx";

export interface ProductCardQuickBuyProps {
  productId: string;
  skus: SKU[];
  currentSku: Signal<SKU>;
  startingAt: Signal<boolean>;
  bgColor: string;
  addToCartText: string;
}

const getBorderRadius = (index: number, length: number) => {
  if (index === 0) {
    if (length === 1) return "rounded";
    if (length > 1) return "rounded-l";
  }
  if (index === length - 1) return "rounded-r";
  return "";
};

export default function ProductCardQuickBuy(
  { productId, skus, currentSku, startingAt, bgColor, addToCartText }:
    ProductCardQuickBuyProps,
) {
  const { addItems } = useCart();

  const skusListId = useId();
  const { displayCart } = useUI();
  const hasSkuSelect = useSignal(false);
  const [loading, setLoading] = useState(false);
  const hasStock = useSignal(false);

  return (
    <div
      class={clx(
        "absolute top-0 group-hover:-top-14 hidden md:flex items-center justify-between w-full h-14",
        bgColor,
        "bg-opacity-70 lg:px-5 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all",
      )}
    >
      <ul class="flex">
        {skus.sort((a, b) =>
          sortOrder.indexOf(a.dimension) - sortOrder.indexOf(b.dimension)
        ).map((sku, index) => {
          const borderRadius = getBorderRadius(index, skus.length);

          const disabledStyle = sku.inventoryLevel > 0
            ? "cursor-pointer text-black bg-white md:hover:border-black md:hover:bg-gray-200"
            : "text-gray-300 bg-gradient-to-br from-white from-[calc(50%_-_1px)] via-gray-200 via-[calc(50%_-_1px)] to-white to-50%";

          // Regras de Refeições Naturais: marcar sku de 400g
          // Regra geral: marcar sempre quando houver somente um sku e válido
          const checked =
            (sku.dimension.toLowerCase() === "400g" || skus.length === 1) &&
            sku.inventoryLevel > 0;
          hasStock.value = sku.inventoryLevel === 0;

          if (checked && !hasSkuSelect.value) hasSkuSelect.value = true;

          const inputRef = useRef<HTMLInputElement>(null);
          useEffect(() => {
            if (inputRef.current) inputRef.current.checked = checked;
          }, []);

          useEffect(() => {
            if (inputRef.current?.checked) {
              hasSkuSelect.value = true;
            }
          }, [inputRef.current?.checked]);

          return (
            <li class="shrink-0" key={sku.id}>
              <input
                ref={inputRef}
                type="radio"
                name={skusListId + "-product-id-" + productId}
                id={skusListId + "-sku-id-" + sku.id}
                class="peer absolute invisible opacity-0"
                onInput={(e) => {
                  currentSku.value = sku;
                  startingAt.value = false;
                  hasSkuSelect.value = true;
                  e.currentTarget.checked = true;
                }}
                disabled={sku.inventoryLevel === 0}
                checked={currentSku.value.id === sku.id}
              />
              <label
                htmlFor={skusListId + "-sku-id-" + sku.id}
                class={clx(
                  "relative flex items-center justify-center min-w-[32px] h-8 border",
                  borderRadius,
                  "border-gray-200 peer-checked:border-black peer-checked:bg-gray-200 font-body-2xs-regular",
                  disabledStyle,
                  "px-1.5 transition-all",
                )}
              >
                {sku.dimension === "U" ? "Único" : sku.dimension.toUpperCase()}
              </label>
            </li>
          );
        })}
      </ul>
      <AddToCartButton
        class="w-9 h-9 flex items-center justify-center text-white rounded-full bg-black disabled:bg-gray-300"
        addToCartText={addToCartText}
        onAddProduct={async () => {
          setLoading(true);

          await addItems({
            lines: {
              merchandiseId: currentSku.value.id,
            },
          });

          displayCart.value = true;
          setLoading(false);
        }}
        disabled={hasStock.value}
      >
        {loading
          ? <Loading />
          : <LazyIcon name="Plus" width={24} height={24} />}
      </AddToCartButton>
    </div>
  );
}
