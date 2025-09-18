import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { SectionProps } from "@deco/deco";
import { AppContext } from "site/apps/site.ts";

/** @title {{text}} */
export interface IMarquee {
  text?: string;
  imageSrc?: ImageWidget;
  imageSize?: {
    mobile?: {
      width: number;
      height: number;
    };
    desktop?: {
      width: number;
      height: number;
    };
  };
  alt?: string;
}

export interface MarqueeProps {
  /** @format color */
  textColor: string;
  /** @format color */
  backgroundColor: string;
  /** @description The marquee must be at least 200% of the screen */
  marquees: IMarquee[];
}

export default function Marquee(
  { marquees, textColor, backgroundColor, $device }: SectionProps<
    typeof loader
  >,
) {
  const device = $device === "desktop" ? "desktop" : "mobile";
  const marqueeContent = marquees.map(({ text, imageSrc, imageSize }) => (
    <div class={`flex items-center shrink-0 gap-x-6 md:gap-x-10`}>
      {imageSrc && (
        <Image
          src={imageSrc}
          width={imageSize?.[device]?.width || 50}
          height={imageSize?.[device]?.height || 50}
          preload={false}
          decoding="async"
          loading="lazy"
          fetchPriority="auto"
        />
      )}

      {text && (
        <h3
          class={`font-marquee whitespace-nowrap`}
          style={`color: ${textColor}`}
        >
          {text}
        </h3>
      )}
    </div>
  ));

  return (
    <section
      class={`relative flex items-center w-full min-h-16 overflow-hidden my-6 md:my-10`}
      style={`background: ${backgroundColor}`}
    >
      <div
        class={`animation-marquee md:animation-marquee-dk absolute left-0 flex flex-nowrap gap-x-6 md:gap-x-10 hover:animation-pause`}
      >
        {marqueeContent}
        {marqueeContent}
        {/* the content must be 50% bigger than the screen, so we double it to prevent animation break */}
        {$device === "tablet" ||
          $device === "desktop" && [marqueeContent, marqueeContent]}
      </div>
    </section>
  );
}

export const loader = (props: MarqueeProps, _req: Request, ctx: AppContext) => {
  return {
    ...props,
    $device: ctx.device || "desktop",
  };
};
