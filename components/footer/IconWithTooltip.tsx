import LazyIcon, { AvailableLazyIcons } from "$components/ui/LazyIcon.tsx";
import { Tooltip, TooltipContent } from "$components/ui/Tooltip.tsx";
import { clx } from "site/sdk/clx.ts";

interface InteractiveIconWithTooltipProps {
  href: string;
  ariaLabel: string;
  iconName: AvailableLazyIcons;
  iconWidth: number | string;
  iconHeight: number | string;
  children: any;
  tooltipClass?: string;
  class?: string;
}

interface ButtonIconWithTooltipProps
  extends Omit<InteractiveIconWithTooltipProps, "href"> {
  onClick: () => void;
}

export function ButtonIconWithTooltip(
  {
    ariaLabel,
    iconName,
    iconWidth,
    iconHeight,
    children,
    tooltipClass = "",
    class: _class = "",
    onClick,
  }: ButtonIconWithTooltipProps,
) {
  return (
    <Tooltip class="group flex">
      <button
        onClick={onClick}
        aria-label={ariaLabel}
        class={clx(
          "flex justify-center items-center w-10 h-10 border border-solid border-gray-200 group-hover:bg-black group-hover:border-black rounded cursor-pointer",
          _class,
        )}
      >
        <LazyIcon
          name={iconName}
          width={iconWidth}
          height={iconHeight}
          class="text-black group-hover:text-white fill-transparent"
        />
      </button>
      <TooltipContent class={tooltipClass}>
        {children}
      </TooltipContent>
    </Tooltip>
  );
}

export function InteractiveIconWithTooltip(
  {
    href,
    ariaLabel,
    iconName,
    iconWidth,
    iconHeight,
    children,
    tooltipClass = "",
    class: _class = "",
  }: InteractiveIconWithTooltipProps,
) {
  return (
    <Tooltip class="group flex">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        class={clx(
          "flex justify-center items-center w-10 h-10 border border-solid border-gray-200 group-hover:bg-black group-hover:border-black rounded cursor-pointer hover:text-white",
          _class,
        )}
      >
        <LazyIcon
          name={iconName}
          width={iconWidth}
          height={iconHeight}
          class="text-black group-hover:text-white"
        />
      </a>
      <TooltipContent class={tooltipClass}>
        {children}
      </TooltipContent>
    </Tooltip>
  );
}
