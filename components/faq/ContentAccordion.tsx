import LazyIcon from "$components/ui/LazyIcon.tsx";
import { Accordion } from "$components/Accordion.tsx";
import { TagItem } from "$components/faq/TagItem.tsx";
import { AvailableLazyIcons } from "$components/ui/LazyIcon.tsx";
import { Signal } from "@preact/signals";
import { Faq } from "$loaders/faq.ts";

interface ContentAccordionProps {
  selectedContent: Faq;
  toggleAccordion: (index: number) => void;
  openAccordions: Signal<number[]>;
  talkToUsText: string;
}

export const ContentAccordion = (
  { selectedContent, toggleAccordion, openAccordions, talkToUsText }:
    ContentAccordionProps,
) => {
  return (
    <div class="relative flex flex-col md:px-16 bg-white md:mt-20 mt-12 mb-9 w-full rounded-3xl">
      <div class="flex flex-col">
        <div class="flex flex-col items-center justify-center w-full my-16">
          <LazyIcon
            name={selectedContent.icon as AvailableLazyIcons}
            width={24}
            height={24}
          />
          <p class="font-title-xl-bold lg:font-title-2xl-bold mt-4">
            {selectedContent.mainTitle}
          </p>
        </div>
        {selectedContent.accordion.map((item, index) => (
          <Accordion
            content={item.content}
            hasHtmlTag={item.hasHtmlTag}
            title={item.title}
            index={index}
            openAccordions={openAccordions}
            toggleAccordion={toggleAccordion}
            key={item.title}
          />
        ))}
      </div>
      <TagItem talkToUsText={talkToUsText} />
    </div>
  );
};
