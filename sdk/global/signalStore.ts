import { effect, signal } from "@preact/signals";
import { SKU } from "$types/global.ts";
import {
  GetCartQuery,
} from "apps/shopify/utils/storefront/storefront.graphql.gen.ts";
import { ToastState } from "site/sdk/hooks/useToast.ts";
import { Product } from "apps/commerce/types.ts";
import { BundleItem } from "site/sdk/types/product.ts";

interface DataRegister {
  email: string;
  name: string;
  lastName: string;
  password: string;
  promotionInEmail?: boolean;
}

// cart
export const cart = signal<GetCartQuery["cart"] | null>(null);

export const preSelectedSize = signal<string | undefined | null>(undefined);

// PDP signals
export const pdpSkuSelected = signal<SKU | null>(null);
export const pdpSkuQuantity = signal(1);
export const pdpStartingAt = signal<boolean | undefined>(undefined);

effect(() => {
  if (pdpSkuSelected.value && pdpStartingAt.peek()) {
    pdpStartingAt.value === false;
  }
});

export const pdpNoSKUSelectedAlert = signal(false);

export const openAccordions = signal<number[]>([]);

export const modalTypeLogin = signal<"login" | "register">("login");
export const steps = signal<
  | "login"
  | "loginWithEmailAndPassword"
  | "forgetPassword"
  | "linkSent"
  | "createNewPassword"
  | "changedPassword"
  | "createAccount"
  // account validation
  // | "verifyYourPhone"
  // | "verificationCode"
  | ""
>("login");

export const dataRegister = signal<DataRegister>({
  email: "",
  name: "",
  lastName: "",
  password: "",
  promotionInEmail: false,
});

export const toasts = signal<ToastState[]>([]);

export function capitalize(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
export const bestSellerProducts = signal<Product[] | null>(null);

export const bundleItems = signal<BundleItem[] | null>([]);
export const selectedBundleItems = signal<BundleItem[] | null>([]);
export const isBundleItemsAddedToCart = signal(false);
