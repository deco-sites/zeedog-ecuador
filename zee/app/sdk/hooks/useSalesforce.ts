// import { Runtime } from "zee/runtime.ts";
import { CartAction } from "zee/sdk/types/zee.ts";

export interface SalesforceProps<T> {
  _deExternalKey: string;
}

// export async function useSalesforce<T>(props: SalesforceProps<T>) {
//   await Runtime.invoke({
//     key: "zee/actions/salesforce.ts",
//     props: {
//       ...props,
//     },
//   });
// }

export const CartDex = btoa("E6854764-FD94-4635-A734-71952093F015");
export const CheckoutCartDex = btoa("9A68180A-8192-48ED-AD1A-CF9375A32222");
export const NotifyMeDex = btoa("7203535D-D0B9-4843-B556-6D4A49C58AE9");
export const ContactUsDex = btoa("212373F0-AC71-40E9-9925-A32239E4779A");
export const EmailCaptureDex = btoa("8031C212-6BED-4097-8076-B6D96485E243"); // vini vai adicionar novos campos (cidade e estado)
export const CategoryNavDex = btoa("E28299AD-4CEB-4421-A866-A3FF4DC30D5E");
export const ProductNavDex = btoa("B973EA8D-29FD-4CF1-B94E-094DF729CDA8");
export const MarvelEmailCaptureDex = btoa(
  "0D1D6EC7-FF69-4A24-AFCF-EED1289ABF33",
);

// export const PreBlackFridayDex = btoa("8021A9DD-326C-41FA-9A06-85124D106E51")
// export const WishlistDex = btoa("1E7E2C32-0EEF-41DB-B8F5-8C405A99DB15")
// export const PetManagerDex = btoa("1AD05D6B-6A56-4DC7-899A-0E2B1EFDD6CA")
// export const KitchenQuizDex = btoa("1FAC57C6-00B3-41E7-9412-FEBA1C50B74C")
// export const ProductSuggestionDex = btoa("DC0B2CBA-18AA-4EFA-9ED7-44F30E05FD00") // checkout - entrou avaliação de compra no lugar

export interface CartDexInterface {
  _deExternalKey: string;
  email: string;
  client_id: string; // customer internal id
  sku_id: number | string;
  cart_action: CartAction;
  products_quantity: number | string;
  data_naveg: string;
}

export interface NotifyMeDexInterface {
  _deExternalKey: string;
  client_email: string;
  product_id: string;
  sku_id: string;
  created_at: string;
}

export interface ContactUsDexInterface {
  _deExternalKey: string;
  email: string;
  name: string;
  country: string;
  assunto: string;
  mensagem: string;
  uuid: string;
  data_envio: string;
}

export interface EmailCaptureDexInterface {
  _deExternalKey: string;
  client_email: string;
  client_name: string;
  client_gender?: string;
  telephone?: string;
  data_aniversario_human?: string;
  flag_cadastro_human?: boolean;
  created_at: string;
}

export interface CategoryNavDexInterface {
  _deExternalKey: string;
  email: string;
  data_naveg: string;
  category: string;
}

export interface ProductNavDexInterface {
  _deExternalKey: string;
  email: string;
  data_naveg: string;
  client_id: string; // customer internal id
  product_id: string;
}

export interface MarvelEmailCaptureDexInterface {
  _deExternalKey: string;
  email: string;
  created_at: string;
}

export const formatDate = () => {
  const today = new Date();

  const todayDate = `${today.getFullYear()}-${
    String(
      today.getMonth() + 1,
    ).padStart(2, "0")
  }-${
    String(today.getDate()).padStart(
      2,
      "0",
    )
  } ${today.getHours()}:${String(today.getMinutes()).padStart(2, "0")}`;

  return todayDate;
};
