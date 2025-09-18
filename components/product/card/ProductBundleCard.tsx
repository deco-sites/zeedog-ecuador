import { JSX } from "preact/jsx-runtime";
import { useSignal } from "@preact/signals";
import Image from "apps/website/components/Image.tsx";
import ProductCardPrice from "$islands/product/ProductCardPrice.tsx";
import DiscountTag from "$islands/DiscountTag.tsx";
// import ClusterTags from "$components/product/card/ClusterTags.tsx";
import { getAvailability, getSkusData } from "$sdk/formatProduct.ts";
// import AnalyticsIsland from "$islands/AnalyticsIsland.tsx";
import { Device } from "@deco/deco/utils";
import ProductBundleCardSkus from "$islands/bundle/ProductBundleCardSkus.tsx";
import { Product } from "apps/commerce/types.ts";

interface ProductCardImageProps {
  mainImage: string;
  hoverImage?: string;
  alt: string;
  productUrl: string;
  index: number;
  device: Device;
}

function SoldOutTag() {
  return (
    <span class="relative flex items-center h-5 px-1.5 rounded bg-gray-500 text-white font-body-3xs-bold md:font-body-2xs-bold">
      ESGOTADO
    </span>
  );
}

function ProductImage(
  { mainImage, hoverImage, alt, productUrl, index, device }:
    ProductCardImageProps,
) {
  // const containerRef = useRef<HTMLAnchorElement | null>(null);
  const eagerLoad = device === "mobile" || device === "tablet"
    ? index <= 4
    : index === 0;

  const imgSize = device === "desktop" ? 400 : 200;
  return (
    <a
      class="relative flex md:w-full h-full group/img overflow-x-auto snap-mandatory snap-x scrollbar-none"
      href={productUrl}
    >
      <Image
        src={mainImage}
        alt={alt}
        width={imgSize}
        height={imgSize}
        // sizes="(min-width: 320px) 250px, 400px"
        class={`relative md:absolute min-w-full w-full object-cover z-10 snap-center`}
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
            width={imgSize}
            height={imgSize}
            class="w-full h-full object-cover"
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
  printName: string;
  props?: JSX.HTMLAttributes<HTMLHeadingElement>;
}

function ProductName(
  { name = "Nome do produto", printName = "Estampa", props }: ProductNameProps,
) {
  return (
    <h3
      class={`flex font-body-2xs-regular md:font-body-2xs-regular text-gray-500 px-3 md:px-5 ${props?.class}`}
    >
      {name.replace(printName, "")}
    </h3>
  );
}

export interface ProductCardProps {
  product: Product;
  index: number;
  device: Device;
  class?: string;
  itemListName: string;
}

export default function ProductBundleCard(
  { product, index, device, class: _class = "", itemListName }:
    ProductCardProps,
) {
  const { isVariantOf, image: images = [] } = product;
  // const tags = hasVariant?.additionalProperty?.filter((tag) =>
  //     tag.name === "TAG"
  // ).map((tag) => tag.value as string);

  const skus = getSkusData(isVariantOf?.hasVariant || []);

  const {
    available,
  } = getAvailability(skus);

  const bestDiscountSku = skus.reduce((minSku, sku) => {
    return sku.lowPrice < minSku.lowPrice ? sku : minSku;
  }, skus[0]);

  const firstSkuAvailable = skus.findIndex((sku) => sku.inventoryLevel > 0);
  const validSkuIndex = firstSkuAvailable === -1 ? 0 : firstSkuAvailable;

  const prioritySku = bestDiscountSku.inventoryLevel > 0
    ? bestDiscountSku
    : skus[validSkuIndex];

  const currentSku = useSignal(prioritySku);

  const hasDifferentHighPrices = skus.length > 1 &&
    skus[0].highPrice !== skus[1].highPrice;
  const startingAtDisplay = useSignal(hasDifferentHighPrices);
  const productNameLower = product?.name?.toLowerCase() ?? "";
  const isKitchen = productNameLower.includes("kitchen") ||
    productNameLower.includes("topper") ||
    productNameLower.includes("refeição");

  const cardBg = isKitchen ? "bg-sand-100" : "bg-white";
  // const event: ExtendedEvents = {
  //     name: "select_item" as const,
  //     params: {
  //         item_list_name: itemListName || "",
  //         items: [{
  //             item_name: product.name,
  //             item_id: product.productGroupID,
  //             quantity: 1,
  //         }],
  //         select_item_context: "bundle",
  //     },
  // };

  const cardId = `analytics-product-card-${product.productID ?? ""}`;

  return (
    <div
      data-index={index}
      data-product-id={product.productID ?? ""}
      class={`bundle__card group flex flex-col self-end shrink-0 max-w-sm transition-all ${_class}`}
    >
      {/* <AnalyticsIsland event={event} clickId={cardId} /> */}
      {
        /* {(device === "mobile" && tags && tags.length > 0) && (
                <ClusterTags
                    class="flex md:hidden w-fit h-6 pt-0.5 rounded-t -mb-1.5"
                    tags={tags}
                    texts={{
                        bestSeller: "Mais vendido",
                        newProduct: "Novo",
                    }}
                />
            )} */
      }

      <div
        class={`flex flex-row lg:flex-col max-w-lg ${cardBg} rounded-lg border border-gray-200 overflow-hidden`}
      >
        {/* PRODUCT IMAGE CONTAINER*/}
        <div
          class="relative flex items-center justify-center w-48 lg:w-full max-w-lg bg-gray-200"
          style={{ "aspect-ratio": "1/1" }}
          id={cardId}
        >
          <div class="absolute top-0 flex items-center justify-end gap-1.5 w-full pt-3 pr-3 md:pt-4 md:pr-4 z-40">
            {
              /* {(device !== "mobile" && tags && tags.length > 0) && (
                            <ClusterTags
                                class="hidden md:flex items-center h-5 rounded"
                                tags={tags}
                                texts={{
                                    bestSeller: "Mais vendido",
                                    newProduct: "Novo",
                                }}
                            />
                        )} */
            }

            {!available ? <SoldOutTag /> : (
              <>
                {currentSku.value && <DiscountTag currentSku={currentSku} />}
              </>
            )}
          </div>
          <ProductImage
            mainImage={images?.[0].url ?? ""}
            // TODO: imagem do hover
            hoverImage={images?.[0].url ?? ""}
            alt={product.name + " | Zee.Dog"}
            productUrl={product.url as string}
            index={index}
            device={device}
          />
          {/* Placeholder dos Bullets no mobile */}
          {(product.image && device !== "desktop") &&
            (
              <div class="absolute bottom-2 flex items-center justify-center gap-[9px] z-40">
                <span class="w-1 h-1 border-gray-500 border rounded-full" />
                <span class="w-1 h-1 border-gray-500 border rounded-full" />
              </div>
            )}
        </div>
        {/* PRODUCT INFOS */}
        <div
          class={`relative flex flex-col justify-between w-full h-32 lg:h-40 ${
            isKitchen ? "bg-sand-100" : "bg-white"
          } py-3 lg:py-4 z-20`}
        >
          <ProductName
            name={product?.isVariantOf?.name ?? ""}
            // TODO: adicionar nome da estampa
            printName=""
          />

          <ProductBundleCardSkus
            productId={product.productID ?? ""}
            skus={skus}
            currentSku={currentSku}
            startingAt={startingAtDisplay}
            bgColor={cardBg}
          />

          {currentSku.value && (
            <ProductCardPrice
              currentSku={currentSku}
              startingAt={startingAtDisplay}
              available={available}
              startingAtText="A partir de"
            />
          )}
        </div>
      </div>
    </div>
  );
}
