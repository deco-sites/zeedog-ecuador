import type { Manifest } from "./manifest.gen.ts";
import type { Manifest as ManifestShopify } from "apps/shopify/manifest.gen.ts";
import { proxy } from "@deco/deco/web";

export const invoke = proxy<
  & Manifest
  & ManifestShopify
>();
