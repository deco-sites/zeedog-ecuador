const ShelfSkeleton = () => {
  return (
    <section class="relative flex justify-center w-full pb-6 md:pb-10">
      <div class="flex flex-col w-full max-w-full">
        <header class="relative flex flex-col xl:flex-row w-full max-container-auto lg:h-40 items-start lg:items-center justify-between gap-y-4 lg:mb-0 pt-6 lg:py-0 z-[91]">
          <div class="flex flex-col gap-1 lg:gap-2 px-6 md:px-10 3xl:px-0">
            <h1 class="w-28 h-9 font-title-xl-bold lg:font-title-2xl-bold order-2 xl:order-1 bg-gray-100 rounded-md">
            </h1>
            <div class="flex items-center gap-2 order-1 xl:order-2">
              <p class="w-16 h-5 bg-gray-100 rounded-md">
              </p>
              <b class="font-body-xs-regular text-gray-200">|</b>
              <p class="w-16 h-5 bg-gray-100 rounded-md">
              </p>
              <b class="font-body-xs-regular text-gray-200">|</b>
              <p class="w-16 h-5 bg-gray-100 rounded-md">
              </p>
            </div>
          </div>
          {/* TODO :: filtros de tipo abaixo */}

          <div class="flex lg:justify-end gap-x-3.5 w-full max-w-full xl:w-auto px-6 md:px-10 3xl:px-0 overflow-auto lg:overflow-visible snap-x snap-mandatory scroll-pl-6 pb-6 lg:pb-0">
            <div class="group flex flex-col gap-y-1 shrink-0 w-full max-w-24 lg:max-w-20 h-28 items-start justify-center snap-start">
              <div class="w-full h-20 bg-gray-100 rounded-md"></div>
              <div class="w-full h-7 rounded-md bg-gray-100">
              </div>
            </div>
            <div class="group flex flex-col gap-y-1 shrink-0 w-full max-w-24 lg:max-w-20 h-28 items-start justify-center snap-start">
              <div class="w-full h-20 bg-gray-100 rounded-md"></div>
              <div class="w-full h-7 rounded-md bg-gray-100">
              </div>
            </div>
            <div class="group flex flex-col gap-y-1 shrink-0 w-full max-w-24 lg:max-w-20 h-28 items-start justify-center snap-start">
              <div class="w-full h-20 bg-gray-100 rounded-md"></div>
              <div class="w-full h-7 rounded-md bg-gray-100">
              </div>
            </div>
            <div class="group flex flex-col gap-y-1 shrink-0 w-full max-w-24 lg:max-w-20 h-28 items-start justify-center snap-start">
              <div class="w-full h-20 bg-gray-100 rounded-md"></div>
              <div class="w-full h-7 rounded-md bg-gray-100">
              </div>
            </div>
            <div class="group flex flex-col gap-y-1 shrink-0 w-full max-w-24 lg:max-w-20 h-28 items-start justify-center snap-start">
              <div class="w-full h-20 bg-gray-100 rounded-md"></div>
              <div class="w-full h-7 rounded-md bg-gray-100">
              </div>
            </div>
            <div class="group flex flex-col gap-y-1 shrink-0 w-full max-w-24 lg:max-w-20 h-28 items-start justify-center snap-start">
              <div class="w-full h-20 bg-gray-100 rounded-md"></div>
              <div class="w-full h-7 rounded-md bg-gray-100">
              </div>
            </div>
            <div class="group flex flex-col gap-y-1 shrink-0 w-full max-w-24 lg:max-w-20 h-28 items-start justify-center snap-start">
              <div class="w-full h-20 bg-gray-100 rounded-md"></div>
              <div class="w-full h-7 rounded-md bg-gray-100">
              </div>
            </div>
          </div>
        </header>
        <hr class="border-gray-200" />
        <section class="relative flex flex-col gap-y-5 w-full max-w-full">
          <div class="sticky top-[142px] lg:top-[150px] folded-header:top-[110px] max-container-auto md:px-10 3xl:px-0 flex items-center justify-start w-full h-16 shrink-0 bg-white transition-all z-[90]">
            <div class="relative flex w-full h-full lg:w-80">
              <div class="flex items-center w-1/2 h-full px-4 font-body-2xs-regular overflow-hidden border-l border-gray-200">
                <div class="w-20 h-4 bg-gray-100 rounded-md"></div>
              </div>

              <div class="flex items-center w-1/2 h-full px-4 font-body-2xs-regular overflow-hidden border-x border-x-gray-200">
                <div class="w-20 h-4 bg-gray-100 rounded-md"></div>
              </div>
            </div>
            <div class="hidden lg:flex flex-col items-end w-16 h-4 ml-auto bg-gray-100 rounded-md">
            </div>
          </div>
          <hr class="sticky top-[206px] lg:top-[214px] folded-header:top-[174px] -mt-5 border-gray-200 transition-all" />
          <div class="relative flex w-full max-w-full max-container-auto px-6 md:px-10 3xl:px-0">
            <aside class="relative hidden md:flex items-start shrink-0 w-[calc(100vw_-_48px)] md:w-[calc(100vw_-_80px)] lg:w-80 mr-6 md:mr-10 bg-gray-100 rounded-md transition-all">
              <div class="sticky top-[230px] folded-header:top-48 flex flex-wrap content-start w-full max-w-full lg:h-[calc(100dvh_-_212px)] custom-scrollbar overflow-auto">
              </div>
            </aside>

            <section class="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 content-start w-full max-container-auto transition-all">
              <div class={`group relative flex flex-col self-end shrink-0`}>
                <div
                  class={`flex flex-col max-w-lg bg-gray-100 rounded-lg overflow-hidden`}
                >
                  <div
                    class="relative flex items-center justify-center w-full max-w-lg bg-gray-100"
                    style={{ "aspect-ratio": "1/1" }}
                  >
                  </div>
                  <div class="relative flex flex-col justify-between w-full h-[120px] md:h-36 py-3 lg:py-5 z-20">
                  </div>
                </div>
              </div>
              <div class={`group relative flex flex-col self-end shrink-0`}>
                <div
                  class={`flex flex-col max-w-lg bg-gray-100 rounded-lg overflow-hidden`}
                >
                  <div
                    class="relative flex items-center justify-center w-full max-w-lg bg-gray-100"
                    style={{ "aspect-ratio": "1/1" }}
                  >
                  </div>
                  <div class="relative flex flex-col justify-between w-full h-[120px] md:h-36 py-3 lg:py-5 z-20">
                  </div>
                </div>
              </div>
              <div class={`group relative flex flex-col self-end shrink-0`}>
                <div
                  class={`flex flex-col max-w-lg bg-gray-100 rounded-lg overflow-hidden`}
                >
                  <div
                    class="relative flex items-center justify-center w-full max-w-lg bg-gray-100"
                    style={{ "aspect-ratio": "1/1" }}
                  >
                  </div>
                  <div class="relative flex flex-col justify-between w-full h-[120px] md:h-36 py-3 lg:py-5 z-20">
                  </div>
                </div>
              </div>
              <div class={`group relative flex flex-col self-end shrink-0`}>
                <div
                  class={`flex flex-col max-w-lg bg-gray-100 rounded-lg overflow-hidden`}
                >
                  <div
                    class="relative flex items-center justify-center w-full max-w-lg bg-gray-100"
                    style={{ "aspect-ratio": "1/1" }}
                  >
                  </div>
                  <div class="relative flex flex-col justify-between w-full h-[120px] md:h-36 py-3 lg:py-5 z-20">
                  </div>
                </div>
              </div>
              <div class={`group relative flex flex-col self-end shrink-0`}>
                <div
                  class={`flex flex-col max-w-lg bg-gray-100 rounded-lg overflow-hidden`}
                >
                  <div
                    class="relative flex items-center justify-center w-full max-w-lg bg-gray-100"
                    style={{ "aspect-ratio": "1/1" }}
                  >
                  </div>
                  <div class="relative flex flex-col justify-between w-full h-[120px] md:h-36 py-3 lg:py-5 z-20">
                  </div>
                </div>
              </div>
              <div class={`group relative flex flex-col self-end shrink-0`}>
                <div
                  class={`flex flex-col max-w-lg bg-gray-100 rounded-lg overflow-hidden`}
                >
                  <div
                    class="relative flex items-center justify-center w-full max-w-lg bg-gray-100"
                    style={{ "aspect-ratio": "1/1" }}
                  >
                  </div>
                  <div class="relative flex flex-col justify-between w-full h-[120px] md:h-36 py-3 lg:py-5 z-20">
                  </div>
                </div>
              </div>
              <div class={`group relative flex flex-col self-end shrink-0`}>
                <div
                  class={`flex flex-col max-w-lg bg-gray-100 rounded-lg overflow-hidden`}
                >
                  <div
                    class="relative flex items-center justify-center w-full max-w-lg bg-gray-100"
                    style={{ "aspect-ratio": "1/1" }}
                  >
                  </div>
                  <div class="relative flex flex-col justify-between w-full h-[120px] md:h-36 py-3 lg:py-5 z-20">
                  </div>
                </div>
              </div>
              <div class={`group relative flex flex-col self-end shrink-0`}>
                <div
                  class={`flex flex-col max-w-lg bg-gray-100 rounded-lg overflow-hidden`}
                >
                  <div
                    class="relative flex items-center justify-center w-full max-w-lg bg-gray-100"
                    style={{ "aspect-ratio": "1/1" }}
                  >
                  </div>
                  <div class="relative flex flex-col justify-between w-full h-[120px] md:h-36 py-3 lg:py-5 z-20">
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </section>
  );
};

export default ShelfSkeleton;
