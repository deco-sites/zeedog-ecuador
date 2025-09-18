import type { JSX } from "preact";
import { forwardRef } from "preact/compat";

export type Props =
  & Omit<JSX.IntrinsicElements["button"], "loading">
  & {
    loading?: boolean;
    loadingColor?: string;
  };

const Button = forwardRef<HTMLButtonElement, Props>(({
  type = "button",
  class: _class = "",
  loading,
  loadingColor = "gray-20",
  disabled,
  children,
  ...props
}, ref) => (
  <button
    {...props}
    class={`no-animation ${_class}`}
    disabled={disabled || loading}
    type={type}
    ref={ref}
  >
    {loading
      ? (
        <span
          class={`loading loading-spinner ${
            loadingColor ? "text-" + loadingColor : ""
          }`}
        />
      )
      : children}
  </button>
));

export default Button;
