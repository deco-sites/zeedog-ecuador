import { BannerProps } from "$sdk/types/banner.ts";
import TitleBox from "./TitleBox.tsx";
import BannerMedia from "./BannerMedia.tsx";
import BannerDisclaimer from "./BannerDisclaimer.tsx";
import { useId } from "$sdk/hooks/useId.ts";
import CustomSvgBox from "site/components/home/CustomSvgBox.tsx";
import { clx } from "site/sdk/clx.ts";

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

export default function Banner(
  {
    titleBox,
    customSvgBox,
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
    modsOnHover,
  }: BannerProps,
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

  const {
    ctaColor,
    titleColor,
    subtitleColor,
    svgImageReplace,
    customSvgReplace,
    hoverImage,
    hoverVideo,
    autoplay,
  } = modsOnHover || {};

  const mediaOnHover = { image: hoverImage, video: hoverVideo, autoplay };

  return (
    <div
      class={clx(
        `${keyClass}-banner`,
        "relative flex items-center justify-center overflow-hidden",
        _class,
      )}
      style={`aspect-ratio: ${aspectRatio};`}
    >
      {device === "desktop" && (
        <style>
          {`
          .${keyClass}-banner:hover {

          ${
            titleColor
              ? `
              .banner__title {
                color: ${titleColor}!important;
              }`
              : ""
          }

          ${
            subtitleColor
              ? `
              .banner__subtitle {
                color: ${subtitleColor}!important;
              }`
              : ""
          }

          ${
            ctaColor
              ? `
              .banner__cta {
                color: ${ctaColor}!important;
              }
              .banner__cta span {
                background-color: ${ctaColor}!important;
              }
            `
              : ""
          }

          ${
            svgImageReplace && svgImageReplace.svg &&
              svgImageReplace.width?.desktop &&
              svgImageReplace.width?.desktop > 0
              ? `
              .banner__svg {
                opacity: 0!important;
                visibility: hidden!important;
              }
              .banner__svg-onhover {
                opacity: 1!important;
                visibility: visible!important;
              }
            `
              : ""
          }

          ${
            customSvgReplace && customSvgReplace.svg
              ? `
              .banner__custom-svg {
                opacity: 0!important;
                visibility: hidden!important;
              }
              .banner__custom-svg-onhover {
                opacity: 1!important;
                visibility: visible!important;
              }
            `
              : ""
          }

          ${
            mediaOnHover.image || mediaOnHover.video
              ? `
              .banner__main-img, .banner__main-video {
                opacity: 0!important;
                visibility: hidden!important;
              }
              // .banner__hover-img, .banner__hover-video {
              //   opacity: 1!important;
              //   visibility: visible!important;
              // }
            `
              : ""
          }
          } 
        `}
        </style>
      )}
      <a
        {...url !== "" ? { href: url } : ""}
        class={`relative flex w-full h-full overflow-hidden ${rounded}`}
        aria-label={alt}
        style={`background: ${backgroundColor}; ${borderColor}`}
      >
        <BannerMedia
          {...media}
          alt={alt}
          aspectRatio={aspectRatio}
          preload={preload}
          class="visible opacity-100 z-10 banner__main"
        />
        {device === "desktop" && (
          <BannerMedia
            {...mediaOnHover}
            alt={alt}
            aspectRatio={aspectRatio}
            preload={false}
            class="absolute top-0 left-0 z-0 banner__hover"
          />
        )}
      </a>
      {titleBox && (
        <TitleBox
          bannerTitles={titleBox}
          device={device || "mobile"}
          department={department}
          isBannerSlimMobile={device === "mobile" && sizes.mobile === "oldslim"}
          svgOnHover={modsOnHover?.svgImageReplace}
          {...url !== "" ? { url: url } : ""}
        />
      )}

      {customSvgBox && (
        <CustomSvgBox
          customSvgBox={customSvgBox}
          customSvgOnHover={customSvgReplace}
          device={device}
        />
      )}

      {(disclaimer && disclaimer.text) && (
        <BannerDisclaimer {...disclaimer} device={device} />
      )}
    </div>
  );
}
