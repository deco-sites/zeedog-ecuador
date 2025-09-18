import Button from "$components/ui/Button.tsx";
import LazyIcon from "$components/ui/LazyIcon.tsx";
import handleOpenModal from "$islands/modal/handleOpenModal.ts";
import { Loading } from "$components/ui/Loading.tsx";
import { MinicartProduct } from "$sdk/types/order.ts";
import { Signal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { RichText } from "apps/admin/widgets.ts";
import { RemoveProductTexts } from "site/islands/bag/RemoveProduct.tsx";

interface QuantitySelectorProps {
  quantity: number;
  dynamicQuantity?: Signal<number>;
  loading?: boolean;
  onChange?: (quantity: number) => void;
  productToBeDeleted?: MinicartProduct;
  disableRemoveOption?: boolean;
  uQuantity: Signal<number>;
  deleteProductText: RichText;
  productCartTexts: RemoveProductTexts;
}

const QUANTITY_MAX_VALUE = 100;

// PARA UM SELETOR DE QUANTIDADE COM OPÇÃO DE REMOÇÃO DE PRODUTO, BASTA PASSAR PRO PROP O PRODUTO A SER REMOVIDO
function QuantitySelector(
  {
    onChange,
    quantity,
    dynamicQuantity,
    loading,
    productToBeDeleted,
    disableRemoveOption,
    uQuantity,
    deleteProductText,
    productCartTexts,
  }: QuantitySelectorProps,
) {
  const decrement = () => {
    uQuantity.value = Math.max(0, uQuantity.value - 1);
    onChange?.(uQuantity.value);
    if (dynamicQuantity) dynamicQuantity.value = uQuantity.value;
  };

  useEffect(() => {
    uQuantity.value = quantity;
  }, [quantity]);

  const increment = () => {
    uQuantity.value = Math.min(uQuantity.value + 1, QUANTITY_MAX_VALUE);
    onChange?.(uQuantity.value);
    if (dynamicQuantity) dynamicQuantity.value = uQuantity.value;
  };

  return (
    <div class="flex flex-nowrap items-center justify-between rounded border border-gray-200 hover:border-black w-24 h-9 lg:h-10">
      <Button
        class="group relative flex items-center justify-center w-8 h-full disabled:text-gray-300"
        disabled={disableRemoveOption && uQuantity.value === 1}
        // loading={loading}
        onClick={() => {
          if (uQuantity.value > 1) return decrement();
          handleOpenModal({
            openModal: true,
            modalType: "ModalConfirmDeleteProduct",
            modalProps: {
              product: productToBeDeleted,
              deleteProductText,
              productCartTexts,
            },
            contentModalClass:
              "w-[360px] min-h-[424px] md:w-[480px] md:min-h-[360px] bg-white rounded-lg",
          });
        }}
      >
        {(uQuantity.value === 1 && productToBeDeleted && !disableRemoveOption)
          ? (
            <>
              <LazyIcon
                name="Trash"
                width={20}
                height={20}
                class="opacity-100 group-hover:opacity-0 transition-all"
              />
              <LazyIcon
                name="TrashFilled"
                width={20}
                height={20}
                class="absolute opacity-0 group-hover:opacity-100 transition-all"
              />
            </>
          )
          : "−"}
      </Button>
      <span
        aria-label="Item quantity"
        class="flex items-center justify-center w-6 h-full text-center font-body-xs-regular text-gray-500 disabled:text-gray-300"
      >
        {loading ? <Loading /> : uQuantity.value}
      </span>
      <Button
        class="flex items-center justify-center w-8 h-full"
        onClick={increment}
        disabled={uQuantity.value === QUANTITY_MAX_VALUE}
        // loading={loading}
      >
        +
      </Button>
    </div>
  );
}

export default QuantitySelector;
