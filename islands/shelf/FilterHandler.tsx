import { useEffect } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

const animateLoadingSkuFilter = () => {
  const filterButtons = document.querySelectorAll(".sku-filter-button");

  if (filterButtons && filterButtons.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        button.classList.add(
          "border-black",
          "bg-black",
          "bg-opacity-10",
          "text-black",
        );
        button.firstElementChild?.classList.add("loading", "loading-spinner");
      });
    });
  }
};

const animateLoadingColorFilter = () => {
  const filterButtons = document.querySelectorAll(".color-filter-button");
  if (filterButtons && filterButtons.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        button.firstElementChild?.classList.add("loading", "loading-spinner");
      });
    });
  }
};

// const loadingDefaultFilterAnimation = "animation-filterloading";
const loadingDefaultFilterAnimation2 = "animation-filterloading2";

export const animateLoadingDefaultFilter = () => {
  if (document) {
    const filterButtons = document.querySelectorAll(".default-filter-button");
    if (filterButtons && filterButtons.length > 0) {
      filterButtons.forEach((button) => {
        if (button) {
          button.addEventListener("click", () => {
            button.firstElementChild?.classList.add(
              loadingDefaultFilterAnimation2,
            );
          });
        }
      });
    }
  }
};

const filterToggleControl = () => {
  const inputFilter = document.querySelector("input#filter");
  const inputHideFilter = document.querySelector(
    "input#hide-filters",
  ) as HTMLInputElement;

  if (inputFilter && inputHideFilter) {
    inputFilter.addEventListener("click", () => {
      inputHideFilter.checked = false;
    });

    const sortFilter = document.querySelector(
      "input#sort",
    ) as HTMLInputElement;
    sortFilter.addEventListener("click", () => {
      inputHideFilter.checked = false;
    });
  }
};

const FilterHandler = () => {
  useEffect(() => {
    if (IS_BROWSER) {
      filterToggleControl();
      animateLoadingSkuFilter();
      animateLoadingColorFilter();
      animateLoadingDefaultFilter();
    }
  }, []);

  return <></>;
};

export default FilterHandler;
