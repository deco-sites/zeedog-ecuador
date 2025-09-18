import { AppContext } from "$apps/site.ts";

/** @title {{{title}}} */
export interface Accordion {
  /**
   * @title Question
   */
  title: string;
  /**
   *  @format textarea
   *  @title Answer
   */
  content: string;
  /**
   * @title Indicates if there is HTML tag in the text - (Ex.: <a href="https://www.zeedog.com.br/">Site</a>) or bold text <strong>Text that should be bold</strong>)
   */
  hasHtmlTag?: boolean;
}

/** @title {{{mainTitle}}} */
export interface Faq {
  /**
   * @title Main Title
   * @description Title of the cards and side menu items
   */
  mainTitle: string;
  /**
   * @title Icon
   * @description Icon of the card and side menu
   */
  icon: string;
  /**
   * @title List of Questions and Answers
   * @description List with all questions and answers of a specific item
   */
  accordion: Accordion[];
  /**
   * @title Should start with the accordion open
   * @description Should be checked when the item has only one question/answer
   */
  shouldStartOpen?: boolean;
  /**
   * @title Is about Black Friday
   * @description Should be checked when the item is related to Black Friday
   */
  blackFriday?: boolean;
}

export interface FaqProps {
  /**
   * @title Faq Items
   * @description Content that will be displayed when clicking on the card or side menu
   */
  faqContent?: Faq[];
}

const loader = (
  props: FaqProps,
  _req: Request,
  _ctx: AppContext,
): Faq[] => {
  return props.faqContent || [];
};

export default loader;
