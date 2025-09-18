import LazyIcon from "$components/ui/LazyIcon.tsx";
import { ModalConfirmDeleteProduct } from "$components/bag/ModalConfirmDeleteProduct.tsx";
import { ModalProductMedias } from "../components/product/pdp/ModalPDPMedias.tsx";
import { HandleCloseModal } from "$islands/modal/HandleCloseModal.tsx";
import HandleSubmitModal from "../islands/modal/HandleSubmitModal.tsx";
import { useDevice, usePartialSection } from "@deco/deco/hooks";
import { ModalTableSizes } from "site/islands/product/ModalTableSizes.tsx";
import { StorefrontCreditCard } from "zee/sdk/types/storefront.ts";
import ContentModalUser from "$islands/modalUser/ContentModalUser.tsx";
import ModalExitAccount from "$islands/userAccount/ModalExitAccount.tsx";
import { SectionProps } from "@deco/deco";

type ModalType =
  | "ModalConfirmDeleteProduct"
  | "ModalLogin"
  | "ExitAccount"
  | "ProductImages"
  | "SizeTable"
  | "";

export interface ModalProps {
  openModal?: boolean;
  modalType?: ModalType;
  modalProps?:
    | StorefrontCreditCard
    | any;
  contentModalClass?: string;
}

// função pra fechar modal
// função pra serializar as props do modal
const defaultModalProps = {
  openModal: false,
  modalType: "",
  modalProps: "",
  contentModalClass: "",
};

export const Modal = (
  {
    openModal = false,
    modalType,
    modalProps = "",
    contentModalClass = "",
    $url,
  }: SectionProps<typeof loader>,
) => {
  const $device = useDevice();

  return (
    <>
      {/* MODAL CONTAINER */}
      {/* {console.log(modalProps)} */}
      <button
        id="js-open-shelf-modal"
        class="hidden"
        {...usePartialSection({
          props: { ...defaultModalProps, openModal: true },
        })}
      >
      </button>

      <section class="fixed hidden w-screen h-dvh top-0 left-0 items-center justify-center z-[203] overscroll-contain">
        <button
          aria-label="background-fechar"
          class="js-close-modal fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 z-[8888] cursor-default"
          {...usePartialSection({ props: { defaultModalProps } })}
          id="labelCloseModal"
        >
        </button>

        {/* Conteúdo do Modal */}
        <div
          class={`js-skeleton-modal absolute flex flex-col items-center justify-center shrink-0 bg-white z-[9999] ${contentModalClass} transition-all`}
          id="ModalStructure"
        >
          {openModal
            ? (
              <>
                <button
                  aria-label="fechar"
                  class="js-close-modal absolute top-0 right-0 h-14 w-14 flex items-center justify-center rounded-tr-xl bg-transparent z-10"
                  {...usePartialSection({
                    props: { defaultModalProps },
                  })}
                  id="buttonCloseModal"
                >
                  {/* aparently this svg doesnt receive click action */}
                  <span class="relative flex items-center justify-center size-6 rounded-full bg-gray-100">
                    <LazyIcon name="Close" size={16} />
                  </span>
                  <span class="absolute w-full h-full z-10" />
                </button>
                {modalType === "ModalConfirmDeleteProduct" && (
                  <ModalConfirmDeleteProduct
                    product={modalProps.product}
                    deleteProductText={modalProps.deleteProductText}
                    productCartTexts={modalProps.productCartTexts}
                  />
                )}
                {modalType === "ProductImages" && (
                  <ModalProductMedias
                    mainImages={modalProps.mainImages}
                    productName={modalProps.productName}
                    imageClickedIndex={modalProps
                      .imageClickedIndex}
                    device={$device ?? "desktop"}
                  />
                )}
                {modalType === "ModalLogin" && (
                  <ContentModalUser url={$url} {...modalProps} />
                )}
                {modalType === "ExitAccount" && <ModalExitAccount />}
                {modalType === "SizeTable" && (
                  <ModalTableSizes
                    sizeTable={modalProps.sizeTable}
                    sizeImages={modalProps.sizeImages}
                    productName={modalProps.productName}
                    sizesText={modalProps.sizesText}
                    hiddenImage={true}
                  />
                )}
                <HandleCloseModal />
                <HandleSubmitModal />
              </>
            )
            : <span class="loading loading-spinner"></span>}
        </div>
      </section>
    </>
  );
};

export const loader = (props: ModalProps, req: Request) => {
  const url = new URL(req.url);

  return {
    ...props,
    $url: url,
  };
};

export default Modal;
