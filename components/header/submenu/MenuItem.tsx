import { IMenuItem } from "$sdk/types/header.ts";
import { clx } from "site/sdk/clx.ts";

export interface MenuItemProps {
  menuItem: IMenuItem;
  class?: string;
  textColor?: string;
}

export function MenuItem(
  { menuItem, class: _class = "", textColor }: MenuItemProps,
) {
  return (
    <a
      href={menuItem.url}
      class={clx("relative flex", _class)}
      style={textColor ? `color: ${textColor}` : ""}
    >
      {menuItem?.text}
    </a>
  );
}
