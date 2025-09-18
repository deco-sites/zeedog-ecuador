import { Device } from "@deco/deco/utils";
import MinicartProductCard from "$islands/product/Cards/MinicartProductCard.tsx";
import { minifyProduct } from "$sdk/global/format.ts";
import { useCart } from "zee/sdk/hooks/useCart.ts";
import { clx } from "site/sdk/clx.ts";
import { HTMLWidget } from "apps/admin/widgets.ts";
import { RemoveProductTexts } from "site/islands/bag/RemoveProduct.tsx";
import { AvailableLanguages } from "site/sdk/hooks/useLanguage.ts";

export interface MinicartProductCardListProps {
  class: string;
  device?: Device;
  readonly?: boolean;
  whereabout?: string;
  deleteProductText: HTMLWidget;
  productCartTexts: RemoveProductTexts;
  language: AvailableLanguages;
}

export function MinicartProductCardList(
  {
    class: _class = "",
    device,
    whereabout,
    deleteProductText,
    productCartTexts,
    language,
  }: MinicartProductCardListProps,
) {
  const { cart } = useCart();

  const items = cart.value?.lines.nodes;

  if (!items || items.length === 0) return null;

  return (
    <div class={`flex flex-col ${_class}`}>
      {items.map((product, index) => {
        const parsedItem = minifyProduct(product);

        return (
          <MinicartProductCard
            product={parsedItem}
            index={index}
            device={device}
            disableRemoveOption={false}
            disableSkuButton={false}
            language={language}
            removeSubscriptionCTA={false}
            deleteProductText={deleteProductText}
            productCartTexts={productCartTexts}
            class={clx(
              "border-gray-200",
              whereabout === "minicart" && "border-b",
            )}
          />
        );
      })}
    </div>
  );
}
