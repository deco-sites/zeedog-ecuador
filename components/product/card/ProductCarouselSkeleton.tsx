const ProductCarouselSkeleton = () => {
  return (
    <section class="relative flex items-center justify-center w-full overflow-hidden carousel-right-fade carousel-left-fade my-6 md:my-10 md:pb-10">
      <div class="product-carousel relative flex order-1 gap-3 md:gap-5 flex-nowrap px-6 md:px-10 transition-all ease-out duration-500 w-full max-container">
        {Array.apply(null, Array(4)).map((_, index) => (
          <div
            class={`group relative flex-col self-end shrink-0 w-full md:w-[calc(33.333333333333336%_-_13.333333333333334px)] lg:w-[calc(25%_-_15px)] appear md:animate-none ${
              index === 0 ? "flex" : "hidden md:flex"
            }`}
          >
            <div
              class={`flex flex-col max-w-lg bg-gray-100 rounded-lg overflow-hidden`}
            >
              <div
                class="relative flex items-center justify-center w-full max-w-lg bg-gray-200"
                style={{ "aspect-ratio": "1/1" }}
              >
              </div>
              <div class="relative flex flex-col justify-between w-full h-[120px] md:h-36 py-3 lg:py-5 z-20">
                <div class="flex flex-col gap-y-1 px-3 md:px-5">
                  <span class="w-2/3 h-4 bg-gray-200 rounded"></span>
                  <span class="w-2/5 h-4 bg-gray-200 rounded"></span>
                </div>
                <div class="flex flex-col gap-y-1 px-3 md:px-5">
                  <span class="w-1/3 h-4 bg-gray-200 rounded"></span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCarouselSkeleton;
