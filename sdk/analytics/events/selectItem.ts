import { AnalyticsItem, SelectItemEvent } from "apps/commerce/types.ts";

interface SelectItemEventProps {
  itemListName?: string;
  items: AnalyticsItem[];
}

/**
 * This event signifies an item was selected from a list.
 */
export const selectItemEvent = (
  { itemListName = "", items }: SelectItemEventProps,
) => {
  const event: SelectItemEvent = {
    name: "select_item",
    params: {
      item_list_name: itemListName,
      items,
    },
  };

  return event;
};
