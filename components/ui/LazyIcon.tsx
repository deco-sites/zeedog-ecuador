import { asset } from "$fresh/runtime.ts";
import type { JSX } from "preact";

export type AvailableLazyIcons =
  | "ZeeDogKitchenSubmenuCTA"
  | "ZeeNowPetShopMinutos"
  | "ZeeNowQRCode"
  | "ZeeNowDownload"
  | "SubscriptionTag"
  | "KitchenRibbon"
  | "Coins"
  | "Instagram"
  | "Facebook"
  | "Twitter"
  | "TikTok"
  | "Spotify"
  | "YouTube"
  | "Pinterest"
  | "Whatsapp"
  | "Chat"
  | "ChatFilled"
  | "Email"
  | "Payment"
  | "PaymentVisa"
  | "PaymentMastercard"
  | "PaymentElo"
  | "PaymentAmex"
  | "PaymentDiners"
  | "PaymentPix"
  | "PaymentVisaBlack"
  | "PaymentMastercardBlack"
  | "PaymentEloBlack"
  | "PaymentAmexBlack"
  | "PaymentPixBlack"
  | "PaymentDinersBlack"
  | "Close"
  | "Plus"
  | "Minus"
  | "Filter"
  | "Sort"
  | "Trash"
  | "TrashFilled"
  | "Eraser"
  | "CopyLink"
  | "RedoMagnifyingGlass"
  | "RedoArrow"
  | "TrendingArrow"
  | "ArrowDown"
  | "ArrowUp"
  | "ArrowRight"
  | "ArrowLeft"
  | "BodyArrowDown"
  | "BodyArrowUp"
  | "BodyArrowRight"
  | "BodyArrowLeft"
  | "YouTubeFixedBar"
  | "PlayVideoGrid"
  | "Checked"
  | "Warning"
  | "Info"
  | "Help"
  | "QrCodeWhatsApp"
  | "Star"
  | "HalfStar"
  | "EmptyStar"
  | "HelpVet"
  | "Sizes"
  | "Faq"
  | "HeadPhone"
  | "Eye"
  | "EyeSlashed"
  | "Phone"
  | "Clock"
  | "Dog"
  | "Cat"
  | "Logout"
  | "LocationPoint"
  | "Map"
  | "EditItem"
  | "Calendar"
  | "PercentageWhiteoutCircle"
  | "Copy"
  | "Copied"
  | "BFPlay"
  | "BFWishlist"
  | "Trophy"
  | "Timer"
  | "HandShake"
  | "Share"
  | "Heart"
  | "LightningBolt"
  | "BlogTag"
  | "Home"
  | "SealCheck"
  | "PositiveHand"
  | "HeartFilled"
  | "PlayLine"
  | "PlayFilled"
  | "Mouse"
  | "Arrow360"
  | "BlogTag"
  | "itFlag"
  | "esFlag";

// const mapWeightToValue: Record<IconWeight, number> = {
//   bold: 24,
//   regular: 16,
//   light: 12,
//   thin: 8,
// };

interface IconProps extends JSX.SVGAttributes<SVGSVGElement> {
  /**
   * Symbol id from element to render. Take a look at `/static/icons.svg`.
   *
   * Example: <Icon name="Bell" />
   */
  name: AvailableLazyIcons;
  size?: number;
}

export default function LazyIcon(
  { name, strokeWidth, size, width, height, ...otherProps }: IconProps,
) {
  return (
    <svg
      {...otherProps}
      width={width ?? size}
      height={height ?? size}
      strokeWidth={strokeWidth}
    >
      <use href={asset(`/svg/lazy-sprites.svg#${name}`)} />
    </svg>
  );
}
