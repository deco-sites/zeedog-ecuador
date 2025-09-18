import {
  BannerProps,
  BannerSize,
  BannerSpacement,
  Media,
  SimplifiedBannerProps,
} from "$sdk/types/banner.ts";
import Banner from "$components/home/Banner.tsx";
import BannerSkeleton from "$components/home/BannerSkeleton.tsx";
import { useDevice } from "@deco/deco/hooks";

const margins = {
  none: "",
  top: "mt-6 lg:mt-10",
  bottom: "mb-6 lg:mb-10",
  both: "my-6 lg:my-10",
};

export interface DoubleBannerProps {
  /** @default both */
  deviceDisplay: "both" | "mobile" | "desktop";
  spacement: Media<BannerSpacement>;
  /**
   * @maxItems 2
   * @title Banner
   */
  banners: Array<
    Omit<
      BannerProps,
      "hasPadding"
    > | SimplifiedBannerProps
  >;
}

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

const DEFAULT_PROPS: DoubleBannerProps = {
  deviceDisplay: "desktop",
  banners: [BANNERS_DEFAULT, BANNERS_DEFAULT],
  spacement: {
    mobile: {
      hasPadding: false,
      hasGap: false,
      hasMargin: "none",
    },
    desktop: {
      hasPadding: false,
      hasGap: false,
      hasMargin: "none",
    },
  },
};

export default function DoubleBanner(props: DoubleBannerProps) {
  const {
    deviceDisplay,
    banners,
    spacement,
  } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  const device = useDevice() === "mobile" ? "mobile" : "desktop";

  const department = "zeedog";

  const hasPadding = spacement[device]?.hasPadding || false;
  const hasGap = spacement[device]?.hasGap || false;
  const hasMargin = spacement[device]?.hasMargin || "none";

  let width = "960";
  if (hasPadding) {
    width = hasGap ? "900" : "920";
  } else {
    width = hasGap ? "940" : "960";
  }

  const padding = hasPadding ? "px-6 md:px-10" : "";

  const gap = hasGap ? "gap-6 lg:gap-10" : "";

  const mt = margins[hasMargin || "none"];

  const hoverScale = (hasPadding && hasGap) &&
    "[&>*:first-child]:hover:scale-x-[98%] [&>*:first-child]:hover:scale-y-95 [&>*:first-child]:transition-all";

  return (device === deviceDisplay || deviceDisplay === "both")
    ? (
      <section
        class={`grid grid-cols-1 xl:grid-cols-2 max-container-auto ${padding} ${gap} ${mt}`}
      >
        {banners.map((bannerProps) => {
          // const rounded = hasPadding
          //   ? hasGap
          //     ? "[&>*:first-child]:rounded-2xl [&>*:first-child]:hover:scale-95 [&>*:first-child]:transition-all"
          //     : index === 0
          //       ? "[&>*:first-child]:rounded-tl-2xl [&>*:first-child]:rounded-tr-2xl md:[&>*:first-child]:rounded-tr-none md:[&>*:first-child]:rounded-l-2xl"
          //       : "[&>*:first-child]:rounded-b-2xl md:[&>*:first-child]:rounded-r-2xl"
          //   : hasGap
          //     ? index === 0
          //       ? "[&>*:first-child]:rounded-r-2xl"
          //       : "[&>*:first-child]:rounded-l-2xl"
          //     : index === 0
          //       ? "[&>*:first-child]:3xl:rounded-l-2xl"
          //       : "[&>*:first-child]:3xl:rounded-r-2xl";

          if ("border" in bannerProps && bannerProps.border) {
            bannerProps.border.borderRadius = bannerProps.border.borderRadius
              ? bannerProps.border.borderRadius
              : { desktop: "full", mobile: "full" };
          }

          const sizes: Media<BannerSize> = "sizes" in bannerProps
            ? bannerProps.sizes
            : { mobile: "taller", desktop: "normal" };

          return (
            <Banner
              {...bannerProps}
              device={device}
              aspectRatioWidth={width}
              hasPadding={hasPadding}
              border={"border" in bannerProps ? bannerProps.border : undefined}
              sizes={sizes}
              class={`${hoverScale}`}
              department={department}
            />
          );
        })}
      </section>
    )
    : <></>;
}

export function LoadingFallback() {
  return <BannerSkeleton bannerType="double" />;
}
