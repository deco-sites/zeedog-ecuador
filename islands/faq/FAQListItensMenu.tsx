import { openAccordions } from "$sdk/global/signalStore.ts";
import Icon, { AvailableIcons } from "site/components/ui/Icon.tsx";
import { clx } from "site/sdk/clx.ts";

interface ListProps {
  mainTitle: string;
  index: number;
  isSelected: boolean;
  icon: AvailableIcons;
  createNewUrl: (title: string, index: number) => void;
}

export default function FAQListItens(
  { icon, index, isSelected, mainTitle, createNewUrl }: ListProps,
) {
  return (
    <li
      key={mainTitle}
      id={mainTitle}
      onClick={() => {
        createNewUrl(mainTitle, index), openAccordions.value = [];
      }}
      class={clx(
        "group transition-all duration-200 ease-linear cursor-pointer flex py-6 border-y border-gray-100",
        isSelected ? "bg-gray-100" : "bg-white hover:bg-gray-100",
      )}
    >
      <Icon
        class={clx(
          "ml-11 text-gray-700",
          !isSelected && "group-hover:text-blue-400",
        )}
        width={20}
        height={20}
        name={icon as AvailableIcons}
      />
      <span
        class={clx(
          "text-gray-700 font-body-xs-bold ml-7",
          !isSelected && "group-hover:text-blue-400",
        )}
      >
        {mainTitle}
      </span>
    </li>
  );
}
