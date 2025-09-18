import { asset } from "$fresh/runtime.ts";
import type { JSX } from "preact";

export const availableIcons = [
  "ZeeDogHorizontal",
  "ZeeDogVertical",
  "ZeeDogHorizontalConnecting",
  "ZeeDogKitchen",
  "Canseidesergato",
  "CanseidesergatoVertical",
  "ZeeDogHuman",
  "ZeeCatVertical",
  "ZeeCatHorizontal",
  "ZeeNow",
  "Truck",
  "MovingTruck",
  "SubscriptionClock",
  "Discount",
  "SpecialDiscount",
  "Bag",
  "BagFilled",
  "MagnifyingGlass",
  "Heart",
  "HeartFilled",
  "MyAccount",
  "MyAccountFilled",
  "ZeeDogMafia",
  "Locker",
  "LockerFilled",
  "CreditWallet",
  "CreditCard",
  "Receipt",
  "Coupon",
  "RefreshArrow",
  "NutricionalInfo",
  "Ingredients",
  "DailyQuantity",
  "KitchenTransition",
  "PinLocation",
  "Box",
  "SpecialCheck",
  "BoxCheck",
  "Dog",
  "Cat",
  "AirBed",
  "HandsFree",
  "NubankZee",
  "DisneyZee",
  "World",
] as const;

export type AvailableIcons = (typeof availableIcons)[number];

interface IconProps extends JSX.SVGAttributes<SVGSVGElement> {
  /**
   * Symbol id from element to render. Take a look at `/static/icons.svg`.
   *
   * Example: <Icon name="Bell" />
   */
  name: AvailableIcons;
  size?: number;
}

function Icon(
  { name, strokeWidth, size, width, height, ...otherProps }: IconProps,
) {
  return (
    <svg
      {...otherProps}
      width={width ?? size}
      height={height ?? size}
      strokeWidth={strokeWidth}
    >
      <use href={asset(`/svg/sprites.svg#${name}`)} />
    </svg>
  );
}

export default Icon;
