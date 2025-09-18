import { batch, effect, signal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";
import type { IBreedObject } from "$types/breed.ts";

const displayCart = signal(false);
const displayMenu = signal(true);
const displaySearchDrawer = signal(false);
const displaySearchInputContainer = signal(false);

const athenaState = signal("");
const onlineChat = signal(false);
const breedState = signal<IBreedObject>({});

const openMenuMO = () => {
  batch(() => {
    displaySearchDrawer.value = false;
    displayMenu.value = true;
  });
};

const closeMenu = () => {
  batch(() => {
    displayMenu.value = false;
    displaySearchDrawer.value = false;
  });
};

const openSearchMO = () => {
  batch(() => {
    displayMenu.value = false;
    displaySearchDrawer.value = true;
  });
};

const toggleSearch = () => {
  displaySearchInputContainer.value = !displaySearchInputContainer.value;
};

const resetBreedSelect = () => {
  breedState.value = {};
  if (IS_BROWSER) {
    const breedSelect = document.querySelectorAll(
      ".pdp-breed-select",
    ) as NodeListOf<HTMLSelectElement>;
    if (breedSelect && breedSelect.length > 0) {
      breedSelect.forEach((select) => {
        select.selectedIndex = 1;
      });
    }
  }
};

effect(() => {
  if (IS_BROWSER) {
    const $body = globalThis?.document?.body;
    if (displayCart.value) {
      $body.classList.add("overflow-hidden");
    } else {
      $body.classList.remove("overflow-hidden");
    }
  }
});

const state = {
  displayCart,
  displayMenu,
  displaySearchDrawer,
  displaySearchInputContainer,
  athenaState,
  onlineChat,
  breedState,
  openMenuMO,
  closeMenu,
  openSearchMO,
  toggleSearch,
  resetBreedSelect,
};

export const useUI = () => state;
