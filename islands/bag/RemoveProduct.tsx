import { Loading } from "$components/ui/Loading.tsx";
import { externalCloseModal } from "$islands/modal/HandleCloseModal.tsx";
import { useCart } from "zee/sdk/hooks/useCart.ts";

export interface RemoveProductTexts {
  removeProductFromCartText: string;
  doNotRemoveProductFromCartText: string;
}

interface RemoveProductProps {
  skud_id: string;
  productCartTexts: RemoveProductTexts;
}

export default function RemoveProduct(
  { skud_id, productCartTexts }: RemoveProductProps,
) {
  const { loadingCart, updateItems } = useCart();

  const handleUpdateCart = async () => {
    await updateItems({
      lines: [
        {
          id: skud_id,
          quantity: 0,
        },
      ],
    });

    externalCloseModal();
  };

  return (
    <div class="flex flex-col md:flex-row p-6 md:p-8 justify-between items-center w-full gap-4 border-t border-gray-200">
      <button
        class="h-12 w-full md:w-1/2 button-quinary whitespace-nowrap"
        onClick={() => handleUpdateCart()}
      >
        {loadingCart.value
          ? <Loading />
          : productCartTexts.removeProductFromCartText}
      </button>
      <button
        class="h-12 w-full md:w-1/2 button-tertiary whitespace-nowrap"
        onClick={() => externalCloseModal()}
      >
        {productCartTexts.doNotRemoveProductFromCartText}
      </button>
    </div>
  );
}
