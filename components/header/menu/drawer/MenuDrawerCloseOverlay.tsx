import { useUI } from "$sdk/global/useUI.ts";

export function MenuDrawerCloseOverlay() {
  const { closeMenu } = useUI();

  return (
    <label
      for="my-drawer"
      class="drawer-overlay"
      onClick={closeMenu}
    >
    </label>
  );
}
