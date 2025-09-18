import type {
  AnalyticsEvent,
  AnalyticsItem,
  ListItem,
  ProductDetailsPage,
} from "apps/commerce/types.ts";

export const sendEvent = <E extends AnalyticsEvent>(event: E) => {
  globalThis.window.DECO.events.dispatch(event);
};

export const toAnalyticsCategories = (
  breadcrumb: ListItem[],
) => {
  const categories: Record<string, string> = {};

  breadcrumb.forEach(
    (item, index) => {
      const label = `item_category${index > 0 ? `${index + 1}` : ""}`;
      if (item.name) categories[label] = item.name;
    },
  );

  return categories;
};

export const fromCatalogToAnalyticsItem = (
  data: ProductDetailsPage,
): AnalyticsItem[] => {
  const { productID, brand } = data.product;
  const categories = toAnalyticsCategories(
    data.breadcrumbList?.itemListElement || [],
  );
  const product: AnalyticsItem[] = [{
    item_id: productID,
    item_name: data.product.isVariantOf?.name || "",
    quantity: 1,
    // @ts-ignore brand is always string
    item_brand: brand?.name || "",
    ...categories,
  }];

  return product;
};
