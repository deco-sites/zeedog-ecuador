import { Runtime } from "zee/runtime.ts";
import { RequestError } from "zee/sdk/types/zee.ts";
import { Signal } from "@preact/signals";
import { getClientCookie } from "zee/sdk/cookies.ts";

export const invoke = async (
  loading: Signal<boolean> | null,
  key: any,
  props?: any,
) => {
  if (loading && loading.value !== null) {
    loading.value = true;
  }
  try {
    const data = await Runtime.invoke({ key, props });
    const expiredToken = getClientCookie("expired_token") === "true";
    if ((data as RequestError)?.status === "401" && expiredToken) {
      globalThis.window.location.href = "/";
    }
    return data;
  } finally {
    if (loading && loading.value !== null) {
      loading.value = false;
    }
  }
};
