import Banner from "$components/home/Banner.tsx";
import ProductCarouselComponent from "$components/ProductCarouselComponent.tsx";
import { BannerProps, Margin } from "$sdk/types/banner.ts";
import { useDevice } from "@deco/deco/hooks";
import { Product } from "apps/commerce/types.ts";
import { clx } from "site/sdk/clx.ts";
import { ProductCardTextsProps } from "site/components/product/card/ProductCard.tsx";

const margins = {
  none: "mb-6 lg:mb-0",
  top: "mt-6 lg:mt-10",
  bottom: "mb-6 lg:mb-10",
  both: "my-6 lg:my-10",
};

export interface BannerAndCarouselProps {
  page: Product[] | null;
  /** @default false */
  hasMargin?: Margin;
  banner?: Omit<
    BannerProps,
    "device" | "aspectRatioWidth" | "class" | "department"
  >;
  /**
   * @title Carousel title for GA events
   * @description [Page] - [Carousel] (e.g., Home - Dogs/Accessories/Leashes)
   */
  gaCarouselTitle: string;
  texts: ProductCardTextsProps & {
    viewMoreText?: string;
  };
}

export default function BannerAndCarousel(
  { banner, hasMargin, page, gaCarouselTitle, texts }: BannerAndCarouselProps,
) {
  const $device = useDevice() ?? "desktop";

  const data = page || [];
  const device = ($device === "tablet" ? "desktop" : $device) || "mobile";

  const width = banner?.hasPadding ? "900" : "960";

  const mt = margins[hasMargin || "none"];

  const padding = banner?.hasPadding &&
    "pl-6 pr-6 md:pl-10 md:pr-10 lg:pl-10 lg:pr-0";

  return (
    <section
      class={clx(
        "flex flex-col lg:flex-row items-center justify-center gap-y-6 md:gap-y-10 lg:gap-y-0 max-container-auto",
        mt,
      )}
    >
      <div class={clx("w-full lg:w-[calc(50%_-_20px)]", padding)}>
        {banner && (
          <Banner
            {...banner}
            sizes={{
              mobile: banner.sizes.mobile,
              desktop: banner.sizes.desktop,
            }}
            device={device}
            aspectRatioWidth={width}
            class={`w-full`}
            department="zeedog"
          />
        )}
      </div>
      {(data && data.length > 0) && (
        <ProductCarouselComponent
          products={data}
          productsPerPage={2}
          device={device}
          class="lg:w-[calc(50%_+_20px)]"
          hasBullets={false}
          itemListName={`Carrossel ${gaCarouselTitle}`}
          texts={texts}
        />
      )}
    </section>
  );
}
