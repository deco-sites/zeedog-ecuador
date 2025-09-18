import { HUB_INTERNAL_ID } from "zee/sdk/constants.ts";
import type { Cookies } from "zee/sdk/types/zee.ts";
import { CookieName } from "zee/sdk/cookies.ts";

export const buildStorefrontHeaders = (
  cookies: Partial<Cookies<CookieName>>,
) => {
  // Content-Type: “application/vnd.api+json”, // sempre esse valor
  // X-Client-Platform: “Web”, // sempre esse valor
  // X-Client-Id: xxxx, // uuid gerado no front
  // X-Client-Model: (navegador), // gerado no client a partir do primeiro acesso
  // X-Client-Version: “”, // em web sempre string vazia
  // X-Guest-Id: xxxx, // uuid gerado no front,
  // X-Notification-Id: “”, // em web sempre string vazia
  // X-Coverage-Id: 1, // internal_id do hub
  // Uid: xxx@xxx.xxx, // email do usuário, sempre que estiver logado. quando não estiver, string vazia

  let userEmail = "";
  if (cookies.user_data) {
    const userData = JSON.parse(cookies.user_data);
    if (userData?.email) userEmail = userData.email;
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/vnd.api+json",
    "X-Client-Platform": "Web",
    "X-Client-Id": cookies.user_client_id || "",
    "X-Client-Model": cookies.user_device || "",
    "X-Client-Version": "",
    "X-Guest-Id": cookies.user_guest_id || "",
    "X-Notification-Id": "",
    "X-Coverage-Id": cookies.user_hub || HUB_INTERNAL_ID,
    "Uid": userEmail,
    "Accept": "application/json",
  };

  if (cookies.user_access_token) {
    headers["Access-Token"] = `Bearer ${cookies.user_access_token}`;
  }

  // console.log(headers)

  return headers;
};

export const buildCatalogHeaders = () => {
  const headers = {
    "Accept": "application/vnd.zeedog.search+v2+json",
    "Content-Type": "application/json",
  };
  return headers;
};
