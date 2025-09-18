import {
  IDepartmentMenu,
  ISubmenuColumn,
  ISubmenuGroup,
} from "$sdk/types/header.ts";
import { MenuItem } from "../submenu/MenuItem.tsx";
import {
  ISubmenuTexts,
  SubmenuNewMO,
} from "$components/header/submenu/SubmenuNewsMO.tsx";
import { DepartmentTabs } from "$components/header/department/DepartmentTabs.tsx";
import { Department } from "$sdk/types/global.ts";
import {
  AccountMO,
  type MyProfileProps,
} from "$components/header/AccountMO.tsx";
import { clx } from "site/sdk/clx.ts";

const newTag =
  "after:content-['Nuevo'] after:top-0 after:left-full after:text-blue-400 after:text-2xs after:leading-none after:mb-1.5";

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

const linksOmittedInMO = ["Novidades"];

const menuTabsControlsMO = () => `
  if (globalThis.window && document) {
    const menuTabs = document.querySelectorAll(".js-dp-tab-mo");
    const menuContents = document.querySelectorAll(".js-dp-menu-content");
    if (menuTabs && menuTabs.length > 0) {
      [...menuTabs].forEach(tab => {
        tab.addEventListener('click', () => {
          [...menuTabs].forEach(dtab => {
            dtab.classList.remove("border-t-2", "border-black", "bg-white");
          });
          tab.classList.add("border-t-2", "border-black", "bg-white");
          const tabDP = tab.dataset.departmentName;
          if (menuContents && menuContents.length > 0) {
            menuContents.forEach(content => {
              content.classList.remove("flex");
              content.classList.add("hidden");
              const contentDP = content.dataset.departmentName;
              if (content.dataset.departmentName === tabDP) {
                content.classList.remove("hidden");
                content.classList.add("flex");
              }
            });
          }
        })
      });
    }
  }
`;

export interface MenuMOProps {
  departmentMenus: IDepartmentMenu[];
  department: Department;
  myProfile: MyProfileProps;
  submenuTexts: ISubmenuTexts;
}

export function MenuMO(
  { departmentMenus, department, myProfile, submenuTexts }: MenuMOProps,
) {
  return (
    <>
      <DepartmentTabs department={department} />
      <div class="flex bg-white">
        {departmentMenus.map(({ menu, departmentName }) => {
          return (
            <div
              class={clx(
                "js-dp-menu-content flex-col w-full bg-white",
                department === departmentName ? "flex" : "hidden",
              )}
              data-department-name={departmentName}
            >
              {menu?.map(({ menuItem, submenuColumns, submenuCollections }) => {
                return (
                  <>
                    {(submenuCollections && submenuCollections.length > 0) && (
                      <SubmenuNewMO
                        categoryLink={menuItem}
                        menuNews={submenuCollections}
                        submenuTexts={submenuTexts}
                      />
                    )}
                    {!linksOmittedInMO.includes(menuItem?.text)
                      ? (submenuColumns && submenuColumns?.length > 0)
                        ? (
                          <div class="collapse bg-white">
                            <input
                              aria-label={menuItem?.text}
                              type="checkbox"
                              class="peer z-[1]"
                            />
                            <div class="collapse-title collapse-icon collapse-plus flex items-center px-6 h-14 font-body-xs-bold before:content-[''] before:absolute before:bottom-0 peer-checked:before:hidden before:w-[calc(100%_-_48px)] before:h-px before:bg-gray-200">
                              {menuItem?.text}
                            </div>
                            <div class="collapse-content flex flex-col">
                              {menuItem.text !== "Sobre" && (
                                <a
                                  href={menuItem?.url}
                                  class="flex items-center h-11 px-6 font-body-xs-bold text-gray-600"
                                >
                                  {submenuTexts.seeAllText}
                                </a>
                              )}
                              {submenuColumns?.map(
                                ({ submenuGroups }, columnIndex) => {
                                  return submenuGroups.map(
                                    (
                                      { submenuHeadingItem, submenuGroupItems },
                                      groupIndex,
                                    ) => {
                                      return submenuHeadingItem?.text
                                        ? submenuGroupItems &&
                                            submenuGroupItems.length > 0
                                          ? (
                                            <div class="collapse bg-gray-100">
                                              <input
                                                aria-label={`${menuItem?.text} - ${submenuHeadingItem?.text}`}
                                                type="checkbox"
                                                class="peer z-[1]"
                                              />
                                              <div
                                                class={clx(
                                                  "collapse-title collapse-icon collapse-plus flex items-center px-6 h-14 bg-gray-100 font-body-xs-bold",
                                                  (columnIndex === 0 &&
                                                      groupIndex === 0)
                                                    ? ""
                                                    : "before:content-[''] before:absolute before:top-0 before:justify-self-center before:w-[calc(100%_-_48px)] before:h-px before:bg-gray-200",
                                                )}
                                              >
                                                {submenuHeadingItem?.text}
                                              </div>
                                              <div class="collapse-content peer-checked:bg-gray-100">
                                                <a
                                                  href={submenuHeadingItem
                                                    ?.url}
                                                  class="flex items-center h-11 px-6 font-body-xs-bold text-gray-600"
                                                >
                                                  {submenuTexts.seeAllText}
                                                </a>
                                                {submenuGroupItems?.map((
                                                  item,
                                                ) => (
                                                  <MenuItem
                                                    menuItem={item}
                                                    class={clx(
                                                      "relative flex items-center w-full px-6 h-14 font-body-xs-regular text-gray-700",
                                                      item.isNew && newTag,
                                                    )}
                                                    textColor={item
                                                      .customColor}
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
                                            <MenuItem
                                              menuItem={submenuHeadingItem}
                                              class={clx(
                                                "items-center w-full h-14 px-6 bg-gray-100 font-body-xs-bold",
                                                (columnIndex === 0 &&
                                                    groupIndex === 0)
                                                  ? ""
                                                  : "before:content-[''] before:absolute before:top-0 before:justify-self-center before:w-[calc(100%_-_48px)] before:h-px before:bg-gray-200 before:z-10",
                                                submenuHeadingItem.isNew &&
                                                  newTag,
                                              )}
                                              textColor={submenuHeadingItem
                                                .customColor}
                                            />
                                          )
                                        : columnIndex === 0 &&
                                          submenuGroupItems &&
                                          submenuGroupItems.length > 0 && (
                                          <ul>
                                            {submenuGroupItems?.map((item) => (
                                              <li class="relative flex items-center w-full px-6 h-14 font-body-xs-regular text-gray-700">
                                                <MenuItem
                                                  menuItem={item}
                                                  class={clx(
                                                    "w-full h-full items-center",
                                                    item.isNew && newTag,
                                                  )}
                                                  textColor={item
                                                    .customColor}
                                                />
                                              </li>
                                            ))}
                                          </ul>
                                        );
                                    },
                                  );
                                },
                              )}
                            </div>
                          </div>
                        )
                        : (
                          <MenuItem
                            menuItem={menuItem}
                            class={clx(
                              "items-center w-full h-14 px-6 bg-white font-body-xs-bold before:content-[''] before:absolute before:bottom-0 before:justify-self-center before:w-[calc(100%_-_48px)] before:h-px before:bg-gray-200 before:z-10",
                              menuItem.isNew && newTag,
                            )}
                            textColor={menuItem.customColor}
                          />
                        )
                      : ""}
                  </>
                );
              })}
            </div>
          );
        })}
      </div>
      <AccountMO {...myProfile} />
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: menuTabsControlsMO() }}
      />
    </>
  );
}
