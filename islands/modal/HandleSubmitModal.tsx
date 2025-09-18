import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect } from "preact/hooks";

export default function HandleSubmitModal() {
  if (IS_BROWSER) {
    const submitButton = document.querySelector(
      'form button[type="submit"]',
    ) as HTMLButtonElement;

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Enter" && submitButton) {
          event.preventDefault();
          submitButton.click();
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, []);
  }

  return <></>;
}
