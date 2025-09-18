import { useUI } from "$sdk/global/useUI.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { MenuItem } from "$components/header/submenu/MenuItem.tsx";
import { Device } from "@deco/deco/utils";
import { Product } from "apps/commerce/types.ts";
import { invoke } from "site/runtime.ts";
import ProductCard, {
  type ProductCardTextsProps,
} from "$components/product/card/ProductCard.tsx";
import { METAFIELDS } from "$sdk/global/constants.ts";
import { ITerm } from "$sdk/types/header.ts";
import { bestSellerProducts } from "site/sdk/global/signalStore.ts";
import ProductCardSkeleton from "site/components/product/card/ProductCardSkeleton.tsx";
import { clx } from "site/sdk/clx.ts";
import {
  CountryCode,
  LanguageCode,
} from "apps/shopify/utils/storefront/storefront.graphql.gen.ts";
import { LANGUAGE_MAP_BY_URL } from "site/components/ui/LanguageSelector.tsx";
import { AvailableLanguages } from "site/sdk/hooks/useLanguage.ts";

export interface SearchRecommedationTextsProps {
  bestSellerText: string;
  bestSellerUrl: string;
  mostSearchedText: string;
}

export interface SearchRecommendationProps {
  inMenu: boolean;
  className?: string;
  device: Device;
  /**
   * @maxItems 05
   */
  mostWantedLinks: ITerm[];
  searchRecommendationTexts: SearchRecommedationTextsProps;
  productCardTexts: ProductCardTextsProps;
  /**
   * @ignore
   */
  language: AvailableLanguages;
}

export default function SearchRecommendation(
  {
    inMenu = false,
    className,
    device,
    mostWantedLinks = [],
    searchRecommendationTexts,
    productCardTexts,
    language,
  }: SearchRecommendationProps,
) {
  const { displaySearchDrawer } = useUI();
  const loading = useSignal(true);

  const getProductData = async () => {
    const formattedLanguageMap = LANGUAGE_MAP_BY_URL[language ?? "en"];
    const [languageCode, countryCode] = formattedLanguageMap.split("-");

    const productResponse = await invoke.shopify.loaders.ProductList({
      props: {
        // TODO: Temporary - just to view some product
        query: "gotham",
        count: 5,
      },
      metafields: METAFIELDS,
      countryCode: countryCode as CountryCode,
      languageCode: languageCode?.toUpperCase() as LanguageCode,
    }) as Product[];

    if (productResponse) {
      loading.value = false;
      bestSellerProducts.value = productResponse;
    }
  };

  useEffect(() => {
    if (IS_BROWSER) {
      if (bestSellerProducts.value === null) {
        getProductData();
      } else {
        loading.value = false;
      }
    }
  }, [language]);

  const snapDirection = device !== "desktop" &&
    "snap-x snap-mandatory overflow-auto scrollbar-none scrollbar-none::-webkit-scrollbar scroll-pl-8";

  const snapAlign = device !== "desktop" && "snap-start";

  return (
    <section
      class={clx(
        "flex-col lg:flex-row gap-5 w-full h-full lg:py-8 lg:pl-8 bg-gray-100",
        className,
        inMenu && (displaySearchDrawer.value
          ? "absolute -top-px flex border-t border-gray-200 z-20"
          : "hidden"),
      )}
    >
      <div class="flex flex-col gap-1">
        <h4 class="py-2 font-body-xs-bold pl-8">
          {searchRecommendationTexts.mostSearchedText}
        </h4>
        <ul class="flex lg:flex-col gap-1.5 lg:gap-2.5 px-8 pb-4 overflow-auto">
          {mostWantedLinks.map((link) => {
            return (
              <li>
                <MenuItem
                  menuItem={link}
                  class={clx(
                    "flex items-center justify-center lg:justify-start p-3 lg:py-2 lg:px-0 rounded-md bg-white lg:bg-transparent font-body-xs-regular whitespace-nowrap text-gray-500",
                  )}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div class="flex flex-col gap-y-3 w-full lg:px-8 pb-8 lg:pb-0">
        <a
          href={searchRecommendationTexts.bestSellerUrl}
          class="px-8 lg:px-0 py-2 font-body-xs-bold"
        >
          {searchRecommendationTexts.bestSellerText}
        </a>
        <div
          class={clx(
            "relative flex w-full gap-3 md:gap-5 flex-nowrap transition-all ease-out duration-500",
            snapDirection,
            "p-8 lg:p-0 bg-white lg:bg-transparent",
          )}
        >
          {(!loading.value && bestSellerProducts.value &&
              bestSellerProducts.value.length > 0)
            ? bestSellerProducts.value.map((product, index) => (
              <ProductCard
                product={product}
                index={index}
                device={device}
                language={language}
                texts={productCardTexts}
                class={clx(
                  "w-[calc(50%_-_6px)] md:w-[calc(33.333333333%_-_18px)] lg:w-[calc(20%_-_16.4px)] rounded-md lg:border lg:border-gray-200",
                  snapAlign,
                  "appear md:animate-none",
                )}
                itemListName="Il carosello più venduto"
              />
            ))
            : (
              <ProductCardSkeleton
                class={clx(
                  "w-[calc(50%_-_6px)] md:w-[calc(33.333333333%_-_18px)] lg:w-[calc(20%_-_16.4px)] rounded-md lg:border lg:border-gray-200",
                  snapAlign,
                  "appear md:animate-none",
                )}
              />
            )}
        </div>
      </div>
    </section>
  );
}
