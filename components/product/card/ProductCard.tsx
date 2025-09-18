import { JSX } from "preact";
import { useSignal } from "@preact/signals";
import { Device } from "@deco/deco/utils";
import Image from "apps/website/components/Image.tsx";
import ProductCardPrice from "$islands/product/ProductCardPrice.tsx";
import ProductCardQuickBuy from "$islands/product/ProductCardQuickBuy.tsx";
import DiscountTag from "$islands/DiscountTag.tsx";
import ClusterTags, {
  ClusterTagsTextsProps,
} from "$components/product/card/ClusterTags.tsx";
import { getSkusData } from "$sdk/formatProduct.ts";
import { Product } from "apps/commerce/types.ts";
import AnalyticsIsland from "site/islands/AnalyticsIsland.tsx";
import { selectItemEvent } from "site/sdk/analytics/events/selectItem.ts";
import { slugify } from "$sdk/utils/slugify.ts";
import { clx } from "site/sdk/clx.ts";
import { generateSrcSet } from "$sdk/generateSrcSet.ts";
import { addLanguageToUrl } from "site/sdk/global/formatUrls.ts";
import { AvailableLanguages } from "site/sdk/hooks/useLanguage.ts";

export type ProductCardTextsProps = {
  soldOutText: string;
  addToCartText: string;
  startingAtText: string;
} & ClusterTagsTextsProps;

interface ProductCardImageProps {
  mainImage: string;
  hoverImage?: string;
  alt: string;
  productUrl: string;
  index: number;
  device: Device;
}

function SoldOutTag(
  { soldOutText }: { soldOutText: ProductCardTextsProps["soldOutText"] },
) {
  return (
    <span class="relative flex items-center h-5 px-1.5 rounded bg-gray-500 text-white font-body-3xs-bold md:font-body-2xs-bold">
      {soldOutText}
    </span>
  );
}

function ProductImage(
  { mainImage, hoverImage, alt, productUrl, index, device }:
    ProductCardImageProps,
) {
  const eagerLoad = device === "mobile" || device === "tablet"
    ? index <= 4
    : index === 0;

  return (
    <a
      class="relative flex md:w-full h-full group/img overflow-x-auto snap-mandatory snap-x scrollbar-none overflow-y-hidden"
      href={productUrl}
    >
      <Image
        src={mainImage}
        alt={alt}
        width={200}
        height={200}
        srcSet={generateSrcSet(mainImage, 200, 200)}
        sizes="(max-width: 480px) 150px, (max-width: 768px) 200px, (max-width: 1024px) 300px, 400px"
        class="relative md:absolute w-full min-w-full object-cover z-10 snap-center overflow-hidden"
        decoding="async"
        fetchPriority={eagerLoad ? "high" : "auto"}
        loading={eagerLoad ? "eager" : "lazy"}
        preload={eagerLoad}
      />
      {hoverImage && (
        // this div exists to prevent the hover image leak behind the main, this "padding: 4px" below, do the job
        <div class="relative md:absolute w-full min-w-full md:p-1 md:group-hover/img:p-0 md:opacity-0 md:group-hover/img:opacity-100 transition-all z-40 md:z-0 md:group-hover/img:z-20 snap-center">
          <Image
            src={hoverImage}
            alt={alt}
            width={200}
            height={200}
            srcSet={generateSrcSet(hoverImage, 200, 200)}
            sizes="(max-width: 480px) 150px, (max-width: 768px) 200px, (max-width: 1024px) 300px, 400px"
            class="w-full min-w-full h-full object-cover overflow-hidden"
            decoding="async"
            fetchPriority="auto"
            loading="lazy"
          />
          {device !== "desktop" && (
            <span class="absolute right-[calc(50%_-_8px)] bottom-2 w-1 h-1 bg-gray-500 rounded-full z-40 appear-fr shadow-[0_0_1px_2px_#666]" />
          )}
        </div>
      )}
      {device !== "desktop" && (
        <span class="absolute left-[calc(50%_-_8px)] bottom-2 w-1 h-1 bg-gray-500 rounded-full z-40 appear-fl shadow-[0_0_1px_2px_#666]" />
      )}
    </a>
  );
}

interface ProductNameProps {
  name: string;
  props?: JSX.HTMLAttributes<HTMLHeadingElement>;
}

function ProductName(
  { name, props }: ProductNameProps,
) {
  return (
    <h3
      class={clx(
        "block md:flex md:flex-col text-gray-500 px-3 md:px-5 font-body-2xs-regular md:font-body-2xs-regular",
        props?.class?.toString(),
      )}
    >
      {name}
    </h3>
  );
}

export interface ProductCardProps {
  product: Product;
  index: number;
  device: Device;
  class?: string;
  // analytics
  itemListName: string;
  texts: ProductCardTextsProps;
  language: AvailableLanguages;
}

export default function ProductCard(
  { product, index, device, class: _class = "", itemListName, texts, language }:
    ProductCardProps,
) {
  const { hasVariant } = product.isVariantOf || {};
  const tags = product.isVariantOf?.additionalProperty?.filter((tag) =>
    tag.name === "TAG"
  ).map((tag) => tag.value as string);
  const skus = getSkusData(hasVariant || []);

  const [cheapestSku] = [...skus].sort((a, b) => a.lowPrice - b.lowPrice);
  const allSamePrice = skus.every(({ lowPrice }) =>
    lowPrice === skus[0].lowPrice
  );
  const shouldShowTag = skus.length > 1 && !allSamePrice;

  const currentSku = useSignal(cheapestSku);
  const startingAtDisplay = useSignal(shouldShowTag);

  const cardId = `analytics-product-card-${
    slugify(itemListName)
  }-${product.isVariantOf?.productGroupID}`;

  const available = hasVariant?.some((variant) =>
    (variant?.offers?.offers?.[0]?.inventoryLevel?.value ?? 0) > 0
  );

  const { hoverImage } = product.additionalProperty?.reduce(
    (acc, property) => {
      if (property.name === "hover_image") acc.hoverImage = property.value;
      return acc;
    },
    {} as { hoverImage?: string },
  ) || {};

  const url = addLanguageToUrl({ url: product.isVariantOf?.url, language });

  return (
    <div
      class={clx("group relative flex flex-col self-end shrink-0", _class)}
      id={cardId}
    >
      <AnalyticsIsland
        event={selectItemEvent({
          itemListName,
          items: [{
            item_name: product.isVariantOf?.name || "name error",
            item_id: product.isVariantOf?.productGroupID,
            quantity: 1,
          }],
        })}
        clickId={cardId}
      />
      {(device === "mobile" && tags && tags.length > 0) && (
        <ClusterTags
          class="flex md:hidden w-fit h-6 pt-0.5 rounded-t -mb-1.5"
          tags={tags}
          texts={texts}
        />
      )}

      <div class="flex flex-col max-w-lg bg-gray-100 rounded-lg overflow-hidden">
        {/* PRODUCT IMAGE CONTAINER*/}
        <div
          class="relative flex items-center justify-center w-full max-w-lg bg-gray-200"
          style={{ "aspect-ratio": "1/1" }}
        >
          <div class="absolute top-0 flex items-center justify-end gap-1.5 w-full pt-3 pr-3 md:pt-4 md:pr-4 z-50">
            {(device !== "mobile" && tags && tags.length > 0) && (
              <ClusterTags
                class="hidden md:flex items-center h-5 rounded"
                tags={tags}
                texts={texts}
              />
            )}

            {!available ? <SoldOutTag soldOutText={texts.soldOutText} /> : (
              <>
                {currentSku.value && <DiscountTag currentSku={currentSku} />}
              </>
            )}
          </div>
          <ProductImage
            mainImage={product.image?.[0]?.url || ""}
            // TODO: imagem do hover
            hoverImage={hoverImage || ""}
            alt={product.isVariantOf?.name + " | Zee.Dog"}
            productUrl={url}
            index={index}
            device={device}
          />
          {/* Placeholder dos Bullets no mobile */}
          {(product.image?.[0]?.url && device !== "desktop") &&
            (
              <div class="absolute bottom-2 flex items-center justify-center gap-[9px] z-40">
                <span class="w-1 h-1 border-gray-500 border rounded-full" />
                <span class="w-1 h-1 border-gray-500 border rounded-full" />
              </div>
            )}
        </div>
        {/* PRODUCT INFOS */}
        <div class="relative flex flex-col justify-between w-full h-[120px] md:h-36 py-3 lg:py-5 z-20">
          {device === "desktop" && (
            <ProductCardQuickBuy
              productId={product["@id"] as string}
              skus={skus}
              currentSku={currentSku}
              startingAt={startingAtDisplay}
              bgColor="bg-gray-100"
              addToCartText={texts.addToCartText}
            />
          )}

          <ProductName
            name={product.isVariantOf?.name || ""}
            // TODO: adicionar nome da estampa
            // printName={nameHighlight || ""}
          />
          {currentSku.value && (
            <ProductCardPrice
              currentSku={currentSku}
              startingAt={startingAtDisplay}
              available={available}
              startingAtText={texts.startingAtText}
            />
          )}
        </div>
      </div>
    </div>
  );
}
