import { IS_BROWSER } from "$fresh/runtime.ts";

let lastKnownScrollY = 0;
let currentScrollY = 0;
let ticking = false;

const watchScroll = () => {
  currentScrollY = globalThis.window.pageYOffset;
  requestTick();
};

const requestTick = () => {
  if (!ticking) {
    requestAnimationFrame(handleScroll);
  }
  ticking = true;
};

const foldHeader = () => {
  document.body.classList.add("js-folded-header");
};

const unfoldHeader = () => {
  document.body.classList.remove("js-folded-header");
};

const handleScroll = () => {
  // on mobile, check for at least 100 units of scroll
  // on desktop, check for at least the equivalent of 20% of screen height units of scroll
  const amountOfScroll = globalThis.window.innerHeight < 500
    ? 100
    : globalThis.window.innerHeight * 0.2;
  if (currentScrollY < lastKnownScrollY) {
    lastKnownScrollY = currentScrollY;
    unfoldHeader(); // show all elements
  } else if (currentScrollY > lastKnownScrollY + amountOfScroll) {
    lastKnownScrollY = currentScrollY;
    foldHeader(); // hide some elements
  }
  ticking = false;
};

function useScroll() {
  if (IS_BROWSER && globalThis.window.HTMLBodyElement && document) {
    globalThis.addEventListener("scroll", () => {
      document.addEventListener("scroll", watchScroll);
    });
  }
}

export default useScroll;
