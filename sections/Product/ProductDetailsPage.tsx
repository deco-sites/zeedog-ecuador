import { ProductDetailsPage } from "apps/commerce/types.ts";
import { useDevice } from "@deco/deco/hooks";
import {
  getAvailability,
  getProductMetafields,
  getSkusData,
  parseSizeChartMetafield,
} from "site/sdk/formatProduct.ts";
import ProductImages from "site/components/product/pdp/ProductImages.tsx";
import ProductLifestyleImages from "site/components/product/pdp/ProductLifestyleImages.tsx";
import Breadcrumb from "$components/Breadcrumb.tsx";
import { ProductTags } from "$components/product/pdp/ProductTags.tsx";
import { ProductQuantity } from "$islands/product/pdp/ProductQuantity.tsx";
import {
  ProductDescriptionTextsProps,
  ProductInformation,
} from "$components/product/pdp/ProductInformation.tsx";
import { PRODUCT_METAFIELDS } from "site/sdk/global/constants.ts";
import ProductSkus, {
  type ProductSkusTextsProps,
} from "$islands/product/pdp/ProductSkus.tsx";
import ProductSoldout, {
  type ProductSouldoutTextsProps,
} from "$islands/product/pdp/ProductSoldout.tsx";
import ProductPrice, {
  ProductPriceTextsProps,
} from "$islands/product/pdp/ProductPrice.tsx";
import {
  pdpNoSKUSelectedAlert,
  pdpSkuQuantity,
  pdpSkuSelected,
  pdpStartingAt,
} from "$sdk/global/signalStore.ts";
import SizeTableButton from "site/islands/product/SizeTableButton.tsx";
import AnalyticsIsland from "site/islands/AnalyticsIsland.tsx";
import { fromCatalogToAnalyticsItem } from "site/sdk/analytics.tsx";
import { viewItemEvent } from "site/sdk/analytics/events/viewItem.ts";
import {
  ShippingBar,
  ShippingBarTextsProps,
} from "site/components/header/ShippingBar.tsx";
import SearchNotFound, {
  SearchNotFoundTextsProps,
} from "site/components/search/SearchNotFound.tsx";
import { capitalize } from "site/sdk/global/signalStore.ts";
import { clx } from "site/sdk/clx.ts";
import { ProductTypeProps } from "site/loaders/productType.ts";
import { CMSSizeTable } from "site/sdk/types/product.ts";
import BreedSelect from "$islands/BreedSelect.tsx";
import { BreedSelectTextsProps } from "site/components/BreedSelect.tsx";
import { ClusterTagsTextsProps } from "site/components/product/card/ClusterTags.tsx";
import { ProductSimilars } from "$components/product/pdp/ProductSimilars.tsx";
import { SectionProps } from "@deco/deco";
import { AppContext } from "site/apps/site.ts";
import { SimilarProduct } from "site/loaders/shopify/product/getSimilarsProducts.ts";
import { Product } from "apps/commerce/types.ts";
import ProductBundleAnchor from "site/components/product/pdp/bundle/ProductBundleAnchor.tsx";
import ProductBundle from "site/components/product/pdp/bundle/ProductBundle.tsx";

type ProductDetailsPageTexts =
  & {
    sizesText: string;
    sizeTableText: string;
    amountText: string;
    viewMoreText: string;
    completeText: string;
  }
  & ProductDescriptionTextsProps
  & ProductPriceTextsProps
  & SearchNotFoundTextsProps
  & BreedSelectTextsProps
  & ProductSouldoutTextsProps
  & ProductSkusTextsProps
  & ClusterTagsTextsProps
  & ShippingBarTextsProps;

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
  cmsSizeList: ProductTypeProps | null;
  /** @hide true */
  sizeChart?: CMSSizeTable | null;
  /** @hide true */
  similarProducts: SimilarProduct[];
  /** @hide true */
  productBundle_1: Product[];
  /** @hide true */
  productBundle_2: Product[];
  texts: ProductDetailsPageTexts;
}

export default function ProductDetails(
  { page, sizeChart, texts, similarProducts, productBundle_1, productBundle_2 }:
    SectionProps<typeof loader>,
) {
  if (!page || !page.product) return <SearchNotFound texts={texts} />;

  const device = useDevice();

  const { breadcrumbList, product } = page;
  const {
    isVariantOf,
    name,
    description,
    image,
    video,
    url,
    additionalProperty: productAdditionalProperty,
  } = product;

  const productDescription =
    product?.additionalProperty?.find((item) => item.name === "descriptionHtml")
      ?.value ?? description;

  const skus = getSkusData(isVariantOf?.hasVariant || []);

  const {
    available,
    firstAvailableSku,
    hasStartingAt,
  } = getAvailability(skus);

  const images = isVariantOf?.image || [];
  const productName = isVariantOf?.name || name || "";
  const tags = isVariantOf?.additionalProperty?.filter((tag) =>
    tag.name === "TAG"
  ).map((tag) => tag.value as string);

  const metafields = getProductMetafields(productAdditionalProperty);

  // const name_highlight =
  //   (metafields[PRODUCT_METAFIELDS.nameHighlight] as string)?.replace(
  //     /^./,
  //     (match) => match.toUpperCase(),
  //   );

  const experience_images =
    metafields[PRODUCT_METAFIELDS.lifestyleImages] as string[] ||
    [];

  const sizeChartMetafield = metafields[PRODUCT_METAFIELDS.sizeChart] &&
    JSON.parse(
      metafields[PRODUCT_METAFIELDS.sizeChart] as string,
    );

  const parsedSizeChart = sizeChartMetafield && parseSizeChartMetafield(
    sizeChartMetafield as string[],
  );

  const finalSizeChart: CMSSizeTable | null | undefined = sizeChart || {
    table: [],
    sizeImages: [],
  };
  if (parsedSizeChart) finalSizeChart.table = parsedSizeChart;

  // const formattedProductName = name_highlight
  //   ? productName.replace(capitalize(name_highlight), "").trim()
  //   : productName;

  const breedSizeMetafield = metafields[PRODUCT_METAFIELDS.breed];

  const breed_size_suggestion = Array.isArray(breedSizeMetafield)
    ? breedSizeMetafield[0]
    : breedSizeMetafield?.toString();

  const extra_information =
    metafields[PRODUCT_METAFIELDS.productDetails] as string ||
    "";

  const analyticsProduct = fromCatalogToAnalyticsItem(page);

  const hasSimilarProducts = similarProducts && similarProducts.length > 0;

  const availableBundleProducts = [
    ...(productBundle_1 ?? []),
    ...(productBundle_2 ?? []),
  ].filter((item) => {
    const skus = getSkusData(item?.isVariantOf?.hasVariant || []);
    const { available } = getAvailability(skus);
    return available;
  });

  const hasAvailableProductsInBundle = availableBundleProducts.length > 0;

  const bundleAnchorImages = availableBundleProducts.map((product) => ({
    image: product.image?.[0]?.url ?? "",
    name: product.name ?? "",
  }));

  return (
    <>
      <AnalyticsIsland
        event={viewItemEvent({
          value: skus[firstAvailableSku]?.lowPrice || skus[0]?.lowPrice,
          items: analyticsProduct,
        })}
      />
      <section class="flex flex-col w-full max-w-full">
        <div class="flex flex-col max-md:overflow-hidden lg:flex-row w-full max-container-auto bg-gray-100">
          <div
            class={`relative flex justify-center items-start w-full lg:w-1/2 2xl:w-2/3 lg:py-10 h-auto border-r border-r-gray-200 bg-gray-100`}
          >
            <ProductImages
              images={images}
              video={video ?? undefined}
              productName={productName}
              device={device}
            />
          </div>

          <div
            id="pdp-infobox"
            class={`relative flex flex-col w-full lg:w-1/2 2xl:w-1/3 pt-6 lg:pt-10 3xl:border-r 3xl:border-gray-200 bg-white`}
          >
            <div class="relative lg:absolute lg:top-px left-6 lg:left-10 2xl:left-14 flex gap-2.5 w-max mb-3.5 lg:mb-0">
              {(tags && tags.length > 0) && (
                <ProductTags
                  tags={tags}
                  discount={skus[firstAvailableSku]
                    ?.discount || 0}
                  texts={texts}
                  class="rounded-b rounded-t lg:rounded-b lg:rounded-t-none"
                />
              )}
            </div>

            <div class="relative flex flex-col">
              <Breadcrumb
                breadcrumb={breadcrumbList}
                isPDP={true}
              />

              {/* PRODUCT NAME */}
              <h1 class="w-full font-title-lg-bold mt-3 px-6 lg:px-10 2xl:px-14">
                {productName}
              </h1>

              {hasSimilarProducts && (
                <ProductSimilars similars={similarProducts} device={device} />
              )}

              <div
                class={`flex flex-col gap-y-4 w-max px-6 lg:px-10 2xl:px-14 ${
                  !hasSimilarProducts ? "my-6" : "mt-3 mb-6"
                }`}
              >
                <div class="flex flex-col items-start">
                  <div
                    class={clx(
                      "flex items-center justify-start gap-x-3 w-max",
                      breed_size_suggestion && "mb-3",
                    )}
                  >
                    <span class="font-body-xs-regular">
                      {texts.sizesText}
                      {skus.length > 1 ? "s" : ""}
                    </span>
                    {(finalSizeChart && finalSizeChart?.table.length > 0) &&
                      (
                        <SizeTableButton
                          sizeTable={finalSizeChart.table}
                          sizeImages={finalSizeChart
                            .sizeImages}
                          productName={productName}
                          sizeTableText={texts.sizeTableText}
                          sizesText={texts.sizesText}
                        />
                      )}
                  </div>
                  {/* TODO :: re-add breed selector when the breed-sizes.json get updated */}
                  {(breed_size_suggestion &&
                    skus.length > 1) && (
                    <BreedSelect
                      texts={texts}
                      whereabout="pdp"
                      breedSizeSuggestion={breed_size_suggestion}
                    />
                  )}
                </div>

                <ProductSkus
                  listOfSKUs={skus}
                  department={"zeedog"}
                  texts={texts}
                  skuSelected={pdpSkuSelected}
                  noSkuSelectedAlert={pdpNoSKUSelectedAlert}
                  startingAt={pdpStartingAt}
                  whereabout="pdp"
                />
              </div>
            </div>
            {texts && <ShippingBar whereabout="pdp" texts={texts} />}
            <ProductSoldout
              available={available}
              categoryURL={breadcrumbList
                .itemListElement[
                  breadcrumbList.itemListElement.length - 2
                ]
                ?.item ?? ""}
              skuSelected={pdpSkuSelected}
              noSkuSelectedAlert={pdpNoSKUSelectedAlert}
              productId={isVariantOf?.productGroupID ?? ""}
              texts={texts}
            />

            <ProductQuantity
              available={available}
              currentSku={skus[firstAvailableSku]}
              skuQuantity={pdpSkuQuantity}
              skuSelected={pdpSkuSelected}
              amountText={texts.amountText}
            />

            <ProductPrice
              available={available}
              mainSku={skus[firstAvailableSku]}
              hasDiffPrices={!!hasStartingAt}
              skuSelected={pdpSkuSelected}
              skuQuantity={pdpSkuQuantity}
              noSkuSelectedAlert={pdpNoSKUSelectedAlert}
              startingAt={pdpStartingAt}
              texts={texts}
            />

            {hasAvailableProductsInBundle && (
              <ProductBundleAnchor
                mainProductImage={{
                  image: images[0].url ?? "",
                  name: name ?? "",
                }}
                productsImages={bundleAnchorImages}
                completeText={texts.completeText}
              />
            )}

            <ProductInformation
              productName={productName}
              productUrl={url!}
              mainImage={image?.[0]?.url ?? ""}
              details={extra_information}
              description={productDescription}
              device={device ?? "desktop"}
              texts={texts}
            />
          </div>
        </div>

        {experience_images && experience_images.length > 0 && (
          <ProductLifestyleImages
            images={experience_images}
            productName={productName}
            device={device ?? "desktop"}
            viewMoreText={texts.viewMoreText}
          />
        )}

        {hasAvailableProductsInBundle && (
          <ProductBundle
            mainProduct={product}
            bundleProducts_1={productBundle_1}
            bundleProducts_2={productBundle_2}
          />
        )}
      </section>
    </>
  );
}

export async function loader(
  props: Props,
  req: Request,
  ctx: AppContext,
) {
  const url = new URL(req.url);

  if (!props.page || !props.page.product) {
    ctx.response.status = 404;
    return props;
  }

  const productAdditionalProperty = props.page.product.additionalProperty ?? [];
  const metafields = getProductMetafields(productAdditionalProperty);

  // Helper to safely get product type
  const getProductType = () => {
    const type = productAdditionalProperty.find(
      (property) => property.name === "productType",
    )?.value;
    return typeof type === "string" ? type.toLowerCase() : "";
  };

  // Helper to get product info from CMS
  const getProductInfo = (productType: string) =>
    props.cmsSizeList?.productTypeContent?.find(
      (type) => type.productTypeName.toLowerCase() === productType,
    );

  const productType = getProductType();
  const productInfo = getProductInfo(productType);
  const sizeChart = productInfo?.sizeTable;

  // Extract metafields
  const similarProductsIds =
    Array.isArray(metafields[PRODUCT_METAFIELDS.similarProducts])
      ? metafields[PRODUCT_METAFIELDS.similarProducts] as string[]
      : [];

  const productBundleMetafieldId =
    typeof metafields[PRODUCT_METAFIELDS.productBundle] === "string"
      ? metafields[PRODUCT_METAFIELDS.productBundle] as string
      : null;

  // Fetch similar products and product bundle in parallel
  const [similarProducts, productBundle] = await Promise.all([
    similarProductsIds.length > 0
      ? ctx.invoke.site.loaders.shopify.product.getSimilarsProducts({
        similarProductsIds,
      })
      : Promise.resolve([]),
    productBundleMetafieldId
      ? ctx.invoke.site.loaders.shopify.product.getProductBundle({
        metaobjectId: productBundleMetafieldId,
      })
      : Promise.resolve({ product_bundle_one: [], product_bundle_two: [] }),
  ]);

  return {
    ...props,
    url,
    sizeChart,
    similarProducts,
    productBundle_1: productBundle.product_bundle_one,
    productBundle_2: productBundle.product_bundle_two,
  };
}
