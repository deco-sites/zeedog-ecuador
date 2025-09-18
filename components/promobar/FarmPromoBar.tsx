import { Device } from "@deco/deco/utils";
import Image from "apps/website/components/Image.tsx";
import ClosePromoBarButton from "site/islands/header/promobar/ClosePromoBarButton.tsx";

export interface FarmPromoBarProps {
  device: Device;
}
export default function FarmPromoBar({ device }: FarmPromoBarProps) {
  const today = new Date();
  const launchDate = new Date("2025-08-28");

  const timeLeft = launchDate.getTime() - today.getTime();

  const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
  return (
    <section class="absolute top-0 h-20 flex items-center justify-center w-full transition-all order-2 bg-white shadow-md z-20">
      <div class="relative flex items-center justify-between gap-3 max-w-6xl w-full h-full px-4 md:px-8 xl:px-0">
        {device !== "mobile" && (
          <Image
            src="https://assets.decocache.com/zeedog/76acc413-5a21-4ff7-97d1-aac9337176e8/farm-zeedog-promobar-title.png"
            width={212}
            height={36}
            class="-mb-3.5"
          />
        )}

        <p class="font-body-2xs-regular md:font-body-xs-regular text-black">
          Faltam {daysLeft}{" "}
          dias. Cadastre-se e fique{device === "mobile" && <br />}{" "}
          por dentro de tudo.
        </p>

        <Image
          src="https://assets.decocache.com/zeedog/956a6127-75bf-46d3-95a4-ac25c73cf810/flower-date.svg"
          width={62}
          height={64}
        />
      </div>
      <ClosePromoBarButton fill="#121212" />
    </section>
  );
}
