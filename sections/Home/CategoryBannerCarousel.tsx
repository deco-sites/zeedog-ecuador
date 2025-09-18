import CategoryBanner, {
  CategoryBannerProps,
} from "$components/home/CategoryBanner.tsx";
import TitleComposition, {
  TitleCompositionProps,
} from "site/components/home/TitleComposition.tsx";
import { AppContext } from "site/apps/site.ts";
import { SectionProps } from "@deco/deco";

// const carouselMaxWidth = {
//   "2": "max-w-5xl",
//   "3": "max-w-7xl",
//   "4": "max-container",
// };

export interface CategoryBannerCarouselProps {
  itemsPerPage: 2 | 3 | 4;
  hasPadding?: boolean;
  hasGap?: boolean;
  roundedBorders?: boolean;
  categoryBanners: Omit<CategoryBannerProps, "class" | "device">[];
  titleComposition?: TitleCompositionProps;
}

export default function CategoryBannerCarousel(
  {
    itemsPerPage,
    hasPadding,
    categoryBanners,
    roundedBorders,
    hasGap,
    titleComposition,
    $device,
  }: SectionProps<typeof loader>,
) {
  const itemWidth = {
    "2": "w-[calc(50%_-_6px)] md:w-[calc(50%_-_10px)]",
    "3": `w-full ${
      hasGap
        ? "lg:w-[calc(33.333333333333336%_-_13.333333333333334px)]"
        : "lg:w-1/3"
    } `,
    "4": `w-full ${hasGap ? "lg:w-[calc(25%_-_15px)]" : "lg:w-1/4"}`,
  };

  const device = $device === "tablet" ? "desktop" : $device;

  // padding mobile quando não há gap, não possui indicativo nenhum de carrossel a não ser que coloquemos pr-6
  const paddingMO = hasGap ? "px-6" : "";

  const padding = hasPadding ? "px-6 md:px-10" : `${paddingMO} md:px-0`;

  const rounded = roundedBorders ? "rounded-2xl" : "";

  const snapDirection = $device !== "desktop"
    ? "snap-x snap-mandatory overflow-auto scrollbar-none scrollbar-none::-webkit-scrollbar scroll-pl-6 md:scroll-pl-10"
    : "";
  // const snapAlign = device === "mobile" ? "first-of-type:snap-center snap-start last-of-type:snap-center" : "";
  const snapAlign = $device !== "mobile" ? "" : "snap-start";

  return ((categoryBanners && categoryBanners.length > 0)
    ? (
      <section class="flex items-center justify-center flex-col gap-y-6 lg:gap-y-10 w-full overflow-hidden">
        {(titleComposition &&
          ("title" in titleComposition || "subtitle" in titleComposition)) && (
          <TitleComposition
            {...titleComposition}
            device={device ?? "desktop"}
          />
        )}
        <div
          class={`flex ${
            hasGap ? "gap-3 md:gap-5" : ""
          } w-full max-container-auto flex-nowrap ${padding} transition-all ease-out duration-500 ${snapDirection}`}
        >
          {categoryBanners.map((categoryBanner) => {
            return (
              <CategoryBanner
                {...categoryBanner}
                class={`${rounded} ${snapAlign} ${itemWidth[itemsPerPage]}`}
                device={device ?? "desktop"}
              />
            );
          })}
        </div>
      </section>
    )
    : <></>);
}

export const loader = (
  props: CategoryBannerCarouselProps,
  _req: Request,
  ctx: AppContext,
) => {
  return {
    ...props,
    $device: ctx.device || "desktop",
  };
};
