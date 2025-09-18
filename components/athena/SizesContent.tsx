import { useUI } from "$sdk/global/useUI.ts";
import Image from "apps/website/components/Image.tsx";
import BreedSelect from "$islands/BreedSelect.tsx";
import LazyIcon from "$components/ui/LazyIcon.tsx";
import { RELATIVECATEGORYNAMES } from "$sdk/global/constants.ts";
import { BreedSelectTextsProps } from "site/components/BreedSelect.tsx";

export interface CategorySizeTextsProps {
  /** @title Leash Text */
  "leash-text": string;
  /** @title Leash Ruff Text */
  "leash_ruff-text": string;
  /** @title Collar Text */
  "collar-text": string;
  /** @title Fly Harness Text */
  "fly_harness-text": string;
  /** @title Meshplus Text */
  "meshplus-text": string;
  /** @title Air Mesh Text */
  "air_mesh-text": string;
  /** @title Stepin Text */
  "stepin-text": string;
  /** @title Soft Walk Text */
  "soft_walk-text": string;
  /** @title T_shirt Text */
  "t_shirt-text": string;
  /** @title Sweater Text */
  "sweater-text": string;
}

interface Props {
  name: string;
  enName: string;
  url: string;
  size: string;
}

const CategorySize = ({ name, enName, url, size }: Props) => {
  return (
    <div class="bg-gray-100 h-[70px] rounded-md">
      <a
        href={url}
        aria-label={name}
        class="flex flex-col items-center justify-center h-full text-gray-700 px-4"
      >
        <span
          class="font-body-xs-bold uppercase"
          data-category-size={enName}
        >
          {size}
        </span>
        <span class="font-body-3xs-regular text-center mt-1.5">
          {name}
        </span>
      </a>
    </div>
  );
};

export default function SizesContent(
  texts: BreedSelectTextsProps & CategorySizeTextsProps,
) {
  const { breedState } = useUI();

  return (
    <>
      <div class="grayscale">
        <Image
          width={120}
          height={60}
          src={breedState.value.image
            ? `${breedState.value.image}`
            : "https://d17lu9slax0fqq.cloudfront.net/athena/images/default_breed.png"}
        />
      </div>
      <BreedSelect style="my-4" texts={texts} />
      {!breedState.value.fullName && (
        <p class="font-body-xs-regular text-gray-600">
          {texts.sizeContentSuggestionText}
        </p>
      )}

      {breedState.value.fullName &&
        breedState.value.fullName !== "srd" &&
        breedState.value.fullName !== "vira-lata" &&
        (
          <div class="grid grid-cols-2 gap-1 w-full">
            {RELATIVECATEGORYNAMES.map((category) => {
              const { enName, url } = category;

              let size = "-";
              if (breedState.value[enName]) {
                size = typeof breedState.value[enName] === "string"
                  ? `${breedState.value[enName]}`
                  : `${breedState.value[enName][1]}`;
              }

              const key = `${enName}-text`;

              return (
                <CategorySize
                  name={texts[key as keyof typeof texts]}
                  enName={enName}
                  url={url}
                  size={size}
                />
              );
            })}
          </div>
        )}

      {breedState.value.info && (
        <p class="font-body-xs-regular text-gray-600">
          {breedState.value.info}
        </p>
      )}
      <div class="bg-gray-100 rounded-md flex gap-2 items-start p-4 mt-6">
        <div class="flex items-center justify-center">
          <LazyIcon name="Warning" size={20} class="text-gray-600" />
        </div>
        <div class="text-gray-600">
          <div
            class="font-body-xs-regular"
            dangerouslySetInnerHTML={{ __html: texts.recommendedMeasuresText }}
          />
        </div>
      </div>
    </>
  );
}
