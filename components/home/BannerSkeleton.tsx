export interface BannerSkeletonProps {
  bannerType: "single" | "double";
}

export default function BannerSkeleton(
  { bannerType = "single" }: BannerSkeletonProps,
) {
  const width = bannerType === "single" ? "w-full" : "w-full md:w-1/2";
  return (
    <section class="relative flex flex-col md:flex-row w-full max-container-auto mt-6 lg:mt-10 bg-gray-100 3xl:rounded-2xl 3xl:overflow-hidden">
      <div class={`relative flex ${width} h-[582px] lg:h-[700px]`}>
        <div class="absolute flex flex-col gap-y-8 lg:gap-y-12 items-start text-left md:items-start md:text-left top-6 right-auto bottom-auto left-6 translate-x-0 translate-y-0 md:top-14 md:right-auto md:bottom-auto md:left-14 md:translate-x-0 md:translate-y-0">
          <div class="flex flex-col gap-y-2.5 items-start text-left md:items-start md:text-left">
            {/* Title */}
            <div class="w-28 md:w-56 h-9 bg-gray-200 rounded-md">
            </div>
            {/* subtitle */}
            <div class="w-40 md:w-80 h-5 bg-gray-200 rounded-md">
            </div>
          </div>
          {/* ver tudo */}
          <div class="flex flex-col w-20 h-5 bg-gray-200 rounded-md">
          </div>
        </div>
      </div>
      {bannerType === "double" && (
        <div class={`relative flex ${width} h-[582px] lg:h-[700px]`}>
          <div class="absolute flex flex-col gap-y-8 lg:gap-y-12 items-start text-left md:items-start md:text-left top-6 right-auto bottom-auto left-6 translate-x-0 translate-y-0 md:top-14 md:right-auto md:bottom-auto md:left-14 md:translate-x-0 md:translate-y-0">
            <div class="flex flex-col gap-y-2.5 items-start text-left md:items-start md:text-left">
              {/* Title */}
              <div class="w-28 md:w-56 h-9 bg-gray-200 rounded-md">
              </div>
              {/* subtitle */}
              <div class="w-40 md:w-80 h-5 bg-gray-200 rounded-md">
              </div>
            </div>
            {/* ver tudo */}
            <div class="flex flex-col w-20 h-5 bg-gray-200 rounded-md">
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
