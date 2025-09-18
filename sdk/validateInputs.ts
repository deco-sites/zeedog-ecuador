import { Signal } from "@preact/signals";
import { PasswordValidated } from "$sdk/types/password.ts";

export const validatePassword = (
  password: string,
  isInvalid: Signal<boolean>,
  mandatoryItemsPassword: Signal<PasswordValidated>,
  sizePassword: number,
) => {
  const hasSpecialCharacter = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(
    password,
  );
  const hasNumber = /[0-9]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);

  const allChecked = hasLowerCase && hasNumber &&
    hasSpecialCharacter && hasUpperCase &&
    (sizePassword >= 6);

  isInvalid.value = !allChecked;

  mandatoryItemsPassword.value = {
    hasLowerCase: hasLowerCase,
    hasNumber: hasNumber,
    hasSpecialCharacter: hasSpecialCharacter,
    hasUpperCase: hasUpperCase,
    quantityCharacter: sizePassword,
  };
};

export const validateEmail = (
  email: string,
  isValide: Signal<{ empty: boolean; matched: boolean }>,
) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) {
    isValide.value.matched = true;
  } else {
    isValide.value.matched = false;
  }
};

export function isValidEmail(email: string): boolean {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}
