export interface PasswordValidated {
  hasLowerCase: boolean;
  hasUpperCase: boolean;
  hasSpecialCharacter: boolean;
  hasNumber: boolean;
  quantityCharacter: number;
}
