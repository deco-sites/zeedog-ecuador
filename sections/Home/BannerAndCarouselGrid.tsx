import Banner from "$components/home/Banner.tsx";
import ProductCarouselComponent from "$components/ProductCarouselComponent.tsx";
import { SimplifiedBannerProps } from "$sdk/types/banner.ts";
import { BannerSpacement } from "site/sdk/types/banner.ts";
import { BannerSize } from "site/sdk/types/banner.ts";
import { Media } from "site/sdk/types/banner.ts";
import { BannerProps } from "site/sdk/types/banner.ts";
import { Product } from "apps/commerce/types.ts";
import { useDevice } from "@deco/deco/hooks";
import { ProductCardTextsProps } from "site/components/product/card/ProductCard.tsx";

const margins = {
  none: "mb-6 lg:mb-0",
  top: "mt-6 lg:mt-10",
  bottom: "mb-6 lg:mb-10",
  both: "my-6 lg:my-10",
};

const BANNERS_DEFAULT: BannerProps = {
  backgroundComponent: {
    alt: "Banner | Zee.Dog",
    images: {
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2225/0033ffed-fc54-49f1-b4ff-e1567607f3bd",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2225/e9feeec3-9b51-4ec1-a864-fba2c8c5dfca",
    },
    videos: {
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2225/d61f8100-b973-4619-9b74-90ba4fd60e45",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2225/2940c4e8-e38d-4a7f-b5e0-e6268d68062c",
    },
    preload: false,
  },
  border: {
    borderRadius: {
      desktop: "full",
      mobile: "full",
    },
    borderColor: "",
  },
  sizes: {
    desktop: "normal",
    mobile: "taller",
  },
  titleBox: {
    overallColor: {
      mobile: "#FFFFFF",
      desktop: "#FFFFFF",
    },
    alignment: {
      mobile: "left",
      desktop: "left",
    },
    position: {
      mobile: "top-left",
      desktop: "top-left",
    },
  },
  aspectRatioWidth: "1840",
  department: "zeedog",
  device: "desktop",
};

const DEFAULT_PROPS: BannerAndCarouselGridProps = {
  page: null,
  gaCarouselTitle: "",
  deviceDisplay: "desktop",
  spacement: {
    hasPadding: true,
    hasMargin: "top",
  },
  banner: BANNERS_DEFAULT,
  texts: {
    viewMoreText: "View more",
    addToCartText: "Add to cart",
    bestSeller: "Best seller",
    newProduct: "New",
    soldOutText: "Sold out",
    startingAtText: "Starting at",
  },
};

export interface BannerAndCarouselGridProps {
  page: Product[] | null;
  /** @default both */
  deviceDisplay: "both" | "mobile" | "desktop";
  spacement: Omit<BannerSpacement, "hasGap">;
  /**
   * @maxItems 2
   * @title Banner
   */
  banner:
    | Omit<
      BannerProps,
      "hasPadding"
    >
    | SimplifiedBannerProps;
  gaCarouselTitle: string;
  texts: ProductCardTextsProps & {
    viewMoreText?: string;
  };
}

export default function BannerAndCarouselGrid(
  props: BannerAndCarouselGridProps,
) {
  const $device = useDevice() ?? "desktop";

  const data = props.page || [];
  const device = ($device === "tablet" ? "desktop" : $device) ||
    "mobile";

  const {
    banner,
    spacement: { hasPadding, hasMargin },
    gaCarouselTitle,
    texts,
  } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  const width = hasPadding ? "900" : "960";

  const mt = margins[hasMargin || "none"];

  const padding = hasPadding
    ? "pl-6 pr-6 md:pl-10 md:pr-10 lg:pl-10 lg:pr-0"
    : "";

  const sizes: Media<BannerSize> = "sizes" in banner
    ? banner.sizes
    : { mobile: "taller", desktop: "normal" };

  const heightWithCarousel =
    ("sizes" in banner && banner.sizes?.desktop === "withCarousel")
      ? "h-full"
      : "";

  // const rounded = banner?.hasPadding
  //   ? "[&>*:first-child]:rounded-2xl [&>*:first-child]:hover:scale-95 [&>*:first-child]:transition-all"
  //   : "[&>*:first-child]:rounded-r-2xl";

  if ("border" in banner && banner.border) {
    banner.border.borderRadius = banner.border.borderRadius
      ? banner.border.borderRadius
      : { desktop: "full", mobile: "full" };
  }

  return (
    <section
      class={`grid max-lg:grid-rows-none lg:grid-cols-banner-and-carousel gap-y-6 md:gap-y-10 lg:gap-y-0 max-container-auto ${mt}`}
    >
      <div class={`w-full h-full ${padding}`}>
        {banner && (
          <Banner
            {...banner}
            border={"border" in banner ? banner.border : undefined}
            sizes={sizes}
            aspectRatioWidth={width}
            class={`w-full ${heightWithCarousel}`}
            department="zeedog"
            device={device}
          />
        )}
      </div>
      {/* FADE NA ESQUERDA DO CARROSSEL */}
      {(data && data.length > 0) && (
        <ProductCarouselComponent
          products={data}
          productsPerPage={2}
          device={device}
          class="w-full"
          hasBullets={false}
          itemListName={`Carrossel ${gaCarouselTitle}`}
          texts={texts}
        />
      )}
    </section>
  );
}
