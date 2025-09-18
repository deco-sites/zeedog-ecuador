import { effect, useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { preSelectedSize } from "$sdk/global/signalStore.ts";
import { useUI } from "$sdk/global/useUI.ts";
import { SizeImage, SizeTable } from "$sdk/types/product.ts";

export interface ModalTableSizesProps {
  sizeTable: SizeTable;
  sizeImages?: SizeImage[];
  hiddenImage?: boolean;
  productName?: string;
  sizesText: string;
}

export const ModalTableSizes = ({
  sizeTable,
  sizeImages,
  productName,
  hiddenImage = false,
  sizesText,
}: ModalTableSizesProps) => {
  const imageIndex = useSignal(0);
  const { resetBreedSelect } = useUI();

  const slide = (element: HTMLElement) => {
    element.setAttribute(
      "style",
      `transform: translateX(${imageIndex.value * (-element.offsetWidth)}px)`,
    );
  };
  const reactiveSlide = () => {
    const carousel = document.getElementById("size-image-carousel");
    const image = document.querySelector(
      `#size-image-carousel img[data-sku="${preSelectedSize.value}"]`,
    );
    if (!carousel || !image) return;
    imageIndex.value = Number(image.getAttribute("data-index"));
    slide(carousel);
  };

  useEffect(() => {
    if (
      IS_BROWSER && sizeImages && sizeImages.length > 1 &&
      preSelectedSize.value
    ) {
      reactiveSlide();
    }
  }, []);

  const handleCarouselSlide = (
    evt: Event,
    direction: "right" | "left" | "targeted",
    imagesLength: number,
  ) => {
    preSelectedSize.value = undefined;
    resetBreedSelect();
    const carousel = document.getElementById("size-image-carousel");
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
      const image = document.querySelector(
        `#size-image-carousel img[data-index="${imageIndex.value}"]`,
      );
      if (image) {
        preSelectedSize.value = image.getAttribute("data-sku");
      }
    }
  };

  effect(() => {
    if (IS_BROWSER && sizeImages && sizeImages.length > 1) {
      reactiveSlide();
    }
  });

  const [header, ...content] = sizeTable;

  return (
    <div class="w-full h-full">
      <div class="flex items-end justify-center shrink-0 w-full h-14 border-b border-gray-200">
        <h3 class="font-title-sm-bold text-black border-b-2 border-black p-3">
          {sizesText}
        </h3>
      </div>
      <div
        class={`flex flex-col md:flex-row justify-start md:justify-center gap-4 w-full h-[calc(100%_-_112px)] overflow-auto p-8 ${
          hiddenImage ? "items-center" : "items-start"
        }`}
      >
        <div class="flex flex-col w-full md:w-fit gap-y-4">
          {/* TODO :: re-add breed selector when the breed-sizes.json get updated */}
          {
            /* {hasBreedSelect && (
            <BreedSelect
              whereabout={whereabout}
              breedSizeSuggestion={breedSizeSuggestion}
            />
          )} */
          }
          {
            /* {(preSelectedSize.value) &&
            (
              <p id="suggested-size-label" class="w-fit font-body-xs-regular text-black hidden">
                Tamanho recomendado: <b>{preSelectedSize.value}</b>
              </p>
            )} */
          }
          <div class="w-full md:w-fit overflow-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-200">
                  {header.map((column, index) => {
                    return (
                      <th
                        class={`${
                          index === 0 ? "w-auto min-w-16" : "min-w-28"
                        } border border-gray-300 py-3 px-2.5 font-body-2xs-bold uppercase text-gray-600 text-center`}
                      >
                        {column}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {content.map((row) => (
                  <tr
                    data-size-row={row[0].toUpperCase()}
                    class={`transition-all ${
                      row[0].toLowerCase() ===
                          preSelectedSize.value
                        ? `bg-gray-100`
                        : `transparent`
                    }`}
                  >
                    {row.map((column, index) => {
                      if (index === 0) {
                        return (
                          <td class="w-auto min-w-20 py-3 px-2.5 border border-gray-300 font-body-2xs-bold text-gray-600 uppercase text-center" // id={`${prodId}-size-table-${column}`}
                          >
                            {column}
                          </td>
                        );
                      }
                      return (
                        <td class="py-3 px-2.5 border border-gray-300 font-body-xs-regular text-black text-center">
                          {column}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {(sizeImages && sizeImages.length > 0) && !hiddenImage && (
          <div class="relative flex items-center w-full md:w-80 overflow-hidden rounded-md shrink-0">
            <div
              id="size-image-carousel"
              class="flex transition-all"
            >
              {sizeImages.map((image, index) => (
                <img
                  data-index={index}
                  data-sku={image.sku.toLowerCase()}
                  src={image.url || image.urlImagem}
                  alt={productName + " | Imagem medida " +
                    image.sku}
                  class="w-full md:w-80"
                />
              ))}
            </div>

            {sizeImages.length > 1 && (
              <>
                <button
                  aria-label="size-image-prev-button"
                  class="absolute left-1 flex items-center justify-center w-6 h-6"
                  onClick={(evt) =>
                    handleCarouselSlide(
                      evt,
                      "left",
                      sizeImages.length,
                    )}
                  disabled={imageIndex.value === 0}
                >
                  <span
                    class={`block w-3 h-3 -mr-1 border-t-2 border-l-2 ${
                      imageIndex.value === 0
                        ? "border-gray-300"
                        : "border-black"
                    } -rotate-45 pointer-events-none`}
                  >
                  </span>
                </button>

                <button
                  aria-label="size-image-next-button"
                  class="absolute right-1 flex items-center justify-center w-6 h-6"
                  onClick={(evt) =>
                    handleCarouselSlide(
                      evt,
                      "right",
                      sizeImages.length,
                    )}
                  disabled={imageIndex.value ===
                    sizeImages.length - 1}
                >
                  <span
                    class={`block w-3 h-3 -mr-1 border-b-2 border-r-2 ${
                      imageIndex.value ===
                          sizeImages.length - 1
                        ? "border-gray-300"
                        : "border-black"
                    } -rotate-45 origin-bottom pointer-events-none`}
                  >
                  </span>
                </button>

                <div class="absolute bottom-3 flex justify-center gap-2 w-full">
                  {sizeImages.map((_, index) => (
                    <button
                      aria-label="size-image-target-button"
                      class={`w-1.5 h-1.5 rounded-full ${
                        imageIndex.value === index ? "bg-black" : "bg-gray-300"
                      }`}
                      data-bullet-index={index}
                      onClick={(evt) =>
                        handleCarouselSlide(
                          evt,
                          "targeted",
                          sizeImages.length,
                        )}
                    >
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
