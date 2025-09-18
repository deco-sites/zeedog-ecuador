import { AppContext } from "zee/mod.ts";
// import { fetchStorefront } from "zee/sdk/fetch.ts";
import type { StorefrontCustomer } from "zee/sdk/types/storefront.ts";
import type { RequestError } from "zee/sdk/types/zee.ts";
// import { STOREFRONT_HEADERS } from "zee/sdk/_middleware.ts";
// import {
//   EmailCaptureDex,
//   EmailCaptureDexInterface,
// } from "zee/sdk/hooks/useSalesforce.ts";

export interface Props {
  email: string;
  password: string;
  name: string;
  document: string; // com ou sem caracteres
  phone_number: string; // (xx) xxxxx-xxxx
}

export type SignUp = StorefrontCustomer | RequestError;

const action = async (
  _props: Props,
  _req: Request,
  _ctx: AppContext,
) => {
  // const { email, password, name, document, phone_number } = props;

  // const _payload = {
  //   data: {
  //     type: "customers",
  //     attributes: {
  //       email,
  //       password,
  //       name,
  //       document: document?.replace(/[.-]/g, ""),
  //       phone_number: `+55 ${phone_number}`,
  //     },
  //   },
  // };

  // const data = await fetchStorefront<void>(
  //   "/signup",
  //   {
  //     method: "POST",
  //     headers: ctx.bag.get(STOREFRONT_HEADERS),
  //     body: JSON.stringify(payload),
  //   },
  // );

  // if (data && "error" in data) return data;

  // const salesforceProps: EmailCaptureDexInterface = {
  //   _deExternalKey: EmailCaptureDex,
  //   client_email: email,
  //   client_name: name,
  //   client_gender: "",
  //   data_aniversario_human: "",
  //   flag_cadastro_human: false,
  // };

  // await ctx.invoke(
  //   "zee/actions/salesforce.ts",
  //   salesforceProps,
  // );

  // const signIn = await ctx.invoke(
  //   "zee/actions/storefront/account/signIn.ts",
  //   {
  //     email,
  //     password,
  //   },
  // );

  // return signIn;
};

export default action;
