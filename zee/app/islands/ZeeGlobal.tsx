import useScroll from "zee/sdk/hooks/useScroll.ts";
import { useCart } from "zee/sdk/hooks/useCart.ts";
import { useEffect } from "preact/hooks";
import {
  CountryCode,
  LanguageCode,
} from "apps/shopify/utils/storefront/storefront.graphql.gen.ts";
import { useLanguage } from "$zeedog/sdk/hooks/useLanguage.ts";
import { LANGUAGE_MAP_BY_URL } from "$zeedog/components/ui/LanguageSelector.tsx";

export default function ZeeGlobal() {
  useScroll();
  const { showCart } = useCart();

  useEffect(() => {
    const updateCart = async () => {
      const url = new URL(globalThis.location.href);
      const languageKey = useLanguage(url) ?? "es";
      const formattedLanguageMap = LANGUAGE_MAP_BY_URL[languageKey] || "es-ES";
      const [languageCodeRaw = "ES", countryCodeRaw = "ES"] =
        formattedLanguageMap.split("-");

      const languageCode = languageCodeRaw.toUpperCase() as LanguageCode;
      const countryCode = countryCodeRaw as CountryCode;

      await showCart({ countryCode, languageCode });
    };

    updateCart();
  }, []);

  return null;
}
