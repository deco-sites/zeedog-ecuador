import { IDepartmentMenu, ITerm } from "$sdk/types/header.ts";
import { MenuDrawerOpenButton } from "$components/header/menu/drawer/MenuDrawerOpenButton.tsx";
import { MenuDrawerCloseOverlay } from "$components/header/menu/drawer/MenuDrawerCloseOverlay.tsx";
import { Department } from "$sdk/types/global.ts";
import { Device } from "@deco/deco/utils";
import { MenuDrawerContent } from "$zeedog/components/header/menu/drawer/MenuDrawerContent.tsx";
import { MenuDrawerSearchContainer } from "$islands/header/menu/MenuDrawer.tsx";
import { MyProfileProps } from "site/components/header/AccountMO.tsx";
import { SearchRecommedationTextsProps } from "site/components/header/search/SearchRecommendation.tsx";
import { ISubmenuTexts } from "site/components/header/submenu/SubmenuNewsMO.tsx";
import { ProductCardTextsProps } from "site/components/product/card/ProductCard.tsx";
import { AvailableLanguages } from "site/sdk/hooks/useLanguage.ts";

export interface MenuDrawerProps {
  departmentMenus: IDepartmentMenu[];
  department: Department;
  device: Device;
  /**
   * @maxItems 05
   */
  mostWantedLinks: ITerm[];
  myProfile: MyProfileProps;
  searchRecommendationTexts: SearchRecommedationTextsProps;
  productCardTexts: ProductCardTextsProps;
  submenuTexts: ISubmenuTexts;
  language: AvailableLanguages;
}

export default function MenuDrawer(
  {
    departmentMenus,
    department,
    device,
    mostWantedLinks = [],
    myProfile,
    searchRecommendationTexts,
    submenuTexts,
    productCardTexts,
    language,
  }: MenuDrawerProps,
) {
  return (
    <div class="drawer lg:hidden px-2 z-10">
      <MenuDrawerOpenButton />
      <div class="drawer-side h-dvh" data-menu-type="mo">
        <MenuDrawerCloseOverlay />
        <div class="flex flex-col lg:hidden w-[calc(100%_-_12vw)] min-h-dvh border-r border-gray-200 bg-gray-100 overscroll-contain">
          {globalThis.location.pathname &&
            !globalThis.location.pathname.includes("/search") && (
            <MenuDrawerSearchContainer />
          )}
          <MenuDrawerContent
            device={device}
            departmentMenus={departmentMenus}
            department={department}
            mostWantedLinks={mostWantedLinks}
            myProfile={myProfile}
            searchRecommendationTexts={searchRecommendationTexts}
            submenuTexts={submenuTexts}
            productCardTexts={productCardTexts}
            language={language}
          />
        </div>
      </div>
    </div>
  );
}
