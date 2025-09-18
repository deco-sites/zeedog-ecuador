import { IDepartmentMenu, ITerm } from "$sdk/types/header.ts";
import { MenuMO } from "$components/header/menu/MenuMO.tsx";
import { Department } from "$sdk/types/global.ts";
import { Device } from "@deco/deco/utils";
import SearchRecommendation, {
  type SearchRecommedationTextsProps,
} from "$islands/header/SearchRecommendation.tsx";
import { MyProfileProps } from "site/components/header/AccountMO.tsx";
import { ISubmenuTexts } from "site/components/header/submenu/SubmenuNewsMO.tsx";
import { ProductCardTextsProps } from "site/components/product/card/ProductCard.tsx";
import { AvailableLanguages } from "site/sdk/hooks/useLanguage.ts";

export interface MenuDrawerContentProps {
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

export function MenuDrawerContent(
  {
    departmentMenus,
    department,
    device,
    mostWantedLinks = [],
    myProfile,
    searchRecommendationTexts,
    productCardTexts,
    submenuTexts,
    language,
  }: MenuDrawerContentProps,
) {
  return (
    <>
      <div class="relative w-full">
        <SearchRecommendation
          className="pt-6"
          inMenu={true}
          device={device}
          mostWantedLinks={mostWantedLinks}
          searchRecommendationTexts={searchRecommendationTexts}
          productCardTexts={productCardTexts}
          language={language}
        />

        <MenuMO
          departmentMenus={departmentMenus}
          department={department}
          myProfile={myProfile}
          submenuTexts={submenuTexts}
        />
      </div>
    </>
  );
}
