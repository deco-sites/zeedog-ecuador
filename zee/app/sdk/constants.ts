// export const HUB_ID = "330"; // prod zeenow
// export const HUB_ID = "3"; // dev zeenow
// export const HUB_ID = "47"; // stg zeenow
// export const HUB_ID = "1"; // stg zeedog
export const HUB_ID = "1"; // prod zeedog

// export const HUB_INTERNAL_ID = "1"; // prod zeenow
// export const HUB_INTERNAL_ID = "485"; // dev zeenow
// export const HUB_INTERNAL_ID = "486"; // stg zeenow
// export const HUB_INTERNAL_ID = "486"; // stg zeedog
export const HUB_INTERNAL_ID = "2"; // prod zeedog
export const FREE_SHIPPING_VALUE = 90;

export const DEPARTMENTS = {
  "cachorros": "Cachorros",
  "gatos": "Gatos",
  "kitchen": "Kitchen",
  "human": "Human",
};

export const CART_QUERY = {
  fields: [
    "[coupons]=code,promotion_id",
    "[wallets]=balance",
    "[customers]=id",
  ],
  include: "cart_items.sku.product,coupon,customer.wallet",
};

export const SUBSCRIPTION_PROMO_NAME = "subscriptions";
export const SUBSCRIPTION_PROMO_DISCOUNT = 10;
