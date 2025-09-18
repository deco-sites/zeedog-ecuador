import { clx } from "site/sdk/clx.ts";

const ProductCardSkeleton = ({ class: _class = "" }: { class?: string }) => {
  return (
    <div
      class={`${clx("group relative flex flex-col self-end shrink-0", _class)}`}
    >
      <div
        class={`flex flex-col max-w-lg bg-gray-100 rounded-lg overflow-hidden`}
      >
        <div
          class="relative flex items-center justify-center w-full max-w-lg bg-gray-200"
          style={{ "aspect-ratio": "1/1" }}
        >
        </div>
        <div class="relative flex flex-col justify-between w-full h-[120px] md:h-36 py-3 lg:py-5 z-20">
          <div class="flex flex-col gap-y-1 px-3 md:px-5 leading-[0.875rem]">
            <span class="w-2/3 h-4 bg-gray-200 rounded"></span>
            <span class="w-2/5 h-4 bg-gray-200 rounded"></span>
          </div>
          <div class="flex flex-col gap-y-1 px-3 md:px-5 leading-[0.875rem]">
            <span class="w-1/3 h-4 bg-gray-200 rounded"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
