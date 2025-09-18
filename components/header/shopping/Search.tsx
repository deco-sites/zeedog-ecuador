import Icon from "$components/ui/Icon.tsx";
import { useUI } from "$sdk/global/useUI.ts";

export interface SearchProps {
  openText: string;
  closeText: string;
}

export function Search(search: SearchProps) {
  const { toggleSearch, displaySearchInputContainer } = useUI();

  return (
    <label
      for="search-input"
      class={`group/search relative flex items-center justify-center gap-2.5 h-full px-2 lg:px-6 font-body-xs-regular cursor-pointer hover:after:w-full after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-black after:transition-all ${
        displaySearchInputContainer.value ? "after:w-full" : "after:w-0"
      }`}
      onClick={toggleSearch}
    >
      <Icon
        name="MagnifyingGlass"
        width={24}
        height={24}
        class="text-black"
      />
      <span class="hidden lg:block">
        {!displaySearchInputContainer.value
          ? search.openText
          : search.closeText}
      </span>
    </label>
  );
}
