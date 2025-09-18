import { Tooltip, TooltipContent } from "$components/ui/Tooltip.tsx";
import { Device } from "@deco/deco/utils";
import Icon from "site/components/ui/Icon.tsx";

interface BrandsProps {
  $device: Device;
  connectingDogsAndPeopleText: string;
}

export function Brands({ $device, connectingDogsAndPeopleText }: BrandsProps) {
  return (
    <div class="flex justify-center w-full lg:border-t lg:border-gray-200 lg:py-10">
      <div class="flex flex-row flex-wrap lg:flex-nowrap lg:gap-x-12 w-full max-w-screen-2xl lg:px-8">
        <Tooltip class="flex basis-full lg:order-last max-lg:border-b border-white lg:basis-auto lg:ml-auto">
          <a
            href={"/"}
            aria-label={"Zee.Dog Logo Connecting Dogs and People"}
            class="flex justify-center items-center w-full cursor-pointer my-12 lg:justify-end lg:my-0"
          >
            <Icon
              name={"ZeeDogHorizontalConnecting"}
              width={152}
              height={55}
            />
          </a>
          <TooltipContent
            mode="arrow"
            class="text-gray-500 font-body-2xs-regular bg-white dropdown-content-tooltip-arrow-white px-3.5 py-2"
          >
            {connectingDogsAndPeopleText ||
              "Zee.Dog - Connecting Dogs and People"}
          </TooltipContent>
        </Tooltip>

        <Tooltip class="basis-1/2 hidden lg:block lg:basis-auto">
          <a
            href="/collections/todos-los-productos"
            aria-label={"Zee.Dog Logo"}
            class="flex justify-center items-center w-full cursor-pointer my-7 lg:my-0"
          >
            <Icon
              name={"ZeeDogVertical"}
              width={40}
              height={50}
              class="h-14"
            />
          </a>
          <TooltipContent
            mode="arrow"
            class="text-gray-500 font-body-2xs-regular bg-white dropdown-content-tooltip-arrow-white px-3.5 py-2"
          >
            Zee.Dog
          </TooltipContent>
        </Tooltip>

        {$device === "desktop" && (
          <hr class="hidden lg:block h-full border-r border-gray-200" />
        )}
        <Tooltip class="flex basis-1/2 max-lg:border-r lg:border-r-0 max-lg:border-b border-white lg:basis-auto">
          <a
            href="/collections/todos-los-productos-para-gatos"
            aria-label={"Zee.Cat"}
            class="flex justify-center items-center w-full cursor-pointer my-7 lg:my-0"
          >
            <Icon
              name={"ZeeCatVertical"}
              width={40}
              height={50}
              class="h-14"
            />
          </a>
          <TooltipContent
            mode="arrow"
            class="text-gray-500 font-body-2xs-regular bg-white dropdown-content-tooltip-arrow-white px-3.5 py-2"
          >
            Zee.Cat
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
