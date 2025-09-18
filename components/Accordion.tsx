import { Signal } from "@preact/signals";

interface AccordionProps {
  title: string;
  content: string;
  hasHtmlTag: boolean | undefined;
  toggleAccordion: (index: number) => void;
  openAccordions: Signal<number[]>;
  index: number;
}

export const Accordion = ({
  content,
  title,
  hasHtmlTag,
  toggleAccordion,
  openAccordions,
  index,
}: AccordionProps) => {
  return (
    <div class="flex-1 flex flex-col items-start border-b border-gray-200 cursor-pointer last:border-b-0 last:pb-7">
      <span
        class="w-full py-5 flex gap-4 items-center mx-3 md:mx-7 justify-between font-body-xs-bold hover:text-blue-400 group"
        onClick={() => {
          toggleAccordion(index);
        }}
      >
        {title}
        <p class="mr-12 group-hover:fill-blue">
          {openAccordions.value.includes(index) ? "-" : "+"}
        </p>
      </span>
      {openAccordions.value.includes(index) &&
        (
          <span class="text-gray-500 border-t last:border-0 border-gray-200 px-6 md:px-11 py-6 transition-all duration-200 cursor-auto">
            {hasHtmlTag
              ? (
                <p
                  class="font-body-xs-regular text-gray-600 mb-2 faq-content"
                  dangerouslySetInnerHTML={{ __html: content }}
                >
                </p>
              )
              : (
                <p class="font-body-xs-regular text-gray-600 mb-2">
                  {content}
                </p>
              )}
          </span>
        )}
    </div>
  );
};
