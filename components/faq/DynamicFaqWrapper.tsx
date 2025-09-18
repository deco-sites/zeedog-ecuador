import { ComponentChildren } from "preact";

interface DynamicFaqWrapperProps {
  children: ComponentChildren;
  isAnchor: boolean;
}

export const DynamicFaqWrapper = (
  { children, isAnchor }: DynamicFaqWrapperProps,
) => {
  return isAnchor
    ? (
      <a
        class="flex lg:flex-col flex-row xl:flex-row xl:items-start xl:justify-start items-center justify-center lg:text-center xl:text-justify lg:gap-6 xl:gap-0 gap-0 p-5 mx-5 lg:my-0 my-2.5 lg:mx-2.5 border h-full border-gray-200 rounded-2xl group-hover:border-blue lg:py-11 transition-all duration-500"
        href="#contact-us-form"
      >
        {children}
      </a>
    )
    : (
      <div class="flex lg:flex-col flex-row xl:flex-row xl:items-start lg:justify-start items-center justify-center lg:text-center xl:text-justify lg:gap-6 xl:gap-0 gap-0 p-5 mx-5 lg:my-0 my-2.5 lg:mx-2.5 border h-full border-gray-200 rounded-2xl group-hover:border-blue lg:py-11 transition-all duration-500">
        {children}
      </div>
    );
};
