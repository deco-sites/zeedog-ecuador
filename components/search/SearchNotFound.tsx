import Icon from "$components/ui/Icon.tsx";
import { useScript } from "@deco/deco/hooks";

export interface SearchNotFoundTextsProps {
  searchNotFoundText: string;
  searchNotFoundQueryText: string;
  searchNotFoundSeeAlsoText: string;
  searchNotFoundTypoSuggestionText: string;
  searchNotFoundUrlTypoSuggestionText: string;
}

interface SearchNotFoundProps {
  url?: URL;
  texts?: SearchNotFoundTextsProps;
}

export default function SearchNotFound({ url, texts }: SearchNotFoundProps) {
  const urlParamQuery = url?.searchParams.get("q");

  const handlePageTitleChange = () => {
    document.title = "Zee.Dog | Página no encontrada";
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: useScript(handlePageTitleChange) }}
      />

      <div class="flex flex-col items-center mb-5 mt-10">
        <p class="font-title-sm-bold tracking-widest text-center lg:max-w-none max-w-64">
          {texts?.searchNotFoundText ?? "Spiacenti, nessun risultato trovato"}
          {urlParamQuery ? (texts?.searchNotFoundQueryText ?? "per:") : "."}
        </p>
        {urlParamQuery
          ? (
            <>
              <span class="py-5 font-title-sm-bold text-red-300">
                {urlParamQuery}
              </span>
              <p class="font-body-sm-regular font-normal text-gray-600 pb-3 text-center lg:max-w-[250px] max-w-xs">
                {texts?.searchNotFoundTypoSuggestionText ??
                  "Controlla se ci sono errori di battitura nel termine cercato."}
              </p>
            </>
          )
          : (
            <p class="font-body-sm-regular font-normal text-gray-600 py-3 text-center lg:max-w-[250px] max-w-xs">
              {texts?.searchNotFoundUrlTypoSuggestionText ??
                "Controlla se ci sono errori nel link della pagina."}
            </p>
          )}
        <p class="font-body-sm-regular font-normal text-gray-600 text-center">
          {texts?.searchNotFoundSeeAlsoText ?? "Vedi anche:"}
        </p>
        <div class="flex items-center lg:justify-center my-8 lg:overflow-hidden overflow-auto w-full">
          <a
            href="/"
            class="text-gray-600 no-underline bg-white flex flex-shrink-0 items-center justify-center rounded-xl lg:mx-4 mx-0 w-44 h-24 cursor-pointer"
          >
            <Icon name="ZeeDogVertical" width={50} height={50} />
          </a>
          <a
            href="/tutti-i-prodotti-gatto"
            class="text-gray-600 no-underline bg-white flex flex-shrink-0 items-center justify-center rounded-xl lg:mx-4 mx-4 w-44 h-24 cursor-pointer"
          >
            <Icon name="ZeeCatVertical" width={50} height={50} />
          </a>
        </div>
      </div>
    </>
  );
}
