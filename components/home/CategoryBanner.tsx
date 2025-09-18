import Image from "apps/website/components/Image.tsx";
import { MiniCard } from "$sdk/types/banner.ts";
import { clx } from "$sdk/clx.ts";

/** @title {{title.text}} */
export interface CategoryBannerProps {
  card: MiniCard;
  class: string;
  device: "mobile" | "desktop";
}

const positions = {
  top: "absolute top-6 lg:top-10",
  bottom: "absolute bottom-6 lg:bottom-10",
  outside: "relative",
};

export default function CategoryBanner(
  {
    card: {
      image,
      imageDesktop,
      imageOnHover,
      alt,
      boldTitle,
      title,
      url,
      titlePosition = { mobile: "bottom", desktop: "bottom" },
    },
    class: _class = "",
    device = "desktop",
  }: CategoryBannerProps,
) {
  const finalImage = device === "mobile"
    ? image || imageDesktop
    : imageDesktop || image;

  return (
    <a
      class={clx(
        "group relative flex flex-col shrink-0 items-center justify-center gap-y-3 bg-gray-200 overflow-hidden",
        _class,
      )}
      href={url}
    >
      {(device === "desktop" && imageOnHover) && (
        <Image
          src={imageOnHover}
          width={400}
          height={400}
          class="absolute top-0 left-0 w-full h-full object-center transition-all opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:z-10"
          alt={alt}
        />
      )}
      {finalImage && (
        <Image
          src={finalImage}
          width={device === "mobile" ? 200 : 400}
          height={device === "mobile" ? 200 : 400}
          class={clx(
            "relative w-full h-full object-center transition-all z-0",
            !imageOnHover && "md:group-hover:scale-110",
          )}
          alt={alt}
        />
      )}

      {(title && title.text) && (
        <h3
          class={clx(
            " z-10",
            positions[titlePosition[device] ?? "bottom"],
            boldTitle ? "font-title-xs-bold" : "font-title-xs-regular",
          )}
          style={`color: ${title.color}`}
        >
          {title.text}
        </h3>
      )}
    </a>
  );
}
