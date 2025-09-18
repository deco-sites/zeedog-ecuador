import { Department } from "$sdk/types/global.ts";
import Icon from "$components/ui/Icon.tsx";
import { AvailableLanguages } from "site/sdk/hooks/useLanguage.ts";

export interface DepartmentIconProps {
  department: Department;
  language: AvailableLanguages;
}

export function DepartmentIcon(
  { department = "zeedog" }: DepartmentIconProps,
) {
  return (
    <>
      {department === "zeedog" && (
        <a
          href="/"
          aria-label="Zee.Dog"
          class="hidden lg:flex items-center justify-center h-full px-2"
        >
          <Icon name="ZeeDogVertical" width={26} height={36} />
        </a>
      )}
    </>
  );
}
