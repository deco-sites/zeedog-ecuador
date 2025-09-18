import { Device } from "@deco/deco/utils";
import AccountProfileButton from "../account/AccountProfileButton.tsx";
import {
  type AccountLoggedProps,
} from "$components/header/account/AccountLoggedOutMO.tsx";
import AccountLoggedIn, {
  AccountLoggedInProps,
} from "$components/header/account/AccountLoggedIn.tsx";
import { MyProfileProps } from "site/components/header/AccountMO.tsx";
import { AvailableLanguages } from "site/sdk/hooks/useLanguage.ts";

interface AccountProps {
  device?: Device;
  hasUser?: boolean;
  language: AvailableLanguages;
  account: AccountLoggedProps & MyProfileProps & AccountLoggedInProps;
}

export function Account(
  { device, hasUser, account, language = "en" }: AccountProps,
) {
  return (
    <div class="dropdown dropdown-hover flex flex-col items-center group">
      <AccountProfileButton hasUser={hasUser} language={language} />
      {device !== "mobile" && hasUser && (
        <AccountLoggedIn {...account} language={language} />
      )}
      {/* {!hasUser && <AccountLoggedOutMO {...account} />} */}
    </div>
  );
}
