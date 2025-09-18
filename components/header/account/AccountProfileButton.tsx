import Icon from "$components/ui/Icon.tsx";
import { ACCOUNT_LOGIN_URLS } from "site/sdk/global/formatUrls.ts";
import { AvailableLanguages } from "site/sdk/hooks/useLanguage.ts";

interface Props {
  hasUser?: boolean;
  language: AvailableLanguages;
}

export default function AccountProfileButton(
  { hasUser, language }: Props,
) {
  const accountUrl = ACCOUNT_LOGIN_URLS[language];

  return (
    <>
      {hasUser
        ? (
          <a
            href={accountUrl}
            aria-label="Account Profile"
            class="group/account relative flex items-center justify-center w-9 h-full px-2 group-hover:after:w-full after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-black after:transition-all text-black"
            tabIndex={0}
          >
            <Icon
              name="MyAccount"
              width={24}
              height={24}
              class="absolute opacity-100 visible group-hover/account:opacity-0 group-hover/account:invisible transition-all"
            />
            <Icon
              name="MyAccountFilled"
              width={24}
              height={24}
              class="absolute opacity-0 invisible group-hover/account:opacity-100 group-hover/account:visible transition-all"
            />
          </a>
        )
        : (
          <a
            href={accountUrl}
            aria-label="Account Profile"
            class="group/account relative flex items-center justify-center w-9 h-full px-2 group-hover:after:w-full after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-black after:transition-all text-black"
            tabIndex={0}
          >
            <Icon
              name="MyAccount"
              width={24}
              height={24}
              class="absolute opacity-100 visible group-hover/account:opacity-0 group-hover/account:invisible transition-all"
            />
            <Icon
              name="MyAccountFilled"
              width={24}
              height={24}
              class="absolute opacity-0 invisible group-hover/account:opacity-100 group-hover/account:visible transition-all"
            />
          </a>
        )}
    </>
  );
}
