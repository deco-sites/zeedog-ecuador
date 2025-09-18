import handleOpenModal from "$islands/modal/handleOpenModal.ts";
import LazyIcon from "$components/ui/LazyIcon.tsx";
import { SizeImage, SizeTable } from "$sdk/types/product.ts";

export interface SizeTableButtonProps {
  sizeTable: SizeTable;
  sizeImages?: SizeImage[];
  productName?: string;
  sizesText: string;
  sizeTableText: string;
}

export default function SizeTableButton({
  sizeTable,
  sizeImages,
  productName,
  sizesText,
  sizeTableText,
}: SizeTableButtonProps) {
  return (
    <button
      class="flex items-center gap-x-1"
      onClick={() => {
        handleOpenModal({
          contentModalClass:
            "bottom-0 md:bottom-auto w-dvw lg:w-[900px] h-[calc(100dvh_-_144px)] md:h-[600px] rounded-t-[20px] md:rounded-xl",
          modalProps: {
            sizeTable,
            sizeImages,
            productName,
            sizesText,
          },
          modalType: "SizeTable",
          openModal: true,
        });
      }}
    >
      <LazyIcon name="Sizes" class="text-gray-700" width={20} height={20} />
      <span class="font-body-xs-regular underline">{sizeTableText}</span>
    </button>
  );
}
