import { useUI } from "$sdk/global/useUI.ts";

export function MenuDrawerOpenButton() {
  const { openMenuMO } = useUI();

  return (
    <>
      <input
        aria-label="menu-drawer"
        id="my-drawer"
        type="checkbox"
        class="drawer-toggle"
      />
      <label
        for="my-drawer"
        class="flex flex-col gap-1 w-7 h-7 rounded bg-gray-100 drawer-button self-center p-1.5"
        onClick={openMenuMO}
      >
        <span class="w-full h-0.5 bg-gray-700 rounded-sm" />
        <span class="w-full h-0.5 bg-gray-700 rounded-sm" />
        <span class="w-full h-0.5 bg-gray-700 rounded-sm" />
      </label>
    </>
  );
}
