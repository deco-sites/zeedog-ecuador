import UpdateURL from "$islands/shelf/UpdateURL.tsx";
import ProductCard, {
  type ProductCardTextsProps,
} from "$components/product/card/ProductCard.tsx";
import SearchNotFound, {
  type SearchNotFoundTextsProps,
} from "$components/search/SearchNotFound.tsx";
import SearchInputIsland from "$islands/SearchInputIsland.tsx";
import { ProductListingPage } from "apps/commerce/types.ts";
import { useDevice, usePartialSection } from "@deco/deco/hooks";
import { AppContext } from "site/apps/site.ts";
import { searchEvent } from "site/sdk/analytics/events/search.ts";
import AnalyticsIsland from "site/islands/AnalyticsIsland.tsx";
import { viewItemListEvent } from "site/sdk/analytics/events/viewItemList.ts";
import { HeaderSearchInputProps } from "site/components/header/search/HeaderSearchInput.tsx";
import { useLanguage } from "site/sdk/hooks/useLanguage.ts";
import { SectionProps } from "@deco/deco";

type ProductSearchTextsProps =
  & {
    shelfPageText: string;
    shelfPreviousPageText: string;
    shelfNextPageText: string;
    shelfPrepositionText: string;
    shelfOrderText: string;
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
  }
  & ProductCardTextsProps
  & SearchNotFoundTextsProps;

export interface ProductSearchResultProps {
  page: ProductListingPage | null;
  search: HeaderSearchInputProps;
  texts: ProductSearchTextsProps;
}

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
  url?: URL;
}

const options = [
  { value: "price-ascending", label: "MENOR PREÇO" },
  { value: "price-descending", label: "MAIOR PREÇO" },
  { value: "best-selling", label: "MAIS VENDIDOS" },
  { value: "created-descending", label: "MAIS RECENTES" },
];

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
    <div class="flex items-center justify-center w-full col-span-2 md:col-span-3 xl:col-span-4 relative z-40">
      <div class="flex items-center gap-8">
        <button
          {...previousPage &&
            { ...usePartialSection({ href: formattedUrl + previousPage }) }}
          class="flex items-center justify-center gap-2.5 h-10 px-5 bg-gray-100 border border-gray-200 rounded-full font-body-2xs-regular disabled:opacity-50 hover:bg-black hover:bg-opacity-10 hover:border-black transition-all"
          disabled={!previousPage}
        >
          <span class="w-2.5 h-2.5 border-b border-l border-black rotate-45" />
          {texts.shelfPreviousPageText}
        </button>

        <span class="font-body-2xs-regular">
          {currentPage} {texts.shelfPrepositionText} {totalPages}
        </span>

        <button
          {...nextPage &&
            { ...usePartialSection({ href: formattedUrl + nextPage }) }}
          class="flex items-center justify-center gap-2.5 h-10 px-5 bg-gray-100 border border-gray-200 rounded-full font-body-2xs-regular disabled:opacity-50 hover:bg-black hover:bg-opacity-10 hover:border-black transition-all"
          disabled={!nextPage}
        >
          {texts.shelfNextPageText}
          <span class="w-2.5 h-2.5 border-t border-r border-black rotate-45" />
        </button>
      </div>
    </div>
  );
};

export default function SearchResult(
  { page, url, search, texts, language }: SectionProps<typeof loader>,
) {
  const device = useDevice();
  const data = page as unknown as ProductListingPage;
  const quantityProducts = data?.products.length;
  const currPage = data?.pageInfo.currentPage;
  const emptySearch = quantityProducts == 0;
  const totalPages = data && data?.pageInfo &&
    Math.ceil(
      Number(data.pageInfo.records) / Number(data.pageInfo.recordPerPage),
    );
  const currentSortLabel = options.find((obj) =>
    url?.searchParams.get("sort") === obj.value
  );
  const currentSearchTerm = url?.searchParams.get("q");
  const itemListName = `Busca/${currentSearchTerm}`;

  return (
    <>
      <AnalyticsIsland
        event={searchEvent({ searchTerm: currentSearchTerm || "" })}
      />
      {!emptySearch && (
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
      )}
      <section class="flex flex-col gap-y-6 lg:gap-y-10 mb-6 lg:mb-10">
        {url && <UpdateURL currentURL={url} />}
        <div class="w-full max-container-auto bg-gray-100 3xl:rounded-b-lg">
          <SearchInputIsland
            prevTerm={currentSearchTerm}
            placeholder={search.placeholder}
            language={language}
          />
          <div class="w-full flex items-center justify-between px-6 lg:px-16 py-5">
            <span class="font-body-xs-regular whitespace-nowrap text-gray-500">
              {texts.shelfPageText}{" "}
              <b>
                {currPage ?? 1}{" "}
                {(totalPages && totalPages > 1) ? `/ ${totalPages}` : ""}
              </b>
            </span>
            {/* Sort */}
            <div
              arial-label="Ordenar por:"
              tabindex={0}
              role="button"
              class="dropdown font-body-xs-regular rounded outline-none text-sm text-gray-500 border border-gray-200 w-52 h-10 bg-transparent cursor-pointer"
            >
              <div class="flex items-center justify-between w-full h-full px-4">
                {currentSortLabel?.value
                  ? texts[
                    currentSortLabel?.value as keyof ProductSearchTextsProps
                  ]
                  : texts.shelfOrderText}
                <span class="w-2.5 h-2.5 -mt-1.5 border-b border-l border-black -rotate-45">
                </span>
              </div>
              <div
                tabindex={0}
                class="dropdown-content w-full flex flex-col bg-white border-gray-200 rounded shadow divide-y divide-gray-20 overflow-hidden z-[60]"
              >
                {options.map(({ value, label }) => {
                  const sortedUrl = new URL(url!);
                  sortedUrl?.searchParams.set("sort", value);

                  const translatedLabel =
                    texts[value as keyof ProductSearchTextsProps];

                  return (
                    <button
                      {...usePartialSection({
                        href: sortedUrl?.href,
                        props: { url: sortedUrl?.href },
                      })}
                      class="flex items-center h-10 px-4 hover:bg-gray-200 font-body-xs-regular transition-all"
                    >
                      <p>{translatedLabel || label}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div
          class={`${
            emptySearch && "overflow-y-scroll"
          } px-6 lg:px-10 3xl:px-0 w-full max-container-auto bg-white border-b-1 border-gray-200`}
        >
          {emptySearch
            ? <SearchNotFound url={url} texts={texts} />
            : (
              <div class="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 content-start md:w-full max-container-auto transition-all">
                {(data?.products && data?.products.length > 0) &&
                  data?.products.map((
                    product,
                    index,
                  ) => (
                    <ProductCard
                      index={index}
                      product={product}
                      device={device}
                      itemListName={itemListName}
                      texts={texts}
                      language={language}
                    />
                  ))}
              </div>
            )}
        </div>
        <Pagination pageInfo={data?.pageInfo} url={url} texts={texts} />
      </section>
    </>
  );
}

export function loader(
  props: ProductSearchResultProps,
  req: Request,
  ctx: AppContext,
) {
  const url = new URL(req.url);

  const languagePathname = useLanguage(url);

  if (!props.page?.products || props.page.products.length === 0) {
    ctx.response.status = 404;
  }

  return {
    ...props,
    url,
    language: languagePathname,
  };
}
