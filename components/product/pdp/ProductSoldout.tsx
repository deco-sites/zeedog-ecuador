import { SKU } from "$sdk/types/global.ts";
import { Signal } from "@preact/signals";
import { clx } from "site/sdk/clx.ts";

export interface ProductSouldoutTextsProps {
  soldOutText: string;
  soldOutMessageText: string;
  seeSimilarsProductsText: string;
}

export interface ProductSoldoutProps {
  available: boolean;
  categoryURL: string;
  skuSelected: Signal<SKU | null>;
  noSkuSelectedAlert: Signal<boolean>;
  whereabout?: string;
  productId: string;
  texts: ProductSouldoutTextsProps;
}

export default function ProductSoldout({
  available,
  categoryURL,
  skuSelected,
  whereabout,
  texts,
}: ProductSoldoutProps) {
  // const shouldNotShowForm = skuSelected.value &&
  //   skudIdsRegisteredOnSoldOut.value.includes(skuSelected.value?.id);

  // const handleEmail = (e: any) => {
  //   email.value = e.target.value;
  // };

  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  //   if (!skuSelected.value) {
  //     noSkuSelectedAlert.value = true;
  //     return;
  //   }

  //   const { id } = skuSelected.value;

  //   try {
  //     skudIdsRegisteredOnSoldOut.value = [
  //       ...skudIdsRegisteredOnSoldOut.value,
  //       id,
  //     ];

  //     // const salesforceProps: NotifyMeDexInterface = {
  //     //   _deExternalKey: NotifyMeDex,
  //     //   client_email: email.value.toLowerCase(),
  //     //   product_id: productId,
  //     //   sku_id: id,
  //     //   created_at: formatDate(),
  //     // };
  //     // await useSalesforce(salesforceProps);
  //   } catch (err) {
  //     console.error({ err });
  //     throw new Error("Failed");
  //   }
  // };

  return !available ||
      (skuSelected.value && skuSelected.value.inventoryLevel === 0)
    ? (
      <div
        class={clx(
          "flex flex-col px-6 py-8 border-b border-gray-200 order-1",
          whereabout !== "modal" && "lg:px-10 2xl:px-14",
        )}
      >
        <p class="font-bold text-gray-600">{texts.soldOutText}</p>

        <p class="font-body-xs-regular my-5 text-gray-600">
          {texts.soldOutMessageText}
        </p>

        {categoryURL && (
          <a
            href={categoryURL}
            class="flex items-center justify-center border border-black h-12 rounded-full max-w-[350px] cursor-pointer bg-white font-title-xs-bold text-black"
          >
            {texts.seeSimilarsProductsText}
          </a>
        )}
      </div>
    )
    : <></>;
}
