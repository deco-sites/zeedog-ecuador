import Image from "apps/website/components/Image.tsx";
import type { MiniCard } from "$sdk/types/banner.ts";
import { useId } from "site/sdk/hooks/useId.ts";
import { clx } from "site/sdk/clx.ts";

const positions = {
  top: "absolute top-5 md:top-7",
  bottom: "absolute bottom-5 md:bottom-7",
  outside: "relative",
};

export interface MiniCardProps {
  card: MiniCard;
  class: string;
  styles: string;
  device?: "mobile" | "desktop";
}

const MiniCardComponent = (
  {
    card: {
      image,
      imageDesktop,
      imageOnHover,
      alt,
      title,
      url,
      titlePosition = { mobile: "outside", desktop: "bottom" },
      colorOnHover,
    },
    class: _class = "",
    styles,
    device = "desktop",
  }: MiniCardProps,
) => {
  const id = useId();
  return (
    <a
      class={clx(
        `minicard-${id}`,
        "group relative flex flex-col shrink-0 items-center justify-center gap-y-3",
        _class,
      )}
      href={url}
      style={`${styles}`}
    >
      {title && (
        <style>
          {`
          ${
            colorOnHover
              ? `.minicard-${id}:hover .minicard-title {
                    color: ${colorOnHover};
                  }`
              : ""
          }
          .minicard-${id} .minicard-title {
            color: ${title?.color};
          }
          `}
        </style>
      )}
      <div
        class="relative w-full h-full"
        style={`aspect-ratio: 1/1;`}
      >
        <Image
          src={device === "mobile" ? image : imageDesktop}
          width={device === "mobile" ? 300 : 400}
          height={device === "mobile" ? 300 : 400}
          class={clx(
            "relative w-full h-full object-cover object-center transition-all z-10",
            !imageOnHover && "md:group-hover:scale-110",
          )}
          alt={alt}
          decoding="async"
          fetchPriority="auto"
          loading="lazy"
        />
        {(device === "desktop" && imageOnHover) && (
          <Image
            src={imageOnHover}
            width={400}
            height={400}
            class="absolute top-0 left-0 w-full h-full object-cover object-center opacity-0 invisible z-0 group-hover:opacity-100 group-hover:visible group-hover:z-10"
            decoding="async"
            fetchPriority="auto"
            loading="lazy"
          />
        )}
      </div>
      {(title && title.text) && (
        <h3
          class={`minicard-title ${
            positions[titlePosition[device] ?? "bottom"]
          } px-2 font-body-sm-bold md:font-title-xs-bold text-center z-20`}
        >
          {title.text}
        </h3>
      )}
    </a>
  );
};

export default MiniCardComponent;
