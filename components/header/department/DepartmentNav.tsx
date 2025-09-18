import Icon from "$components/ui/Icon.tsx";
// import LanguageSelector from "site/components/ui/LanguageSelector.tsx";
import { AvailableLanguages } from "site/sdk/hooks/useLanguage.ts";

interface DepartmentNavProps {
  language: AvailableLanguages;
}

export function DepartmentNav({ language }: DepartmentNavProps) {
  return (
    <nav class="flex items-center justify-between w-full px-6">
      <a
        href="/"
        aria-label="Zee.Dog Department"
        class="flex bg-gray-100 group/dp flex-auto max-w-none cursor-pointer pl-2"
      >
        <Icon
          name="ZeeDogHorizontal"
          width={71}
          height={18}
          class="group-hover/dp:text-white relative z-10"
        />
      </a>

      {/* <LanguageSelector selectedLanguage={language} /> */}
    </nav>
  );
}
