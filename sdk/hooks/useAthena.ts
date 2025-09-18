import type { AthenaContent } from "$sdk/athena.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useUI } from "$sdk/global/useUI.ts";

export function handleAthenaChat(show: boolean) {
  // @ts-ignore not typed yet
  if (!globalThis.window.$zopim) return;

  const inputEl: HTMLInputElement | null = document.querySelector(
    "#athena-chat",
  );

  // @ts-ignore not typed yet
  $zopim(() => {
    if (show) {
      // @ts-ignore not typed yet
      $zopim.livechat.window.show();
      if (inputEl) inputEl.checked = true;
    } else {
      // @ts-ignore not typed yet
      $zopim.livechat.window.hide();
      if (inputEl) inputEl.checked = false;
    }
  });
}

export function handleOpenAthena(content: AthenaContent) {
  if (IS_BROWSER && document) {
    const { athenaState } = useUI();

    const inputElement: HTMLInputElement | null = document.querySelector(
      "#athena-btn",
    );
    const menuItem: HTMLInputElement | null = document.querySelector(
      `#athena-menu #${content}`,
    );

    if (inputElement && menuItem) {
      inputElement.checked = true;
      menuItem.checked = true;
      athenaState.value = content;
    }
  }
}
