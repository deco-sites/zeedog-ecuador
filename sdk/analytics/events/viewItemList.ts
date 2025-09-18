import { AnalyticsItem, ViewItemListEvent } from "apps/commerce/types.ts";

interface ViewItemListEventProps {
  itemListName?: string;
  items: AnalyticsItem[];
}

/**
 * Log this event when the user has been presented with a list of items of a certain category.
 */
export const viewItemListEvent = (
  { itemListName = "", items }: ViewItemListEventProps,
) => {
  const event: ViewItemListEvent = {
    name: "view_item_list",
    params: {
      item_list_name: itemListName,
      items,
    },
  };

  return event;
};
