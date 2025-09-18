import { ImageWidget, VideoWidget } from "apps/admin/widgets.ts";
import { Department } from "site/sdk/types/global.ts";

/** @title {{{text}}} */
export interface Title {
  /**
   * @title Display device
   * @description Define this field if the title has differences between mobile and desktop
   */
  deviceDisplay?: "" | "mobile" | "desktop";
  /** @format textarea */
  text?: string;
  /**
   * @format color
   */
  color?: string;
}

export interface Subtitle extends Title {
  /** @default bottom */
  position: "top" | "bottom";
}

export interface SvgTitle {
  svg?: ImageWidget;
  /** @title SVG Width */
  width?: Media<number>;
  /** @title SVG Height */
  height?: Media<number>;
}

/** @title {{{text}}} */
export interface TitleAndSvg extends Title, SvgTitle {}

export interface SvgBox {
  svgInfos: SvgTitle;
  position: Media<SVGPosition>;
}

export type Alignment = "left" | "center" | "right";

export type ShelfTitlePosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type Position =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-center";

export type SVGPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-center"
  | "bottom-left"
  | "bottom-right"
  | "left";

export interface ColorByDevice {
  /**
   * @format color
   */
  mobile?: string;
  /**
   * @format color
   */
  desktop?: string;
}

export interface ShelfBannerTitles
  extends Omit<Titles, "textBetweenTitles" | "position"> {
  position?: Media<ShelfTitlePosition>;
}

/** @title Titles */
export interface Titles {
  /**
   * @title Overall color
   * @description Use this color option when there are no specific colors among the banner's text components */
  overallColor: ColorByDevice;
  /**
   * @maxItems 4
   */
  titles?: TitleAndSvg[];
  textBetweenTitles?: string;
  /**
   * @maxItems 2
   * @title Subtitles
   */
  subtitles?: Subtitle[];
  /**
   * @maxItems 4
   * @description Links that will appear below the titles. e.g.: see all, see launch, check out
   */
  ctas?: CTA[];

  /** @description Text alignment */
  alignment: Media<Alignment>;
  /** @description Positioning of the text box in the banner */
  position: Media<Position>;
}

/** @title {{text}} */
export interface CTA {
  /**
   * @title Display device
   * @description Define this field if the title has differences between mobile and desktop
   */
  deviceDisplay?: "" | "mobile" | "desktop";
  text: string;
  url: string;
  /**
   * @format color
   */
  color?: string;
}

export interface Media<T> {
  mobile?: T;
  desktop?: T;
}

export interface Background {
  /** @format color */
  backgroundColor?: string;
  images?: Media<ImageWidget>;
  videos?: Media<VideoWidget>;
  alt: string;
  /** @default false */
  preload: boolean;
}

export type BannerSize =
  | "oldslim"
  | "slim"
  | "oldnormal"
  | "normal"
  | "taller"
  | "withCarousel";

/** @title Spacings */
export interface BannerSpacement {
  /**
   * @title Lateral spacing
   * @default false */
  hasPadding: boolean;
  /**
   * @title Horizontal spacing between banners
   * @default false */
  hasGap: boolean;
  /**
   * @title Vertical spacing
   * @default none */
  hasMargin?: Margin;
}

/** @title {{{title.text}}} */
export interface MiniCard {
  image: ImageWidget;
  imageDesktop: ImageWidget;
  imageOnHover?: ImageWidget;
  alt: string;
  boldTitle?: boolean;
  title?: Omit<Title, "deviceDisplay">;
  /**
   * @format color
   */
  colorOnHover?: string;
  /** @default bottom */
  titlePosition: Media<"top" | "bottom" | "outside">;
  url: string;
}

export type Margin = "none" | "top" | "bottom" | "both";

/** @default none */
export type BorderRadius =
  | "none"
  | "noneBelowQHD"
  | "full"
  | "top"
  | "top-left"
  | "top-right"
  | "left"
  | "bottom"
  | "bottom-left"
  | "bottom-right"
  | "right";

export interface Disclaimer {
  /** @format textarea */
  text?: string;
  /** @title Alignment */
  textAlignment?: Media<Alignment>;
  /** @title Position */
  position?: Media<Alignment>;
  /** @title Color */
  textColor: ColorByDevice;
  device: "mobile" | "desktop";
}

export interface BannerBorder {
  /** @title Border curvature */
  borderRadius: Media<BorderRadius>;
  /**
   * @title Border color
   * @format color */
  borderColor?: string;
}

/** @title Fully customizable banner */
export interface BannerProps {
  /** @title URL */
  url?: string;
  /**
   * @title Lateral spacing
   * @default false */
  hasPadding?: boolean;
  /** @title Borders */
  border?: BannerBorder;
  /** @title Sizes */
  sizes: Media<BannerSize>;
  /** @title Images, Videos or background colors */
  backgroundComponent: Background;
  /**
   * @title Banner Texts
   * @description Titles, Subtitles and CTAs. ex.: see all, see launch
   */
  titleBox?: Titles;
  /** @title SVGs separated from the title */
  customSvgBox?: SvgBox;
  disclaimer?: Omit<Disclaimer, "device">;
  /**
   * @hide true
   * @ignore true
   */
  aspectRatioWidth: string;
  /**
   * @hide true
   * @ignore true
   */
  device: "mobile" | "desktop";
  /**
   * @hide true
   * @ignore true
   */
  department: Department;
  /** @hide true */
  class?: string;
  modsOnHover?: BannerOnHover;
}

/** @title Simplified Banner */
export interface SimplifiedBannerProps {
  /** @title URL */
  url?: string;
  /** @title Image, Videos or Background color */
  backgroundComponent: Background;
  /**
   * @title Banner Texts
   * @description Titles, Subtitiles and CTAs. ex.: See all, see products
   */
  titleBox?: SimplifiedTitles;
}

export interface SimplifiedTitles {
  /**
   * @title Overall color
   * @description Use this color option when there are no specific colors among the banner's text components */
  overallColor: ColorByDevice;
  /**
   * @maxItems 4
   */
  titles?: Array<Title & SvgTitle>;
  textBetweenTitles?: string;
  /**
   * @maxItems 2
   * @title Subtitles
   */
  subtitles?: Subtitle[];
  /**
   * @maxItems 4
   * @description Links that will appear below the titles. e.g.: see all, see launch, check out
   */
  ctas?: CTA[];
  /** @hide true */
  alignment: Media<Alignment>;
  /** @hide true */
  position: Media<Position>;
}

export interface BannerOnHover {
  /**
   * @format color
   * @title Title color
   */
  titleColor?: string;
  /**
   * @format color
   * @title Subtitle color
   */
  subtitleColor?: string;
  /**
   * @format color
   * @title CTA color
   */
  ctaColor?: string;
  /**
   * @title SVG inside the title container
   */
  svgImageReplace?: SvgTitle;
  /**
   * @title Custom SVG outside the title container
   */
  customSvgReplace?: SvgTitle;
  hoverImage?: ImageWidget;
  hoverVideo?: VideoWidget;
  /**
   * @default true
   * @description If autoplay is false, the video will play only on hover
   */
  autoplay?: boolean;
}
