import AddBundleToCart from "$islands/bundle/AddBundleToCart.tsx";
import ProductBundleThumbs from "$islands/bundle/ProductBundleThumbs.tsx";
import ProductBundlePrices from "$islands/bundle/ProductBundlePrices.tsx";
import { useDevice } from "@deco/deco/hooks";

export default function ProductBundleSummary() {
  const isDesktop = useDevice() === "desktop";

  return (
    <div class="flex flex-col justify-between items-center lg:border lg:border-gray-200 lg:bg-white w-full lg:w-1/5 lg:rounded-md">
      <h2 class="hidden lg:flex justify-center font-bold text-black py-5 border-b border-gray-200 w-full">
        Compra juntos
      </h2>

      <aside class="flex flex-col justify-end w-full h-full lg:p-4 2xl:p-6">
        <div class="flex flex-col w-full h-full justify-center gap-6">
          <div class="flex flex-col items-center justify-center gap-5 w-full h-full">
            {/* Product Images */}
            <ProductBundleThumbs />

            {/* Prices */}
            <ProductBundlePrices isDesktopDevice={isDesktop} />
          </div>

          <AddBundleToCart />
        </div>
      </aside>
    </div>
  );
}
