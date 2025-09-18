import { withManifest } from "@deco/deco/web";
import type { Manifest } from "./manifest.gen.ts";
import { proxy } from "@deco/deco/web";
const invoke = proxy<Manifest>();
const { create } = withManifest<Manifest>();
export const Runtime = {
  invoke,
  create,
};
