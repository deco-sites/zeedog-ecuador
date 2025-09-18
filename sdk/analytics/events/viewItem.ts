import { AnalyticsItem, ViewItemEvent } from "apps/commerce/types.ts";

interface ViewItemEventProps {
  value: number;
  currency?: string;
  items: AnalyticsItem[];
}

/**
 * This event signifies that some content was shown to the user. Use this event to discover the most popular items viewed.
 */
export const viewItemEvent = (
  { value, currency = "EUR", items }: ViewItemEventProps,
) => {
  const event: ViewItemEvent = {
    name: "view_item",
    params: {
      value,
      currency,
      items,
    },
  };

  return event;
};
