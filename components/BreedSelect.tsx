import { h } from "preact";
import { useUI } from "$sdk/global/useUI.ts";
import { RELATIVECATEGORYNAMES } from "$sdk/global/constants.ts";
import { useEffect, useState } from "preact/hooks";
import { IBreedObject, IBreedsObject } from "$sdk/types/breed.ts";
import { preSelectedSize } from "$sdk/global/signalStore.ts";

import breedsSize from "$static/js/breed-sizes.json" with { type: "json" };
import { RichText } from "apps/admin/widgets.ts";

export interface BreedSelectTextsProps {
  selectPetBreedText: string;
  emptyBreedSelectorText: string;
  questionsAboutSizeText: string;
  sizeContentSuggestionText: string;
  recommendedMeasuresText: RichText;
}

interface Props {
  style?: string;
  onChange?: () => void;
  whereabout?: string;
  breedSizeSuggestion?: string;
  texts: BreedSelectTextsProps;
}

export default function BreedSelect(
  {
    style = "",
    onChange,
    whereabout,
    breedSizeSuggestion,
    texts,
  }: Props,
) {
  const [breeds, setBreeds] = useState<IBreedsObject | null>(null);
  const { breedState } = useUI();

  const sizeSuggestionLower = breedSizeSuggestion?.toLowerCase();

  const selectStyle =
    "border border-solid border-gray-200 rounded-md w-full capitalize h-12 pl-3.5 pr-8 appearance-none font-body-xs-bold";

  useEffect(() => {
    const breedsData = localStorage.getItem("breedsData");
    if (breedsData) {
      setBreeds(JSON.parse(breedsData));
    } else {
      localStorage.setItem("breedsData", JSON.stringify(breedsSize));
      setBreeds(breedsSize);
    }
  }, []);

  const handleSelect = (select: HTMLSelectElement | null) => {
    const option = select?.options[select.selectedIndex];

    if (option?.dataset.breed && breeds) {
      const breedData = breeds[option.dataset.breed];
      breedState.value = breedData;

      if (whereabout) {
        const relativeCategory = RELATIVECATEGORYNAMES.find((
          { enName },
        ) => enName.toLowerCase() === sizeSuggestionLower);

        if (relativeCategory) {
          const suggestedSize = breedState
            .value[
              relativeCategory.enName
            ];

          if (suggestedSize[1] !== "-" && globalThis.document) {
            const sku = document.querySelector(
              `#${whereabout}-skus-list input[value="${
                suggestedSize[1].toLowerCase()
              }"]`,
            ) as HTMLInputElement;
            if (whereabout === "pdp") {
              preSelectedSize.value = suggestedSize[1]
                .toLowerCase();
            }
            if (sku) {
              sku.click();
            }
          } else {
            preSelectedSize.value = undefined;
            const skuPrev = document.querySelector(
              `#${whereabout}-skus-list input:checked`,
            ) as HTMLInputElement;
            if (skuPrev) skuPrev.checked = false;
          }
        }
      }
      onChange?.();
    }
  };

  return (
    <div
      class={`relative flex items-center justify-center after:absolute after:right-3.5 after:-rotate-45 after:p-1 after:-mt-1.5 after:pointer-events-none after:border-gray-500 after:border-l-2 after:border-b-2 ${style} ${
        whereabout === "pdp" || whereabout === "modal"
          ? "w-full"
          : breeds
          ? "w-auto"
          : "w-full"
      }`}
    >
      {breeds
        ? (
          <select
            class={`${selectStyle} ${whereabout}-breed-select`}
            value={breedState.value.en_name}
            onChange={(e) => handleSelect(e.currentTarget)}
            aria-label={texts.selectPetBreedText}
          >
            <option value="" selected disabled>
              {texts.questionsAboutSizeText}
            </option>
            {Object.keys(breeds).map((item) => {
              const breed: IBreedObject = breeds[item];
              return h(
                "option",
                { "data-breed": item } as IBreedObject,
                breed.en_name,
              );
            })}
          </select>
        )
        : (
          <select
            aria-label={texts.emptyBreedSelectorText}
            class={selectStyle}
          />
        )}
    </div>
  );
}
