import ProductBundleSummary from "./ProductBundleSummary.tsx";
import ProductBundleCard from "$components/product/card/ProductBundleCard.tsx";
import LazyIcon from "$components/ui/LazyIcon.tsx";
import ProductBundleSelectionControls from "$islands/bundle/ProductBundleSelectionControls.tsx";
import { Product } from "apps/commerce/types.ts";

const BundleColumnControls = ({ totalProducts }: { totalProducts: number }) => {
  return (
    <div class="absolute bottom-0 lg:-bottom-12 flex items-center justify-center gap-x-3 z-30">
      <button
        aria-label="Anterior"
        class="bundle__button--prev flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 bg-white text-white"
      >
        <LazyIcon
          name="ArrowLeft"
          width={18}
          height={18}
          class="text-black"
        />
      </button>
      <ul id="bundle-bullets" class="flex gap-1">
        {Array.from({ length: totalProducts }).map((_, index) => (
          <li
            data-index={index}
            class={`bundle__bullet ${
              index === 0 ? "bundle__bullet--active" : ""
            } flex items-center justify-center w-2 h-2 rounded-full`}
          >
            <span class="border border-black w-1.5 h-1.5 rounded-full" />
          </li>
        ))}
      </ul>
      <button
        aria-label="Siguiente"
        class="bundle__button--next flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 bg-white text-white"
      >
        <LazyIcon
          name="ArrowRight"
          width={18}
          height={18}
          class="text-black"
        />
      </button>
    </div>
  );
};

export interface ProductBundleProps {
  mainProduct: Product;
  bundleProducts_1: Product[];
  bundleProducts_2: Product[];
}

export default function ProductBundle(
  { mainProduct, bundleProducts_1 = [], bundleProducts_2 = [] }:
    ProductBundleProps,
) {
  if (!bundleProducts_1 || bundleProducts_1.length === 0) return null;

  const mainBundleProduct = {
    image: mainProduct?.image?.[0]?.url ?? "",
    productId: mainProduct?.productID ?? "",
    skuId: mainProduct?.sku ?? "",
    price: mainProduct?.offers?.lowPrice ?? 0,
    url: mainProduct.url ?? "",
  };

  const firstColumnBundleItems = bundleProducts_1.map((item) => ({
    image: item?.image?.[0]?.url ?? "",
    productId: item?.productID ?? "",
    skuId: item?.sku ?? "",
    price: item?.offers?.lowPrice ?? 0,
    url: item.url ?? "",
  }));

  const secondColumnBundleItems = bundleProducts_2.map((item) => ({
    image: item?.image?.[0]?.url ?? "",
    productId: item?.productID ?? "",
    skuId: item?.sku ?? "",
    price: item?.offers?.lowPrice ?? 0,
    url: item.url ?? "",
  }));

  const bundleItems = [...firstColumnBundleItems, ...secondColumnBundleItems];

  const totalBundleItems = [mainBundleProduct, ...bundleItems];

  const startedProducts = [
    firstColumnBundleItems[0],
    secondColumnBundleItems[0],
  ];

  const selectedBundleProducts = [mainBundleProduct, ...startedProducts];

  return (
    <section
      id="bundle"
      class="w-full bg-gray-100 px-6 lg:px-10 py-16 lg:py-24 max-container-auto rounded-b-xl"
    >
      <h2 class="flex lg:hidden justify-center font-title-sm-bold text-gray-500 mb-6 w-full">
        COMPRA JUNTO
      </h2>

      <div class="flex flex-col lg:flex-row max-lg:items-center justify-center gap-6 w-full">
        <div class="relative flex items-center justify-end w-full lg:w-1/5">
          <ProductBundleCard
            product={mainProduct}
            index={0}
            device="desktop"
            itemListName=""
            class="w-full"
          />
        </div>
        <LazyIcon
          name="Plus"
          width={20}
          height={20}
          class="h-auto text-black"
        />

        <div class="bundle-column relative flex items-center justify-center w-full lg:w-1/5 rounded-lg">
          <div
            class={`bundle-column__container relative flex items-center justify-start w-full ${
              bundleProducts_1.length > 1 ? "max-lg:pb-10" : ""
            } overflow-hidden`}
          >
            {bundleProducts_1.map((product, index) => {
              return (
                <ProductBundleCard
                  product={product}
                  index={index}
                  device="desktop"
                  itemListName=""
                  class="w-full"
                />
              );
            })}
          </div>
          {bundleProducts_1.length > 1 && (
            <BundleColumnControls
              totalProducts={bundleProducts_1.length}
            />
          )}
        </div>
        <div class="bundle-column relative flex items-center justify-center w-full lg:w-1/5 rounded-lg">
          <div
            class={`bundle-column__container relative flex items-center justify-start w-full ${
              bundleProducts_2.length > 1 ? "max-lg:pb-10" : ""
            } overflow-hidden`}
          >
            {bundleProducts_2.map((product, index) => {
              return (
                <ProductBundleCard
                  product={product}
                  index={index}
                  device="desktop"
                  itemListName=""
                  class="w-full"
                />
              );
            })}
          </div>
          {bundleProducts_2.length > 1 && (
            <BundleColumnControls
              totalProducts={bundleProducts_2.length}
            />
          )}
        </div>

        <span class="flex items-center h-auto font-title-xl-medium text-black">
          =
        </span>

        <ProductBundleSummary />

        <ProductBundleSelectionControls
          totalBundleItems={totalBundleItems}
          preSelectedBundleItems={selectedBundleProducts}
        />
      </div>
    </section>
  );
}
