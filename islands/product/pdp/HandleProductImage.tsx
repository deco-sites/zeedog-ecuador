import { useEffect } from "preact/hooks";
import handleOpenModal from "$islands/modal/handleOpenModal.ts";
import { ImageMetadata } from "zee/sdk/types/zee.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";

export interface HandleProductImageProps {
  mainImages: ImageMetadata[];
  skuImages: ImageMetadata[];
  // disclaimers: any[];
  productName: string;
  threeDModel?: string;
  device: "mobile" | "desktop";
  productId?: string;
}

export function HandleModalProductImage(
  { mainImages, skuImages, productName, threeDModel, device, productId }:
    HandleProductImageProps,
) {
  useEffect(() => {
    if (IS_BROWSER) {
      const mainImagesEl = document.querySelectorAll(
        ".pdp-main-img",
      );
      if (mainImagesEl && mainImagesEl.length > 0) {
        mainImagesEl.forEach((img) => {
          img.addEventListener("click", () => {
            // handleOpenModal({
            //   modalType: "ProductImages",
            //   modalProps: {
            //     mainImages: mainImages,
            //     skuImages: skuImages,
            //     imageClickedIndex: Number(img.getAttribute("data-img-index")),
            //     // disclaimers: disclaimers,
            //     productName: productName,
            //   },
            //   contentModalClass:
            //     "w-dvw lg:w-[calc(100dvh_-_80px)] h-dvh lg:h-[calc(100dvh_-_80px)] rounded-xl overflow-hidden",
            // });
            // handleOpenModal({
            //     modalType: "ProductMedia",
            //     modalProps: {
            //         mainImages: mainImages,
            //         skuImages: skuImages,
            //         mode: "images",
            //         threeDModel: threeDModel,
            //         imageClickedIndex: Number(
            //             img.getAttribute("data-img-index"),
            //         ),
            //         // disclaimers: disclaimers,
            //         productName: productName,
            //         device: device,
            //         productId: productId,
            //     },
            //     contentModalClass:
            //         "w-dvw lg:w-[calc(100dvh_-_80px)] max-w-full h-dvh lg:h-[calc(100dvh_-_152px)] lg:rounded-xl overflow-hidden",
            // });
          });
        });
      }
      const imageContainer = document.getElementById("pdp-main-images");
      const bulletsContainer = document.getElementById(
        "main-image-bullets-container",
      );
      const bullet = document.getElementById("main-image-marker");
      if (imageContainer && bulletsContainer && bullet) {
        let isScrolling: ReturnType<typeof setTimeout> | undefined;

        imageContainer.addEventListener("scroll", () => {
          // Limpa o timer sempre que o scroll ocorre
          globalThis.clearTimeout(isScrolling);

          // Define o timer para que a função seja chamada somente quando o scroll parar
          isScrolling = setTimeout(() => {
            const scrollPercentage = imageContainer.scrollLeft /
              imageContainer.scrollWidth;
            console.log(imageContainer.scrollWidth);
            console.log(scrollPercentage);
            bullet.style.transform = `translateX(${(scrollPercentage *
              (bulletsContainer.clientWidth + 4))}px)`;
          }, 150);
        });
      }
    }
  }, []);
  return <></>;
}
