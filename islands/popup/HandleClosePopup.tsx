import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect } from "preact/hooks";

export const externalClosePopup = () => {
  closePopup();
  const closePopupButton = document.querySelector(
    ".js-close-popup",
  ) as HTMLElement;
  if (closePopupButton) {
    closePopupButton.click();
  }
};

export const closePopup = () => {
  const modalSkeleton = document.querySelector(".js-skeleton-popup");
  if (modalSkeleton) {
    document.body.classList.remove("overflow-hidden");
    modalSkeleton.parentElement?.classList.replace("flex", "hidden");
    modalSkeleton.innerHTML = "";
  }
};

export function HandleClosePopup({ displayUntil }: { displayUntil?: number }) {
  const addCookie = () => {
    const expires = displayUntil && displayUntil > 0
      ? `; expires=${
        new Date(Date.now() + displayUntil * 24 * 60 * 60 * 1000)
          .toUTCString()
      }`
      : "";
    document.cookie = `closePopup=true${expires}; path=/`;
  };

  useEffect(() => {
    if (IS_BROWSER) {
      const _body = globalThis?.document?.body;
      _body.classList.add("overflow-hidden");

      const closeButtons = document.querySelectorAll(".js-close-popup");

      const handleCloseButtonClick = () => {
        closePopup();
        addCookie();
      };

      if (closeButtons && closeButtons.length > 0) {
        closeButtons.forEach((closeButton) => {
          closeButton.addEventListener(
            "click",
            handleCloseButtonClick,
          );
        });
      }

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          externalClosePopup();
          addCookie();
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        closeButtons.forEach((closeButton) => {
          closeButton.removeEventListener(
            "click",
            handleCloseButtonClick,
          );
        });
      };
    }
  }, []);

  return <></>;
}
