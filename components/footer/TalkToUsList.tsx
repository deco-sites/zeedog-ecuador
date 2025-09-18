import { InteractiveIconWithTooltip } from "site/components/footer/IconWithTooltip.tsx";
import { TalkToUsProps } from "site/sdk/types/footer.ts";

export const TalkToUsList = (
  { email, openingHours }: Omit<TalkToUsProps, "title">,
) => {
  return (
    <ul class="flex flex-wrap gap-3 max-lg:justify-center p-4 lg:pt-0 lg:px-0">
      <li>
        <InteractiveIconWithTooltip
          href="#"
          ariaLabel="Atendimento via Email"
          iconName="Email"
          iconWidth={24}
          iconHeight={24}
          tooltipClass="font-body-2xs-regular bg-white dropdown-content-tooltip-arrow-white px-3.5 py-2"
          class="pointer-events-none"
        >
          <div class="flex flex-col text-center">
            <p class="border-b border-black pt-1 pb-2 font-bold text-black">
              {email}
            </p>
            <p class="py-2">{openingHours.label}</p>
            <div
              dangerouslySetInnerHTML={{ __html: openingHours.result }}
              class="font-bold"
            />
          </div>
        </InteractiveIconWithTooltip>
      </li>
    </ul>
  );
};
