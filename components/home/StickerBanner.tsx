import { BannerProps } from "$sdk/types/banner.ts";
import TitleBox from "./TitleBox.tsx";
import BannerMedia from "./BannerMedia.tsx";
import BannerDisclaimer from "./BannerDisclaimer.tsx";
import { useId } from "$sdk/hooks/useId.ts";
import { clx } from "site/sdk/clx.ts";
import StickerArea, { StickerTexts } from "site/islands/StickerArea.tsx";
import { Sticker } from "site/sections/Home/FarmStickerEmailCapture.tsx";

const borderRadiusClasses = {
  none: "rounded-none",
  noneBelowQHD: "rounded-none 3xl:rounded-2xl",
  full: "rounded-2xl",
  top: "rounded-t-2xl",
  "top-left": "rounded-tl-2xl",
  "top-right": "rounded-tr-2xl",
  left: "rounded-l-2xl",
  bottom: "rounded-b-2xl",
  "bottom-left": "rounded-bl-2xl",
  "bottom-right": "rounded-br-2xl",
  right: "rounded-r-2xl",
};

const bannerHeight = {
  mobile: {
    oldslim: 150,
    slim: 300,
    oldnormal: 510,
    normal: 450,
    taller: 582,
    withCarousel: 580,
  },
  desktop: {
    oldslim: 300,
    slim: 300,
    oldnormal: 700,
    normal: 600,
    taller: 700,
    withCarousel: 584,
  },
};

export interface StickerBannerProps
  extends Omit<BannerProps, "customSvgBox" | "modsOnHover"> {
  stickersImages: Sticker[];
  texts: StickerTexts;
}

export default function StickerBanner(
  {
    titleBox,
    hasPadding,
    border,
    sizes,
    backgroundComponent,
    url = "",
    device,
    department,
    disclaimer,
    aspectRatioWidth,
    class: _class = "",
    stickersImages,
    texts,
  }: StickerBannerProps,
) {
  const { backgroundColor, alt, preload } = backgroundComponent;

  const image = backgroundComponent.images &&
    backgroundComponent.images[device];
  const video = backgroundComponent.videos &&
    backgroundComponent.videos[device];
  const media = { image, video };

  const aspectRatio = device === "mobile"
    ? `${hasPadding ? "366" : "414"}/${
      bannerHeight.mobile[sizes.mobile || "normal"]
    }`
    : `${aspectRatioWidth}/${bannerHeight.desktop[sizes.desktop || "normal"]}`;

  const borderRadiusSelection = border?.borderRadius[device] || "full";
  const rounded = borderRadiusClasses[borderRadiusSelection];

  const borderColor = border?.borderColor
    ? `border: 2px ${border?.borderColor} solid`
    : "";

  const keyClass = useId();

  return (
    <div
      class={clx(
        `${keyClass}-banner`,
        "relative flex items-center justify-center overflow-hidden",
        _class,
      )}
      style={`aspect-ratio: ${aspectRatio};`}
    >
      <a
        {...url !== "" ? { href: url } : ""}
        class={`relative flex items-center justify-center w-full h-full overflow-hidden ${rounded}`}
        aria-label={alt}
        style={`background: ${backgroundColor}; ${borderColor}`}
      >
        <BannerMedia
          {...media}
          alt={alt}
          aspectRatio={aspectRatio}
          preload={preload}
          class="absolute top-0 left-0 visible opacity-100 z-10 banner__main"
        />
        <StickerArea
          stickersImages={stickersImages}
          device={device}
          texts={texts}
        />
      </a>
      {titleBox && (
        <TitleBox
          bannerTitles={titleBox}
          device={device || "mobile"}
          department={department}
          isBannerSlimMobile={device === "mobile" &&
            sizes.mobile === "slim"}
          {...url !== "" ? { url: url } : ""}
        />
      )}

      {(disclaimer && disclaimer.text) && (
        <BannerDisclaimer {...disclaimer} device={device} />
      )}
    </div>
  );
}
