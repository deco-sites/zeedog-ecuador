import { CartFragment } from "apps/shopify/utils/storefront/storefront.graphql.gen.ts";
import type { MinicartProduct } from "$sdk/types/order.ts";

const formatters = new Map<string, Intl.NumberFormat>();

const formatter = (currency: string, locale: string) => {
  const key = `${currency}::${locale}`;

  if (!formatters.has(key)) {
    formatters.set(
      key,
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
      }),
    );
  }

  return formatters.get(key)!;
};

export const formatPrice = (
  price: number | undefined,
  currency = "PEN",
  locale = "es-PE",
) => {
  if (!price) return null;

  let formattedPrice = formatter(currency, locale).format(price);
  formattedPrice = formattedPrice.replace("S/", "").trim();

  return `S/ ${formattedPrice}`;
};

const getPath = (handle: string, sku?: string) =>
  sku
    ? `/products/${handle}-${getIdFromVariantId(sku)}`
    : `/products/${handle}`;

/**
 * @description Transforms shopify gid to a number
 * @example getIdFromVariant("gid://shopify/ProductVariant/40306064162993") -> 40306064162993
 */
export const getIdFromVariantId = (x: string) => {
  const splitted = x.split("/");

  return Number(splitted[splitted.length - 1]);
};

export const minifyProduct = (
  product: CartFragment["lines"]["nodes"][0],
): MinicartProduct => {
  let url = "";

  if (product.merchandise.product.handle) {
    url = getPath(product.merchandise.product.handle);
  }

  return {
    product_id: product.id,
    sku_id: product.merchandise.id,
    dimension: product.merchandise.title ?? "",
    unit_list_price: product.cost.compareAtAmountPerQuantity?.amount ?? 0,
    unit_sale_price: product.cost.amountPerQuantity?.amount ?? 0,
    unit_discount_price: product.cost.totalAmount.amount ?? 0,
    quantity: product.quantity,
    name: product.merchandise.product.title,
    images: product.merchandise.image?.url ?? "",
    thumb: product.merchandise.image?.url ?? "",
    url: url,
  };
};
