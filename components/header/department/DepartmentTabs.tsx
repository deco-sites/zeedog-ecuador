import { Department } from "$sdk/types/global.ts";
import Icon from "$components/ui/Icon.tsx";
import { clx } from "site/sdk/clx.ts";

const after =
  "lg:hover:after:h-full after:content-[''] after:absolute after:bottom-0 after:h-0 after:w-full after:bg-black after:transition-all";

export interface DepartmentTabsProps {
  department: Department;
}

export function DepartmentTabs({ department }: DepartmentTabsProps) {
  return (
    <nav class="flex w-full lg:w-auto border-gray-200 lg:border-r bg-gray-100">
      <button
        aria-label="zeedog"
        data-department-name="zeedog"
        className={clx(
          "js-dp-tab-mo",
          after,
          department === "zeedog" && "border-t-2 border-black bg-white",
          "relative flex items-center justify-center flex-auto h-10 lg:w-36 cursor-pointer",
        )}
      >
        <Icon
          name="ZeeDogHorizontal"
          width={63}
          height={16}
          class="relative z-10"
        />
      </button>
    </nav>
  );
}
