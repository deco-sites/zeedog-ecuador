import { ModalProps } from "../../sections/Modal.tsx";

const handleOpenModal = (
  { contentModalClass, modalProps, modalType, openModal }: ModalProps,
) => {
  const props = {
    contentModalClass,
    modalProps,
    modalType,
    openModal,
  };
  const modalSkeleton = document.querySelector(".js-skeleton-modal");
  if (modalSkeleton) {
    modalSkeleton.parentElement?.classList.replace("hidden", "flex");
    modalSkeleton.className = modalSkeleton.className + " " +
      contentModalClass;
  }

  const _body = globalThis?.document?.body;

  _body.classList.add("overflow-hidden");

  const globalModalTrigger: HTMLButtonElement | null = document
    .querySelector(
      "#js-open-shelf-modal",
    );

  const stringifiedProps = JSON.stringify(props);

  const encodedProps = encodeURIComponent(stringifiedProps);

  const modalPartialURL = globalModalTrigger?.getAttribute("f-partial");

  if (modalPartialURL) {
    const newModalPartialURL = modalPartialURL.replace(
      /props=.*?&href/,
      `props=${encodedProps}&href`,
    );
    globalModalTrigger?.setAttribute("f-partial", newModalPartialURL);
    globalModalTrigger?.click();
  }
};

export default handleOpenModal;
