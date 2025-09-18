import { handleOpenAthena } from "$sdk/hooks/useAthena.ts";
import { RichText } from "apps/admin/widgets.ts";
import { clx } from "site/sdk/clx.ts";

interface TalkToUsProps {
  talkToUsText: RichText;
}

export const TalkToUs = ({ talkToUsText }: TalkToUsProps) => {
  const communicationContent = [
    {
      title: "WhatsApp",
      subTitle: "Entregas, prazos, status do pedido, trocas.",
      icon: "Whatsapp",
      onClick: () => {
        handleOpenAthena("whatsapp");
      },
    },
  ];

  return (
    <>
      <div
        class="font-title-xl-bold lg:font-title-2xl-bold mt-16 mb-10 text-center"
        dangerouslySetInnerHTML={{ __html: talkToUsText }}
      />

      <ul class="w-full p-4 xl:p-16 lg:grid grid-cols-2 grid-rows-2 gap-9">
        {communicationContent.map((item, index) => {
          return (
            <li
              class={clx(
                "group cursor-pointer",
                index === 2 &&
                  "col-span-1 row-start-2 col-start-1 col-end-3 justify-self-center lg:w-[700px]",
              )}
              onClick={item.onClick}
              key={item.title}
            >
            </li>
          );
        })}
      </ul>
    </>
  );
};
