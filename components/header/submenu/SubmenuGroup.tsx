import { ISubmenuGroup } from "$sdk/types/header.ts";
import { clx } from "site/sdk/clx.ts";
import { MenuItem } from "./MenuItem.tsx";

export interface MenuGroupProps {
  menuGroups: ISubmenuGroup[];
  columnIndex: number;
}

const newTag =
  "after:content-['Nuevo'] after:absolute after:top-0 after:left-full after:text-blue-400 after:text-2xs after:leading-none";

export function SubmenuGroup(
  { menuGroups, columnIndex }: MenuGroupProps,
) {
  return (
    <>
      {menuGroups.map((
        { submenuHeadingItem, submenuGroupItems }: ISubmenuGroup,
      ) => (
        <ul class="group/menugroup flex flex-col first-of-type:mt-0 mb-[30px]">
          {submenuHeadingItem
            ? (
              <li
                class="menu-link-dk relative flex flex-col w-max mb-2.5 group-hover/menugroup:after:w-full after:absolute after:bottom-0 after:w-0 after:h-px after:bg-black after:transition-all"
                data-imgsrc={submenuHeadingItem.imgsrc}
              >
                <MenuItem
                  menuItem={submenuHeadingItem}
                  class={clx(
                    "items-center justify-center font-body-xs-bold",
                    submenuHeadingItem.isNew && newTag,
                  )}
                  textColor={submenuHeadingItem.customColor}
                />
              </li>
            )
            : columnIndex > 0
            ? <li class="h-[30px]"></li>
            : ""}
          {submenuGroupItems?.map((item) => {
            return (
              <li
                class="menu-link-dk group/link relative flex flex-col w-max font-body-xs-regular text-gray-600 mb-2.5 hover:after:w-full after:absolute after:bottom-0 after:w-0 after:h-px after:bg-black after:transition-all"
                data-imgsrc={item.imgsrc}
              >
                <MenuItem
                  menuItem={item}
                  class={clx(
                    "items-center justify-center",
                    item.isNew && newTag,
                  )}
                  textColor={item.customColor}
                />
              </li>
            );
          })}
        </ul>
      ))}
    </>
  );
}
