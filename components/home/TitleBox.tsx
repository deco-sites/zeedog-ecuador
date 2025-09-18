import Image from "apps/website/components/Image.tsx";
import { SvgTitle, Titles } from "$sdk/types/banner.ts";
import { Department } from "$sdk/types/global.ts";
import { ComponentChildren } from "preact";
import { clx } from "site/sdk/clx.ts";

const alignmentsMO = {
  center: "items-center text-center",
  left: "items-start text-left",
  right: "items-end text-right",
};
const alignmentsDK = {
  center: "md:items-center md:text-center",
  left: "md:items-start md:text-left",
  right: "md:items-end md:text-right",
};

const positionsDK = {
  "top-left":
    "md:top-14 md:right-auto md:bottom-auto md:left-14 md:translate-x-0 md:translate-y-0",
  "top-center":
    "md:top-14 md:right-auto md:bottom-auto md:left-auto md:translate-x-0 md:translate-y-0",
  "top-right":
    "md:top-14 md:right-14 md:bottom-auto md:left-auto md:translate-x-0 md:translate-y-0",
  "center-left":
    "md:top-auto md:right-auto md:bottom-auto md:left-1/4 md:-translate-x-1/2 md:translate-y-0",
  "center":
    "md:top-auto md:right-auto md:bottom-auto md:left-auto md:translate-x-0 md:translate-y-0",
  "center-right":
    "md:top-auto md:right-1/4 md:bottom-auto md:left-auto md:translate-x-1/2 md:translate-y-0",
  "bottom-center":
    "md:top-auto md:right-auto md:bottom-1/4 md:left-auto md:translate-x-0 md:-translate-y-1/2",
};

export interface TitleBoxProps {
  bannerTitles: Titles;
  url?: string;
  device: "mobile" | "desktop";
  department: Department;
  isBannerSlimMobile?: boolean;
  svgOnHover?: SvgTitle;
  children?: ComponentChildren;
}

export default function TitleBox(
  {
    bannerTitles,
    device,
    url = "",
    isBannerSlimMobile,
    svgOnHover,
    department,
    children,
  }: TitleBoxProps,
) {
  const positionsMO = {
    "top-left": `${
      isBannerSlimMobile ? "top-4" : "top-6"
    } right-auto bottom-auto left-6 translate-x-0 translate-y-0`,
    "top-center":
      "top-8 right-auto bottom-auto left-auto translate-x-0 translate-y-0",
    "top-right": `${
      isBannerSlimMobile ? "top-4" : "top-6"
    } right- bottom-auto left-auto translate-x-0 translate-y-0`,
    "center-left":
      "top-auto right-auto bottom-auto left-1/4 -translate-x-1/2 translate-y-0",
    "center":
      "top-auto right-auto bottom-auto left-auto translate-x-0 translate-y-0",
    "center-right":
      "top-auto right-1/4 bottom-auto left-auto translate-x-1/2 translate-y-0",
    "bottom-center":
      "top-auto right-auto bottom-1/4 left-auto translate-x-0 translate-y-1/2",
  };

  const {
    overallColor,
    titles,
    subtitles,
    textBetweenTitles,
    alignment = { mobile: "left", desktop: "left" },
    position = { mobile: "top-left", desktop: "top-left" },
    ctas,
  } = bannerTitles;

  const filteredTitles = titles?.filter(({ deviceDisplay }) =>
    deviceDisplay === device || deviceDisplay === ""
  );

  const filteredSubtitles = subtitles &&
    subtitles?.filter(({ deviceDisplay }) =>
      deviceDisplay === device || deviceDisplay === ""
    );
  const alignmentAndPosition = `${alignmentsMO[alignment.mobile || "left"]} ${
    alignmentsDK[alignment.desktop || "left"]
  } ${positionsMO[position.mobile || "top-left"]} ${
    positionsDK[position.desktop || "top-left"]
  }`;

  const titleFont = department === "human"
    ? "font-title-xl-medium"
    : "font-title-xl-bold lg:font-title-2xl-bold";

  const gapMobile = isBannerSlimMobile ? "gap-y-4" : "gap-y-7";

  return (
    <div
      class={`absolute flex flex-col ${gapMobile} md:gap-y-8 ${alignmentAndPosition} z-20`}
    >
      {(filteredTitles && filteredTitles.length > 0 ||
        filteredSubtitles && filteredSubtitles.length > 0) && (
        <a
          {...url !== "" ? { href: url } : ""}
          class={`flex flex-col gap-y-2.5 ${
            alignmentsMO[alignment.mobile || "left"]
          } ${alignmentsDK[alignment.desktop || "left"]}`}
        >
          {filteredTitles && filteredTitles.map((
            {
              text = "",
              color,
              svg,
              width = { mobile: 100, desktop: 200 },
              height = { mobile: 100, desktop: 200 },
            },
            index,
          ) => (
            <>
              <h2 class={`relative order-2 w-fit`}>
                {text
                  ? (
                    <pre
                      class={`banner__title ${titleFont} transition-all duration-300`}
                      style={`color: ${color || overallColor[device]}`}
                      dangerouslySetInnerHTML={{ __html: text }}
                    ></pre>
                  )
                  : svg
                  ? (
                    <Image
                      class="banner__svg relative opacity-100 visible transition-all duration-300"
                      src={svg}
                      width={width[device] || 250}
                      height={height[device] || 250}
                      alt={text + " | Zee.Dog"}
                    />
                  )
                  : <></>}
                {svgOnHover && svgOnHover.svg && (
                  <Image
                    class="banner__svg-onhover absolute opacity-0 invisible top-0 left-0 transition-all duration-300"
                    src={svgOnHover.svg}
                    width={(svgOnHover.width && svgOnHover.width[device]) ||
                      250}
                    height={(svgOnHover.height && svgOnHover.height[device]) ||
                      250}
                    alt={text + " | Zee.Dog"}
                  />
                )}
              </h2>
              {(index === 0 && filteredTitles.length >= 2 &&
                textBetweenTitles) &&
                (
                  <span
                    class="font-body-xs-regular"
                    style={`color: ${color || overallColor[device]}`}
                  >
                    {textBetweenTitles}
                  </span>
                )}
            </>
          ))}
          {filteredSubtitles &&
            filteredSubtitles.map(({ position, text = "", color }) => (
              <pre
                class={`banner__subtitle font-body-xs-regular ${
                  position === "top" ? "order-1" : "order-3"
                } transition-all duration-300`}
                style={`color: ${color || overallColor[device]}`}
                dangerouslySetInnerHTML={{ __html: text }}
              >
              </pre>
            ))}
        </a>
      )}

      {(ctas && !isBannerSlimMobile) && (
        <div
          class={clx(
            "flex items-center justify-center flex-wrap gap-x-5 md:gap-x-6 gap-y-8 md:w-auto",
            (alignment[device] ?? "").includes("center") && "px-6",
          )}
        >
          {ctas.map(({ text, url, color, deviceDisplay }) => (
            (!deviceDisplay || deviceDisplay === device) && (
              <a
                {...url !== "" ? { href: url } : ""}
                class={`banner__cta group relative flex flex-col font-title-xs-bold whitespace-nowrap transition-all`}
                style={`color: ${color || overallColor[device]}`}
              >
                {text}
                <span
                  class="absolute -bottom-1.5 group-hover:bottom-0 w-full h-px transition-all"
                  style={`background: ${color || overallColor[device]}`}
                >
                </span>
              </a>
            )
          ))}
        </div>
      )}
      {children && children}
    </div>
  );
}
