import Icon from "$components/ui/Icon.tsx";
import Cart, { BagProps } from "$components/minicart/Cart.tsx";
import { useUI } from "$sdk/global/useUI.ts";
import { Device } from "@deco/deco/utils";
import { useCart } from "zee/sdk/hooks/useCart.ts";
import { EmptyCartProps } from "site/components/minicart/EmptyCart.tsx";
import { OrderDiscountsTextsProps } from "$components/order/OrderDiscounts.tsx";
import { ShippingBarTextsProps } from "site/components/header/ShippingBar.tsx";
import { AvailableLanguages } from "site/sdk/hooks/useLanguage.ts";

interface CartDrawerProps {
  device?: Device;
  language: AvailableLanguages;
  bag: BagProps & EmptyCartProps;
  shippingBar: ShippingBarTextsProps;
  coupon: OrderDiscountsTextsProps;
}

export default function CartDrawer(
  { device, bag, coupon, shippingBar, language = "en" }: CartDrawerProps,
) {
  const { cart } = useCart();
  const { displayCart } = useUI();

  return (
    <div class="drawer drawer-end">
      <input
        id="cart-drawer"
        type="checkbox"
        class="drawer-toggle"
        onChange={(e) => {
          displayCart.value = e.currentTarget.checked;
        }}
        checked={displayCart.value}
      />
      <label
        for="cart-drawer"
        aria-label="Cart"
        tabIndex={0}
        class="drawer-button group/cart relative flex items-center justify-center px-2 w-9 h-full hover:after:w-full after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-black after:transition-all cursor-pointer text-black"
      >
        {(cart.value?.totalQuantity ?? 0) > 0 && (
          <span class="absolute top-4 right-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-black text-white font-body-2xs-regular">
            {cart.value?.totalQuantity}
          </span>
        )}
        <Icon
          name="Bag"
          width={24}
          height={24}
          class="absolute opacity-100 visible group-hover/cart:opacity-0 group-hover/cart:invisible transition-all"
        />
        <Icon
          name="BagFilled"
          width={24}
          height={24}
          class="absolute opacity-0 invisible group-hover/cart:opacity-100 group-hover/cart:visible transition-all"
        />
      </label>
      <div class="drawer-side min-h-full h-dvh overflow-hidden z-[999]">
        <label
          for="cart-drawer"
          aria-label="close sidebar"
          class="drawer-overlay"
        >
        </label>
        <section class="flex flex-col w-full md:w-[500px] h-full min-h-full border-l border-gray-200 bg-white overscroll-contain">
          <Cart
            device={device}
            bag={bag}
            coupon={coupon}
            shippingBar={shippingBar}
            language={language}
          />
        </section>
      </div>
    </div>
  );
}
