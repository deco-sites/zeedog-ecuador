import type { Alignment, ColorByDevice, Media } from "$sdk/types/banner.ts";

const disclaimerPositions = {
  left: "left-0",
  center: "",
  right: "right-0",
};

export interface BannerDisclaimerProps {
  /** @format textarea */
  text?: string;
  textAlignment?: Media<Alignment>;
  position?: Media<Alignment>;
  textColor: ColorByDevice;
  device: "mobile" | "desktop";
}

export default function BannerDisclaimer(
  { text = "", textAlignment, position, textColor, device }:
    BannerDisclaimerProps,
) {
  const disclaimerPosition = `${
    disclaimerPositions[position?.["mobile"]!]
  } md:${disclaimerPositions[position?.["desktop"]!]}`;

  return text
    ? (
      <div
        class={`absolute ${disclaimerPosition} w-full lg:w-1/2 bottom-6 px-8 py-2 rounded font-body-2xs-regular lg:font-body-2xs-regular text-${
          textAlignment?.[device]
        }`}
        style={`color: ${textColor[device]};`}
        dangerouslySetInnerHTML={{ __html: text }}
      >
      </div>
    )
    : <></>;
}
