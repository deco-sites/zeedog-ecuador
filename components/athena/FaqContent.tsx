import { Faq } from "$loaders/faq.ts";

interface Props {
  isBlackFriday: boolean;
  faq: Faq[] | undefined;
}

export function FaqContent({ isBlackFriday = false, faq }: Props) {
  const labelStyle =
    "flex justify-between items-center min-h-[45px] w-full p-3.5 cursor-pointer relative relative bg-gray-100";

  return (
    <>
      {faq?.filter((section) => {
        if (section.blackFriday) return isBlackFriday;
        return true;
      }).map((section, sectionIndex) => (
        <div class="[&:not(:first-of-type)]:mt-2 w-full">
          <input
            class={`hidden peer/faq-section`}
            type="checkbox"
            id={`athena-faq-section-${sectionIndex}`}
          />
          <label
            data-spec={section.blackFriday}
            for={`athena-faq-section-${sectionIndex}`}
            class={`${labelStyle} font-body-2xs-bold rounded-md after:content-[''] after:absolute after:right-4 after:rotate-45 after:transition-all after:duration-300 after:p-[3px] after:border-solid after:border-r-2 after:border-b-2 after:pointer-events-none peer-checked/faq-section:rounded-t-md peer-checked/faq-section:after:rotate-[-135deg] ${
              section.blackFriday
                ? "!bg-black text-white after:border-white"
                : "text-black hover:bg-gray-200 after:border-black"
            }`}
          >
            <span class="w-[calc(100%-1rem)]">{section.mainTitle}</span>
          </label>

          {section.accordion.map((item, itemIndex) => {
            return (
              <div
                class="mt-0.5 hidden peer-checked/faq-section:block peer-checked/faq-section:last-of-type:rounded-b-md"
                id="faq-question"
              >
                <input
                  class={`hidden peer/faq-question`}
                  type="checkbox"
                  id={`athena-faq-section-${sectionIndex}-question-${itemIndex}`}
                />
                <label
                  class={`${labelStyle} font-body-2xs-regular text-gray-500 hover:bg-gray-200 after:content-['+'] after:absolute after:right-4 after:transition-all after:duration-300 after:text-[18px] after:pointer-events-none peer-checked/faq-question:rounded-t-md peer-checked/faq-question:after:content-['-'] peer-checked/faq-question:after:rotate-180`}
                  for={`athena-faq-section-${sectionIndex}-question-${itemIndex}`}
                >
                  <span class="w-[calc(100%-1.25rem)]">{item.title}</span>
                </label>
                <div
                  id="faq-answer"
                  class={`${labelStyle} rounded-b-md hidden peer-checked/faq-question:block`}
                >
                  {item.hasHtmlTag
                    ? (
                      <p
                        class="font-body-2xs-regular text-gray-600 mb-2 faq-content"
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      >
                      </p>
                    )
                    : (
                      <p class="font-body-2xs-regular text-gray-600 mb-2">
                        {item.content}
                      </p>
                    )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}
