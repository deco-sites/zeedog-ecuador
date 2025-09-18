import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "@deco/deco/hooks";

export interface BannerCard {
  image: ImageWidget;
  title: string;
  /**
   * @format color
   * @default #121212
   */
  titleColor?: string;
  /** @format textarea */
  text: string;
  /**
   * @format color
   * @default #121212
   */
  textColor?: string;
}

export interface SlimBannerCardsProps {
  bannerCards: BannerCard[];
  /**
   * @format color
   * @default #ffffff
   */
  backgroundColor?: string;
}

export default function SlimBannerCards(
  { bannerCards, backgroundColor = "transparent" }: SlimBannerCardsProps,
) {
  const $device = useDevice() ?? "desktop";

  const snapDirection = $device !== "desktop"
    ? "snap-x snap-mandatory overflow-auto scrollbar-none scrollbar-none::-webkit-scrollbar scroll-pl-6 md:scroll-pl-10"
    : "";
  const snapAlign = $device !== "desktop" ? "snap-start" : "";

  return (
    <section class="relative flex items-center justify-center w-full h-36 lg:h-[300px] my-6 md:my-10 overflow-hidden">
      <div
        class={`flex w-full max-container h-full px-6 md:px-10 gap-3 md:gap-5 xl:gap-0 ${snapDirection}`}
      >
        {(bannerCards && bannerCards.length > 0) &&
          bannerCards.map(
            (
              {
                image,
                title,
                titleColor = "#121212",
                text,
                textColor = "#121212",
              },
            ) => {
              return (
                <div
                  class={`flex flex-col items-center justify-center flex-shrink-0 xl:flex-shrink gap-y-3 w-full h-full px-5 lg:px-0 rounded-l-2xl rounded-r-2xl xl:rounded-none xl:first-of-type:rounded-l-2xl xl:last-of-type:rounded-r-2xl overflow-hidden ${snapAlign}`}
                  style={`background: ${backgroundColor}`}
                >
                  {$device !== "mobile" && (
                    <Image
                      src={image}
                      width={46}
                      height={62}
                    />
                  )}

                  <h3
                    class="font-title-xl-bold lg:font-title-2xl-bold"
                    style={`color: ${titleColor}`}
                  >
                    {title}
                  </h3>

                  <pre
                    class="w-full font-body-2xs-bold md:font-body-xs-bold text-center"
                    dangerouslySetInnerHTML={{
                      __html: text,
                    }}
                    style={`color: ${textColor}`}
                  ></pre>
                </div>
              );
            },
          )}
      </div>
    </section>
  );
}
