import {
  Props as SignUpProps,
  SignUp,
} from "zee/actions/storefront/account/signUp.ts";
import {
  Props as SignInProps,
  SignIn,
} from "zee/actions/storefront/account/signIn.ts";
import { SignOut } from "zee/actions/storefront/account/signOut.ts";
// import {
//   Props as ValidationTypeProps,
//   ValidationType,
// } from "zee/actions/storefront/account/validationType.ts";
// import {
//   Props as ValidationCodeProps,
//   ValidationCode,
// } from "zee/actions/storefront/account/validationCode.ts";
// import {
//   Props as RecoverPasswordProps,
//   RecoverPassword,
// } from "zee/actions/storefront/account/recoverPassword.ts";
// import {
//   Props as UpdatePasswordProps,
//   UpdatePassword,
// } from "zee/actions/storefront/account/updatePassword.ts";
// import {
//   Props as UpdateCustomerProps,
//   UpdateCustomer,
// } from "zee/actions/storefront/account/updateCustomer.ts";
// import {
//   DeleteAccount,
//   Props as DeleteAccountProps,
// } from "zee/actions/storefront/account/deleteAccount.ts";
// import {
//   CustomizeReferral,
//   Props as CustomizeReferralProps,
// } from "zee/actions/storefront/customers/customizeReferral.ts";
// import {
//   Props as ValidatePasswordRecoveryTokenProps,
//   ValidatePasswordRecoveryToken,
// } from "zee/loaders/storefront/account/validatePasswordRecoveryToken.ts";
// import { updateSignifydScript } from "zee/sdk/hooks/useSignifyd.ts";
import { account, loadingAccount } from "zee/sdk/signalStore.ts";
import { invoke } from "zee/sdk/invoke.ts";

const signUp = async (props: SignUpProps): Promise<SignUp> => {
  const data = await invoke(
    loadingAccount,
    "zee/actions/storefront/account/signUp.ts",
    props,
  );
  return data;
};

const signIn = async (props: SignInProps): Promise<SignIn> => {
  const data = await invoke(
    loadingAccount,
    "zee/actions/storefront/account/signIn.ts",
    props,
  ) as SignIn;

  if (data && !("error" in data)) {
    account.value = data;
  }

  return data;
};

const signOut = async (): Promise<SignOut> => {
  const data = await invoke(
    loadingAccount,
    "zee/actions/storefront/account/signOut.ts",
  );
  // updateSignifydScript();
  return data;
};

// const validationType = async (
//   props: ValidationTypeProps,
// ): Promise<ValidationType> => {
//   const data = await invoke(
//     loadingAccount,
//     "zee/actions/storefront/account/validationType.ts",
//     props,
//   );
//   return data;
// };

// const validationCode = async (
//   props: ValidationCodeProps,
// ): Promise<ValidationCode> => {
//   const data = await invoke(
//     loadingAccount,
//     "zee/actions/storefront/account/validationCode.ts",
//     props,
//   );
//   return data;
// };

// const recoverPassword = async (
//   props: RecoverPasswordProps,
// ): Promise<RecoverPassword> => {
//   const data = await invoke(
//     loadingAccount,
//     "zee/actions/storefront/account/recoverPassword.ts",
//     props,
//   );
//   return data;
// };

// const updateCustomer = async (
//   props: UpdateCustomerProps,
// ): Promise<UpdateCustomer> => {
//   const data = await invoke(
//     loadingAccount,
//     "zee/actions/storefront/account/updateCustomer.ts",
//     props,
//   );
//   return data;
// };

// const updatePassword = async (
//   props: UpdatePasswordProps,
// ): Promise<UpdatePassword> => {
//   const data = await invoke(
//     loadingAccount,
//     "zee/actions/storefront/account/updatePassword.ts",
//     props,
//   );
//   return data;
// };

// const deleteAccount = async (
//   props: DeleteAccountProps,
// ): Promise<DeleteAccount> => {
//   const data = await invoke(
//     loadingAccount,
//     "zee/actions/storefront/account/deleteAccount.ts",
//     props,
//   );
//   return data;
// };

// const customizeReferral = async (
//   props: CustomizeReferralProps,
// ): Promise<CustomizeReferral> => {
//   const data = await invoke(
//     loadingAccount,
//     "zee/actions/storefront/customer/customizeReferral.ts",
//     props,
//   );
//   return data;
// };

// const validatePasswordRecoveryToken = async (
//   props: ValidatePasswordRecoveryTokenProps,
// ): Promise<ValidatePasswordRecoveryToken> => {
//   const data = await invoke(
//     loadingAccount,
//     "zee/loaders/storefront/account/validatePasswordRecoveryToken.ts",
//     props,
//   ) as ValidatePasswordRecoveryToken;

//   return data;
// };

const state = {
  loadingAccount,
  account,
  signUp,
  signIn,
  signOut,
  // validationType,
  // validationCode,
  // recoverPassword,
  // updatePassword,
  // updateCustomer,
  // deleteAccount,
  // customizeReferral,
  // validatePasswordRecoveryToken,
};

export const useAccount = () => state;
