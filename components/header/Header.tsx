import { IDepartmentMenu, ITerm } from "$sdk/types/header.ts";
import { MenuDK } from "$components/header/menu/MenuDK.tsx";
import { useDevice } from "@deco/deco/hooks";
import MenuDrawer from "$components/header/menu/MenuDrawer.tsx";
import {
  menuItemHover,
  menuNewsItemHover,
} from "$components/header/HeaderScripts.ts";
import ShoppingBar from "$islands/header/ShoppingBar.tsx";
import { DepartmentBar } from "$components/header/department/DepartmentBar.tsx";
import { HeaderSearchContainer } from "$islands/HeaderSearchContainer.tsx";
import { AppContext } from "site/apps/site.ts";
import { SectionProps } from "@deco/deco";
import ZeeGlobal from "zee/islands/ZeeGlobal.tsx";
import {
  ShippingBar,
  ShippingBarTextsProps,
} from "site/components/header/ShippingBar.tsx";
import { SearchProps } from "site/islands/Search.tsx";
import { AccountLoggedProps } from "site/components/header/account/AccountLoggedOutMO.tsx";
import { MyProfileProps } from "site/components/header/AccountMO.tsx";
import { AccountLoggedInProps } from "site/components/header/account/AccountLoggedIn.tsx";
import { HeaderSearchInputProps } from "site/components/header/search/HeaderSearchInput.tsx";
import { SearchRecommedationTextsProps } from "site/components/header/search/SearchRecommendation.tsx";
import { EmptyCartProps } from "site/components/minicart/EmptyCart.tsx";
import { BagProps } from "site/components/minicart/Cart.tsx";
import { OrderDiscountsTextsProps } from "$components/order/OrderDiscounts.tsx";
import { ISubmenuTexts } from "site/components/header/submenu/SubmenuNewsMO.tsx";
import { ProductCardTextsProps } from "site/components/product/card/ProductCard.tsx";
import { useLanguage } from "site/sdk/hooks/useLanguage.ts";
// import LanguageSelector from "site/components/ui/LanguageSelector.tsx";

export interface HeaderProps {
  departmentMenus?: IDepartmentMenu[];
  /**
   * @maxItems 05
   */
  mostWantedLinks: ITerm[];
  account: AccountLoggedProps & MyProfileProps & AccountLoggedInProps;
  search: SearchProps & HeaderSearchInputProps & SearchRecommedationTextsProps;
  productCardTexts: ProductCardTextsProps;
  bag: BagProps & EmptyCartProps;
  shippingBar: ShippingBarTextsProps;
  coupon: OrderDiscountsTextsProps;
  submenuTexts: ISubmenuTexts;
}

export default function Header(
  {
    departmentMenus,
    mostWantedLinks = [],
    search,
    hasUser,
    language,
    account,
    bag,
    coupon,
    shippingBar,
    submenuTexts,
    productCardTexts,
  }: SectionProps<
    typeof loader
  >,
) {
  const device = useDevice();

  const menu = departmentMenus &&
    (departmentMenus.find((menu) => menu.departmentName === "zeedog") ??
      departmentMenus[0]);

  return (
    <>
      <ZeeGlobal />

      <header
        id="header"
        class="fixed top-0 flex flex-col items-center justify-center w-full bg-white border-b border-gray-200 z-[202]"
      >
        <div class="flex items-center justify-center w-full bg-gray-100 h-8 lg:h-[3.75rem] folded-header:border-b-0 folded-header:hidden transition-all lg:order-none xs:order-3">
          <div class="flex items-center justify-between w-full max-w-[1920px] mx-auto h-full">
            {shippingBar && (
              <ShippingBar whereabout="header" texts={shippingBar} />
            )}
          </div>
        </div>
        {device === "mobile" && <DepartmentBar language={language} />}

        <div class="relative flex order-1 justify-between w-full max-w-[1920px] h-[70px] px-6 3xl:px-0">
          {(menu && device === "desktop") && (
            <MenuDK departmentMenus={menu} language={language} />
          )}

          {(departmentMenus && device !== "desktop") && (
            <MenuDrawer
              departmentMenus={departmentMenus}
              department="zeedog"
              device="mobile"
              mostWantedLinks={mostWantedLinks}
              myProfile={account}
              searchRecommendationTexts={{
                bestSellerText: search.bestSellerText,
                bestSellerUrl: search.bestSellerUrl,
                mostSearchedText: search.mostSearchedText,
              }}
              productCardTexts={productCardTexts}
              submenuTexts={submenuTexts}
              language={language}
            />
          )}

          <ShoppingBar
            device={device}
            language={language}
            search={search}
            coupon={coupon}
            shippingBar={shippingBar}
            hasUser={hasUser}
            account={account}
            bag={bag}
          />
        </div>

        <HeaderSearchContainer
          device={device ?? "mobile"}
          mostWantedLinks={mostWantedLinks}
          search={search}
          productCardTexts={productCardTexts}
          language={language}
        />

        <script
          type="module"
          dangerouslySetInnerHTML={{ __html: menuItemHover() }}
        />
        <script
          type="module"
          dangerouslySetInnerHTML={{ __html: menuNewsItemHover() }}
        />
      </header>
    </>
  );
}

export const loader = async (
  props: HeaderProps,
  req: Request,
  ctx: AppContext,
) => {
  const url = new URL(req.url);

  const user = await ctx.invoke.site.loaders.user();
  const languageByPathname = useLanguage(url);

  return {
    ...props,
    hasUser: user,
    language: languageByPathname || "en",
  };
};
