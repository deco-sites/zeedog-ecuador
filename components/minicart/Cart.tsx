import LazyIcon from "$components/ui/LazyIcon.tsx";
import EmptyCart, {
  EmptyCartProps,
} from "site/components/minicart/EmptyCart.tsx";
import { formatPrice } from "$sdk/global/format.ts";
import { MinicartProductCardList } from "$islands/product/Cards/MinicartProductCardList.tsx";
import {
  OrderDiscounts,
  OrderDiscountsTextsProps,
} from "$components/order/OrderDiscounts.tsx";
import { Device } from "@deco/deco/utils";
import { useCart } from "zee/sdk/hooks/useCart.ts";
import {
  ShippingBar,
  ShippingBarTextsProps,
} from "site/components/header/ShippingBar.tsx";
import { RichText } from "apps/admin/widgets.ts";
import { RemoveProductTexts } from "site/islands/bag/RemoveProduct.tsx";
import { AvailableLanguages } from "site/sdk/hooks/useLanguage.ts";

export interface BagProps {
  title: string;
  subtotalText: string;
  totalText: string;
  checkoutText: string;
  deleteProductText: RichText;
  productCartTexts: RemoveProductTexts;
}

interface CartProps {
  device?: Device;
  language: AvailableLanguages;
  bag: BagProps & EmptyCartProps;
  shippingBar: ShippingBarTextsProps;
  coupon: OrderDiscountsTextsProps;
}

export default function Cart(
  { device, bag, shippingBar, coupon, language }: CartProps,
) {
  const { cart } = useCart();

  const checkoutHref = "https://shop.zeedog.pe";

  const checkoutUrl = cart.value?.checkoutUrl
    ? `${checkoutHref}${new URL(cart.value.checkoutUrl).pathname}`
    : "";

  const subtotal = cart.value?.cost.subtotalAmount.amount || 0;
  const total = cart.value?.cost.totalAmount.amount || 0;
  const isEmpty = cart.value?.totalQuantity === 0;

  return (
    <div
      class="flex flex-col justify-center items-center h-full overflow-hidden bg-white"
      style={{ minWidth: "calc(min(100vw, 500px))", maxWidth: "500px" }}
    >
      <div class="flex items-center justify-between flex-shrink-0 w-full h-12 pl-5 border-b border-gray-200">
        <h4 class="font-body-sm-bold">{bag.title}</h4>
        <label
          for="cart-drawer"
          aria-label="Cart"
          tabIndex={0}
          class="drawer-button flex items-center justify-center w-14 h-full cursor-pointer"
        >
          <span class="relative flex items-center justify-center size-6 rounded-full bg-gray-100">
            <LazyIcon name="Close" size={16} />
          </span>
        </label>
      </div>
      {isEmpty ? <EmptyCart {...bag} /> : (
        <>
          <MinicartProductCardList
            class="grow overflow-y-auto w-full h-auto p-4 gap-4 lg:p-0 lg:gap-0 bg-white"
            device={device}
            whereabout="minicart"
            deleteProductText={bag.deleteProductText}
            productCartTexts={bag.productCartTexts}
            language={language}
          />

          {/* Cart Footer */}
          <div class="w-full bg-gray-100">
            {shippingBar && (
              <ShippingBar whereabout="minicart" texts={shippingBar} />
            )}
            <ul class="flex flex-col divide-y divide-white">
              <li class="flex items-center justify-between p-4">
                <p class="font-body-xs-bold text-black">
                  {bag.subtotalText}
                </p>
                <p class="font-body-xs-regular text-black">
                  {formatPrice(subtotal)}
                </p>
              </li>
              <li class="w-full p-4">
                <OrderDiscounts whereabout="minicart" coupon={coupon} />
              </li>
              <li class="flex flex-col gap-y-3 w-full p-4">
                <div class="flex justify-between">
                  <p class="font-body-xs-bold text-black">{bag.totalText}</p>
                  <div class="flex flex-col items-end">
                    <span class="font-body-xs-bold text-black">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
                <a
                  href={checkoutUrl}
                  class="button-primary w-full h-11"
                >
                  {bag.checkoutText}
                </a>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
