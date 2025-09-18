// import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

export default function ProductSimilarsControls() {
  // const currentSimilar = useSignal(0);
  useEffect(() => {
    const similars = document.querySelectorAll(".similar-image");
    const similarName = document.getElementById("similar-name");
    const similarDiscount = document.getElementById("similar-discount");

    // let maxSimilars = 0;
    if (similars && similars.length > 0) {
      // maxSimilars = similars.length;

      Array.from(similars).forEach((similar) => {
        similar.addEventListener("mouseover", () => {
          const similarElName = similar.getAttribute("data-name");
          const similarElDiscount = similar.getAttribute(
            "data-discount",
          );
          if (similarName && similarDiscount) {
            similarName.innerText = similarElName ?? "";
            if (similarElDiscount !== "0") {
              similarDiscount.innerText = `${similarElDiscount}% OFF` ?? "";
              similarDiscount.classList.remove("hidden");
            } else similarDiscount.classList.add("hidden");
          }
        });
      });
    }
    const prevButton = document.getElementById("similars-prev-button");
    const nextButton = document.getElementById("similars-next-button");
    const similarsWrapper = document.querySelector(
      ".similars",
    ) as HTMLDivElement;
    if (prevButton && nextButton && similarsWrapper) {
      prevButton.addEventListener("click", () => {
        // currentSimilar.value = currentSimilar.value === 0 ? 0 : currentSimilar.value - 1;
        // similarsWrapper.scrollLeft -= 70;
        // console.log("prev", currentSimilar.value);
        // similarsWrapper.setAttribute(
        //   "style",
        //   `transform: translateX(+${currentSimilar.value * 70}px)`,
        // );
        similarsWrapper.scrollTo({
          left: similarsWrapper.scrollLeft - 70,
          behavior: "smooth",
        });
      });
      nextButton.addEventListener("click", () => {
        // currentSimilar.value = currentSimilar.value < maxSimilars ? currentSimilar.value + 1 : currentSimilar.value;
        // console.log("next", currentSimilar.value);
        // similarsWrapper.scrollLeft += 70;
        // similarsWrapper.setAttribute(
        //   "style",
        //   `transform: translateX(-${currentSimilar.value * 70}px)`,
        // );
        similarsWrapper.scrollTo({
          left: similarsWrapper.scrollLeft + 70,
          behavior: "smooth",
        });
      });
    }
  }, []);

  return <></>;
}
