import { AddToCartEvent } from "apps/commerce/types.ts";
import { CartFragment } from "apps/shopify/utils/storefront/storefront.graphql.gen.ts";
import { sendEvent } from "site/sdk/analytics.tsx";

interface AddToCartEventProps {
  lines: Array<{
    id: string;
    quantity?: number;
  }>;
  previousCart: CartFragment;
  updatedCart: CartFragment;
}

/**
 * This event signifies that an item was added to a cart for purchase.
 */
export const addToCartEvent = ({
  lines,
  previousCart,
  updatedCart,
}: AddToCartEventProps) => {
  const addedItems = updatedCart?.lines.nodes.filter((item) => {
    const previousCartItem = previousCart?.lines.nodes.find((line) => {
      return line.merchandise.id === item.merchandise.id;
    });

    // Item was already there, it might have been updated
    if (previousCartItem) {
      return (
        previousCartItem.quantity < item.quantity
      );
    }

    // Item was not there, it was added
    return lines.find((line) => line.id === item.merchandise.id);
  });

  if (!addedItems?.length) {
    return;
  }

  const addedAmount = addedItems.reduce(
    (acc, item) => {
      const quantityAdded = item.quantity -
        (previousCart?.lines.nodes.find((line) =>
          line.merchandise.id === item.merchandise.id
        )?.quantity || 0);

      return acc +
        Number(item.cost.amountPerQuantity.amount) * (quantityAdded || 1);
    },
    0,
  );

  const event: AddToCartEvent = {
    name: "add_to_cart",
    params: {
      currency: updatedCart.cost.totalAmount.currencyCode || "EUR",
      value: addedAmount,
      items: addedItems.map((item) => ({
        item_id: item.merchandise.id,
        quantity: item.quantity -
            (previousCart?.lines.nodes.find((line) =>
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
