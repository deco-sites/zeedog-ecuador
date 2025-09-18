import { ACCOUNT_LOGIN_URLS } from "site/sdk/global/formatUrls.ts";
import { AvailableLanguages } from "site/sdk/hooks/useLanguage.ts";

export interface AccountLoggedProps {
  loginText: string;
  registerText: string;
  /**
   * @ignore
   */
  languageCode: AvailableLanguages;
}

export default function AccountLoggedOutMO(
  { loginText, registerText, languageCode }: AccountLoggedProps,
) {
  const accountUrl = ACCOUNT_LOGIN_URLS[languageCode];

  return (
    <span
      tabIndex={0}
      class="max-md:hidden dropdown-content top-full bg-white shadow-md rounded z-[1] font-body-2xs-regular"
      id="UserLoggedOut"
    >
      <a
        href={accountUrl}
        class="flex items-center justify-center whitespace-nowrap h-10 px-5 hover:bg-gray-200 transition-all rounded-t w-full"
      >
        {loginText}
      </a>

      <a
        href={`${accountUrl}/register`}
        class="flex items-center justify-center whitespace-nowrap h-10 px-5 hover:bg-gray-200 transition-all rounded-t"
      >
        {registerText}
      </a>
    </span>
  );
}
