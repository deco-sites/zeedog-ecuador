import { signal, useSignal } from "@preact/signals";
import { FAQGridItems } from "../components/faq/FAQGridItems.tsx";
import {
  FAQHeaderContent,
  FAQHeaderTextsProps,
} from "../components/faq/FAQHeaderContent.tsx";
import FAQListItens from "./faq/FAQListItensMenu.tsx";
import { Faq as FaqType } from "$loaders/faq.ts";
import { useEffect } from "preact/hooks";
import { ContentAccordion } from "$components/faq/ContentAccordion.tsx";
import {
  ContentMenu,
  ContentMenuTextsProps,
} from "$components/faq/ContentMenu.tsx";
import { openAccordions } from "$sdk/global/signalStore.ts";
import { AvailableIcons } from "site/components/ui/Icon.tsx";

interface IFaqContent {
  faqContent: FaqType[];
  hasHtmlTag?: boolean;
  onResetSelectedContent?: () => number;
  contentMenuTexts?: ContentMenuTextsProps;
}

const itemOpenIndex = signal<number>(-1);

const createNewUrl = (title: string, index: number) => {
  itemOpenIndex.value = index;
  const titleFormatted = title.toLowerCase();
  const currentUrl = globalThis.window.location.href;

  const baseUrl = currentUrl.split("#")[0];

  const newUrl = baseUrl + "#" + `${titleFormatted}`;

  globalThis.window.history.pushState({ path: newUrl }, "", newUrl);
  return;
};

function FaqMenu({ faqContent, contentMenuTexts }: IFaqContent) {
  useEffect(() => {
    const getHash = decodeURI(globalThis.window.location.hash).replace("#", "");
    if (!getHash) return;

    const index = faqContent.findIndex((obj) =>
      obj.mainTitle.toLowerCase() === getHash
    );

    itemOpenIndex.value = index;
  }, []);

  return (
    <ContentMenu texts={contentMenuTexts}>
      <ul class="flex flex-col">
        {faqContent.map((item, index) => {
          const isSelected = itemOpenIndex.value === index;
          return (
            <FAQListItens
              icon={item.icon as AvailableIcons}
              index={index}
              isSelected={isSelected}
              mainTitle={item.mainTitle}
              createNewUrl={createNewUrl}
            />
          );
        })}
      </ul>
    </ContentMenu>
  );
}

function FaqContent({
  faqContent,
  onResetSelectedContent,
  texts,
}: IFaqContent & { texts: FAQHeaderTextsProps }) {
  const selectedContent = itemOpenIndex.value < 0
    ? null
    : faqContent[itemOpenIndex.value];

  useEffect(() => {
    globalThis.window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [selectedContent]);

  const toggleAccordion = (index: number) => {
    openAccordions.value.includes(index)
      ? openAccordions.value = openAccordions.value.filter((item) =>
        item !== index
      )
      : openAccordions.value = [...openAccordions.value, index];
  };

  if (onResetSelectedContent === undefined) return <></>;

  return (
    <div class="w-full bg-gray-100 flex flex-col items-center justify-center md:px-11 px-5 pb-16">
      <div class="flex w-full justify-center items-center lg:flex-row flex-col">
        <FAQHeaderContent
          selectedContent={selectedContent}
          handleResetSelectedContent={() => onResetSelectedContent()}
          texts={texts}
        />
        {!selectedContent
          ? <FAQGridItems createNewUrl={createNewUrl} faqContent={faqContent} />
          : (
            <ContentAccordion
              toggleAccordion={toggleAccordion}
              selectedContent={selectedContent}
              openAccordions={openAccordions}
              talkToUsText={texts.talkToUsText}
            />
          )}
      </div>
    </div>
  );
}

export default function Faq(
  { faqContent, texts }: IFaqContent & { texts: FAQHeaderTextsProps },
) {
  const url = useSignal("");

  const handleResetSelectedContent = () => {
    url.value = window.location.href;

    const index = url.value.indexOf("#");

    if (index !== -1) {
      url.value = url.value.substring(0, index);
      window.history.replaceState({}, document.title, url.value);
    }

    return (itemOpenIndex.value = -1);
  };

  return (
    <>
      <FaqMenu
        faqContent={faqContent}
        onResetSelectedContent={handleResetSelectedContent}
      />

      <FaqContent
        faqContent={faqContent}
        onResetSelectedContent={handleResetSelectedContent}
        texts={texts}
      />
    </>
  );
}
