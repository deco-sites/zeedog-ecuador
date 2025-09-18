import { BreadcrumbList } from "apps/commerce/types.ts";
import { TypeFilter } from "$sdk/types/productshelf.ts";
import Image from "apps/website/components/Image.tsx";
import { Tooltip, TooltipContent } from "$components/ui/Tooltip.tsx";
import { Device } from "@deco/deco/utils";
import Breadcrumb from "$components/Breadcrumb.tsx";
import { usePartialSection } from "@deco/deco/hooks";
import { clx } from "site/sdk/clx.ts";

export interface ShelfHeaderProps {
  breadcrumb: BreadcrumbList;
  typeFilters?: TypeFilter[];
  device: Device;
}

export const ShelfHeader = (
  { breadcrumb, typeFilters, device }: ShelfHeaderProps,
) => {
  return (
    <header class="relative flex flex-col xl:flex-row w-full max-container-auto xl:h-full items-start xl:items-center justify-between gap-y-4 xl:gap-x-8 lg:mb-0 py-6 lg:py-8 z-[91] px-6 md:px-10 3xl:px-0">
      <div class="flex flex-col gap-1 lg:gap-2 w-full lg:w-auto overflow-auto scrollbar-none">
        <h1 class="font-title-xl-bold lg:font-title-2xl-bold order-2 xl:order-1">
          {breadcrumb.itemListElement[breadcrumb.itemListElement.length - 1] &&
            breadcrumb.itemListElement[breadcrumb.itemListElement.length - 1]
              .name}
        </h1>
        <Breadcrumb breadcrumb={breadcrumb} />
      </div>

      {(typeFilters && typeFilters.length > 0) &&
        (
          <div
            class={clx(
              "flex xl:justify-end items-center gap-4 w-full max-w-full xl:w-auto h-full overflow-auto xl:overflow-visible snap-x snap-mandatory scroll-pl-6",
              typeFilters.length > 14 && "xl:flex-wrap xl:max-w-[80%]",
            )}
          >
            {typeFilters.map(
              ({ image, filterLabel, description, url, selected }) => {
                return (
                  <button
                    {...usePartialSection({
                      href: url,
                    })}
                    class="group flex shrink-0 w-full max-w-24 lg:max-w-20 h-full items-start justify-center snap-start"
                  >
                    <Tooltip
                      class={`flex flex-col items-center justify-start h-full font-body-2xs-regular ${
                        selected ? "text-black" : "text-gray-500"
                      } lg:hover:text-black`}
                    >
                      {image && (
                        <Image
                          src={image}
                          width={77}
                          height={77}
                          class={`${
                            selected ? "opacity-100" : "opacity-50"
                          } lg:group-hover:opacity-100 transition-all`}
                        />
                      )}

                      {filterLabel}

                      {device === "desktop" && description && (
                        <TooltipContent class="group-last:-left-14 group-last:after:right-11 !hidden xl:!flex min-w-72 max-w-72 px-3 bg-gray-100 font-body-2xs-regular text-black rounded dropdown-content-tooltip-arrow-gray-100">
                          {description}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </button>
                );
              },
            )}
          </div>
        )}
    </header>
  );
};
