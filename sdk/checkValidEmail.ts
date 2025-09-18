export function checkIsValidEmail(email: string) {
  // Regex para validar o formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return email !== "" && emailRegex.test(email);
}
