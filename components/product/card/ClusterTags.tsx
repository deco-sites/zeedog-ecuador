import { clx } from "site/sdk/clx.ts";

export interface ClusterTagsTextsProps {
  newProduct: string;
  bestSeller: string;
}

export interface ClusterTagsProps {
  tags: string[];
  texts: ClusterTagsTextsProps;
  class: string;
}

export default function ClusterTags(
  { tags, texts, class: _class = "" }: ClusterTagsProps,
) {
  const newProduct = tags.find((collection) => collection === "new");
  const bestSeller = tags.find((collection) => collection === "best-seller");

  return (
    <>
      {newProduct && (
        <span
          class={clx(
            "px-1.5 text-gray-500 font-body-3xs-bold md:font-body-2xs-bold uppercase bg-gray-100 md:bg-white",
            _class,
          )}
        >
          {texts.newProduct}
        </span>
      )}
      {bestSeller && (
        <span
          class={clx(
            "px-1.5 text-gray-500 font-body-3xs-bold md:font-body-2xs-bold uppercase bg-gray-100 md:bg-white",
            _class,
          )}
        >
          {texts.bestSeller}
        </span>
      )}
    </>
  );
}
