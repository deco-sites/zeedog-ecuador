import {
  StorefrontOrder,
  StorefrontOrderItem,
} from "zee/sdk/types/storefront.ts";

// INTERFACE PROVISÓRIA DO PRODUCTCARD NO CARRINHO
export interface MinicartProduct {
  // sku.product?.id
  product_id?: number | string;
  // sku.id
  sku_id?: number | string;
  dimension: string;
  unit_list_price?: number;
  unit_sale_price?: number;
  unit_discount_price?: number;
  quantity: number;
  // sku.product?.name
  name?: string;
  // sku.product?.search_slug
  // sku.product?.images
  images?: string[];
  // sku.product?.thumb
  thumb?: string;
  url?: string;
  // search_slug?: string;
  // name_highlight?: string;
  // interval?: number | null;
  // subscriptable?: boolean;
  // subscription_price?: number;
  // subscription_discount?: number;
}

export type OrderStatus =
  | "expired_payment"
  | "waiting"
  | "waiting_payment"
  | "processing"
  | "handled"
  | "delivering"
  | "delivered"
  | "canceled"
  | string;

export interface StatusChange {
  status: OrderStatus;
  time: Date | string;
}

export interface FrontOrderItem extends
  Pick<
    StorefrontOrderItem,
    | "id"
    | "order_id"
    | "product_name"
    | "sku_name"
    | "product_thumb"
    | "base_price"
    | "list_price"
    | "sale_price"
    | "gift"
    | "quantity"
    | "sku_internal_id"
  > {}

export interface FrontOrder extends
  Pick<
    StorefrontOrder,
    | "id"
    | "internal_id"
    | "status"
    | "created_at"
    | "subtotal"
    | "coupon_discount"
    | "wallet_discount"
    | "total"
    | "service_fee"
    | "shipping_discount"
    | "shipping_data"
    | "shipping"
    | "shipping_eta_in_minutes"
    | "order_number"
    | "payment_method"
    | "payment_card_brand"
    | "payment_card_number"
    | "payment_status"
    | "address_street"
    | "address_number"
    | "address_complement"
    | "address_district"
    | "address_city"
    | "address_state"
    | "remarks"
    | "masked_card_number"
    | "installments"
    | "installment_value"
    | "subscriptions"
    | "tracking_url"
    | "subscription_discount"
    | "mtag_discount"
  > {
  order_items: FrontOrderItem[];
  status_changes: StatusChange[];
}
