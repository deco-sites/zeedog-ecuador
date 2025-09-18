import { ComponentProps } from "preact";
import { clx } from "site/sdk/clx.ts";

interface InputProps extends ComponentProps<"input"> {
  title: string;
  inputClass?: string;
  containerClass: string;
}

export const Input = (
  { title, containerClass, inputClass, ...props }: InputProps,
) => {
  return (
    <div
      class={clx("relative flex items-center justify-center", containerClass)}
    >
      <input
        class={clx(
          "peer w-full border border-gray-200 text-gray-500 pt-5 placeholder-transparent font-body-xs-bold overflow-hidden rounded-md",
          inputClass,
        )}
        {...props}
      />

      <label
        for={props.id}
        class="absolute top-3 left-4 font-body-xs-regular text-gray-500 peer-focus:top-1 peer-focus:font-body-2xs-regular peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:font-body-2xs-regular transition-all pointer-events-none"
      >
        {title}
      </label>
    </div>
  );
};
