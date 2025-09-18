import { IS_BROWSER } from "$fresh/runtime.ts";
import {
  deleteCookie as denoDeleteCookie,
  getCookies as denoGetCookies,
  setCookie as denoSetCookie,
} from "std/http/mod.ts";
import { decodeBase64, encodeBase64 } from "zee/sdk/base64.ts";
import { getUUID } from "zee/sdk/uuid.ts";
import type { Cookies } from "zee/sdk/types/zee.ts";
// import { useAccount } from "zee/sdk/hooks/useAccount.ts";
export type CookieName =
  | "user_data"
  | "user_access_token"
  | "user_guest_id"
  | "user_client_id"
  | "user_device"
  | "user_mtags"
  | "user_hub"
  | "user_price_table"
  | "user_zipcode"
  | "sf_user_data"
  | "signifyd_session_id"
  | "expired_token"
  | "show_toast"
  | "show_cart"
  | "LGPD_consent"
  | "secure_customer_sig"
  | "localization";

const isEncoded = (name: CookieName): boolean => {
  switch (name) {
    case "user_data":
    case "user_access_token":
    case "user_guest_id":
    case "user_client_id":
    case "user_device": // necessário codificar porque string contém caracteres especiais
    case "user_mtags": // idem acima
    case "sf_user_data":
    case "show_toast":
      return true;
    default:
      return false;
  }
};

const daysToExpire = (name: CookieName): number | undefined => {
  switch (name) {
    case "signifyd_session_id":
      return 1;
    case "LGPD_consent":
      return 90;
    case "sf_user_data":
      return 365;
    case "expired_token":
    case "user_zipcode":
    case "show_toast":
    case "show_cart":
      return undefined; // session cookie
    default:
      return 7;
  }
};

// server only
export const getServerCookies = (
  headers: Headers, // req.headers
) => {
  const cookies = denoGetCookies(headers);

  const cookiesArr = Object.entries(cookies);

  const decoded: Partial<Cookies<CookieName>> = {};

  cookiesArr.forEach(([name, value]) => {
    decoded[name] = isEncoded(name as CookieName) ? decodeBase64(value) : value;
  });

  return decoded;
};

// server/client
export const setCookie = (
  name: CookieName,
  value: string,
  headers?: Headers, // ctx.response.headers (server only)
) => {
  const cookieValue = isEncoded(name as CookieName)
    ? encodeBase64(value)
    : value;

  const date = new Date();
  const expires = daysToExpire(name as CookieName);

  if (expires) {
    date.setTime(date.getTime() + (expires * 24 * 60 * 60 * 1000)); // converter dias em milissegundos
  }

  if (IS_BROWSER) {
    const expiration = expires ? "expires=" + date.toUTCString() + "; " : "";
    document.cookie = name + "=" + cookieValue + "; " + expiration + "path=/";
  } else if (headers) {
    denoSetCookie(
      headers,
      {
        name,
        value: cookieValue,
        expires: expires ? date : undefined,
        path: "/",
      },
    );
  }
};

// server/client
export const resetUserCookies = (
  headers?: Headers, // ctx.response.headers (server only)
) => {
  const userCookies = [
    "user_data",
    "user_access_token",
    "user_zipcode",
    "user_mtags",
  ];
  // TODO: error in hook useAccount app zee
  // const { account } = useAccount();

  userCookies.forEach((cookie) => {
    if (IS_BROWSER) {
      deleteClientCookie(cookie as CookieName);
    } else if (headers) {
      denoDeleteCookie(headers, cookie, { path: "/" });
    }
  });

  const guestId = getUUID();
  const clientId = getUUID();
  const sessionId = getUUID();

  setCookie("user_guest_id", guestId, headers);
  setCookie("user_client_id", clientId, headers);
  setCookie("signifyd_session_id", sessionId, headers);

  // account.value = null;
};

// client only
export const getClientCookie = (name: CookieName) => {
  if (!IS_BROWSER) return;

  const nameStr = name + "=";
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(nameStr) === 0) {
      const value = cookie.substring(nameStr.length, cookie.length);
      return isEncoded(name as CookieName) ? decodeBase64(value) : value;
    }
  }
  return null;
};

// client only
export const deleteClientCookie = (name: CookieName) => {
  if (!IS_BROWSER) return;
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
};

// server only
export const deleteServerCookie = (
  name: CookieName,
  headers: Headers, // ctx.response.headers
) => {
  denoDeleteCookie(headers, name, { path: "/" });
};
