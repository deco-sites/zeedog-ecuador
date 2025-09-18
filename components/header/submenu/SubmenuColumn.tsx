import Image from "apps/website/components/Image.tsx";
import { ISubmenuColumn } from "$sdk/types/header.ts";
import { SubmenuGroup } from "$components/header/submenu/SubmenuGroup.tsx";
import { clx } from "site/sdk/clx.ts";

export interface MenuColumnProps {
  menuColumns: ISubmenuColumn[];
}

export function SubmenuColumn({ menuColumns }: MenuColumnProps) {
  return (
    <>
      {menuColumns?.map(
        ({ submenuGroups, leftVerticalBar, bottomSVG }, columnIndex) => {
          const specialLeftBorder = leftVerticalBar &&
            "before:content-[''] before:absolute before:top-0 before:left-0 before:w-px before:h-[480px] before:bg-gray-200";

          return (
            <div
              class={clx(
                "relative flex flex-col py-8 px-5 min-w-[196px]",
                specialLeftBorder,
              )}
            >
              <SubmenuGroup
                menuGroups={submenuGroups}
                columnIndex={columnIndex}
              />

              {(bottomSVG && bottomSVG.svg) && (
                <a
                  {...bottomSVG.url !== "" ? { href: bottomSVG.url } : ""}
                  class="absolute bottom-8"
                >
                  <Image
                    src={bottomSVG.svg}
                    alt={bottomSVG.alt}
                    width={bottomSVG.width}
                    height={bottomSVG.height}
                  />
                </a>
              )}
            </div>
          );
        },
      )}
    </>
  );
}
