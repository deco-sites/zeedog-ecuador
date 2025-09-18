import { AppContext } from "zee/mod.ts";
// import { setCookie } from "zee/sdk/cookies.ts";
// import { fetchStorefront } from "zee/sdk/fetch.ts";
import type { StorefrontCustomer } from "zee/sdk/types/storefront.ts";
import type { RequestError } from "zee/sdk/types/zee.ts";
// import { STOREFRONT_HEADERS } from "zee/sdk/_middleware.ts";

export interface Props {
  email: string;
  password: string;
}

export type SignIn = StorefrontCustomer | RequestError;

const action = async (
  _props: Props,
  _req: Request,
  _ctx: AppContext,
): Promise<void> => {
  // const { email, password } = props;

  // const payload = {
  //   data: {
  //     type: "customers",
  //     attributes: {
  //       email,
  //       password,
  //     },
  //   },
  // };

  // const handleAccessToken = (res: Response) => {
  //   const accessToken = res.headers.get("Access-Token");
  //   if (accessToken) {
  //     setCookie(
  //       "user_access_token",
  //       accessToken,
  //       ctx.response.headers,
  //     );
  //   }
  // };

  // const data = await fetchStorefront<StorefrontCustomer>(
  //   "/signin",
  //   {
  //     method: "POST",
  //     headers: ctx.bag.get(STOREFRONT_HEADERS),
  //     body: JSON.stringify(payload),
  //   },
  //   handleAccessToken,
  // );

  // if (data && "error" in data) return data;

  // setCookie(
  //   "user_data",
  //   JSON.stringify(data),
  //   ctx.response.headers,
  // );

  // setCookie("user_id", `${data.internal_id}`, ctx.response.headers);

  // salesforce
  // const sfData = {
  //   user_id: data.internal_id,
  //   user_email: data.email,
  // };

  // setCookie("sf_user_data", JSON.stringify(sfData), ctx.response.headers);

  // return data;
};

export default action;
