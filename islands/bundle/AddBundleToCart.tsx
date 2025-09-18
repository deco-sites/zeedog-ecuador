import {
  isBundleItemsAddedToCart,
  selectedBundleItems,
} from "$sdk/global/signalStore.ts";
import { useCart } from "zee/sdk/hooks/useCart.ts";
// import { useToast } from "zee/sdk/hooks/useToast.ts";
import { useUI } from "site/sdk/global/useUI.ts";
import { useSignal } from "@preact/signals";
// import { useAnalytics } from "zee/sdk/hooks/useAnalytics.tsx";

export default function AddBundleToCart() {
  const productsLength = selectedBundleItems.value?.length ?? 0;

  const { cart, addItems } = useCart();
  const { displayCart } = useUI();
  // const { sendEvent } = useAnalytics();

  const loading = useSignal(false);

  const checkBundleSkuSelection = () => {
    let everySkuSelected = true;
    selectedBundleItems.value?.forEach((item, _index) => {
      const bundleCard = document.querySelector(
        `.bundle__card[data-product-id="${item.productId}"]`,
      );
      if (bundleCard) {
        if (!item.skuSelected) {
          bundleCard.classList.add("bundle__card--no-sku-selected");
          everySkuSelected = false;
          const addToCartButton = document.getElementById(
            "bundle-add-to-cart-button",
          );
          if (addToCartButton) {
            addToCartButton.classList.add("choose-sku-alert");
            setTimeout(() => {
              addToCartButton.classList.remove(
                "choose-sku-alert",
              );
            }, 6000);
          }
        }
      }
    });
    return everySkuSelected;
  };

  const handleAddBundleItemsToCart = async () => {
    if (!checkBundleSkuSelection()) return;

    loading.value = true;
    const errors: string[] = [];
    if (selectedBundleItems.value) {
      for (const item of selectedBundleItems.value) {
        const currentQty = cart.value?.lines?.nodes?.find(
          (cartItem) => cartItem.id === item.productId,
        )?.quantity ?? 0;

        const result = await addItems({
          lines: {
            merchandiseId: item.skuId,
            quantity: currentQty + 1,
          },
        });

        if (result && "error" in result) {
          errors.push(
            `Error al agregar el SKU ${item.skuId}: ${result.error}`,
          );
        }
      }

      // await sendEvent({
      //     name: "bundle_click",
      //     params: {
      //         product_ids: selectedBundleItems.value.map((item) =>
      //             item.productId
      //         )
      //             .join(", "),
      //         page_path: globalThis.location.href,
      //     },
      // });
    } else {
      errors.push("Productos del bundle no seleccionados");
    }
    if (errors.length > 0) {
      // const { addToast } = useToast();
      // errors.forEach((error) =>
      //     addToast({
      //         message: error,
      //         type: "error",
      //         position: "top-right",
      //     })
      // );
    } else {
      displayCart.value = true;
      loading.value = false;
    }
  };

  return (
    <button
      onClick={handleAddBundleItemsToCart}
      disabled={loading.value}
      id="bundle-add-to-cart-button"
      class={`relative w-full h-12 flex items-center justify-center shrink-0 font-title-xs-bold rounded-full uppercase z-0 text-white mt-auto mb-4 ${
        isBundleItemsAddedToCart.value ? "bg-blue-400" : "bg-black"
      }`}
    >
      {loading.value
        ? <span class="loading loading-spinner" />
        : `Agregar ${productsLength} ${
          productsLength > 1 ? "productos" : "producto"
        }`}
    </button>
  );
}
