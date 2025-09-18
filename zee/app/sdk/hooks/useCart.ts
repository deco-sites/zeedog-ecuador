import { cart, loadingCart } from "zee/sdk/signalStore.ts";
import { invoke } from "$zeedog/runtime.ts";
import { addToCartEvent } from "$zeedog/sdk/analytics/events/addToCart.ts";
import { CartFragment } from "apps/shopify/utils/storefront/storefront.graphql.gen.ts";
import type {
  AddCouponProps,
  AddItemsProps,
  ShowCartProps,
  // UpdateCartBuyerIdentity,
  UpdateItemsProps,
} from "zee/sdk/types/cart.ts";
import { removeFromCartEvent } from "$zeedog/sdk/analytics/events/removeFromCart.ts";

export const showCart = async (
  { countryCode, languageCode }: ShowCartProps,
) => {
  const data = await invoke.shopify.loaders.cart({
    countryCode,
    languageCode,
  });

  cart.value = data;

  return data;
};

export const addItems = async ({
  lines,
}: AddItemsProps) => {
  loadingCart.value = true;

  const data = await invoke.shopify.actions.cart.addItems({
    lines,
  });

  if (data) {
    addToCartEvent({
      lines: [{
        id: lines.merchandiseId,
        quantity: lines.quantity,
      }],
      previousCart: cart.value as CartFragment,
      updatedCart: data,
    });
  }

  cart.value = data;
  loadingCart.value = false;

  return data;
};

export const updateItems = async ({
  lines,
}: UpdateItemsProps) => {
  loadingCart.value = true;

  const data = await invoke.shopify.actions.cart.updateItems({
    lines,
  });

  if (data) {
    addToCartEvent({
      lines,
      previousCart: cart.value as CartFragment,
      updatedCart: data,
    });

    removeFromCartEvent({
      lines,
      cart: cart.value as CartFragment, // use previous cart
    });
  }

  cart.value = data;
  loadingCart.value = false;

  return data;
};

export const addCoupon = async ({ discountCodes }: AddCouponProps) => {
  loadingCart.value = true;
  const data = await invoke.shopify.actions.cart.updateCoupons({
    discountCodes,
  });

  cart.value = data;
  loadingCart.value = false;

  return data;
};

export const removeCoupon = async () => {
  loadingCart.value = true;
  const data = await invoke.shopify.actions.cart.updateCoupons({
    discountCodes: [],
  });

  cart.value = data;
  loadingCart.value = false;

  return data;
};

// export const updateCartBuyerIdentity = async (
//   { buyerIdentity }: UpdateCartBuyerIdentity,
// ) => {
//   loadingCart.value = true;
//   const data = await invoke.shopify.actions.cart.cartBuyerIdentityUpdate({
//     ...buyerIdentity,
//   });

//   cart.value = data;
//   loadingCart.value = false;

//   return data;
// };

const state = {
  loadingCart,
  cart,
  showCart,
  addItems,
  updateItems,
  addCoupon,
  removeCoupon,
  // updateCartBuyerIdentity,
};

export const useCart = () => state;
