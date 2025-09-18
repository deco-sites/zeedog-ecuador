import Image from "apps/website/components/Image.tsx";
import ProductSimilarsControls from "$islands/product/pdp/ProductSimilarsControls.tsx";
import { Device } from "@deco/deco/utils";
import { generateSrcSet } from "site/sdk/generateSrcSet.ts";
import type { SimilarProduct } from "site/loaders/shopify/product/getSimilarsProducts.ts";

export interface ProductSimilarsProps {
  similars: SimilarProduct[];
  device?: Device;
}

export const ProductSimilars = (
  { similars, device = "desktop" }: ProductSimilarsProps,
) => {
  const snapDirection =
    "snap-x snap-mandatory overflow-auto md:scrollbar-none scrollbar-none::-webkit-scrollbar max-md:pb-2 max-md:px-6 max-md:scroll-px-6";
  return (
    <div class="relative flex flex-col items-start gap-y-2.5 w-full lg:px-10 2xl:px-14 mt-5">
      <div class="relative flex gap-x-2.5 peer">
        {(similars.length > 5 && device === "desktop") && (
          <button
            // disabled={prevButtonDisabled}
            // onClick={onCarouselPrevPage}
            aria-label="prev-button"
            id="similars-prev-button"
            class="group flex items-center justify-center shrink-0 w-6 h-[60px] bg-white border border-gray-200 rounded hover:border-black cursor-pointer disabled:opacity-60 disabled:pointer-events-none"
          >
            <span class="w-2.5 h-2.5 rotate-45 border-l border-b border-gray-700 group-hover:border-black hover:border-black -mr-1">
            </span>
          </button>
        )}

        <div
          class={`similars relative flex gap-x-2.5 max-w-[100vw] md:max-w-[340px] transition-all duration-300 ${snapDirection}`}
        >
          {similars && similars.map((similar) => {
            const currentStyle = similar.current
              ? "border-black after:bg-black"
              : "border-gray-200 after:bg-gray-200";

            const soldOutStyle = !similar.availableForSale
              ? "grayscale after:content-[''] after:absolute after:block after:w-[86px] after:h-px after:rotate-45 after:origin-top-left after:transition-all"
              : "";

            return (
              <a
                href={`/products/${similar.handle}`}
                data-name={similar.title}
                data-discount={similar.max_sale_discount}
                class="similar-image group flex w-[60px] h-[60px] bg-gray-100 snap-start"
              >
                <div
                  class={`relative flex w-[60px] h-[60px] rounded border group-hover:after:bg-black group-hover:border-black ${currentStyle} ${soldOutStyle} overflow-hidden transition-all`}
                >
                  <Image
                    width={60}
                    height={60}
                    src={similar.featuredImage.url}
                    srcSet={generateSrcSet(
                      similar.featuredImage.url,
                      60,
                      60,
                    )}
                    alt={similar.featuredImage.altText}
                    class={`w-full h-full object-cover`}
                  />
                </div>
              </a>
            );
          })}
        </div>

        {(similars.length > 5 && device === "desktop") && (
          <button
            // disabled={prevButtonDisabled}
            // onClick={onCarouselPrevPage}
            id="similars-next-button"
            class="group flex items-center justify-center shrink-0 w-6 h-[60px] bg-white border border-gray-200 rounded hover:border-black cursor-pointer disabled:opacity-60 disabled:pointer-events-none"
          >
            <span class="w-2.5 h-2.5 rotate-45 border-t border-r border-gray-700 group-hover:border-black hover:border-black -ml-1">
            </span>
          </button>
        )}
      </div>
      <div class="similars-info flex items-center justify-center gap-2 h-6 opacity-0 invisible transition-all -translate-y-1 peer-hover:opacity-100 peer-hover:visible peer-hover:translate-y-0">
        <span
          id="similar-name"
          class="font-body-2xs-regular text-gray-500 shrink-0"
        >
          {/* estampa */}
        </span>
        <span
          id="similar-discount"
          class="flex items-center px-1 py-0.5 bg-red-300 rounded font-body-3xs-bold text-white shrink-0"
        >
          {/* desconto */}
        </span>
      </div>
      {device !== "mobile" && <ProductSimilarsControls />}
    </div>
  );
};
