import { Margin, MiniCard as IMiniCard } from "$sdk/types/banner.ts";
import MiniCardComponent from "$components/home/MiniCard.tsx";
import { CarouselControls } from "$islands/CarouselControls.tsx";
import { useId } from "site/sdk/hooks/useId.ts";
import TitleComposition, {
  TitleCompositionProps,
} from "site/components/home/TitleComposition.tsx";
import { AppContext } from "site/apps/site.ts";
import { SectionProps } from "@deco/deco";

const margins = {
  none: "",
  top: "mt-6 lg:mt-10",
  bottom: "mb-6 lg:mb-10",
  both: "my-6 lg:my-10",
};

const widths = {
  mobile: {
    1: "w-full",
    2: "w-[calc(50%_-_6px)]",
    3: "w-[calc(33.33333333333%_-_8px)]",
  },
  desktop: {
    3: "w-[calc(33.33333333336%_-_13.333333333334px)]",
    4: "w-[calc(25%_-_15px)]",
    5: "w-[calc(20%_-_16px)]",
    6: "w-[calc(16.66666666667%_-_16.666666666667px)]",
  },
};

export interface MiniCardsCarouselProps {
  /** @default false */
  hasPadding?: boolean;
  /** @default false */
  hasGap?: boolean;
  /** @default false */
  roundedBorder?: boolean;
  hasMargin?: Margin;
  itensPerPageMobile: 1 | 2 | 3;
  itensPerPageDesktop: 3 | 4 | 5 | 6;
  /** @format color */
  borderColor?: string;
  cards: Omit<IMiniCard, "class">[];
  titleComposition?: TitleCompositionProps;
}

export default function MiniCardsCarousel(
  {
    hasPadding,
    hasGap,
    roundedBorder,
    hasMargin,
    cards,
    itensPerPageMobile,
    itensPerPageDesktop,
    borderColor,
    titleComposition,
    $device,
  }: SectionProps<typeof loader>,
) {
  if (!cards || cards.length === 0) return null;

  const device = $device === "tablet" ? "desktop" : $device;

  const snapDirection = $device !== "desktop"
    ? "snap-x snap-mandatory overflow-auto scrollbar-none scrollbar-none::-webkit-scrollbar scroll-pl-6 md:scroll-pl-10"
    : "";

  const snapAlign = $device !== "desktop" ? "snap-start" : "";

  const carouselId = useId();
  const carouselSelector = `${carouselId}-minicards-carousel`;

  const mt = margins[hasMargin || "none"];

  const gap = hasGap ? "gap-3 md:gap-5" : "";
  const paddingMO = hasGap ? "px-6" : "";
  const padding = hasPadding ? "px-6 md:px-10" : `${paddingMO} md:px-0`;

  const width = $device === "mobile"
    ? widths.mobile[itensPerPageMobile || 2]
    : widths.desktop[itensPerPageDesktop || 4];

  const border = borderColor ? `border: 2px solid ${borderColor}` : "";
  const rounded = roundedBorder ? "rounded-2xl overflow-hidden" : "";

  return (
    <section
      class={`relative flex flex-col items-center justify-center gap-y-6 lg:gap-y-10 w-full carousel-right-fade carousel-left-fade ${mt} overflow-hidden`}
    >
      {(titleComposition &&
        ("title" in titleComposition ||
          "subtitle" in titleComposition)) && (
        <TitleComposition
          {...titleComposition}
          device={device ?? "desktop"}
        />
      )}
      <div
        class={`${carouselSelector} ${gap} flex items-start order-1 w-full max-container flex-nowrap ${padding} transition-all ease-out duration-500 ${snapDirection}`}
      >
        {cards.map((card) => {
          return (
            <MiniCardComponent
              card={card}
              class={`${width} ${snapAlign} ${rounded}`}
              styles={border}
              device={device}
            />
          );
        })}
      </div>
      {$device === "desktop" && (cards.length > 3) && (
        <CarouselControls
          carouselSelector={carouselSelector}
          totalItems={cards.length}
          itemsPerSlide={itensPerPageDesktop}
          hasBullets={false}
        />
      )}
    </section>
  );
}

export const loader = (
  props: MiniCardsCarouselProps,
  _req: Request,
  ctx: AppContext,
) => {
  return {
    ...props,
    $device: ctx.device || "desktop",
  };
};
