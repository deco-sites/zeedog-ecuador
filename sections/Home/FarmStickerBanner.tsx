import { useDevice } from "@deco/deco/hooks";
import StickerBanner, {
  StickerBannerProps,
} from "site/components/home/StickerBanner.tsx";
import {
  BannerBorder,
  BannerSize,
  BannerSpacement,
  Media,
} from "site/sdk/types/banner.ts";
import { SingleBannerProps } from "site/sections/Home/SingleBanner.tsx";
import { clx } from "site/sdk/clx.ts";

const margins = {
  none: "",
  top: "mt-6 lg:mt-10",
  bottom: "mb-6 lg:mb-10",
  both: "my-6 lg:my-10",
};

const DEFAULT_PROPS: SingleBannerProps = {
  deviceDisplay: "both",
  spacement: {
    mobile: {
      hasPadding: false,
      hasMargin: "both",
    },
    desktop: {
      hasPadding: false,
      hasMargin: "both",
    },
  },
  banner: {
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
  },
};

export interface FarmStickerBannerProps {
  /**
   * @default both
   * @title Dispositivo de exibição
   * @description Defina este campo se o título possuir diferenças entre mobile e desktop
   */
  deviceDisplay: "both" | "mobile" | "desktop";
  /** @title Espaçamentos */
  spacement: Media<Omit<BannerSpacement, "hasGap">>;
  /** @title Tipo do banner */
  banner: StickerBannerProps;
}
export default function FarmStickerBanner(props: FarmStickerBannerProps) {
  const {
    deviceDisplay,
    banner,
    spacement,
  } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  const sizes: Media<BannerSize> = "sizes" in banner
    ? banner.sizes
    : { mobile: "taller", desktop: "normal" };

  const device = useDevice();
  const deviceConstraint = device === "tablet" ? "desktop" : device;
  const department = "zeedog";

  const hasPadding = spacement[deviceConstraint]?.hasPadding;
  const hasMargin = spacement[deviceConstraint]?.hasMargin;

  const mt = margins[hasMargin || "none"];

  let width = device === "tablet" ? "960" : "1920";
  let padding = "";
  // let rounded = "3xl:[&>*:first-child]:rounded-2xl";
  let hoverScale = "";

  if (hasPadding) {
    width = device === "tablet" ? "900" : "1840";
    padding = "px-6 md:px-10";
    // rounded = "[&>*:first-child]:rounded-2xl";
    hoverScale =
      "[&>*:first-child]:hover:scale-[98%] [&>*:first-child]:hover:scale-y-95 [&>*:first-child]:transition-all";
  }
  let finalBorder: BannerBorder | undefined = undefined;
  if ("border" in banner && banner.border) {
    finalBorder = banner.border;
  }

  return (
    (device === deviceDisplay || deviceDisplay === "both")
      ? (
        <section
          class={`${
            clx(
              "w-full max-container-auto",
              padding && padding,
              mt && mt,
            )
          }`}
        >
          <StickerBanner
            {...banner}
            device={device === "tablet" ? "desktop" : device}
            aspectRatioWidth={width}
            class={`${hoverScale}`}
            department={department}
            hasPadding={hasPadding}
            border={finalBorder || undefined}
            // borderRadius={borderRadius}
            sizes={sizes}
          />
        </section>
      )
      : <></>
  );
}
