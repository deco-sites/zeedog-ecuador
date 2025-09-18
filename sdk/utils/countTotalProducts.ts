import { Filter, FilterToggleValue } from "apps/commerce/types.ts";

/*
  Why?
  Currently, the Shopify storefront API does not return
  the total number of products in a collection.

  Therefore, a master level workaround was necessary to obtain the total number
  of products by checking the Availability filter and adding the quantities
*/

export const countTotalProducts = (filters: Filter[]) => {
  if (!filters) return 0;

  const filterAvailability = filters.find(
    (filter) => filter.key === "filter.v.availability",
  );

  if (!filterAvailability) return 0;

  const filter = filterAvailability.values as FilterToggleValue[];

  const total = filter.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  return total;
};
