import Image from "apps/website/components/Image.tsx";
import { ImageObject } from "apps/commerce/types.ts";
import { useDevice } from "@deco/deco/hooks";

interface BundleAnchorProps {
  mainProductImage: {
    image: string | ImageObject;
    name: string;
  };
  productsImages: {
    image: string | ImageObject;
    name: string;
  }[];
  completeText?: string;
}

export default function ProductBundleAnchor(
  { mainProductImage, productsImages, completeText }: BundleAnchorProps,
) {
  if (!productsImages || productsImages.length < 2) return null;

  const middleIndex = Math.floor(productsImages.length / 2);
  const firstColumnProducts = productsImages.slice(0, middleIndex);
  const secondColumnProducts = productsImages.slice(middleIndex);

  const device = useDevice();

  return (
    <div class="flex items-center justify-center w-full px-6 pt-8 lg:px-10 2xl:px-14">
      <a
        id={"bundle-anchor"}
        href="#bundle"
        class="group flex items-center justify-between w-full h-24 gap-1 text-gray-400 px-4 border border-gray-200 rounded-lg hover:text-black hover:border-black"
      >
        <span
          class={`font-body-2xs-bold text-left text-gray-500`}
        >
          {completeText || "Completa el conjunto"}
        </span>

        <div class="flex items-center justify-end gap-2 w-fit h-full shrink-0">
          <div class="flex items-center h-16">
            <Image
              src={mainProductImage.image as string}
              alt={`Bundle | ${mainProductImage.name}`}
              width={64}
              height={64}
              loading="lazy"
              decoding="async"
              class="border border-gray-200 rounded"
            />
            <span
              class="flex items-center justify-center w-0 ml-0 text-gray-500 duration-300 opacity-0 group-hover:opacity-100 group-hover:w-4 group-hover:ml-2 transition-all"
              aria-hidden="true"
            >
              +
            </span>
          </div>
          <ul
            id="bundle-anchor-column-1"
            class="bundle-anchor__column flex flex-col items-center justify-start gap-1 h-16 overflow-hidden scrollbar-none"
          >
            {firstColumnProducts.map((productImage, index) => {
              return (
                <li
                  key={index}
                  class="flex items-center gap-2 shrink-0 h-16 border border-gray-200 rounded overflow-hidden"
                >
                  <Image
                    src={productImage.image as string}
                    alt={`Bundle | ${productImage.name}`}
                    width={64}
                    height={64}
                    loading="lazy"
                    decoding="async"
                  />
                </li>
              );
            })}
          </ul>
          {device === "desktop" && (
            <ul
              id="bundle-anchor-column-2"
              class="bundle-anchor__column flex flex-col items-center justify-start gap-1 h-16 overflow-hidden scrollbar-none"
            >
              {secondColumnProducts.map((productImage, index) => {
                return (
                  <li
                    key={index}
                    class="flex items-center gap-2 shrink-0 h-16 border border-gray-200 rounded overflow-hidden"
                  >
                    <Image
                      src={productImage.image as string}
                      alt={`Bundle | ${productImage.name}`}
                      width={64}
                      height={64}
                      loading="lazy"
                      decoding="async"
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </a>
    </div>
  );
}
