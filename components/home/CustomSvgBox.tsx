import Image from "apps/website/components/Image.tsx";
import { SvgBox, SvgTitle } from "site/sdk/types/banner.ts";

const positionsMO = {
  "top-left": "top-6 right-auto bottom-auto left-6 translate-x-0 translate-y-0",
  "top-center":
    "top-8 right-auto bottom-auto left-auto translate-x-0 translate-y-0",
  "top-right": "top-6 right- bottom-auto left-auto translate-x-0 translate-y-0",
  "right": "top-auto right-6 bottom-auto left-auto translate-x-0 translate-y-0",
  "center-left":
    "top-auto right-auto bottom-auto left-1/4 -translate-x-1/2 translate-y-0",
  "center":
    "top-auto right-auto bottom-auto left-auto translate-x-0 translate-y-0",
  "center-right":
    "top-auto right-1/4 bottom-auto left-auto translate-x-1/2 translate-y-0",
  "bottom-left":
    "top-auto right-auto bottom-6 left-6 translate-x-0 translate-y-0",
  "bottom-center":
    "top-auto right-auto bottom-1/4 left-auto translate-x-0 translate-y-1/2",
  "bottom-right":
    "top-auto right-6 bottom-6 left-auto translate-x-0 translate-y-0",
  "left": "top-auto right-auto bottom-auto left-6 translate-x-0 translate-y-0",
};
const positionsDK = {
  "top-left":
    "md:top-14 md:right-auto md:bottom-auto md:left-14 md:translate-x-0 md:translate-y-0",
  "top-center":
    "md:top-14 md:right-auto md:bottom-auto md:left-auto md:translate-x-0 md:translate-y-0",
  "top-right":
    "md:top-14 md:right-14 md:bottom-auto md:left-auto md:translate-x-0 md:translate-y-0",
  "right":
    "md:top-auto md:right-14 md:bottom-auto md:left-auto md:translate-x-0 md:translate-y-0",
  "center-left":
    "md:top-auto md:right-auto md:bottom-auto md:left-1/4 md:-translate-x-1/2 md:translate-y-0",
  "center":
    "md:top-auto md:right-auto md:bottom-auto md:left-auto md:translate-x-0 md:translate-y-0",
  "center-right":
    "md:top-auto md:right-1/4 md:bottom-auto md:left-auto md:translate-x-1/2 md:translate-y-0",
  "bottom-left":
    "md:top-auto md:right-auto md:bottom-14 md:left-14 md:translate-x-0 md:translate-y-0",
  "bottom-center":
    "md:top-auto md:right-auto md:bottom-1/4 md:left-auto md:translate-x-0 md:-translate-y-1/2",
  "bottom-right":
    "md:top-auto md:right-14 md:bottom-14 md:left-auto md:translate-x-0 md:translate-y-0",
  "left":
    "md:top-auto md:right-auto md:bottom-auto md:left-14 md:translate-x-0 md:translate-y-0",
};

export interface CustomSvgBoxProps {
  customSvgBox: SvgBox;
  customSvgOnHover?: SvgTitle;
  device: "mobile" | "desktop";
}

export default function CustomSvgBox(
  { customSvgBox, customSvgOnHover, device }: CustomSvgBoxProps,
) {
  const { svgInfos, position } = customSvgBox;

  const { width, height, svg } = svgInfos;

  const alignmentAndPosition = `${
    positionsMO[position.mobile || "bottom-left"]
  } ${positionsDK[position.desktop || "bottom-left"]}`;

  return svg
    ? (
      <div class={`absolute ${alignmentAndPosition}`}>
        <Image
          class="banner__custom-svg relative opacity-100 visible transition-all"
          width={width?.[device] || 150}
          height={height?.[device] || 150}
          src={svg}
        />
        {(customSvgOnHover && customSvgOnHover.svg) && (
          <Image
            class="banner__custom-svg-onhover absolute opacity-0 invisible top-0 left-0 transition-all"
            width={customSvgOnHover.width?.[device] || 150}
            height={customSvgOnHover.height?.[device] || 150}
            src={customSvgOnHover.svg}
          />
        )}
      </div>
    )
    : <></>;
}
