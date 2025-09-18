import { ComponentChildren } from "preact";

export interface ContentMenuTextsProps {
  title: string;
  description: string;
}

interface ContentMenuProps {
  children: ComponentChildren;
  texts?: ContentMenuTextsProps;
}

export const ContentMenu = (
  { children, texts }: ContentMenuProps,
) => {
  return (
    <div class="sticky transition-all duration-500 top-36 h-[calc(100vh-150px)] folded-header:h-[calc(100vh-110px)] folded-header:top-28 overflow-y-auto bg-white flex-col hidden min-w-96 lg:flex">
      <div class="flex flex-col items-start">
        <h1 class="font-title-xl-bold lg:font-title-2xl-bold whitespace-nowrap ml-11 mt-20">
          {texts?.title || ""}
        </h1>
        <p class="font-body-xs-regular text-gray-600 max-w-64 mt-7 ml-11 mb-14">
          {texts?.description || ""}
        </p>
      </div>
      {children}
    </div>
  );
};
