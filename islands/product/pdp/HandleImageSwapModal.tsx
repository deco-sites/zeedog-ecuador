import { useEffect } from "preact/hooks";

const HandleImageSwapModal = () => {
  useEffect(() => {
    if (globalThis.document) {
      // console.log("IMAGE MODAL SWAP:", preSelectedSize.value);
      const mainImages = document.querySelectorAll(
        ".modal-pdp-main-img img",
      );
      if (mainImages && mainImages.length > 0) {
        mainImages.forEach((image) => {
          const attr = image.getAttribute("data-sku-trigger");
          if (
            attr
          ) {
            image.classList.remove("z-0");
            image.classList.add("z-10");
          } else {
            image.classList.remove("z-10");
            image.classList.add("z-0");
          }
        });
      }
    }
  });
  return <></>;
};

export default HandleImageSwapModal;
