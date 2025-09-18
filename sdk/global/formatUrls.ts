import { AvailableLanguages } from "site/sdk/hooks/useLanguage.ts";

type LanguageProps = {
  url?: string;
  language: AvailableLanguages;
};

export const ACCOUNT_LOGIN_URLS: Record<AvailableLanguages, string> = {
  "es": "https://shop.zeedog.pe/account/login",
};

export const addLanguageToUrl = (
  { url, language = "es" }: LanguageProps,
): string => {
  if (!url) return "";

  if (language === "es") return url;

  try {
    let newPath = "";

    if (url.startsWith("http://") || url.startsWith("https://")) {
      const urlObj = new URL(url);

      // Garante que não há barra dupla
      const currentPath = urlObj.pathname.startsWith("/")
        ? urlObj.pathname
        : `/${urlObj.pathname}`;

      newPath = `/${language}${currentPath}`;

      urlObj.pathname = newPath;

      return urlObj.toString();
    } else {
      // É uma URL relativa
      const currentPath = url.startsWith("/") ? url : `/${url}`;
      newPath = `/${language}${currentPath}`;
      return newPath;
    }
  } catch (error) {
    console.error("Invalid URL provided:", url);
    return "";
  }
};
