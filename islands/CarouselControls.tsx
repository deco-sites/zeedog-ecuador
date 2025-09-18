import { type Signal, useSignal } from "@preact/signals";
import { useLayoutEffect } from "preact/hooks";
import { useRef } from "preact/compat";
import LazyIcon from "site/components/ui/LazyIcon.tsx";

const scroll = (
  evt: MouseEvent,
  currentPage: Signal,
  pageStep: any,
  totalPages: number,
  selector: string,
  side?: "left" | "right",
  goTo?: number,
) => {
  if (!(evt.target instanceof HTMLButtonElement)) return;
  if (currentPage.value >= totalPages || currentPage.value < 0) return;

  // const parentSection = evt.target.closest("section");
  const carouselSection = globalThis.document.querySelector("." + selector);
  if (!carouselSection) return;
  const direction = side ? side === "left" ? 1 : -1 : 0;

  const pageDestination = goTo !== undefined
    ? goTo
    : currentPage.value + direction;

  const translate = pageStep.value[pageDestination].scroll;

  carouselSection.setAttribute(
    "style",
    `transform: translateX(-${translate}px)`,
  );
  currentPage.value = pageDestination;
};

export interface CarouselControlProps {
  carouselSelector: string;
  totalItems: number;
  itemsPerSlide: number;
  // padding-left + (padding-right - gap-x)
  extraTransitionPadding?: number;
  hasBullets?: boolean;
  viewMoreURL?: string;
  customArrowPosition?: {
    left?: string;
    right?: string;
  };
  buttonSize?: "small" | "large";
  arrowButtonPosition?: "absolute" | "relative";
  viewMoreText?: string;
}

export function CarouselControls(
  {
    carouselSelector,
    totalItems,
    itemsPerSlide,
    extraTransitionPadding = 60,
    hasBullets,
    viewMoreURL,
    customArrowPosition,
    buttonSize = "large",
    arrowButtonPosition = "relative",
    viewMoreText,
  }: CarouselControlProps,
) {
  const currentPage = useSignal(0);
  const needeedButtonRef = useRef<HTMLButtonElement>(null);

  const totalPages = Math.ceil(totalItems / itemsPerSlide);
  const pageSteps = useSignal<Array<Record<string, number>>>([{
    page: 0,
    scroll: 0,
  }]);

  useLayoutEffect(() => {
    if (!needeedButtonRef?.current?.parentElement) return;
    let carouselWidth = 0;
    // const parentSection = needeedButtonRef.current.parentElement;
    const carouselSection = globalThis.document.querySelector(
      "." + carouselSelector,
    );
    if (carouselSection) {
      carouselWidth = carouselSection.clientWidth -
        (itemsPerSlide === 1 ? 0 : extraTransitionPadding);
    }

    const newPageSteps: Array<Record<string, number>> = [{
      page: 0,
      scroll: 0,
    }];

    for (let i = 1; i < totalPages; i++) {
      const nextPage = totalItems - i * itemsPerSlide >= itemsPerSlide
        ? { page: i, scroll: i * carouselWidth }
        : {
          page: i,
          scroll: (i - 1) * carouselWidth +
            (carouselWidth * (totalItems % itemsPerSlide) / itemsPerSlide),
        };

      newPageSteps.push(nextPage);
    }

    pageSteps.value = newPageSteps;
  }, []);

  const leftArrowPosition = customArrowPosition?.left ?? "-left-12";
  const rightArrowPosition = customArrowPosition?.right ?? "-right-12";

  const size = buttonSize === "small"
    ? {
      button: "w-6 h-6",
      arrow: 16,
    }
    : {
      button: "w-10 h-10",
      arrow: 24,
    };

  return (
    <>
      {currentPage.value > 0 && (
        <button
          aria-label="left-button"
          class={`${arrowButtonPosition} ${rightArrowPosition} flex items-center justify-center -ml-10 shrink-0 order-none ${size.button} z-20 rounded-full shadow-md bg-white`}
          onClick={(evt) =>
            scroll(
              evt,
              currentPage,
              pageSteps,
              totalPages,
              carouselSelector,
              "right",
            )}
        >
          {
            /* <span class="block w-2.5 h-2.5 -mr-1 border-t-2 border-l-2 border-black -rotate-45 pointer-events-none">
          </span> */
          }
          <LazyIcon
            name="ArrowLeft"
            width={size.arrow}
            height={size.arrow}
            class="text-black pointer-events-none"
          />
        </button>
      )}
      {currentPage.value < totalPages - 1 && (
        <button
          ref={needeedButtonRef}
          aria-label="right-button"
          class={`${arrowButtonPosition} ${leftArrowPosition} flex items-center justify-center -mr-10 shrink-0 order-2 ${size.button} z-20 rounded-full shadow-md bg-white`}
          onClick={(evt) => {
            scroll(
              evt,
              currentPage,
              pageSteps,
              totalPages,
              carouselSelector,
              "left",
            );
          }}
        >
          {
            /* <span class="block w-2.5 h-2.5 -ml-1 border-t-2 border-r-2 border-black rotate-45 pointer-events-none">
          </span> */
          }
          <LazyIcon
            name="ArrowRight"
            width={size.arrow}
            height={size.arrow}
            class="text-black pointer-events-none"
          />
        </button>
      )}
      {(viewMoreURL && viewMoreURL.trim() !== "" && currentPage.value !== 0 &&
        currentPage.value + 1 === totalPages) && (
        <a
          href={viewMoreURL}
          class="absolute right-0 3xl:right-[calc((100vw_-_2046px)_/_2)] flex items-center justify-center h-10 bg-white shadow-md rounded-l-full 3xl:rounded-full font-body-xs-regular pl-5 py-4 pr-4 max-container cursor-pointer z-40"
        >
          {viewMoreText}
        </a>
      )}
      {hasBullets && (
        <div class="absolute bottom-2.5 flex gap-1 z-20">
          {pageSteps.value.length === totalPages &&
            pageSteps.value.map((_, index) => (
              <button
                aria-label="carousel-button"
                onClick={(evt) =>
                  scroll(
                    evt,
                    currentPage,
                    pageSteps,
                    totalPages,
                    carouselSelector,
                    undefined,
                    index,
                  )}
                class={`w-6 h-[5px] rounded shadow-sm shadow-white ${
                  currentPage.value === index ? "bg-black" : "bg-gray-200"
                }`}
              >
              </button>
            ))}
        </div>
      )}
    </>
  );
}
