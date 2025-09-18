import { ComponentProps } from "preact";

import Button from "$components/ui/Button.tsx";
import { clx } from "site/sdk/clx.ts";

interface InputProps extends ComponentProps<"input"> {
  id: string;
  name: string;
  type: string;
  initialValue?: string;
  placeholder: string;
  inputClass?: string;
  buttonClass?: string;
  buttonType?: string;
  buttonText: string;
  buttonLoading: boolean;
  buttonLoadingColor?: string;
  buttonDisabled?: boolean;
  errorStyle?: string;
  styles?: string;
}

export default function InputWithButton({
  id,
  name,
  type,
  initialValue = "",
  placeholder,
  inputClass = "",
  buttonType = "submit",
  buttonClass = "",
  buttonText,
  buttonLoading,
  buttonLoadingColor,
  buttonDisabled,
  errorStyle,
  styles,
  ...props
}: InputProps) {
  return (
    <div
      class={clx(
        "relative flex items-center justify-center w-full py-1 rounded-full border has-[input:focus]:border-black bg-white overflow-hidden",
        errorStyle || "border-gray-200",
        styles && styles,
      )}
    >
      <input
        id={id}
        name={name}
        type={type}
        value={initialValue}
        placeholder={placeholder}
        class={clx(
          "peer absolute w-full h-full pl-5 focus-visible:outline-none focus:outline-none pt-4 font-body-2xs-regular placeholder-transparent",
          inputClass,
        )}
        {...props}
      />
      <label
        htmlFor={id}
        class="absolute left-5 top-4 font-body-xs-regular text-gray-500 peer-focus:top-1.5 peer-focus:font-body-3xs-regular transition-all peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:font-body-3xs-regular"
      >
        {placeholder}
      </label>
      <Button
        width="fixed"
        type={buttonType}
        htmlFor="coupon"
        class={clx(
          "shrink-0 w-32 h-11 ml-auto mr-1 button-secondary z-[1]",
          buttonClass,
        )}
        loading={buttonLoading}
        disabled={buttonDisabled}
      >
        {buttonText}
      </Button>
    </div>
  );
}
