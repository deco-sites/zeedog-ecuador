import { RemoveFromCartEvent } from "apps/commerce/types.ts";
import { CartFragment } from "apps/shopify/utils/storefront/storefront.graphql.gen.ts";
import { sendEvent } from "site/sdk/analytics.tsx";

interface RemoveFromCartEventProps {
  lines: Array<{
    id: string;
    quantity?: number;
  }>;
  cart: CartFragment;
}

/**
 * This event signifies that an item was removed from a cart.
 */
export const removeFromCartEvent = ({
  lines,
  cart,
}: RemoveFromCartEventProps) => {
  const removedItems = cart?.lines.nodes.filter((item) =>
    lines.find((line) =>
      line.id === item.id && typeof line.quantity === "number" &&
      line.quantity < item.quantity
    )
  );

  if (!removedItems?.length) {
    return;
  }

  const removedAmount = removedItems.reduce(
    (acc, item) => {
      const quantityRemoved = item.quantity -
        (removedItems?.find((line) =>
          line.merchandise.id === item.merchandise.id
        )?.quantity || 0);

      return acc +
        Number(item.cost.amountPerQuantity.amount) * (quantityRemoved || 1);
    },
    0,
  );

  const event: RemoveFromCartEvent = {
    name: "remove_from_cart",
    params: {
      currency: cart.cost.totalAmount.currencyCode || "EUR",
      value: removedAmount,
      items: removedItems.map((item) => ({
        item_id: item.merchandise.id,
        quantity: item.quantity -
            (removedItems.find((line) =>
              line.merchandise.id === item.merchandise.id
            )?.quantity || 0) || 1,
        price: item.cost.amountPerQuantity.amount || 0,
        discount: (item.cost.compareAtAmountPerQuantity?.amount -
          item.cost.amountPerQuantity?.amount) || 0,
        item_name: item.merchandise.product.title,
        item_variant: item.merchandise.title,
      })),
    },
  };

  sendEvent(event);
};
