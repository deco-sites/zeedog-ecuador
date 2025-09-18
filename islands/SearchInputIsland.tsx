import { useSignal } from "@preact/signals";
import Icon from "$components/ui/Icon.tsx";
import LazyIcon from "$components/ui/LazyIcon.tsx";
import { HeaderSearchInputProps } from "site/components/header/search/HeaderSearchInput.tsx";
import { AvailableLanguages } from "site/sdk/hooks/useLanguage.ts";

export interface SearchInputProps {
  prevTerm?: string | null;
  /**
   * @ignore
   */
  language: AvailableLanguages;
}

export default function SearchInputIsland(
  { prevTerm, placeholder }:
    & SearchInputProps
    & HeaderSearchInputProps,
) {
  const searchTerm = useSignal(prevTerm ?? "");

  return (
    <form
      action={"/search"}
      class="relative flex items-center justify-center h-auto bg-gray-100 w-full px-6 lg:px-16 py-5"
    >
      <input
        class="relative w-full h-10 lg:h-auto pl-5 lg:pl-0 lg:py-4 outline-none border-t border-r border-b border-l lg:border-t-0 lg:border-r-0 lg:border-l-0 border-gray-200 rounded-full lg:rounded-none bg-white lg:bg-transparent font-body-xs-regular lg:font-title-xl-medium"
        name="q"
        id="search-input"
        role="search"
        type="text"
        placeholder={placeholder}
        autocomplete="off"
        value={searchTerm.value}
        onInput={(evt) => {
          searchTerm.value = evt.currentTarget.value;
        }}
      />
      <a
        aria-label="search-button"
        href={`/busca?q=${searchTerm.value}`}
        class={`group absolute right-9 lg:right-16 flex items-center justify-center w-6 h-6 lg:w-10 lg:h-10 rounded-full lg:border lg:border-gray-200 lg:bg-black lg:hover:bg-opacity-60 cursor-pointer ${
          searchTerm.value?.trim() === "" &&
          "pointer-events-none lg:!bg-opacity-30 lg:hover:!cursor-default lg:hover:!bg-opacity-30"
        }`}
      >
        <Icon
          name="MagnifyingGlass"
          class="w-4 h-4 lg:w-5 lg:h-5 text-black lg:text-white"
          fill="transparent"
        />
      </a>
      {searchTerm.value && (
        <button
          aria-label="search-close"
          class="absolute right-36 hidden lg:flex items-center justify-center w-10 h-10 border-t border-b border-r border-gray-200 rounded-r-md hover:bg-gray-200 hover:before:bg-gray-200 before:content-[''] before:absolute before:-left-[14px] before:w-8 before:h-8 before:border-l before:border-b before:border-gray-200 before:rounded-md before:rotate-45"
          type="button"
          onClick={(evt) => {
            evt.preventDefault();
            searchTerm.value = "";
          }}
        >
          <LazyIcon
            name="Close"
            class="relative w-4 h-4 lg:w-5 lg:h-5 fill-gray-40"
          />
        </button>
      )}
    </form>
  );
}
