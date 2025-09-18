import { Fragment } from "preact";
import LazyIcon from "$components/ui/LazyIcon.tsx";
import { type AthenaContent } from "$sdk/athena.ts";
import { OrdersContentTextsProps } from "$components/athena/OrdersContent.tsx";
import SizesContent from "$islands/athena/SizesContent.tsx";
import { Faq } from "$loaders/faq.ts";
import { usePartialSection } from "@deco/deco/hooks";
import { WhatsappContentProps } from "$sdk/types/footer.ts";
import { clx } from "site/sdk/clx.ts";
import { BreedSelectTextsProps } from "site/components/BreedSelect.tsx";
import { CategorySizeTextsProps } from "site/components/athena/SizesContent.tsx";
import { AvailableLanguages } from "site/sdk/hooks/useLanguage.ts";
import { WhatsappContent } from "site/components/athena/WhatsappContent.tsx";

export type AthenaContentTextsProps =
  & {
    sizeQuestionText: string;
    orderStatusText: string;
    frequentlyAskedQuestionsText: string;
    helpText: string;
  }
  & OrdersContentTextsProps
  & BreedSelectTextsProps
  & CategorySizeTextsProps;

interface Props {
  department: string;
  isBlackFriday: boolean;
  faq?: Faq[];
  isFaqPage: boolean;
  isMenuOpened?: boolean;
  selectedMenuItem?: "chat" | "whatsapp" | "sizes" | "orders" | "faq";
  whatsappContent?: WhatsappContentProps;
  texts: AthenaContentTextsProps;
  languageCode: AvailableLanguages;
}

export default function AthenaContent(
  {
    department = "zeedog",
    whatsappContent,
    isMenuOpened = false,
    selectedMenuItem,
    isFaqPage,
    texts,
  }: Props,
) {
  const athenaData = [
    {
      id: "whatsapp",
      title: "WhatsApp",
      icon: <LazyIcon name="Whatsapp" size={24} />,
      content: whatsappContent
        ? (
          <WhatsappContent
            {...whatsappContent}
            assistanceMessage={whatsappContent.assistanceMessage ?? ""}
          />
        )
        : null,
    },
    {
      id: "sizes",
      title: texts.sizeQuestionText,
      icon: <LazyIcon name="Sizes" size={24} />,
      content: <SizesContent {...texts} />,
      showOnly: "zeedog",
    },
    // {
    //   id: "orders",
    //   title: texts.orderStatusText,
    //   icon: <Icon name="Truck" size={24} />,
    //   content: <OrdersContent {...texts} languageCode={languageCode} />,
    // },
    // {
    //   id: "faq",
    //   title: texts.frequentlyAskedQuestionsText,
    //   icon: <LazyIcon name="Faq" size={24} />,
    //   content: <FaqContent isBlackFriday={isBlackFriday} faq={faq} />,
    // },
  ];

  const content = athenaData.find((item) => item.id === selectedMenuItem);

  return (
    <>
      <button
        aria-label="Close"
        class={`fixed left-0 right-0 bottom-0 w-screen h-screen -z-10 backdrop-blur-[3px] lg:backdrop-blur-0 ${
          isMenuOpened ? "top-0" : "-top-[150vh]"
        }`}
        {...usePartialSection({
          props: { isMenuOpened: false },
        })}
      />

      <div class="group/athena relative flex items-center justify-center w-11 h-16 border border-gray-700 bg-white/30 backdrop-blur-xxl lg:hover:bg-black rounded-tl-md rounded-bl-md cursor-pointer children:cursor-pointer transition-all z-10">
        <button
          id="athena-btn"
          type="button"
          {...usePartialSection({
            props: {
              isMenuOpened: !isMenuOpened,
            },
          })}
        />
        <label
          for="athena-btn"
          class={clx(
            "h-full w-full flex items-center justify-center rounded-tl-md",
            isMenuOpened && "bg-black",
          )}
        >
          {isMenuOpened
            ? (
              <span
                id="athena-close"
                class="absolute"
              >
                <LazyIcon name="Close" size={20} class="text-white" />
              </span>
            )
            : (
              <span
                id="athena-label"
                class="flex font-body-2xs-regular transform -rotate-90 md:group-hover/athena:text-white"
              >
                {texts.helpText}
              </span>
            )}
        </label>

        <div
          id="athena-menu"
          class={clx(
            "absolute transition-['right'] -right-[1000%] duration-200 bottom-20",
            isMenuOpened && "right-0",
            content?.id && "show-content-menu-athena",
          )}
        >
          {content && (
            <div
              id="athena-content"
              class={`fixed -bottom-10 ${
                content?.id === "vet" ? "h-[400px]" : "h-[450px]"
              } w-[300px] bg-white border border-gray-200 rounded-md flex flex-col items-center justify-center cursor-default tracking-normal ${
                content?.id ? "right-14" : "-right-[1000%]"
              }`}
            >
              <div class="w-full h-16 pl-4 flex items-center justify-between self-start relative">
                <div class="flex items-center">
                  {content.icon}
                  <p class="ml-2 font-body-xs-bold">{content.title}</p>
                </div>
                <button
                  aria-label="Close"
                  type="button"
                  class="absolute top-0 right-0 p-2"
                  {...usePartialSection({
                    props: { isMenuOpened: false, selectedMenuItem: undefined },
                  })}
                >
                  <LazyIcon name="Close" size={20} class="text-black" />
                </button>
              </div>
              <div class="h-[390px] p-3 pt-2 flex flex-col items-center overflow-y-auto w-full">
                {content.content}
              </div>
            </div>
          )}

          {athenaData.filter((item) => {
            if (isFaqPage) {
              return true;
            }

            if (item.showOnly && item.showOnly !== department) return false;

            return true;
          }).map((item) => {
            // if (item.id === "chat") {
            //   return (
            //     <AthenaChatContent
            //       item={{
            //         id: item.id,
            //         title: item.title,
            //       }}
            //       contentId={content?.id}
            //     />
            //   );
            // }

            const isChecked = item.id === content?.id;

            return (
              <Fragment key={item.id}>
                <button
                  name="athena-menu"
                  id={item.id}
                  checked={isChecked}
                  class={clx(
                    "hidden",
                    isChecked && "menu-item-checked-menu-athena",
                  )}
                  type="button"
                  {...usePartialSection({
                    props: { isMenuOpened, selectedMenuItem: item.id },
                  })}
                />
                <label
                  for={item.id}
                  class="group-menu h-10 flex items-center justify-between cursor-pointer children:cursor-pointer relative bg-white xl:hover:bg-gray-100 label-border-menu-athena first-of-type:rounded-tl-md last-of-type:rounded-bl-md"
                >
                  <div
                    id="athena-menu-item-title"
                    class="h-10 w-48 flex items-center border border-gray-200 border-r-0"
                  >
                    <span class="whitespace-nowrap font-body-2xs-regular text-black ml-2">
                      {item.title}
                    </span>
                  </div>
                  <div
                    id="athena-menu-item-icon"
                    class="h-full w-11 flex justify-center items-center border border-gray-200"
                  >
                    {item.icon}
                  </div>
                </label>
              </Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
}
