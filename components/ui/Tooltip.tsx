import { ComponentChildren, ComponentProps } from "preact";
import { clx } from "$sdk/clx.ts";

export type TooltipMode = "coupon" | "copy" | "default" | "arrow";
export type TooltipColor = "white" | "dark";

export function Tooltip(
  { children, class: _class = "" }: ComponentProps<"div">,
) {
  return (
    <div class={`dropdown dropdown-hover ${_class}`} tabIndex={0}>
      {children}
    </div>
  );
}

interface TooltipContentProps extends ComponentProps<"span"> {
  children: ComponentChildren;
  class?: string;
  mode?: TooltipMode;
  color?: TooltipColor;
}

const MODE_CLASS: Record<TooltipMode, string> = {
  copy: "dropdown-content-tooltip-arrow-copied",
  coupon: "hover:dropdown-content-benefits-tooltip-arrow",
  arrow: "dropdown-content-tooltip-arrow",
  default: "rounded-lg",
};

const COLOR_CLASS: Record<TooltipColor, string> = {
  white: "bg-white text-gray-60",
  dark: "bg-gray-60 text-white",
};

const ARROW_COLOR_CLASS: Record<TooltipColor, string> = {
  white: "dropdown-content-tooltip-arrow-white",
  dark: "dropdown-content-tooltip-arrow-dark",
};

export function TooltipContent(
  { children, class: _class = "", mode = "default", color, ...props }:
    TooltipContentProps,
) {
  return (
    <span
      tabIndex={0}
      class={clx(
        "z-10 dropdown-content dropdown-content-tooltip",
        MODE_CLASS[mode],
        color && COLOR_CLASS[color],
        color && mode === "arrow" && ARROW_COLOR_CLASS[color],
        _class,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
