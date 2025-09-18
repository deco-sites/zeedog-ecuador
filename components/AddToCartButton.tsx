import { ComponentChildren } from "preact";
import { JSX } from "preact/jsx-runtime";
import { clx } from "site/sdk/clx.ts";

export interface AddToCartButtonProps
  extends Omit<JSX.HTMLAttributes<HTMLButtonElement>, "class"> {
  children?: ComponentChildren;
  class?: string;
  onAddProduct: () => void;
  addToCartText: string;
}

export default function AddToCartButton(
  {
    class: _class = "",
    children,
    onAddProduct,
    addToCartText,
    ...props
  }: AddToCartButtonProps,
) {
  return (
    <button
      class={clx(_class)}
      onClick={onAddProduct}
      {...props}
      aria-label={addToCartText}
    >
      {children}
    </button>
  );
}
