import { formatPrice } from "$sdk/global/format.ts";
import { selectedBundleItems } from "$sdk/global/signalStore.ts";

export default function ProductBundlePrices(
  { isDesktopDevice }: { isDesktopDevice: boolean },
) {
  if (!selectedBundleItems.value || selectedBundleItems.value.length === 0) {
    return <span class="loading loading-spinner text-black"></span>;
  }

  const products = selectedBundleItems.value ?? [];

  const definitivePrice = products.reduce((total, { price }) => {
    return total + price;
  }, 0);

  return (
    <div class="flex flex-col items-center justify-center text-center w-full gap-1">
      <span class="text-gray-500 font-body-2xs-regular lg:font-body-xs-regular">
        {isDesktopDevice ? "Desde" : "Subtotal:"}
      </span>

      <b class="text-black font-body-sm-bold">
        {formatPrice(definitivePrice)}
      </b>
      {
        /* <p class="text-gray-500 font-body-2xs-regular lg:font-body-xs-regular">
                {`(até 3x de ${formatPrice(definitivePrice / 3)} s/ juros)`}
            </p> */
      }
    </div>
  );
}
