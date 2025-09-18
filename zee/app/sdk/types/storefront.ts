import type { CartAction } from "zee/sdk/types/zee.ts";

export interface StorefrontError {
  code: string;
  status: string;
  title: string;
  detail?: string;
}

export interface StorefrontManufacturer {
  type: string;
  id: string;
  name?: string;
  description?: null | string;
  sort?: number;
  highlight?: boolean;
  image?: string;
  created_at?: string;
  updated_at?: string;
  internal_id?: number;
  search_slug?: string;
}

export interface StorefrontHub {
  type: string;
  id: string;
  name?: string;
  city?: string;
  state?: string;
  country?: string;
  internal_id?: number;
  opens_at?: string;
  closes_at?: string;
  eta_min?: number;
  eta_max?: number;
  active?: boolean;
  suspended?: boolean;
  suspended_since?: string;
  suspended_until?: string;
  suspension_title?: string;
  suspension_description?: string;
  current_region_suspensions?: null;
  current_region_eta?: { eta_min: number; eta_max: number };
  latitude?: string;
  longitude?: string;
  created_at?: string;
  updated_at?: string;
  price_table_id?: number;
}

// export interface StorefrontSignUp {
//   type: string;
//   id: string;
//   name?: string;
//   email?: string;
//   document?: string;
//   phone_number?: string;
//   created_at?: string;
//   updated_at?: string;
//   payment_gateway_data?: {
//     pagar_me?: string;
//     mundipagg?: string;
//   };
// }

export interface StorefrontCustomer {
  type: string;
  id: string;
  internal_id?: number;
  name?: string;
  email?: string;
  document?: string;
  phone_number?: string;
  gender?: string;
  mobile_device_id?: string;
  notification_id?: string;
  provider?: string;
  provider_type?: null | string;
  last_signin_ip?: string;
  current_signin_ip?: string;
  banned?: boolean;
  verified?: boolean;
  pagar_me_flag?: boolean;
  wallet_flag?: boolean;
  referral_flag?: boolean;
  catalog_flag?: boolean;
  banned_from_referral?: boolean;
  total_signin_count?: number;
  created_at?: string;
  updated_at?: string;
  current_signin_at?: string;
  last_signin_at?: string;
  payment_gateway_data?: {
    pagar_me?: string;
    mundipagg?: string;
  };
  wallet?: StorefrontWallet;
}

export interface StorefrontOrderItem {
  id: string;
  type: string;
  base_price?: number;
  list_price?: number;
  sale_price?: number;
  gift?: boolean;
  wallet_discount?: number;
  coupon_discount?: number;
  mtag_discount?: number;
  order_id?: number;
  product_internal_id?: string;
  product_name?: string;
  product_thumb?: string;
  quantity?: number;
  sku?: StorefrontSku;
  sku_internal_id?: number;
  sku_name?: string;
  sku_data?: StorefrontSku;
  subscription_discount?: number;
  subscription_promotion_data?: StorefrontPromotion;
}

export interface StorefrontOrder {
  id: string;
  type: string;
  installments?: number;
  installment_value?: number;
  apply_credits?: boolean;
  cancellation_motive?: any;
  metadata?: {
    data?: {
      type?: string;
      attributes?: {
        remarks?: string;
        installments?: number;
        payment_method?: string;
        installment_value?: number;
        shipping_method_code?: string;
      };
    };
    action?: string;
    format?: string;
    controller?: string;
    request_info?: {
      client_id?: string;
      client_ip?: string;
      sale_channel?: string;
      client_platform?: string;
    };
    customer_device_info?: {
      device_id?: string;
      app_version?: string;
      device_model?: string;
      device_platform?: string;
    };
  };
  remarks?: string;
  push_notification_payload?: any;
  platform?: string;
  nsu?: string;
  tid?: string;
  authorization_code?: string;
  masked_card_number?: string;
  acquirer_code?: string;
  eta_min_range?: number;
  eta_max_range?: number;
  order_number?: number;
  number?: string;
  phone_number?: string;
  internal_id?: string;
  subtotal?: number;
  coupon_discount?: number;
  coupon_code?: string;
  wallet_discount?: number;
  base_service_fee?: number;
  service_fee?: number;
  total?: number;
  address_street?: string;
  address_number?: string;
  address_complement?: string;
  address_district?: string;
  address_city?: string;
  address_state?: string;
  address_latitude?: string;
  address_longitude?: string;
  deliverer_id?: any;
  deliverer_name?: string;
  deliverer_email?: string;
  deliverer_image_url?: string;
  deliverer_vehicle?: string;
  deliverer_plate?: string;
  deliverer_document?: string;
  deliverer_received_by?: any;
  deliverer_phone_number?: string;
  embark_id?: any;
  delivery_id?: any;
  processed?: boolean;
  successful?: boolean;
  error_code?: string;
  shipping?: number;
  shipping_discount?: number;
  shipping_code?: any;
  shipping_eta_in_minutes?: number;
  shipping_eta_date?: string;
  sales_channel?: string;
  shipping_data?: {
    delivery_options?: StorefrontShippingOption[];
  };
  created_at?: string;
  updated_at?: string;
  promotion_data?: StorefrontPromotion[];
  tracking_url?: string;
  status?: string;
  payment_status?: string;
  payment_method?: "pix" | "credit_card";
  payment_card_brand?: string;
  payment_card_number?: string;
  invoice_data?: any[];
  payment_data?: any;
  status_changes?: {
    status?: string;
    time?: string;
  }[];
  hub_internal_id?: number;
  order_items?: StorefrontOrderItem[];
  subscriptions?: StorefrontSubscription[];
  subscription_discount?: number;
  mtag_discount?: number;
}

export interface StorefrontAddress {
  id: string;
  type?: string;
  customer_id?: number;
  nickname?: "Casa" | "Trabalho" | "Outro";
  street?: string;
  number?: string;
  complement?: string;
  district?: string;
  zipcode?: string;
  city?: string;
  state?: string;
  country?: string;
  latitude?: string;
  longitude?: string;
  place_id?: string;
  selected?: boolean;
  created_at?: string;
  updated_at?: string;
  legacy?: boolean;
  hub?: StorefrontHub;

  // google maps
  // complete_name?: string;
}

export interface StorefrontSku {
  type: string;
  id: string;
  product_id?: number;
  internal_id?: number;
  external_id?: string;
  external_reference?: string;
  external_title?: string;
  external_active?: boolean;
  name?: string;
  ean?: string;
  weight?: number;
  sort?: number;
  subscriptable?: boolean;
  images?: Array<any>;
  created_at?: string;
  updated_at?: string;
  hub_sku_id?: number;
  product?: StorefrontProduct;
}

export interface StorefrontProduct {
  type?: string;
  id?: string;
  internal_id?: number;
  name?: string;
  description?: string;
  extra_information?: string;
  search_slug?: string;
  search_metadata?: string;
  active?: boolean;
  active_petz?: boolean;
  active_zeenow?: boolean;
  average_rating?: string;
  sort?: any;
  deeplink?: string;
  external_title?: string;
  external_id?: string;
  external_reference?: string;
  external_active?: any;
  category_id?: number;
  extra_categories_internal_ids?: Array<any>;
  up_sell?: Array<any>;
  combinations?: Array<any>;
  images?: Array<string>;
  large_images?: Array<any>;
  experience_images?: Array<string>;
  thumb?: string;
  created_at?: string;
  updated_at?: string;
}

export interface StorefrontCartItem {
  type: string;
  id: string;
  quantity: number;
  cart_id?: number;
  sku_id?: number;
  unit_base_price?: number;
  unit_list_price?: number;
  unit_sale_price?: number;
  coupon_discount?: number;
  wallet_discount?: number;
  subtotal?: number;
  total?: number;
  interval?: number;
  subscription?: boolean;
  created_at?: string;
  updated_at?: string;
  sku: StorefrontSku;
}

export interface StorefrontCart {
  type: string;
  id: string;
  internal_id?: string;
  customer_id?: number;
  guest_id?: number | null;
  coupon_id?: number | null;
  coupon_discount?: number;
  wallet_discount?: number;
  mtag_discount?: number;
  max_installments?: number;
  base_service_fee?: number;
  service_fee?: number;
  subtotal?: number;
  total?: number;
  created_at?: string;
  updated_at?: string;
  subscription_name?: string;
  cart_items?: StorefrontCartItem[];
  coupon?: StorefrontCoupon;
  customer?: StorefrontCustomer;
  shipping_data?: {
    delivery_options?: StorefrontShippingOption[];
    // atributo de erro adicionado pelo bff caso a req com param checkout=true retorne erro de frete, nesse caso repetimos a req no cart sem esse param
    error?: string;
  };
  shipping?: number;
  shipping_code?: string | null;
  shipping_discount?: number;
  subscription_discount?: number;
  promotions?: StorefrontPromotion[];
  action?: CartAction; // atributo adicionado na action de updateCart para persistir a ação enviada para salesforce (action) e evento GA (hook)
}

export interface StorefrontRebuy {
  type: string;
  id: string;
  product_id?: number;
  internal_id?: number;
  external_id?: string;
  external_reference?: string;
  external_title?: string;
  external_active?: boolean;
  name?: string;
  ean?: string;
  weight?: number;
  sort?: number;
  images?: any[];
  created_at?: string;
  updated_at?: string;
  hub_sku_id?: number;
  base_price?: number;
  list_price?: number;
  sale_price?: number;
  available?: boolean;
  product?: {
    type: string;
    id: string;
    internal_id?: number;
    name?: string;
    description?: string;
    extra_information?: string;
    search_slug?: string;
    search_metadata?: string;
    active?: boolean;
    active_petz?: boolean;
    active_zeenow?: boolean;
    average_rating?: string;
    sort?: number;
    deeplink?: string;
    external_title?: string;
    external_id?: string;
    external_reference?: string;
    external_active?: boolean;
    category_id?: number;
    extra_categories_internal_ids?: any[];
    up_sell?: any[];
    combinations?: any[];
    images?: string[];
    large_images?: string[];
    experience_images?: any[];
    thumb?: string;
    created_at?: string;
    updated_at?: string;
  };
}
export interface StorefrontPromotion {
  id: string;
  type: string;
  name?: string;
  restricted?: boolean;
  description?: string;
  information?: string;
  archived_at?: any;
  internal_id?: number | null;
  reward_value?: number;
  discount_type?: string;
  discount_value?: number;
  first_n_orders?: number;
  promotion_type?: string;
  discountable_id?: any;
  activation_limit?: number;
  applied_discount?: number;
  discountable_type?: any;
  applicability_type?: string;
  use_limit?: number;
  partner_applicability?: any;
  created_at?: string;
  updated_at?: string;
  start_at?: string;
  end_at?: string;
  active?: boolean;
  expired?: boolean;
  applied_by?: string;
  // atributos do objeto de promoção do carrinho com id da promo e de produto/marca/categoria aplicável à promo
  discountable_internal_id?: number | null;
}

export interface StorefrontCoupon {
  id: string;
  type: string;
  promotion_id?: number;
  uses?: number;
  code?: string;
  archived_at?: any;
  created_at?: string;
  updated_at?: string;
  applicable_product_internal_ids?: number[];
  applicable_product_ids?: number[];
  currently_applied?: boolean;
  promotion?: StorefrontPromotion;
}

export interface StorefrontReferral {
  id: string;
  type: string;
  code?: string;
  customer_id?: number;
  coupon_id?: number;
  personalized_code?: boolean;
  facebook?: string;
  messenger?: string;
  instagram?: string;
  whatsapp?: string;
  sms?: string;
  native?: string;
  qrcode?: string;
  created_at?: string;
  updated_at?: string;
}

export interface StorefrontWalletCredit {
  id: string;
  type: string;
  wallet_id?: number;
  credits?: number;
  status?: string;
  created_by?: string;
  created_type?: string;
  due_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface StorefrontWalletTransaction {
  id: string;
  type: string;
  wallet_id?: number;
  transaction_type?: string;
  transaction_value?: number;
  later_balance?: number;
  previous_balance?: number;
  created_at?: string;
  updated_at?: string;
}

export interface StorefrontWallet {
  id: string;
  type: string;
  customer_id?: number;
  balance?: number;
  created_at?: string;
  updated_at?: string;
  credits?: StorefrontWalletCredit[];
}

export interface StorefrontCreditCard {
  id: string;
  customer_id?: number;
  selected?: boolean;
  card_type?: string;
  number?: string;
  expiration?: string;
  name?: string;
  bin?: string;
  vendor?: string;
  payment_gateway_data?: {
    mundipagg?: string;
  };
}

// export type User = StorefrontCustomer | null;

export interface StorefrontSubscription {
  id: string;
  type: string;
  name: string;
  status: string;
  interval: number;
  canceled_at: string | null;
  next_billing_date: string;
  credit_card_id: number;
  created_at: string;
  updated_at: string;
  order_id?: number;
  address_street?: string;
  address_number?: string;
  address_complement?: string;
  address_district?: string;
  address_city?: string;
  address_state?: string;
  address_country?: string;
  address_latitude?: string;
  address_longitude?: string;
  zipcode?: string;
  place_id?: string;
  order?: StorefrontOrder;
  subscription_items?: StorefrontSubscriptionItem[];
  subscription_cycles?: StorefrontSubscriptionCycle[];
  customer?: StorefrontCustomer;
}

export interface StorefrontSubscriptionItem {
  type: string;
  id: number;
  subscription_id?: number;
  quantity?: number;
  paused_for?: number;
  paused_count?: number;
  paused_quantity?: number;
  sku_id?: number;
  created_at?: string;
  updated_at?: string;
  sku?: StorefrontSku;
}

export interface StorefrontShippingOption {
  id?: string;
  type?: string;
  shipping_price: number;
  delivery_date: string;
  departure_date: string;
  shipping_method: {
    name: string;
    code: string;
    cnpj: string;
  };
}

export interface StorefrontSubscriptionCycle {
  id: string;
  type: string;
  subscription_id?: number;
  count?: number;
  status?: string;
  error_code?: string | null;
  retry_payment_count?: number;
  created_at?: string;
  updated_at?: string;
}
