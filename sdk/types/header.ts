import type { Props as Image } from "apps/website/components/Image.tsx";

import { AvailableSubmenuComponents } from "$components/header/submenu/custom/SubmenuCustomComponent.tsx";
import { Department } from "$sdk/types/global.ts";
import { ImageWidget } from "apps/admin/widgets.ts";

/** @title {{{text}}} */
export interface IMenuItem {
  isNew?: boolean;
  text: string;
  url: string;
  customColor?: string;
  /** @title Image Source */
  imgsrc?: string;
}

export interface IMenuBanner {
  imgsrc: string;
  alt: string;
}

/** @title {{{collectionItem.text}}} */
export interface ISubmenuCollections {
  collectionItem: IMenuItem;
  submenuColumns: ISubmenuColumn[];
}

/** @title {{{submenuHeadingItem.text}}} */
export interface ISubmenuGroup {
  submenuHeadingItem?: IMenuItem;
  submenuGroupItems?: IMenuItem[];
}

export interface ISubmenuColumn {
  submenuGroups: ISubmenuGroup[];
  /** @description Puts a vertical grey bar on the left side o the column */
  leftVerticalBar?: boolean;
  bottomSVG?: {
    url?: string;
    svg: ImageWidget;
    alt: string;
    width: number;
    height: number;
  };
}

/** @title {{{menuItem.text}}} */
export interface IMenu {
  menuItem: IMenuItem;
  submenuColumns?: ISubmenuColumn[];
  /** @description Custom submenu component */
  submenuBanner?: AvailableSubmenuComponents;
  /** @description A custom submenu component split by a lateral column on the left with collections which shows on hover a submenu on the right side */
  submenuCollections?: ISubmenuCollections[];
}

/** @title {{{departmentName}}} */
export interface IDepartmentMenu {
  departmentName: Department;
  menu: IMenu[];
}

/** @titleBy text */
export interface ITerm {
  text: string;
  url: string;
}
