import { IDepartmentMenu } from "$sdk/types/header.ts";
import { DepartmentIcon } from "$components/header/department/DepartmentIcon.tsx";
import { MenuItem } from "../submenu/MenuItem.tsx";
import { SubmenuNewsDK } from "$components/header/submenu/SubmenuNewsDK.tsx";
import { SubmenuCustomComponent } from "$components/header/submenu/custom/SubmenuCustomComponent.tsx";
import { SubmenuColumn } from "$components/header/submenu/SubmenuColumn.tsx";
import { clx } from "site/sdk/clx.ts";
import { AvailableLanguages } from "site/sdk/hooks/useLanguage.ts";

export interface MenuDKProps {
  departmentMenus: IDepartmentMenu;
  language: AvailableLanguages;
}

const newTag =
  "after:content-['Nuevo'] after:absolute after:top-0 after:left-full after:text-blue-400 after:text-2xs after:leading-none";

const menuCategoryAfter =
  "after:content-[''] hover:after:w-full after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-black after:transition-all";

export function MenuDK({ departmentMenus, language }: MenuDKProps) {
  return (
    <nav class="relative sm:hidden lg:flex w-full items-center h-full z-20">
      <DepartmentIcon
        department={departmentMenus.departmentName}
        language={language}
      />

      <ul class="mr-2 h-full items-center justify-start hidden lg:flex min-h-[70px]">
        {departmentMenus.menu?.map(
          (
            {
              menuItem,
              submenuColumns,
              submenuBanner = "",
              submenuCollections,
            },
          ) => {
            return menuItem && (
              <li
                class={clx(
                  "menu-mother group/submenu relative flex items-center justify-center h-full whitespace-nowrap font-body-xs-regular text-black",
                  menuCategoryAfter,
                )}
                data-imgsrc={menuItem.imgsrc}
              >
                <MenuItem
                  menuItem={menuItem}
                  class={clx(
                    "w-full h-full px-6 items-center justify-center",
                    menuItem.isNew && newTag,
                  )}
                  textColor={menuItem.customColor}
                />
                <section
                  class={clx(
                    "group-hover/submenu:visible group-hover/submenu:opacity-100 absolute top-[71px] left-0 z-[1] flex justify-between w-max h-[480px] invisible bg-white shadow-lg opacity-0 transition-all duration-300 ease-linear rounded-b-md overflow-hidden",
                    submenuCollections && submenuCollections.length > 0 &&
                      "news-submenu-section",
                  )}
                >
                  {(submenuCollections && submenuCollections.length > 0) && (
                    <SubmenuNewsDK menuNews={submenuCollections} />
                  )}

                  {submenuBanner
                    ? <SubmenuCustomComponent name={submenuBanner} />
                    : ""}

                  {(submenuColumns && submenuColumns.length > 0) && (
                    <SubmenuColumn menuColumns={submenuColumns} />
                  )}

                  {(!submenuBanner && menuItem.imgsrc) &&
                    (
                      <div class="relative block">
                        <img
                          src=""
                          alt=""
                          loading="lazy"
                          width={266}
                          height={480}
                          decoding="async"
                          class="menuimg-banner object-cover w-[266px] h-[480px]"
                        />
                      </div>
                    )}
                </section>
              </li>
            );
          },
        )}
      </ul>
    </nav>
  );
}
