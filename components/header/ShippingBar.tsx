import Icon, { AvailableIcons } from "site/components/ui/Icon.tsx";
import { FREE_SHIPPING_VALUE } from "zee/sdk/constants.ts";
import { useCart } from "zee/sdk/hooks/useCart.ts";
import { formatPrice } from "$sdk/global/format.ts";
import { clx } from "site/sdk/clx.ts";

export interface ShippingBarTextsProps {
  theyAreMissingText: string;
  forFreeShippingText: string;
  completedFreeShippingText: string;
  freeShippingStartText: string;
}

export interface ShippingBarProps {
  whereabout?: "header" | "pdp" | "minicart";
  texts: ShippingBarTextsProps;
}

export function ShippingBar(
  { whereabout = "header", texts }: ShippingBarProps,
) {
  const { cart } = useCart();
  const total = parseFloat(cart.value?.cost.totalAmount.amount || 0);

  let iconName: AvailableIcons = "Truck";
  let wrapperStyle = "";
  let customStyle = "";
  let foldedOpacity = "";

  if (whereabout === "header") {
    wrapperStyle = `bg-gray-100 folded-header:opacity-0 h-full`;
    customStyle = `bg-gray-100 h-full`;
    foldedOpacity = "folded-header:opacity-0";
  }

  if (whereabout === "pdp") {
    wrapperStyle = `border-b border-gray-200 bg-white`;
    customStyle = "bg-white h-8 lg:h-10";
  }

  if (whereabout === "minicart") {
    wrapperStyle = "border-b border-white bg-gray-100";
    customStyle = "h-8 lg:h-10";
  }

  let shippingBarHTML = <></>;
  let svgColor = "text-black";

  if (total < FREE_SHIPPING_VALUE) {
    shippingBarHTML = (
      <>
        {texts.theyAreMissingText}{" "}
        <span class="text-blue-400">
          {formatPrice(FREE_SHIPPING_VALUE - total)}
        </span>{" "}
        {texts.forFreeShippingText}
      </>
    );
  }

  if (total >= FREE_SHIPPING_VALUE) {
    iconName = "MovingTruck";
    shippingBarHTML = <>{texts.completedFreeShippingText}</>;
    svgColor = "text-blue-400";
  }

  if (total === 0) {
    shippingBarHTML = (
      <>
        {texts.freeShippingStartText} {formatPrice(FREE_SHIPPING_VALUE)}
      </>
    );
  }

  return (
    <div
      class={clx("flex justify-center w-full", wrapperStyle)}
    >
      <div
        class={clx(
          "relative flex items-center justify-center gap-2.5 w-full max-container-auto transition-all",
          customStyle,
        )}
      >
        <Icon
          name={iconName}
          width={24}
          height={24}
          class={clx("opacity-100 text-black", foldedOpacity, svgColor)}
        />
        <span
          class={clx(
            "font-body-2xs-bold opacity-100 text-black",
            foldedOpacity,
          )}
        >
          {shippingBarHTML}
        </span>
        <span
          class="absolute left-0 bottom-0 h-1 bg-blue-400 transition-all"
          style={whereabout === "header"
            ? `width: ${
              (total * 100) / FREE_SHIPPING_VALUE < 100
                ? ((total * 100) / FREE_SHIPPING_VALUE).toFixed(2)
                : "100"
            }vw`
            : `width: ${
              (total * 100) / FREE_SHIPPING_VALUE < 100
                ? ((total * 100) / FREE_SHIPPING_VALUE).toFixed(2)
                : "100"
            }%`}
        >
        </span>
      </div>
    </div>
  );
}
