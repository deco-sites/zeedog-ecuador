import LanguageSelectorButton from "$islands/language/LanguageSelectorButton.tsx";
import { AvailableLanguages } from "site/sdk/hooks/useLanguage.ts";
import { LanguageIcon } from "site/components/language/LanguageIcon.tsx";

interface LanguageSelectorProps {
  selectedLanguage?: AvailableLanguages;
}

export const LANGUAGE_MAP_BY_URL: Record<AvailableLanguages, string> = {
  // "en": "en-US",
  // "it": "it-IT",
  "es": "es-ES",
  // "pt": "pt-PT",
  // "fr": "fr-FR",
  // "de": "de-DE",
};

export const LANGUAGE_LABELS: Record<AvailableLanguages, string> = {
  // "en": "English",
  // "it": "Italia",
  "es": "Espãna",
};

export const SECONDARY_LANGUAGE_LABELS: Record<AvailableLanguages, string> = {
  // "en": "English",
  // "it": "Italiano",
  "es": "Español",
};

export default function LanguageSelector(
  { selectedLanguage = "es" }: LanguageSelectorProps,
) {
  const languages = Object.keys(LANGUAGE_MAP_BY_URL) as AvailableLanguages[];

  return (
    <div class="dropdown dropdown-end rounded-lg items-center h-10 group z-[201] lg:pr-6 3xl:pr-0">
      <div
        tabIndex={0}
        class="flex items-center justify-center h-full px-2 text-sm gap-1.5 text-gray-500 font-normal cursor-pointer"
      >
        <span>{SECONDARY_LANGUAGE_LABELS[selectedLanguage]}</span>
        <LanguageIcon language={selectedLanguage} />
      </div>

      <div
        tabIndex={0}
        class="dropdown-content menu bg-white rounded-lg border border-gray-200 z-1 min-w-full w-[12.5rem] shadow-sm translate-y-1"
      >
        {languages.map((language) => (
          <LanguageSelectorButton
            key={language}
            language={language}
            selectedLanguage={selectedLanguage}
          />
        ))}
      </div>
    </div>
  );
}
