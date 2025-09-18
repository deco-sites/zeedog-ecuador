import {
  getServerCookies,
  resetUserCookies,
  setCookie,
} from "zee/sdk/cookies.ts";
import { getUUID } from "zee/sdk/uuid.ts";
import { buildStorefrontHeaders } from "zee/sdk/headers.ts";
import getDeviceData from "zee/sdk/device.ts";
import { type AppMiddlewareContext, redirect } from "@deco/deco";

export const STOREFRONT_HEADERS = Symbol("storefront_headers");

export const middleware = async (
  _props: unknown,
  req: Request,
  ctx: AppMiddlewareContext,
) => {
  const isInvoke = !!ctx.isInvoke;
  const invokeKey = `${ctx.resolveChain?.[ctx.resolveChain.length - 1]?.value}`;
  const storefrontInvoke = invokeKey.includes("/storefront/");

  if (!storefrontInvoke) {
    return ctx.next!();
  }

  const cookies = getServerCookies(req.headers);
  // headers gerados a partir dos cookies para valores mais atualizados (em caso de sessão expirada, por exemplo)
  const storefrontHeaders = buildStorefrontHeaders(cookies);
  // headers são salvos no ctx.bag para serem acessados em todos os loaders e actions, garantindo a verificação dos headers necessários e a persistência dos valores (guest id e client id)
  const ctxBagHeaders = ctx.bag.get(STOREFRONT_HEADERS) || {};
  if (!storefrontHeaders["X-Client-Id"]) {
    // checa se já existe no ctx.bag, nesse caso não é necessário gerar um novo id ou salvar nos cookies novamente, pois a ação já ocorreu, apenas não refletiu no ctx porque os requests do primeiro carregamento são executados simultaneamente
    if (ctxBagHeaders["X-Client-Id"]) {
      storefrontHeaders["X-Client-Id"] = ctxBagHeaders["X-Client-Id"];
    } else {
      const clientId = getUUID();
      setCookie("user_client_id", clientId, ctx.response.headers);
      storefrontHeaders["X-Client-Id"] = clientId;
    }
  }
  if (!storefrontHeaders["X-Guest-Id"]) {
    if (ctxBagHeaders["X-Guest-Id"]) {
      storefrontHeaders["X-Guest-Id"] = ctxBagHeaders["X-Guest-Id"];
    } else {
      const guestId = getUUID();
      setCookie("user_guest_id", guestId, ctx.response.headers);
      storefrontHeaders["X-Guest-Id"] = guestId;
    }
  }
  if (!storefrontHeaders["X-Client-Model"]) {
    if (ctxBagHeaders["X-Client-Model"]) {
      storefrontHeaders["X-Client-Model"] = ctxBagHeaders["X-Client-Model"];
    } else {
      let device = navigator?.userAgent || "";
      const userAgent = req.headers.get("user-agent");
      if (userAgent) {
        const { os, browser } = getDeviceData(userAgent);
        device = `${os}/${browser}`;
      }
      if (device) {
        setCookie("user_device", device, ctx.response.headers);
        storefrontHeaders["X-Client-Model"] = device;
      }
    }
  }
  ctx.bag.set(STOREFRONT_HEADERS, storefrontHeaders);
  const response = await ctx.next!();
  if (response?.__isErr) {
    return response;
  }
  // sessão expirada
  if (response?.status === "401") {
    resetUserCookies(ctx.response.headers);
    setCookie("expired_token", "true", ctx.response.headers);
    // redirect apenas em loaders executados no carregamento da página, pois o navegador não dá follow no redirect das requisições em actions (ou loaders chamados via ctx.invoke). esses casos são tratados no invoke dos hooks
    if (!isInvoke && invokeKey.includes("/loaders/")) {
      redirect("/");
    }
  }
  return response;
};
