import Faq from "$islands/Faq.tsx";
import { Faq as FaqType } from "$loaders/faq.ts";
import { FAQHeaderTextsProps } from "site/components/faq/FAQHeaderContent.tsx";
import { ContentMenuTextsProps } from "site/components/faq/ContentMenu.tsx";

export interface FapProps {
  faqContent: FaqType[];
  texts: FAQHeaderTextsProps;
  contentMenuTexts?: ContentMenuTextsProps;
}

const DEFAULT_PROPS = {
  "faqContent": [
    {
      "mainTitle": "How does delivery work?",
      "icon": "delivery-icon",
      "accordion": [
        {
          "title": "What is the delivery time?",
          "content":
            "Delivery time varies based on your location and the shipping method you choose. You can check the estimated time during checkout.",
          "hasHtmlTag": false,
        },
        {
          "title": "Can I change the delivery address?",
          "content":
            "Yes, you can change the delivery address as long as the order hasn't been shipped. Please contact our support for assistance.",
          "hasHtmlTag": false,
        },
      ],
      "shouldStartOpen": true,
      "blackFriday": false,
    },
    {
      "mainTitle": "About Black Friday",
      "icon": "black-friday-icon",
      "accordion": [
        {
          "title": "When does Black Friday start?",
          "content":
            "Black Friday will take place at the end of November. Promotions begin at midnight on Thursday and last until Friday.",
          "hasHtmlTag": false,
        },
        {
          "title": "Are discounts valid for all products?",
          "content":
            "No. Some products may have limited promotions, and discounts may vary. Please check specific deals on the website.",
          "hasHtmlTag": false,
        },
      ],
      "shouldStartOpen": true,
      "blackFriday": true,
    },
  ],
  "texts": {
    "frequentlyAskedQuestionsText": "Frequently Asked Questions",
    "weWillHelpYouText": "We will help you with any questions you may have.",
    "talkToUsText": "Talk to us",
  },
};

export default function FAQ(props: FapProps) {
  const { faqContent, contentMenuTexts } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  return (
    <div class="flex w-full">
      <Faq
        {...props}
        faqContent={faqContent}
        contentMenuTexts={contentMenuTexts}
      />
    </div>
  );
}
