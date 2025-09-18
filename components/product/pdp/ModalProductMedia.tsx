import { ImageMetadata } from "zee/sdk/types/zee.ts";
// import Product3D from "site/components/product/pdp/3d-model/Product3D.tsx";
import { effect, useSignal } from "@preact/signals";
import Image from "apps/website/components/Image.tsx";
import { generateSrcSet } from "site/sdk/generateSrcSet.ts";
import Icon from "site/components/ui/Icon.tsx";
import { useEffect } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import LazyIcon from "site/components/ui/LazyIcon.tsx";
import { Tooltip, TooltipContent } from "site/components/ui/Tooltip.tsx";
import { ComposedImages } from "site/components/product/pdp/ProductImages.tsx";
import HandleImageSwapModal from "site/islands/product/pdp/HandleImageSwapModal.tsx";
// import { useAnalytics } from "zee/sdk/hooks/useAnalytics.tsx";

export interface ModalProductMediaProps {
  mainImages: ImageMetadata[];
  skuImages: ImageMetadata[];
  productName: string;
  imageClickedIndex?: number;
  mode: "images" | "3d";
  threeDModel?: string;
  device: "mobile" | "desktop";
  productId?: string;
}

export default function ModalProductMedia(
  { modalProps }: { modalProps: ModalProductMediaProps },
) {
  if (!modalProps) return null;
  const {
    mainImages,
    skuImages,
    productName,
    imageClickedIndex,
    device,
    mode,
    threeDModel,
    productId,
  } = modalProps;

  //   const { sendEvent } = useAnalytics();
  const modeState = useSignal(mode);
  const imageIndex = useSignal(imageClickedIndex || 0);

  // por conta da diferença de comportamento entre desktop e mobile, o slide é feito de forma diferente, no desktop usamos o transform pra navegar
  const slide = (element: HTMLElement) => {
    if (device === "desktop") {
      element.setAttribute(
        "style",
        `transform: translateX(${
          imageIndex.value *
          (-element.offsetWidth - 2 / mainImages.length)
        }px)`,
      );
    }
    if (device === "mobile") {
      element.scrollTo({
        left: imageIndex.value * element.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const reactiveSlide = () => {
    const carousel = document.getElementById("main-images-carousel");
    const image = document.querySelector(
      `#main-images-carousel .modal-pdp-main-img[data-img-index="${
        imageIndex.value || 0
      }"]`,
    );
    if (!carousel || !image) return;
    imageIndex.value = Number(image.getAttribute("data-img-index"));
    slide(carousel);
  };

  useEffect(() => {
    if (!IS_BROWSER) return;

    const infoOverlay = document.getElementById("info-3d-model-overlay");
    if (infoOverlay && modeState.value === "3d") {
      setTimeout(() => {
        infoOverlay.classList.add(
          "animate-fade-out-toast",
          "pointer-events-none",
          "z-0",
        );
      }, 3000);
    }
    if (
      mainImages && mainImages.length > 1 &&
      imageClickedIndex && imageClickedIndex > 0
    ) {
      reactiveSlide();
    }
    const carousel = document.getElementById("main-images-carousel");
    if (carousel) {
      let isScrolling: ReturnType<typeof setTimeout> | undefined;

      carousel.addEventListener("scroll", () => {
        // Limpa o timer sempre que o scroll ocorre
        globalThis.clearTimeout(isScrolling);

        // Define o timer para que a função seja chamada somente quando o scroll parar
        isScrolling = setTimeout(() => {
          const scrollPosition = carousel.scrollLeft;
          const itemWidth = carousel.offsetWidth;
          const newIndex = Math.round(scrollPosition / itemWidth);
          imageIndex.value = newIndex;
        }, 50);
      });
    }
  }, []);

  const handleCarouselSlide = (
    evt: Event,
    direction: "right" | "left" | "targeted",
    imagesLength: number,
  ) => {
    const carousel = document.getElementById("main-images-carousel");
    if (carousel) {
      if (direction === "targeted") {
        imageIndex.value = Number(
          (evt.target as HTMLElement).getAttribute(
            "data-bullet-index",
          ),
        );
      }
      if (direction === "left") {
        imageIndex.value = imageIndex.value > 0
          ? imageIndex.value - 1
          : imageIndex.value;
      }
      if (direction === "right") {
        imageIndex.value = imageIndex.value >= imagesLength - 1
          ? imageIndex.value
          : imageIndex.value + 1;
      }
    }
  };

  effect(() => {
    if (IS_BROWSER && mainImages && mainImages.length > 1) {
      reactiveSlide();
    }
  });

  return (
    <div class="relative flex flex-col items-center w-full h-dvh lg:h-full">
      <div class="flex items-center justify-center shrink-0 w-full h-14 bg-white lg:border-b border-gray-200">
      </div>
      <div class="relative flex items-center justify-center w-full h-full bg-gray-100">
        {threeDModel && (
          <>
            <button
              class="absolute left-6 top-6 lg:top-11 lg:right-11 lg:left-auto flex items-center justify-center gap-x-2 h-8 px-3 rounded-full bg-white border border-gray-200 text-black font-title-xs-heavy lg:font-title-sm-bold z-20"
              onClick={() => {
                modeState.value = modeState.value === "images"
                  ? "3d"
                  : "images";
                const infoOverlay = document.getElementById(
                  "info-3d-model-overlay",
                );
                if (infoOverlay && modeState.value === "3d") {
                  setTimeout(() => {
                    infoOverlay.classList.add(
                      "animate-fade-out-toast",
                      "pointer-events-none",
                      "z-0",
                    );
                  }, 3000);

                  //   sendEvent({
                  //     name: "view_3d_model",
                  //     params: {
                  //       product_name: productName,
                  //       product_id: productId,
                  //     },
                  //   });
                }
              }}
            >
              {modeState.value === "images"
                ? (
                  <>
                    <Icon
                      name="Box"
                      width={20}
                      height={20}
                    />
                    VER 3D
                  </>
                )
                : "VER FOTOS"}
            </button>
            <div
              class={`${
                modeState.value === "3d"
                  ? "opacity-100 visible z-10"
                  : "opacity-0 invisible z-0"
              } absolute flex items-center justify-center w-[calc(100%_-_48px)] h-[calc(100vw_-_48px)] lg:w-4/5 lg:h-4/5 transition-all duration-300 overflow-hidden`}
            >
              <div
                id="info-3d-model-overlay"
                class="absolute flex flex-col items-center gap-y-2 w-40 h-40 pt-8 bg-black bg-opacity-70 rounded-full text-white paragragh-bold text-center"
              >
                <LazyIcon
                  name={device === "mobile" ? "Arrow360" : "Mouse"}
                  width={32}
                  height={32}
                  class="text-white"
                />
                {device === "mobile"
                  ? "Toque e arraste para interagir"
                  : "Clique e arraste para interagir"}
              </div>
              {/* <Product3D url={`${threeDModel}?bgColor=transparent`} /> */}
            </div>
          </>
        )}
        {device === "desktop" && modeState.value === "3d" && (
          <Tooltip class="absolute bottom-4 right-4 lg:bottom-6 lg:right-6 z-20">
            <LazyIcon name="Help" width={24} height={24} />
            {
              /* <TooltipContent
              mode="arrow"
              class="text-white text-center font-body-2xs-regular bg-gray-700 !-top-24 !-left-[108px] max-w-64 lg:max-w-72 after:bg-gray-700 rounded-lg !p-4 before:!top-auto before:!bottom-2 after:!hidden"
            >
              Clique e arraste para interagir, e use o scroll do mouse para
              aumentar ou diminuir o zoom.
            </TooltipContent> */
            }
          </Tooltip>
        )}
        <HandleImageSwapModal />
        <div
          class={`${
            modeState.value === "images"
              ? "opacity-100 visible z-10"
              : "opacity-0 invisible z-0"
          } absolute flex flex-col lg:flex-row items-start justify-center lg:justify-start gap-24 lg:gap-7 w-full h-full lg:p-6`}
        >
          <div class="absolute max-lg:bottom-8 lg:relative flex flex-col gap-6 order-2 lg:order-1 w-full lg:w-24 shrink-0 lg:overflow-auto lg:h-full lg:pr-1 custom-scrollbar">
            <div class="flex lg:flex-col justify-center gap-2 w-full max-lg:px-4">
              {mainImages.map(({ url, alt, metadata }, index) => {
                const skuImage = skuImages.find((image) =>
                  image.metadata?.image_index_on_sku === index
                );
                return (
                  <div
                    class={`modal-pdp-main-img relative flex items-center justify-center cursor-pointer w-14 lg:w-full border ${
                      imageIndex.value === index
                        ? "border-black brightness-90"
                        : "border-gray-200"
                    } hover:border-black rounded overflow-hidden transition-all`}
                  >
                    {metadata && "video" in metadata &&
                      metadata.video && (
                      <span class="absolute flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 bg-black bg-opacity-50 rounded-full pointer-events-none z-20">
                        <LazyIcon
                          name="PlayFilled"
                          width={20}
                          height={20}
                          class="text-white w-4 h-4 lg:w-5 lg:h-5"
                        />
                      </span>
                    )}
                    {skuImage && (
                      <Image
                        class="absolute top-0 left-0 w-full object-cover"
                        src={skuImage.url}
                        alt={skuImage.alt}
                        width={96}
                        height={96}
                        srcSet={generateSrcSet(
                          skuImage.url,
                          96,
                          96,
                        )}
                        loading="lazy"
                        fetchPriority="low"
                        data-sku-trigger={skuImage
                          .metadata?.image_on_sku
                          ?.toLowerCase()}
                      />
                    )}
                    <Image
                      src={url}
                      srcSet={generateSrcSet(url, 96, 96)}
                      alt={alt}
                      width={96}
                      height={96}
                      data-bullet-index={index}
                      class="w-full z-0"
                      onClick={(evt) => {
                        handleCarouselSlide(
                          evt,
                          "targeted",
                          mainImages.length,
                        );
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div class="flex lg:hidden justify-center gap-1 w-full">
              {mainImages.map((_, index) => (
                <button
                  aria-label="size-image-target-button"
                  class={`w-2 h-2 rounded-full ${
                    imageIndex.value === index ? "bg-black" : "bg-gray-300"
                  }`}
                  data-bullet-index={index}
                  onClick={(evt) =>
                    handleCarouselSlide(
                      evt,
                      "targeted",
                      mainImages.length,
                    )}
                >
                </button>
              ))}
            </div>
          </div>
          <div class="relative flex items-center order-1 w-full aspect-square max-w-full max-lg:-mt-14 lg:border lg:border-gray-200 lg:rounded-lg bg-white lg:overflow-hidden box-border">
            <div
              id="main-images-carousel"
              class="flex transition-all box-border snap-x snap-mandatory scrollbar-none max-lg:overflow-auto"
            >
              {
                /* <ComposedImages
                mainImages={mainImages}
                skuImages={skuImages}
                whereabout="modal"
                threeDModel={threeDModel}
                productName={productName}
                device={device}
              /> */
              }
            </div>
            {device === "desktop" &&
              (
                <>
                  <button
                    aria-label="size-image-prev-button"
                    class={`absolute left-4 flex items-center justify-center bg-white rounded-full shadow w-8 h-8 ${
                      imageIndex.value === 0 ? "hidden" : "flex"
                    }`}
                    onClick={(evt) =>
                      handleCarouselSlide(
                        evt,
                        "left",
                        mainImages.length,
                      )}
                    disabled={imageIndex.value === 0}
                  >
                    <LazyIcon
                      name="ArrowLeft"
                      width={20}
                      height={20}
                    />
                  </button>

                  <button
                    aria-label="size-image-next-button"
                    class={`absolute right-4 flex items-center justify-center bg-white rounded-full shadow w-8 h-8 ${
                      imageIndex.value ===
                          mainImages.length - 1
                        ? "hidden"
                        : "flex"
                    }`}
                    onClick={(evt) =>
                      handleCarouselSlide(
                        evt,
                        "right",
                        mainImages.length,
                      )}
                    disabled={imageIndex.value ===
                      mainImages.length - 1}
                  >
                    <LazyIcon
                      name="ArrowRight"
                      width={20}
                      height={20}
                    />
                  </button>
                </>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
