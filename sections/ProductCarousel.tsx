import ProductCarouselComponent from "$components/ProductCarouselComponent.tsx";
import CarouselTitle, {
  CarouselTitleProps,
} from "$components/CarouselTitle.tsx";
import ProductCarouselSkeleton from "$components/product/card/ProductCarouselSkeleton.tsx";
import { useDevice } from "@deco/deco/hooks";
import type { Product } from "apps/commerce/types.ts";
import { ProductCardTextsProps } from "site/components/product/card/ProductCard.tsx";
import { SectionProps } from "@deco/deco";
import { useLanguage } from "site/sdk/hooks/useLanguage.ts";

export interface ProductCarouselProps {
  /**
   * @default 4
   * @title Products per carousel slide
   */
  productsPerPage?: 2 | 3 | 4;
  page: Product[] | null;
  carouselTitleProps?: CarouselTitleProps;
  /**
   * @title Carousel title for GA events
   * @description [Page] - [Carousel] (e.g., Home - Dogs/Accessories/Leashes)
   */
  gaCarouselTitle: string;
  texts: ProductCardTextsProps;
}

const defaultCarouselTitle: CarouselTitleProps = {
  title: "",
  viewMoreURL: "",
  titleStyle: "uppercase",
  // TODO: Implement in the future
  // isMembershipCarousel: false,
};

export default function ProductCarousel(
  {
    page,
    productsPerPage = 4,
    carouselTitleProps = defaultCarouselTitle,
    gaCarouselTitle,
    texts,
    language,
  }: SectionProps<typeof loader>,
) {
  if (!page || page.length === 0) return null;

  const device = useDevice();

  const hasTitle = carouselTitleProps.title &&
    carouselTitleProps.title.trim() !== "";

  const hasTitleStyle = !hasTitle ? "mt-6 md:mt-10 mb-4" : "mb-12 md:mb-16";

  return (
    <>
      {hasTitle && <CarouselTitle {...carouselTitleProps} />}
      <ProductCarouselComponent
        products={page}
        device={device}
        productsPerPage={productsPerPage}
        class={`${hasTitleStyle} md:pb-10`}
        hasBullets={true}
        viewMoreURL={carouselTitleProps?.viewMoreURL}
        itemListName={`Carrossel ${gaCarouselTitle}`}
        texts={{
          ...texts,
          viewMoreText: carouselTitleProps.viewMoreText,
        }}
        language={language}
      />
    </>
  );
}

export function LoadingFallback() {
  return <ProductCarouselSkeleton />;
}

export const loader = (props: ProductCarouselProps, req: Request) => {
  const url = new URL(req.url);
  const languagePathname = useLanguage(url);

  return {
    ...props,
    language: languagePathname,
  };
};
