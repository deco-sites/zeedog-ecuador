import { Search, type SearchProps } from "$islands/Search.tsx";
import CartDrawer from "$islands/CartDrawer.tsx";
import { Account } from "$components/header/shopping/Account.tsx";
import { Device } from "@deco/deco/utils";
import { useEffect, useState } from "preact/hooks";
import { invoke } from "site/runtime.ts";
import { AccountLoggedProps } from "site/components/header/account/AccountLoggedOutMO.tsx";
import { EmptyCartProps } from "site/components/minicart/EmptyCart.tsx";
import { MyProfileProps } from "site/components/header/AccountMO.tsx";
import { AccountLoggedInProps } from "site/components/header/account/AccountLoggedIn.tsx";
import { BagProps } from "site/components/minicart/Cart.tsx";
import { OrderDiscountsTextsProps } from "$components/order/OrderDiscounts.tsx";
import { ShippingBarTextsProps } from "site/components/header/ShippingBar.tsx";
import { AvailableLanguages } from "site/sdk/hooks/useLanguage.ts";

interface ShoppingBarProps {
  device?: Device;
  language: AvailableLanguages;
  account: AccountLoggedProps & MyProfileProps & AccountLoggedInProps;
  search: SearchProps;
  bag: BagProps & EmptyCartProps;
  shippingBar: ShippingBarTextsProps;
  coupon: OrderDiscountsTextsProps;
  hasUser?: boolean;
}

export default function ShoppingBar(
  { device, language, search, hasUser, account, bag, shippingBar, coupon }:
    ShoppingBarProps,
) {
  const [isLoggedIn, setIsLoggedIn] = useState(hasUser);

  /**
   * Foi implementado um disparo de evento ao carregar a página MyAccount no tema da Shopify
   * Assim conseguimos identificar se o usuário acabou de fazer login, mesmo que a página esteja no iframe
   * uls = User Logged Status
   */
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.data.uls) {
        const user = await invoke.site.loaders.user();
        setIsLoggedIn(user);
      }
    };

    globalThis.addEventListener("message", handleMessage);

    return () => {
      globalThis.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <nav class="w-full lg:w-auto flex justify-between lg:justify-center">
      <Search {...search} />
      <div class="flex">
        {/* <Wishlist /> */}
        <Account
          device={device}
          hasUser={isLoggedIn}
          account={account}
          language={language}
        />
        {/* <Cart /> */}
        <CartDrawer
          device={device}
          bag={bag}
          coupon={coupon}
          shippingBar={shippingBar}
          language={language}
        />
      </div>
    </nav>
  );
}
