import { Signal, useSignal } from "@preact/signals";
import { SKU } from "$sdk/types/global.ts";
import { SlimCartItem } from "$sdk/types/global.ts";
import { useUI } from "$sdk/global/useUI.ts";
import AddToCartButton from "$components/AddToCartButton.tsx";
import { useCart } from "zee/sdk/hooks/useCart.ts";

const handleCloseModalInClient = () => {
  const closeButton = document.querySelector("#buttonCloseModal") as
    | HTMLButtonElement
    | null;
  if (closeButton) closeButton.click();
};

export interface ProductAddToCartProps {
  whereabout?: string;
  currentCartItem?: SlimCartItem;
  skuSelected: Signal<SKU | null>;
  skuQuantity: Signal<number>;
  noSkuSelectedAlert: Signal<boolean>;
  addToCartText: string;
}

export default function ProductAddToCart(
  {
    whereabout,
    currentCartItem,
    skuSelected,
    skuQuantity,
    noSkuSelectedAlert,
    addToCartText,
  }: ProductAddToCartProps,
) {
  const updatedCartItem = useSignal<SlimCartItem | undefined>(
    currentCartItem ?? undefined,
  );
  const { addItems, updateItems } = useCart();

  const loading = useSignal(false); // se usar o signal do hook de cart, aparece o loading na consulta de frete
  const { displayCart } = useUI();

  return (
    <AddToCartButton
      class="w-full md:w-44 h-12 flex items-center justify-center shrink-0 font-title-xs-bold text-white rounded-full bg-black ${hoverStyleByPrint} disabled:bg-gray-300 transition-all"
      addToCartText={addToCartText}
      onAddProduct={async () => {
        loading.value = true;

        if (!skuSelected.value) {
          noSkuSelectedAlert.value = true;
          loading.value = false;
          return;
        }

        if (whereabout === "modal") {
          if (updatedCartItem.value) {
            // const { sku_id } = updatedCartItem.value;

            await updateItems({
              lines: [
                {
                  id: String(skuSelected.value.id),
                  quantity: skuQuantity.value,
                },
              ],
            });
          }

          loading.value = false;
          handleCloseModalInClient();
        } else {
          await addItems({
            lines: {
              merchandiseId: String(skuSelected.value.id),
              quantity: skuQuantity.value,
            },
          });

          displayCart.value = true;
          loading.value = false;
        }
      }}
    >
      {loading.value
        ? <span class="loading loading-spinner"></span>
        : whereabout === "modal"
        ? "UPDATE"
        : addToCartText}
    </AddToCartButton>
  );
}
