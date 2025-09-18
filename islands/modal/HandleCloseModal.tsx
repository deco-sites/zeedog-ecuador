import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect } from "preact/hooks";

export const externalCloseModal = () => {
  closeModal();
  const closeModalButton = document.querySelector(
    ".js-close-modal",
  ) as HTMLElement;
  if (closeModalButton) {
    closeModalButton.click();
  }
};

export const closeModal = () => {
  const modalSkeleton = document.querySelector(".js-skeleton-modal");
  if (modalSkeleton) {
    document.body.classList.remove("overflow-hidden");
    modalSkeleton.className =
      "js-skeleton-modal absolute flex flex-col items-center justify-center shrink-0 bg-white z-[9999] transition-all";
    modalSkeleton.parentElement?.classList.replace("flex", "hidden");
    modalSkeleton.innerHTML = "";
  }
};

export function HandleCloseModal() {
  useEffect(() => {
    if (IS_BROWSER) {
      const closeButtons = document.querySelectorAll(".js-close-modal");

      if (closeButtons && closeButtons.length > 0) {
        closeButtons.forEach((closeButton) => {
          closeButton.addEventListener("click", closeModal);
        });
      }

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          externalCloseModal();
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, []);

  return <></>;
}
