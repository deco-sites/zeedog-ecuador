import {
  CartBuyerIdentityInput,
  CountryCode,
  LanguageCode,
} from "apps/shopify/utils/storefront/storefront.graphql.gen.ts";

export interface ShowCartProps {
  countryCode?: CountryCode;
  languageCode?: LanguageCode;
}

export interface AddItemsProps {
  lines: {
    merchandiseId: string;
    attributes?: Array<{ key: string; value: string }>;
    quantity?: number;
    sellingPlanId?: string;
  };
}

export interface UpdateItemsProps {
  lines: Array<{
    id: string;
    quantity?: number;
  }>;
}

export interface AddCouponProps {
  discountCodes: Array<string>;
}

export interface UpdateCartBuyerIdentity {
  buyerIdentity: CartBuyerIdentityInput;
}
