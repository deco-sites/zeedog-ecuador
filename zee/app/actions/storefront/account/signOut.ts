// import { AppContext } from "zee/mod.ts";
// import { resetUserCookies } from "zee/sdk/cookies.ts";
// import { fetchStorefront } from "zee/sdk/fetch.ts";
import type { RequestError } from "zee/sdk/types/zee.ts";
// import { STOREFRONT_HEADERS } from "zee/sdk/_middleware.ts";

export type SignOut = void | RequestError;

const action = async (
  _props: null,
  _req: Request,
  // ctx: AppContext,
): Promise<void> => {
  // const data = await fetchStorefront<void>(
  //   "/signout",
  //   {
  //     method: "DELETE",
  //     headers: ctx.bag.get(STOREFRONT_HEADERS),
  //   },
  // );

  // if (data && "error" in data) return data;

  // resetUserCookies(ctx.response.headers);

  // return data;
};

export default action;
