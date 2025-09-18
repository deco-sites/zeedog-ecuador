import { useUI } from "$sdk/global/useUI.ts";
import LazyIcon from "$components/ui/LazyIcon.tsx";
import { MenuSearchInput } from "$components/header/search/MenuSearchInput.tsx";

export function MenuDrawerSearchContainer() {
  const { closeMenu, displaySearchDrawer } = useUI();

  return (
    <label
      class="flex items-center justify-between h-24 pl-5 pr-6 border-b border-gray-200"
      onClick={(evt) => {
        evt.preventDefault();
        displaySearchDrawer.value = false;
      }}
    >
      <label
        for="my-drawer"
        class="p-2 -ml-1 mr-3"
        onClick={(evt) => {
          evt.stopPropagation();
          closeMenu();
        }}
        aria-label="search-control"
      >
        <LazyIcon name="Close" class="w-4 h-4" />
      </label>
      <MenuSearchInput />
    </label>
  );
}
