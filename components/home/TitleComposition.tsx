import { Media } from "site/sdk/types/banner.ts";

const textAlignments = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const justifyPositions = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

type JustifyPosition = "left" | "center" | "right";
type Alignment = JustifyPosition;

/** @format color */
type TextColor = string;

export interface TitleCompositionProps {
  /** @format textarea */
  title?: string;
  /** @format textarea */
  subtitle?: string;
  color?: Media<TextColor>;
  justifyPosition: Media<JustifyPosition>;
  textAlignment: Media<Alignment>;
  /**
   * @hide true
   * @ignore true
   */
  device: "mobile" | "desktop";
}

export default function TitleComposition(
  {
    title,
    subtitle,
    color = { mobile: "#121212", desktop: "#121212" },
    justifyPosition = { mobile: "center", desktop: "center" },
    textAlignment = { mobile: "center", desktop: "center" },
    device,
  }: TitleCompositionProps,
) {
  const justify = justifyPositions[justifyPosition[device] ?? "center"];
  const alignment = textAlignments[textAlignment[device] ?? "center"];

  return (
    <div
      class={`flex ${justify} w-full max-container px-6 md:px-10 3xl:px-0`}
    >
      <div
        class={`flex flex-col items-center justify-center gap-y-1 ${alignment} h-20 md:h-36`}
      >
        {title && (
          <h2 class={`relative order-2 w-fit`}>
            <pre
              class="font-title-xl-bold lg:font-title-2xl-bold"
              style={`color: ${color[device]}`}
              dangerouslySetInnerHTML={{ __html: title }}
            ></pre>
          </h2>
        )}
        {subtitle && (
          <pre
            class={`banner__subtitle font-body-xs-regular order-3`}
            style={`color: ${color[device]}`}
            dangerouslySetInnerHTML={{ __html: subtitle }}
          >
          </pre>
        )}
      </div>
    </div>
  );
}
