import { Faq as FaqType } from "$loaders/faq.ts";
import Icon, { AvailableIcons } from "$components/ui/Icon.tsx";

interface GridItemsProps {
  faqContent: FaqType[];
  createNewUrl: (title: string, index: number) => void;
}

export const FAQGridItems = ({ faqContent, createNewUrl }: GridItemsProps) => {
  return (
    <ul class="flex flex-wrap gap-4 md:gap-12 w-full lg:mt-[74px] max-w-[1520px] justify-center items-center lg:items-start">
      {faqContent.map((item, index) => (
        <li
          onClick={() => {
            createNewUrl(item.mainTitle, index);
          }}
          key={item.mainTitle}
          id={item.mainTitle}
          class="flex justify-center items-center h-44 md:w-64 w-40 bg-white rounded-3xl cursor-pointer group group-hover:border group-hover:border-blue transition-all duration-200"
        >
          <div class="flex items-center justify-center flex-col">
            <div class="border group-hover:border-blue border-black rounded-full h-16 w-16 flex items-center justify-center">
              <Icon
                width={20}
                height={20}
                name={item.icon as AvailableIcons}
                class="group-hover:text-blue-400 text-black"
              />
            </div>
            <span class="group-hover:text-blue-400 font-body-xs-bold mt-7 px-2.5 text-center">
              {item.mainTitle}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};
