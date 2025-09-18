import {
  IMenuItem,
  ISubmenuCollections,
  ISubmenuColumn,
  ISubmenuGroup,
} from "$sdk/types/header.ts";
import { MenuItem } from "./MenuItem.tsx";
import { clx } from "site/sdk/clx.ts";

export interface ISubmenuTexts {
  seeAllText: string;
}

export interface Props {
  categoryLink: IMenuItem;
  menuNews: ISubmenuCollections[];
  submenuTexts: ISubmenuTexts;
}

function HandleMenuDKBreakLine(
  menuColumns: ISubmenuColumn[],
  columnIndex: number,
  menuGroups: ISubmenuGroup[],
  groupIndex: number,
) {
  return groupIndex === menuGroups.length - 1 &&
      menuColumns[columnIndex + 1] &&
      !menuColumns[columnIndex + 1]
        .submenuGroups[0].submenuHeadingItem?.text
    ? menuColumns[columnIndex + 1].submenuGroups[0]
      .submenuGroupItems?.map((item) => (
        <MenuItem
          menuItem={item}
          class={clx(
            "relative flex items-center w-full px-6 h-14 font-body-xs-regular text-gray-700",
            item.isNew && newTag,
          )}
          textColor={item.customColor}
        />
      ))
    : "";
}

const newTag =
  "after:content-['Nuevo'] after:top-0 after:left-full after:text-blue-400 after:text-2xs after:leading-none after:mb-1.5";

export function SubmenuNewMO({ categoryLink, menuNews, submenuTexts }: Props) {
  return (
    <div class="collapse bg-white">
      <input
        aria-label={categoryLink?.text}
        type="checkbox"
        class="peer z-[1]"
      />
      <div
        class={`collapse-title collapse-icon collapse-plus flex items-center px-6 h-14 font-body-xs-bold before:content-[''] before:absolute before:bottom-0 peer-checked:before:hidden before:w-[calc(100%_-_48px)] before:h-px before:bg-gray-200`}
      >
        {categoryLink?.text}
      </div>
      <div class="collapse-content flex flex-col">
        <a
          href={categoryLink?.url}
          class="flex items-center h-11 px-6 font-body-xs-bold"
        >
          {submenuTexts.seeAllText}
        </a>
        {menuNews.map(({ collectionItem, submenuColumns }) => {
          return (
            <div class="collapse bg-gray-100">
              <input
                aria-label={`${categoryLink?.text} - ${collectionItem?.text}`}
                type="checkbox"
                class="peer z-[1]"
              />
              <div
                class={`collapse-title collapse-icon collapse-plus flex items-center px-6 h-14 font-body-xs-bold before:content-[''] before:absolute before:bottom-0 peer-checked:before:hidden before:w-[calc(100%_-_48px)] before:h-px before:bg-gray-200`}
              >
                {collectionItem?.text}
              </div>
              <div class="collapse-content flex flex-col">
                <a
                  href={collectionItem?.url}
                  class="flex items-center h-11 px-6 font-body-xs-bold text-gray-600"
                >
                  {submenuTexts.seeAllText}
                </a>
                {submenuColumns?.map(({ submenuGroups }, columnIndex) => {
                  return submenuGroups.map(
                    ({ submenuHeadingItem, submenuGroupItems }, groupIndex) => {
                      return submenuHeadingItem?.text
                        ? submenuGroupItems && submenuGroupItems.length > 0
                          ? (
                            <div class="collapse bg-gray-200">
                              <input
                                aria-label={`${categoryLink?.text} - ${collectionItem?.text} - ${submenuHeadingItem?.text}`}
                                type="checkbox"
                                class="peer"
                              />
                              <div
                                class={clx(
                                  "collapse-title collapse-icon collapse-plus flex items-center px-6 h-14 bg-gray-200 font-body-xs-bold",
                                  (columnIndex === 0 && groupIndex === 0)
                                    ? ""
                                    : "before:content-[''] before:absolute before:top-0 before:justify-self-center before:w-[calc(100%_-_48px)] before:h-px before:bg-gray-300 before:z-[10]",
                                )}
                              >
                                {submenuHeadingItem?.text}
                              </div>
                              <div class="collapse-content peer-checked:bg-gray-200">
                                <a
                                  href={submenuHeadingItem?.url}
                                  class="flex items-center h-11 px-6 font-body-xs-bold text-gray-600"
                                >
                                  {submenuTexts.seeAllText}
                                </a>
                                {submenuGroupItems?.map((item) => (
                                  <MenuItem
                                    menuItem={item}
                                    class={clx(
                                      "relative flex items-center w-full px-6 h-14 font-body-xs-regular text-gray-700",
                                      item.isNew && newTag,
                                    )}
                                    textColor={item.customColor}
                                  />
                                ))}
                                {HandleMenuDKBreakLine(
                                  submenuColumns,
                                  columnIndex,
                                  submenuGroups,
                                  groupIndex,
                                )}
                              </div>
                            </div>
                          )
                          : (
                            <>
                              <MenuItem
                                menuItem={submenuHeadingItem}
                                class={clx(
                                  "items-center w-full h-14 px-6 bg-gray-200 font-body-xs-bold",
                                  (columnIndex === 0 && groupIndex === 0)
                                    ? ""
                                    : "before:content-[''] before:justify-self-center before:absolute before:top-0 before:w-[calc(100%_-_48px)] before:h-px before:bg-gray-300 before:z-10",
                                  submenuHeadingItem.isNew && newTag,
                                )}
                                textColor={submenuHeadingItem.customColor}
                              />
                            </>
                          )
                        : undefined;
                    },
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
