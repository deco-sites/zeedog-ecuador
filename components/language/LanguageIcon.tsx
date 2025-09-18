import { AvailableLanguages } from "site/sdk/hooks/useLanguage.ts";
import Icon from "$components/ui/Icon.tsx";
import LazyIcon from "site/components/ui/LazyIcon.tsx";

export function LanguageIcon({ language }: { language: AvailableLanguages }) {
  if (language === "en") {
    return <Icon name="World" size={24} class="min-h-6 min-w-6" />;
  }

  return (
    <LazyIcon
      name={`${language}Flag`}
      size={24}
      class="min-h-6 min-w-6 rounded-full"
    />
  );
}
