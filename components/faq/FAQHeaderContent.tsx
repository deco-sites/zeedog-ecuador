import LazyIcon from "$components/ui/LazyIcon.tsx";
import { Faq } from "$loaders/faq.ts";

export interface FAQHeaderTextsProps {
  frequentlyAskedQuestionsText: string;
  weWillHelpYouText: string;
  talkToUsText: string;
}

interface HeaderContentProps {
  selectedContent: Faq | null;
  handleResetSelectedContent: () => number;
  texts: FAQHeaderTextsProps;
}

export const FAQHeaderContent = (
  { selectedContent, handleResetSelectedContent, texts }: HeaderContentProps,
) => {
  return (
    <div class="lg:hidden text-center">
      {!selectedContent
        ? (
          <>
            <button class="font-title-xl-bold lg:font-title-2xl-bold mt-9">
              {texts.frequentlyAskedQuestionsText}
            </button>
            <p class="font-body-xs-regular max-w-64 mt-7 mb-9 text-gray-600">
              {texts.weWillHelpYouText}
            </p>
          </>
        )
        : (
          <div class="flex items-center justify-center mt-9">
            <button
              onClick={handleResetSelectedContent}
              class="not-focus-visible:outline-none w-10 h-10 bg-white rounded-full mr-5 flex items-center justify-center"
              aria-label="Seta para baixo"
            >
              <LazyIcon
                name="BodyArrowLeft"
                width={24}
                height={24}
              />
            </button>
            <p class="font-title-xl-bold lg:font-title-2xl-bold">
              {texts.frequentlyAskedQuestionsText}
            </p>
          </div>
        )}
    </div>
  );
};
