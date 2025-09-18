/** @title {{ category }} */
export interface ShelfFaqProps {
  category: string;
  title: string;
  description?: string;
  questions?: FaqCollapse[];
}

/** @title {{ question }} */
interface FaqCollapse {
  question: string;
  /** @format textarea */
  answer: Answer[];
}

/**
 * @title Response {{ heading }}
 * @description The response may contain HTML tags including a bold title and a paragraph.
 */
interface Answer {
  heading?: string;
  /** @format textarea */
  paragraph?: string;
}

export const ShelfFaq = (
  { title, description, questions, frequentlyQuestionsText }: ShelfFaqProps & {
    frequentlyQuestionsText: string;
  },
) => {
  return title
    ? (
      <section class="flex justify-center w-full max-container border-y border-gray-200">
        <div class="collapse w-full max-w-4xl">
          <input
            type="checkbox"
            class="peer z-10"
            name="shelf-faq"
            aria-label="shelf-faq"
          />
          {/* FAQTITLE */}
          <div class="collapse-title collapse-icon collapse-plus content-center justify-self-center w-full max-w-96 h-12 font-body-xs-bold text-center text-gray-500">
            {title}
          </div>
          <div class="collapse-content flex flex-col">
            <h2 class="font-body-xs-regular text-center text-gray-500 pb-4">
              {description}
            </h2>
            {questions &&
              (
                <>
                  <h5 class="flex items-center justify-center w-full h-11 font-body-xs-bold text-center text-gray-500">
                    {frequentlyQuestionsText}
                  </h5>
                  <div class="flex flex-col w-full bg-gray-100 rounded-md divide-y divide-white mb-4">
                    {questions?.map(({ question, answer }) => (
                      <div class="collapse w-full pl-6">
                        <input
                          type="checkbox"
                          class="peer z-10"
                          name="shelf-question"
                          aria-label="shelf-question"
                        />
                        <div class="collapse-title collapse-icon collapse-plus content-center h-11 font-body-xs-regular text-gray-500 italic">
                          {question}
                          {/* Por que usar guia no cachorro? */}
                        </div>
                        <div class="collapse-content w-full pr-6">
                          {answer.map(({ heading, paragraph }) => (
                            <>
                              {heading && (
                                <h4
                                  class="font-body-xs-bold text-gray-500"
                                  dangerouslySetInnerHTML={{ __html: heading }}
                                >
                                </h4>
                              )}
                              {paragraph && (
                                <p
                                  class="font-body-xs-regular text-gray-500 mt-2 mb-5"
                                  dangerouslySetInnerHTML={{
                                    __html: paragraph,
                                  }}
                                >
                                </p>
                              )}
                            </>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
          </div>
        </div>
      </section>
    )
    : <></>;
};
