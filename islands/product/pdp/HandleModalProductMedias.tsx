import { useEffect } from "preact/hooks";
import handleOpenModal from "$islands/modal/handleOpenModal.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { ImageObject, VideoObject } from "apps/commerce/types.ts";

export interface HandleProductImageProps {
  mainImages: ImageObject[];
  mainVideo: VideoObject[];
  // disclaimers: any[];
  productName: string;
}

export function HandleModalProductMedias(
  { mainVideo, mainImages, productName }: HandleProductImageProps,
) {
  const mediaItems = [
    ...mainImages.map((item) => ({ ...item, isVideo: false })),
    ...mainVideo.map((item) => ({ ...item, isVideo: true })),
  ];

  const videoItem = mediaItems.find((item) => item.isVideo);
  const filteredMediaItems = mediaItems.filter((item) => !item.isVideo);
  if (videoItem) filteredMediaItems.splice(1, 0, videoItem);

  useEffect(() => {
    if (IS_BROWSER) {
      if (filteredMediaItems && filteredMediaItems.length > 0) {
        filteredMediaItems.forEach((img, index) => {
          const imgElement = document.querySelector(
            `.pdp-main-img[data-img-index="${index}"]`,
          );
          if (imgElement) {
            imgElement.addEventListener("click", () => {
              handleOpenModal({
                openModal: true,
                modalType: "ProductImages",
                modalProps: {
                  mainImages: filteredMediaItems,
                  imageClickedIndex: index,
                  // disclaimers: disclaimers,
                  productName: productName,
                },
                contentModalClass:
                  "w-dvw lg:w-[calc(100dvh_-_80px)] h-dvh lg:h-[calc(100dvh_-_80px)] rounded-xl overflow-hidden",
              });
            });
          }
        });
      }
      const imageContainer = document.getElementById("pdp-main-images");
      const bullet = document.getElementById("main-image-marker");
      if (imageContainer && bullet) {
        let isScrolling: any;

        imageContainer.addEventListener("scroll", () => {
          // Limpa o timer sempre que o scroll ocorre
          globalThis.clearTimeout(isScrolling);

          // Define o timer para que a função seja chamada somente quando o scroll parar
          isScrolling = setTimeout(() => {
            const scrollPercentage = imageContainer.scrollLeft /
              imageContainer.scrollWidth;
            bullet.style.transform = `translateX(${96 * scrollPercentage}px)`;
          }, 150);
        });
      }
    }
  }, []);
  return <></>;
}
