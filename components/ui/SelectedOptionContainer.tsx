import LazyIcon from "$components/ui/LazyIcon.tsx";
import { clx } from "site/sdk/clx.ts";

export interface SelectedOptionContainerProps {
  value: string;
  background?: "gray-100" | "white";
  backgroundMobile?: "gray-100" | "white";
  onRemove: () => void;
}

export const SelectedOptionContainer = (
  { value, onRemove, background = "gray-100", backgroundMobile = "white" }:
    SelectedOptionContainerProps,
) => {
  return (
    <div
      class={clx(
        "flex items-center justify-between gap-x-3 h-8 pl-3 pr-1 rounded-full hover:bg-gray-300 transition-all",
        backgroundMobile && `bg-${backgroundMobile}`,
        background && `lg:bg-${background}`,
      )}
    >
      <span class="font-body-xs-bold text-gray-700">{value}</span>
      <button
        class="group flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 hover:bg-black transition-all"
        aria-label="Remove coupon"
        onClick={onRemove}
      >
        <LazyIcon
          name="Close"
          class="w-4 h-4 group-hover:text-white transition-all"
        />
      </button>
    </div>
  );
};
