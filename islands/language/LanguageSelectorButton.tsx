import { AvailableLanguages } from "site/sdk/hooks/useLanguage.ts";
import { clx } from "site/sdk/clx.ts";
import { LanguageIcon } from "site/components/language/LanguageIcon.tsx";
import {
  LANGUAGE_LABELS,
  SECONDARY_LANGUAGE_LABELS,
} from "site/components/ui/LanguageSelector.tsx";
import LazyIcon from "site/components/ui/LazyIcon.tsx";

import { useSignal, useSignalEffect } from "@preact/signals";

interface Props {
  language: AvailableLanguages;
  selectedLanguage: AvailableLanguages;
}

function getAlternateLinks(): Record<string, string> {
  const links = document.querySelectorAll('link[rel="alternate"][hreflang]');
  const map: Record<string, string> = {};

  links.forEach((link) => {
    const hreflang = link.getAttribute("hreflang");
    const href = link.getAttribute("href");
    if (hreflang && href) {
      map[hreflang] = href;
    }
  });

  return map;
}

function LanguageSelectorButton({ language, selectedLanguage }: Props) {
  const isSelected = language === selectedLanguage;

  const alternateLinks = useSignal<Record<string, string>>({});

  if (typeof window !== "undefined") {
    useSignalEffect(() => {
      alternateLinks.value = getAlternateLinks();
    });
  }

  return (
    <a
      href={alternateLinks.value[language] ??
        (language === "es" ? "/" : `/${language}`)}
      class={clx(
        "flex flex-row items-center justify-center border-solid border-b border-b-gray-200 last:border-none w-full cursor-pointer duration-150 transition",
        isSelected
          ? "bg-gray-100 text-black"
          : "hover:bg-gray-100 text-gray-500 hover:text-black",
      )}
    >
      <div class="flex items-center justify-between gap-1 w-full py-4 px-3">
        <div class="flex items-center gap-3 font-body-2xs-regular w-full">
          <LanguageIcon language={language} />

          <span>
            {LANGUAGE_LABELS[language]}{" "}
            {language !== "es" && <>({SECONDARY_LANGUAGE_LABELS[language]})</>}
          </span>
        </div>

        {isSelected && (
          <LazyIcon
            name="Checked"
            size={24}
            class="min-h-6 min-w-6 text-blue-400"
          />
        )}
      </div>
    </a>
  );
}

export default LanguageSelectorButton;
