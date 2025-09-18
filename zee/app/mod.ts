import manifest, { Manifest } from "zee/manifest.gen.ts";
import { middleware } from "zee/sdk/_middleware.ts";
import { type App, type AppContext as AC } from "@deco/deco";
import { Commerce } from "zee/types.d.ts";

// deno-lint-ignore ban-types
export type State = {};

interface Props {
  /**
   * @title Commerce
   * @description Commerce configuration
   */
  commerce: Commerce;
}

/**
 * @title Zee
 * @description Loaders, actions, islands, sections and auxiliary functions for Zee.
 * @category Ecommerce
 * @logo https://avatars.githubusercontent.com/u/35118031
 */
export default function App(state: Props): App<Manifest, Props> {
  return { manifest, state, middleware };
}

export type AppContext = AC<ReturnType<typeof App>>;
