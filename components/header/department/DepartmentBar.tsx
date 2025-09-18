import { DepartmentNav } from "$components/header/department/DepartmentNav.tsx";
import { AvailableLanguages } from "site/sdk/hooks/useLanguage.ts";

export interface DepartmentBarProps {
  language: AvailableLanguages;
}

export function DepartmentBar({ language }: DepartmentBarProps) {
  return (
    <div class="flex justify-center w-full bg-gray-100 order-0 border-b border-gray-200 py-1.5">
      <div class="flex w-full h-10 max-container-auto">
        <DepartmentNav language={language} />
      </div>
    </div>
  );
}
