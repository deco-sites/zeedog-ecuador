import type {
  Filter,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import ProductCard, {
  type ProductCardTextsProps,
} from "$components/product/card/ProductCard.tsx";
import LazyIcon from "$components/ui/LazyIcon.tsx";
import useFilters from "$sdk/hooks/useFilters.ts";
import { FilterGroupLabels, Filters } from "$components/shelf/Filters.tsx";
import { ShelfHeader } from "$components/shelf/ShelfHeader.tsx";
import { TypeFilter } from "$sdk/types/productshelf.ts";
import { ProductTypeFilter } from "$sdk/types/product.ts";
import { Department } from "$sdk/types/global.ts";
import { Device } from "@deco/deco/utils";
import ShelfSkeleton from "$components/shelf/ShelfSkeleton.tsx";
import UpdateURL from "$islands/shelf/UpdateURL.tsx";
import FilterHandler from "$islands/shelf/FilterHandler.tsx";
import GoTop from "$components/shelf/GoTop.tsx";
import ApplyFilterButton from "$islands/shelf/ApplyFilterButton.tsx";
import { ShelfFaq, ShelfFaqProps } from "$components/shelf/ShelfFaq.tsx";
import { Head } from "$fresh/runtime.ts";
import SearchNotFound from "$components/search/SearchNotFound.tsx";
import { useDevice, usePartialSection } from "@deco/deco/hooks";
import { AppContext } from "site/apps/site.ts";
import AnalyticsIsland from "site/islands/AnalyticsIsland.tsx";
import { viewItemListEvent } from "site/sdk/analytics/events/viewItemList.ts";
import { countTotalProducts } from "$sdk/utils/countTotalProducts.ts";
import { ProductTypeProps } from "site/loaders/productType.ts";
import { clx } from "site/sdk/clx.ts";
import { AvailableLanguages, useLanguage } from "site/sdk/hooks/useLanguage.ts";

const sortsName = [
  { label: "Recent", value: "created-descending" },
  { label: "Price: Low to High", value: "price-ascending" },
  { label: "Price: High to Low", value: "price-descending" },
  { label: "Best sellers", value: "best-selling" },
] as const;

type ProductSearchTextsProps =
  & {
    shelfFiltersText: string;
    shelfOrderText: string;
    shelfNotFoundProductText: string;
    shelfTryANewCombinationText: string;
    shelfRemoveFilterText: string;
    shelfProductQuantityText: string;
    shelfPreviousPageText: string;
    shelfNextPageText: string;
    shelfPrepositionText: string;
    searchNotFoundText: string;
    searchNotFoundQueryText: string;
    searchNotFoundSeeAlsoText: string;
    searchNotFoundTypoSuggestionText: string;
    searchNotFoundUrlTypoSuggestionText: string;
    goTopText: string;
    /**
     * @title Price Ascending Text
     */
    "price-ascending": string;
    /**
     * @title Price Descending Text
     */
    "price-descending": string;
    /**
     * @title Best Selling Text
     */
    "best-selling": string;
    /**
     * @title Created Descending Text
     */
    "created-descending": string;
    frequentlyQuestionsText: string;
    applyText: string;
  }
  & FilterGroupLabels
  & ProductCardTextsProps;

interface PageInfo {
  nextPage?: string;
  previousPage?: string;
  currentPage: number;
  records: number;
  recordPerPage: number;
}

interface PaginationProp {
  texts: ProductSearchTextsProps;
  pageInfo?: PageInfo | unknown;
  /**
   * @ignore
   */
  url?: URL;
}

const Pagination = ({ pageInfo, url, texts }: PaginationProp) => {
  const {
    nextPage,
    previousPage,
    currentPage,
    records,
    recordPerPage,
  } = pageInfo as PageInfo;

  const totalPages = Math.ceil(records / recordPerPage);

  if (!pageInfo || !totalPages) return null;

  const formattedUrl = `${url?.origin}${url?.pathname}`;

  return (
    <div class="flex items-center justify-center w-full col-span-2 md:col-span-3 xl:col-span-4 mt-4 z-20">
      <div class="flex items-center gap-8">
        <button
          {...previousPage &&
            { ...usePartialSection({ href: formattedUrl + previousPage }) }}
          class="group/prev flex items-center justify-center gap-2.5 h-10 px-4 md:px-5 bg-black bg-opacity-10 border border-black rounded-full font-body-2xs-regular disabled:bg-transparent disabled:text-gray-300 disabled:border-gray-300 disabled:pointer-events-none hover:bg-black hover:border-black hover:text-white transition-all"
          disabled={!previousPage}
        >
          <span class="w-2.5 h-2.5 border-b border-l group-disabled/prev:border-gray-300 border-black group-hover/prev:border-white rotate-45" />
          <span class="hidden sm:inline-block">
            {texts.shelfPreviousPageText}
          </span>
        </button>

        <span class="font-body-2xs-regular whitespace-nowrap">
          {currentPage} {texts.shelfPrepositionText} {totalPages}
        </span>

        <button
          {...nextPage &&
            { ...usePartialSection({ href: formattedUrl + nextPage }) }}
          class="group/next flex items-center justify-center gap-2.5 h-10 px-4 md:px-5 bg-black bg-opacity-10 border border-black rounded-full font-body-2xs-regular disabled:bg-transparent disabled:text-gray-300 disabled:border-gray-300 disabled:pointer-events-none hover:bg-black hover:border-black hover:text-white transition-all"
          disabled={!nextPage}
        >
          <span class="hidden sm:inline-block">
            {texts.shelfNextPageText}
          </span>
          <span class="w-2.5 h-2.5 border-t border-r group-disabled/next:border-gray-300 border-black group-hover/next:border-white rotate-45 transition-all" />
        </button>
      </div>
    </div>
  );
};

interface FilterAndSortWrapperProps {
  filters: Filter[];
  url: URL;
  department: Department;
  currentSort: string | null;
  device: Device;
  texts: ProductSearchTextsProps;
}

const FilterAndSortWrapper = (
  { filters, url, currentSort, device, texts }: FilterAndSortWrapperProps,
) => {
  if (!filters || filters.length === 0) return null;

  return (
    <>
      <div
        id="filters-container"
        class={`relative flex lg:hidden w-full flex-col bg-gray-100 md:bg-white md:border border-gray-200 rounded-lg lg:overflow-hidden transition-all`}
      >
        <Filters
          filters={filters}
          device={device}
          currentSort={currentSort}
        />
      </div>

      <div
        id="sort-container"
        class="relative gap-y-3 flex-col hidden w-full p-5 z-0 bg-gray-100 rounded overflow-hidden transition-all"
      >
        {sortsName.map(({ value, label }) => {
          const sortedUrl = new URL(url);
          sortedUrl?.searchParams.set("sort", value);

          const translatedLabel = texts[value as keyof ProductSearchTextsProps];

          return (
            <button
              {...usePartialSection({
                href: sortedUrl?.href,
                props: { openedFilterModal: device === "mobile" },
              })}
              class={`flex items-center justify-center w-full h-10 border rounded hover:bg-black hover:bg-opacity-10 hover:border-black font-body-2xs-regular transition-all ${
                currentSort === value
                  ? "bg-black bg-opacity-10 border-black"
                  : "bg-white border-gray-200"
              }`}
            >
              {translatedLabel || label}
            </button>
          );
        })}
      </div>
    </>
  );
};

// Component mobile only
const FilterModal = (
  { filters, url, department, currentSort, device, texts }:
    FilterAndSortWrapperProps,
) => {
  return (
    <>
      <label
        id="hide-filters-label-mo"
        for="hide-filters"
        class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-[110] visible opacity-100 transition-all overflow-auto overscroll-contain"
      />
      <div
        id="filter-sort-mobile-wrapper"
        class="fixed bottom-0 left-0 flex flex-col w-screen max-w-screen h-[calc(100vh_-_8.9rem)] bg-gray-100 rounded-t-xl overflow-hidden z-[110] transition-all duration-300"
      >
        <label
          class="absolute top-0 right-0 h-14 w-14 flex items-center justify-center rounded-tr-xl bg-transparent z-10"
          for="hide-filters"
        >
          <span class="relative flex items-center justify-center size-6 rounded-full bg-white">
            <LazyIcon name="Close" size={16} />
          </span>
        </label>
        <div class="w-full h-full rounded-t-xl overflow-auto overscroll-contain pt-14 pb-20">
          <FilterAndSortWrapper
            filters={filters}
            currentSort={currentSort}
            url={url}
            department={department}
            device={device}
            texts={texts}
          />
        </div>
        <div class="absolute bottom-0 flex items-center justify-end w-full py-4 px-6 bg-gray-100 bg-opacity-10 backdrop-blur-md border-t border-gray-200">
          <button
            id="filter-mobile-button"
            class="w-0 h-0"
            {...usePartialSection({ href: "" })}
          >
          </button>
          <ApplyFilterButton applyText={texts.applyText} />
        </div>
      </div>
    </>
  );
};

const createTypeFilterImages = (
  pageTypeFilters?: Filter,
  cmsTypeFilters?: ProductTypeFilter[],
) => {
  if (!pageTypeFilters || !cmsTypeFilters) {
    return;
  }

  const intersection = (pageTypeFilters && cmsTypeFilters) &&
    (pageTypeFilters?.values as FilterToggleValue[]).filter((obj1) =>
      cmsTypeFilters?.some((obj2) =>
        obj2.productTypeName.toLowerCase() === obj1.label.toLowerCase()
      )
    );

  const result: TypeFilter[] | undefined = intersection?.map((pageFilter) => {
    const matchingFilter = cmsTypeFilters?.find((cmsFilter) =>
      cmsFilter.productTypeName.toLowerCase() ===
        pageFilter.label.toLowerCase()
    );

    return {
      image: matchingFilter?.typeFilter?.filterImage,
      filterLabel: matchingFilter?.typeFilter?.productTypeLabel,
      description: matchingFilter?.typeFilter?.description,
      url: pageFilter.url,
      selected: pageFilter.selected,
    } as TypeFilter;
  });

  return result.filter((obj) => obj.image);
};

export interface ProductShelfProps {
  /** @title Type Filters */
  page: ProductListingPage | null;
  openedFilterModal?: boolean;
  shelfFaq: ShelfFaqProps[];
  /**
   * @ignore
   */
  url: URL;
  cmsTypeFilters: ProductTypeProps;
  texts: ProductSearchTextsProps;
  /**
   * @ignore
   */
  language: AvailableLanguages;
}

export default function ProductShelf({
  page,
  url,
  openedFilterModal = false,
  shelfFaq,
  cmsTypeFilters,
  texts,
  language,
}: ProductShelfProps) {
  let data = page as unknown as ProductListingPage;
  const device = useDevice();

  if (!data.pageInfo.records) {
    const totalProducts = countTotalProducts(data.filters ?? []);
    data = {
      ...data,
      pageInfo: {
        ...data?.pageInfo,
        records: totalProducts,
      },
    };
  }

  const hasProducts = data?.products && data.products.length > 0;
  const { filters } = data ?? {};
  const { filteredFilters = [], selectedFiltersCount = 0 } = filters
    ? useFilters(filters)
    : {};
  const pageTypeFilters = filteredFilters?.find((
    { label },
  ) => (["Product type", "Tipo di prodotto", "Tipo de producto"].includes(
    label,
  )));

  const typeFilterImages = createTypeFilterImages(
    pageTypeFilters,
    cmsTypeFilters as ProductTypeFilter[],
  );

  const hasGoTop = !!(data?.pageInfo.records &&
    Number(data?.pageInfo.records) > (data?.pageInfo.recordPerPage ?? 24));
  const baseURL = url?.pathname;

  const defaultSort = "";
  const currentSort = url?.searchParams.get("sort");
  const finalSort = currentSort ?? defaultSort;
  const categoryHierarchy = data?.breadcrumb?.itemListElement?.map((item) =>
    item.name
  ).join(">").toLowerCase();
  const shelfFaqMatch = (shelfFaq && shelfFaq.length > 0) &&
    shelfFaq.find((faq) => faq.category === categoryHierarchy);
  const currentSortLabel = sortsName.find((obj) => finalSort === obj.value)
    ?.value;
  const translatedCurrentSortLabel = currentSortLabel
    ? texts[currentSortLabel]
    : "";

  const jsonLD = JSON.parse(JSON.stringify(data));
  delete jsonLD.pageInfo;
  delete jsonLD.sortOptions;
  delete jsonLD.seo;
  jsonLD.products.itemListElement?.forEach((product: any) => {
    delete product.item.pageData;
    product.item.hasVariant?.forEach((variant: any) => {
      delete variant.pageData;
    });
  });

  const itemListName = data?.breadcrumb?.itemListElement?.map((item) =>
    item.name
  ).join("/");

  if (data.breadcrumb.itemListElement.at(-1) && data.seo?.title) {
    data.breadcrumb.itemListElement.at(-1)!.name = data.seo.title;
  }

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLD),
          }}
        />
      </Head>
      <AnalyticsIsland
        event={viewItemListEvent({
          itemListName,
          items: data?.products.map((product) => ({
            item_name: product.isVariantOf?.name || "",
            item_id: product.isVariantOf?.productGroupID || "",
            quantity: 1,
          })),
        })}
      />
      <section
        class={clx(
          "relative flex flex-col items-center justify-center gap-y-6 w-full overflow-hidden shelf-view-timeline",
          hasGoTop && "pb-6 md:pb-14",
        )}
      >
        {url && <UpdateURL currentURL={url} />}

        <div class="flex flex-col w-full max-w-full">
          {hasProducts && data.breadcrumb && (
            <ShelfHeader
              breadcrumb={data.breadcrumb}
              typeFilters={typeFilterImages}
              device={device}
            />
          )}
          <hr class="border-gray-200" />
          <section class="relative flex flex-col gap-y-5 w-full max-w-full">
            {filters && (
              <input
                id="filter"
                class="peer/filter fixed h-0 w-0 appearance-none opacity-0"
                type="radio"
                name="filters"
                defaultChecked={device === "desktop"}
              />
            )}
            <input
              id="sort"
              class="peer/sort fixed h-0 w-0 appearance-none opacity-0"
              type="radio"
              name="filters"
              defaultChecked={!filters}
            />
            <input
              id="hide-filters"
              aria-label="esconder filtros"
              type="checkbox"
              class="peer/hidefilter fixed opacity-0 appearance-none w-0 h-0"
              checked={device !== "desktop" && !openedFilterModal}
            />

            {/* FILTER / SORT BUTTONS BAR */}
            {hasProducts && (
              <>
                <div
                  id="filter-header"
                  class="sticky top-[104px] folded-header:top-[70px] max-container-auto md:px-10 3xl:px-0 flex items-center justify-start w-full h-16 shrink-0 bg-white transition-all z-[90]"
                >
                  <div
                    id="filter-toggle-container"
                    class="relative flex w-full h-full lg:w-80"
                  >
                    {filters && (
                      <label
                        for="filter"
                        class="w-1/2 h-full flex items-center gap-x-1 px-4 font-body-2xs-regular overflow-hidden hover:bg-gray-100 transition-all cursor-pointer border-l border-gray-200"
                      >
                        <span>
                          {texts.shelfFiltersText}
                        </span>
                        {selectedFiltersCount > 0 && (
                          <span class="text-gray-300">
                            ({selectedFiltersCount})
                          </span>
                        )}
                        <LazyIcon
                          name="Filter"
                          width={22}
                          height={22}
                          class="ml-auto"
                        />
                      </label>
                    )}

                    <label
                      for="sort"
                      class="w-1/2 h-full flex items-center justify-between px-4 font-body-2xs-regular overflow-hidden hover:bg-gray-100 transition-all cursor-pointer border-x border-x-gray-20"
                    >
                      <span class="flex flex-col">
                        {texts.shelfOrderText} <br />
                        {currentSortLabel && (
                          <span class="text-gray-500 font-body-2xs-regular">
                            {translatedCurrentSortLabel}
                          </span>
                        )}
                      </span>
                      <LazyIcon name="Sort" width={22} height={22} />
                    </label>

                    <label
                      for="hide-filters"
                      class="absolute flex items-center justify-end w-1/2 h-full px-4"
                    >
                      <span class="w-4 h-0.5 bg-black"></span>
                    </label>
                  </div>
                  <div class="hidden lg:flex flex-col items-end font-body-2xs-regular ml-auto text-gray-500">
                    {(data.products && data.products.length > 0) &&
                      (
                        <>
                          {data.pageInfo.records &&
                            Number(data.pageInfo.records) > 0 &&
                            (
                              <span>
                                {texts.shelfProductQuantityText}{" "}
                                <b>{data.pageInfo.records}</b>
                              </span>
                            )}
                        </>
                      )}
                  </div>
                </div>
                <hr class="sticky top-[168px] folded-header:top-[134px] -mt-5 border-gray-200 transition-all z-[90]" />
              </>
            )}
            <div
              id="shelf-container"
              class={clx(
                "relative flex w-full max-w-full max-container-auto px-6 md:px-10 3xl:px-0 overflow-y-clip",
                shelfFaqMatch && hasGoTop ? "" : "mb-10",
              )}
            >
              {device === "desktop" && hasProducts &&
                (
                  <aside class="relative flex items-start shrink-0 w-[calc(100vw_-_48px)] md:w-[calc(100vw_-_80px)] lg:w-80 mr-6 md:mr-10 transition-all">
                    <div class="sticky top-48 folded-header:top-[9.75rem] flex flex-wrap content-start w-full max-w-full lg:h-[calc(100dvh_-_212px)] custom-scrollbar overflow-auto">
                      <FilterAndSortWrapper
                        filters={filteredFilters}
                        currentSort={finalSort}
                        url={url!}
                        department="zeedog"
                        device={device}
                        texts={texts}
                      />
                    </div>
                  </aside>
                )}
              {device !== "desktop" && (
                <FilterModal
                  filters={filteredFilters}
                  currentSort={finalSort}
                  url={url!}
                  department="zeedog"
                  device={device}
                  texts={texts}
                />
              )}

              {/* PRODUCT GALLERY */}
              {hasProducts
                ? (
                  <section
                    id="product-shelf"
                    class="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 content-start md:w-full max-container-auto transition-all"
                  >
                    {data.products.map((product, index) => {
                      return (
                        <ProductCard
                          index={index}
                          product={product}
                          device={device}
                          itemListName={itemListName}
                          texts={texts}
                          language={language}
                        />
                      );
                    })}
                    <Pagination
                      pageInfo={data.pageInfo}
                      url={url}
                      texts={texts}
                    />
                  </section>
                )
                : (
                  <div class="flex flex-col items-center justify-start w-full gap-y-10 p-6 md:p-10">
                    {selectedFiltersCount > 0
                      ? (
                        <>
                          <p class="font-body-xs-regular text-center">
                            {texts.shelfNotFoundProductText}
                            <br />
                            {texts.shelfTryANewCombinationText}
                          </p>
                          <button
                            {...usePartialSection({ href: baseURL })}
                            class="flex items-center justify-center w-56 h-11 border border-black rounded-full font-title-xs-bold lg:hover:bg-black lg:hover:bg-opacity-10"
                          >
                            {texts.shelfRemoveFilterText}
                          </button>
                        </>
                      )
                      : <SearchNotFound url={url} texts={texts} />}
                  </div>
                )}
            </div>
          </section>
        </div>
        {hasGoTop && <GoTop goToTopText={texts.goTopText} />}
        <FilterHandler />
        {hasProducts &&
          (
            <>
              {shelfFaqMatch && (
                <ShelfFaq
                  frequentlyQuestionsText={texts.frequentlyQuestionsText}
                  {...shelfFaqMatch}
                />
              )}
            </>
          )}
      </section>
    </>
  );
}

// script to control filter-container display
export const filterToggleControl = () => `
  if (window && document) {
    const inputFilter = document.querySelector("input#filter");
    const inputHideFilter = document.querySelector("input#hide-filters");

    inputFilter.addEventListener("click", () => {
      inputHideFilter.checked = false;
    })

    const sortFilter = document.querySelector("input#sort");
    sortFilter.addEventListener("click", () => {
      inputHideFilter.checked = false;
    })
  }
`;

export function LoadingFallback() {
  return <ShelfSkeleton />;
}

export function loader(
  props: ProductShelfProps,
  req: Request,
  ctx: AppContext,
) {
  const url = new URL(req.url);

  const data = props.page as unknown as ProductListingPage;

  if (!data.products || data.products.length === 0) {
    ctx.response.status = 404;
    return props;
  }

  const typeFilters = props.cmsTypeFilters.productTypeContent?.map((
    { productTypeName, typeFilter },
  ) => ({ productTypeName, typeFilter }));

  const languagePathname = useLanguage(url);

  return {
    ...props,
    url,
    typeFilters,
    language: languagePathname,
  };
}
