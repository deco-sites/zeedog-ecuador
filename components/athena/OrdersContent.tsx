import { athenaContentButton } from "$sdk/athena.ts";
import { ACCOUNT_LOGIN_URLS } from "site/sdk/global/formatUrls.ts";
import { AvailableLanguages } from "site/sdk/hooks/useLanguage.ts";

export interface OrdersContentTextsProps {
  ordersContentLoginText: string;
  accountLoginText: string;
  languageCode: AvailableLanguages;
}

export function OrdersContent(
  { accountLoginText, ordersContentLoginText, languageCode }:
    OrdersContentTextsProps,
) {
  const accountUrl = ACCOUNT_LOGIN_URLS[languageCode];

  return (
    <>
      <p class="font-body-xs-regular text-gray-600">
        {ordersContentLoginText}
      </p>

      <a
        href={accountUrl}
        class={`mt-10 ${athenaContentButton}`}
      >
        {accountLoginText}
      </a>
    </>
  );
}
