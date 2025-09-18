import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect } from "preact/hooks";

export default function HandleClickedImageScroll(
  { imageClickedIndex }: { imageClickedIndex: number },
) {
  useEffect(() => {
    if (IS_BROWSER) {
      const image = document.querySelector(
        ".modal-pdp-main-img[data-img-index='" + imageClickedIndex +
          "']",
      );
      if (image) {
        if (globalThis.matchMedia("(max-width: 1023px)").matches) {
          image.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
          });
        } else image.scrollIntoView(true);
      }
      const imageContainer = document.getElementById("modal-main-images");
      const bullet = document.getElementById("modal-image-marker");
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
