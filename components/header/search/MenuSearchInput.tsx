import { useUI } from "$sdk/global/useUI.ts";
import Icon from "$components/ui/Icon.tsx";

export function MenuSearchInput() {
  const { openSearchMO } = useUI();

  return (
    <form
      action="/search"
      class="relative flex items-center justify-end transition-all w-28 focus-within:w-full"
    >
      <label
        for="drawer-search-input"
        class="absolute left-3 transition-all"
        onClick={(evt) => {
          evt.stopPropagation();
        }}
      >
        <Icon
          name="MagnifyingGlass"
          class="w-4 h-4 text-white stroke-black transition-all"
        />
      </label>
      <input
        class="flex items-center w-full h-10 pr-6 pl-9 rounded-full border-gray-200 border transition-all font-body-xs-regular"
        name="q"
        id="drawer-search-input"
        role="search"
        type="text"
        placeholder="Search"
        autocomplete="off"
        onClick={(evt) => {
          evt.preventDefault();
          evt.stopPropagation();
          openSearchMO();
        }}
      />
    </form>
  );
}
