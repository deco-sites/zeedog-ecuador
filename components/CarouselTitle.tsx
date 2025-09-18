export interface CarouselTitleProps {
  viewMoreURL?: string;
  title?: string;
  viewMoreText?: string;
  titleStyle?: "uppercase" | "capitalize" | "lowercase" | "normal-case";
  /* TODO: Implement Membership Option*/
}

export default function CarouselTitle(
  { viewMoreURL, title, viewMoreText, titleStyle }: CarouselTitleProps,
) {
  return (
    <div
      id={`${title?.toLowerCase()}`}
      class="flex justify-between px-6 md:px-10 md:mb-5 lg:justify-start mb-2 mt-12 mx-auto h-10 scroll-h-link max-container-auto"
    >
      <a
        href={viewMoreURL}
        class="hover:text-gray-500"
      >
        <h2
          class={`font-title-sm-bold mb-8 md:font-title-xl-bold text-black lg:mr-10 ${titleStyle}`}
        >
          {title}
        </h2>
      </a>

      {/* View More Button */}
      {(title && viewMoreURL) && (
        <div class="relative flex flex-nowrap justify-center">
          <a
            href={viewMoreURL}
            class="relative font-title-xs-bold flex flex-col group whitespace-nowrap cursor-pointer"
          >
            {viewMoreText}
            <span class="absolute h-0.5 w-full bottom-4 bg-black md:text-black group-hover:bottom-5 transition-all" />
          </a>
        </div>
      )}
    </div>
  );
}
