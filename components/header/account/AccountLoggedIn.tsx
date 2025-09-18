import { MyProfileProps } from "site/components/header/AccountMO.tsx";
import { ACCOUNT_LOGIN_URLS } from "site/sdk/global/formatUrls.ts";
import { AvailableLanguages } from "site/sdk/hooks/useLanguage.ts";

export type AccountLoggedInProps = {
  myProfileExitText: string;
  /**
   * @ignore
   */
  language: AvailableLanguages;
};

export default function AccountLoggedIn(
  { myProfileText, myProfileExitText, language }:
    & AccountLoggedInProps
    & MyProfileProps,
) {
  const accountUrl = ACCOUNT_LOGIN_URLS[language];

  return (
    <ul
      tabIndex={0}
      class="dropdown-content top-full bg-white shadow-md rounded z-[1] font-body-2xs-regular"
    >
      <li>
        <a
          href={accountUrl}
          class="flex items-center justify-center whitespace-nowrap h-10 px-5 hover:bg-gray-200 transition-all rounded-t"
        >
          {myProfileText}
        </a>
      </li>

      <li>
        <a
          href={`${accountUrl}/logout`}
          class="flex items-center justify-center whitespace-nowrap h-10 px-5 hover:bg-gray-200 transition-all rounded-b w-full"
        >
          {myProfileExitText}
        </a>
      </li>
    </ul>
  );
}
