import { ISubmenuCollections, ISubmenuGroup } from "$sdk/types/header.ts";
import { clx } from "site/sdk/clx.ts";
import { MenuItem } from "./MenuItem.tsx";

export interface MenuNewsProps {
  menuNews?: ISubmenuCollections[];
}

const newTag =
  "after:content-['Nuevo'] after:absolute after:top-0 after:left-full after:text-blue-400 after:text-2xs after:leading-none";

const linkAfter =
  "hover:after:w-full after:absolute after:bottom-0 after:w-0 after:h-px after:bg-black after:transition-all";

export function SubmenuNewsDK({ menuNews }: MenuNewsProps) {
  const newsDivision = menuNews?.map(({ collectionItem }) => (
    <li
      class={`news-menu-division-dk menu-link-dk group/menugroup relative flex flex-col justify-center w-full font-body-xs-bold mb-7`}
      data-imgsrc={collectionItem.imgsrc}
      data-menu-division-id={collectionItem.text}
    >
      <MenuItem
        menuItem={collectionItem}
        class={`w-max group-hover/menugroup:after:w-full after:absolute after:left-0 ${linkAfter}`}
        textColor={collectionItem.customColor}
      />
    </li>
  ));

  const newsColumns = menuNews?.map((
    { collectionItem, submenuColumns },
    index,
  ) => (
    <div
      class={`news-submenu-columns-dk ${index === 0 ? "flex" : "hidden"}`}
      data-submenu-news-id={collectionItem.text}
    >
      {submenuColumns?.map(({ submenuGroups }) => {
        return (
          <div class="relative flex flex-col py-8 px-5 min-w-[196px]">
            {submenuGroups.map(
              ({ submenuHeadingItem, submenuGroupItems }: ISubmenuGroup) => {
                return (
                  <ul class="group/menugroup flex flex-col mb-10 first-of-type:mt-0">
                    {submenuHeadingItem
                      ? (
                        <li
                          class={clx(
                            "menu-link-dk relative flex flex-col w-max font-body-xs-bold mb-2.5",
                            linkAfter,
                          )}
                          data-imgsrc={submenuHeadingItem.imgsrc}
                        >
                          <MenuItem
                            menuItem={submenuHeadingItem}
                            class={clx(
                              "items-center justify-center",
                              submenuHeadingItem.isNew && newTag,
                            )}
                            textColor={submenuHeadingItem.customColor}
                          />
                        </li>
                      )
                      : <li class="h-[30px]"></li>}
                    {submenuGroupItems?.map((item) => {
                      return (
                        <li
                          class={clx(
                            "menu-link-dk group/link relative flex flex-col w-max font-body-xs-regular text-gray-600 mb-2.5",
                            linkAfter,
                          )}
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
                );
              },
            )}
          </div>
        );
      })}
    </div>
  ));

  return (
    <>
      {newsDivision && (
        <div class="relative flex flex-col py-8 px-5 min-w-[196px]">
          <ul class="relative">
            {newsDivision}
            <span
              class={`menu-news-arrow absolute right-0 w-2.5 h-2.5 border-t border-r border-color-black rotate-45 transition-all`}
            />
          </ul>
        </div>
      )}
      {newsColumns}
    </>
  );
}
