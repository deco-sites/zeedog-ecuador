import { ComponentProps } from "preact";
import { clx } from "site/sdk/clx.ts";

interface TextAreaProps extends ComponentProps<"textarea"> {
  title: string;
  textAreaClass?: string;
  containerClass: string;
}

export const TextArea = (
  { title, containerClass, textAreaClass, ...props }: TextAreaProps,
) => {
  return (
    <div
      class={clx("relative flex items-center justify-center", containerClass)}
    >
      <textarea
        class={clx(
          "peer w-full bg-white border border-gray-200 text-gray-500 pt-5 placeholder-transparent font-body-xs-bold overflow-hidden rounded-md",
          textAreaClass,
        )}
        {...props}
      />

      <label
        for={props.id}
        class="absolute top-3 left-4 font-body-xs-regular text-gray-500 peer-focus:top-1 peer-focus:font-body-2xs-regular peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:font-body-2xs-regular transition-all"
      >
        {title}
      </label>
    </div>
  );
};
