export type AvailableLanguages = "es";

export const getLanguageFromPathname = (
  pathname: string,
): AvailableLanguages | undefined => {
  const parts = pathname.split("/");
  const lang = parts.length > 1 ? parts[1].toLowerCase() : undefined;
  return isAvailableLanguage(lang) ? lang : undefined;
};

const availableLanguagesSet = new Set<AvailableLanguages>([
  "es",
]);

export const isAvailableLanguage = (
  lang?: string,
): lang is AvailableLanguages => {
  if (!lang) return false;

  return availableLanguagesSet.has(lang as AvailableLanguages);
};

export const useLanguage = (url: URL): AvailableLanguages => {
  const lang = getLanguageFromPathname(url.pathname);

  return lang ?? "es";
};

export const useLanguageByHeaders = (
  countryCode?: string | null,
): AvailableLanguages => {
  if (!countryCode) return "es";

  const code = countryCode.toUpperCase();

  if (["ES", "MX", "AR", "CO", "CL", "PE", "VE", "UY", "EC"].includes(code)) {
    return "es";
  }

  return "es";
};
