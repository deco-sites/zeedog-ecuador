import { lazy, Suspense } from "preact/compat";
import { useUI } from "$sdk/global/useUI.ts";
import LazyIcon from "$components/ui/LazyIcon.tsx";
import { Device } from "@deco/deco/utils";
import { Loading } from "$components/ui/Loading.tsx";
import {
  HeaderSearchInput,
  HeaderSearchInputProps,
} from "$components/header/search/HeaderSearchInput.tsx";
import { ITerm } from "$sdk/types/header.ts";
import { SearchRecommedationTextsProps } from "site/components/header/search/SearchRecommendation.tsx";
import { SearchProps } from "site/islands/Search.tsx";
import { type ProductCardTextsProps } from "$components/product/card/ProductCard.tsx";
import { AvailableLanguages } from "site/sdk/hooks/useLanguage.ts";

interface HeaderSearchContainerProps {
  device: Device;
  /**
   * @maxItems 05
   */
  mostWantedLinks: ITerm[];
  search:
    & SearchProps
    & HeaderSearchInputProps
    & SearchRecommedationTextsProps;
  productCardTexts: ProductCardTextsProps;
  language: AvailableLanguages;
}

const SearchRecommendation = lazy(() =>
  import("$islands/header/SearchRecommendation.tsx")
);

export function HeaderSearchContainer(
  { device, mostWantedLinks = [], search, productCardTexts, language }:
    HeaderSearchContainerProps,
) {
  const { displaySearchInputContainer, toggleSearch } = useUI();

  if (displaySearchInputContainer.value) {
    return (
      <section class="absolute top-[9.75rem] lg:top-[8.05rem] folded-header:top-[122px] lg:folded-header:top-[70px] w-full transition-all z-20">
        <button
          class="fixed top-[9.75rem] lg:top-[8.05rem] folded-header:top-[122px] lg:folded-header:top-[70px] w-full h-screen bg-black bg-opacity-60 z-10"
          aria-label="close-search-overlay"
          onClick={toggleSearch}
        >
        </button>
        <div class="relative flex flex-col z-20 max-container-auto 3xl:rounded-b-lg overflow-hidden">
          <div class="flex pl-8 pr-5 lg:px-0 gap-4 bg-gray-100">
            <HeaderSearchInput
              placeholder={search.placeholder}
              language={language}
            />
            <button
              class="lg:hidden block p-2 z-30"
              aria-label="toggle-search-overlay"
              onClick={toggleSearch}
            >
              <LazyIcon
                name="Close"
                class="w-4 h-4 lg:w-5 lg:h-5 fill-gray-40"
              />
            </button>
          </div>
          <Suspense fallback={<Loading />}>
            <SearchRecommendation
              inMenu={false}
              className="flex"
              device={device}
              mostWantedLinks={mostWantedLinks}
              searchRecommendationTexts={{
                bestSellerText: search.bestSellerText,
                mostSearchedText: search.mostSearchedText,
                bestSellerUrl: search.bestSellerUrl,
              }}
              language={language}
              productCardTexts={productCardTexts}
            />
          </Suspense>
        </div>
      </section>
    );
  }

  return <></>;
}
