import { Device } from "@deco/deco/utils";
import ProductCard, {
  type ProductCardTextsProps,
} from "$components/product/card/ProductCard.tsx";
import { CarouselControls } from "$islands/CarouselControls.tsx";
import { Product } from "apps/commerce/types.ts";
import { clx } from "site/sdk/clx.ts";
import { AvailableLanguages } from "site/sdk/hooks/useLanguage.ts";
import { useId } from "site/sdk/hooks/useId.ts";

const carouselMaxWidth = {
  "2": "max-w-5xl",
  "3": "max-w-7xl",
  "4": "max-container",
};

const itemWidth = {
  "2": "w-[calc(50%_-_6px)] md:w-[calc(50%_-_10px)]",
  "3": "md:w-[calc(33.333333333333336%_-_13.333333333333334px)]",
  "4":
    "md:w-[calc(33.333333333333336%_-_13.333333333333334px)] lg:w-[calc(25%_-_15px)]",
};

// 20px de gap entre os cards a largura do card precisa ser 100/productsPerPage - (productsPerPage-1)*20px(gap)/productsPerPage = [calc(25%_-_15px)]
// assim o carrossel fica perfeitamente centralizado e espaçado

export interface ProductCarouselComponentProps {
  products: Product[];
  productsPerPage: 2 | 3 | 4;
  device: Device;
  hasBullets?: boolean;
  class?: string;
  viewMoreURL?: string;
  itemListName: string;
  texts: ProductCardTextsProps & {
    viewMoreText?: string;
  };
  language: AvailableLanguages;
}

export default function ProductCarouselComponent(
  {
    products,
    productsPerPage,
    device,
    class: _class = "",
    hasBullets,
    viewMoreURL,
    itemListName,
    texts,
    language,
  }: ProductCarouselComponentProps,
) {
  const productsPerPageByDevice: 2 | 3 | 4 = device === "mobile"
    ? 2
    : device === "tablet"
    ? 3
    : productsPerPage;

  const snapDirection = device === "mobile" &&
    "snap-x snap-mandatory overflow-auto scrollbar-none scrollbar-none::-webkit-scrollbar scroll-pl-6 md:scroll-pl-10";
  // const snapAlign = device === "mobile" ? "first-of-type:snap-center snap-start last-of-type:snap-center" : "";
  const snapAlign = device === "mobile" ? "snap-start" : "";
  const carouselId = useId();
  const carouselSelector = `${carouselId}-product-carousel`;

  return (
    <section
      class={clx(
        "relative flex items-center justify-center w-full overflow-hidden",
        productsPerPageByDevice === 4 &&
          "carousel-right-fade carousel-left-fade",
        _class,
      )}
    >
      <div
        class={clx(
          "relative flex order-1 gap-3 md:gap-5 flex-nowrap px-6 md:px-10 transition-all ease-out duration-500 w-full",
          carouselSelector,
          snapDirection,
          carouselMaxWidth[productsPerPageByDevice],
        )}
      >
        {(products && products.length > 0) &&
          products.map((product, index) => {
            return (
              <ProductCard
                product={product}
                index={index}
                device={device}
                language={language}
                class={clx(
                  "appear md:animate-none",
                  itemWidth[productsPerPageByDevice],
                  snapAlign,
                )}
                itemListName={itemListName}
                texts={texts}
              />
            );
          })}
      </div>
      {device !== "mobile" && (products.length > productsPerPage) && (
        <CarouselControls
          carouselSelector={carouselSelector}
          totalItems={products.length}
          itemsPerSlide={productsPerPageByDevice}
          hasBullets={hasBullets}
          viewMoreURL={viewMoreURL}
          viewMoreText={texts.viewMoreText}
        />
      )}
    </section>
  );
}
