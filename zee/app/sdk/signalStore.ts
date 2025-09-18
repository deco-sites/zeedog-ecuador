import { signal } from "@preact/signals";
import { GetCartQuery } from "apps/shopify/utils/storefront/storefront.graphql.gen.ts";

// cart
export const cart = signal<GetCartQuery["cart"] | null>(null);
export const loadingCart = signal(false);
