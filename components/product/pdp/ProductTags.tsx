import { clx } from "site/sdk/clx.ts";
import { ClusterTagsTextsProps } from "site/components/product/card/ClusterTags.tsx";

export interface ProductTagsProps {
  tags: string[];
  discount: number;
  class?: string;
  texts: ClusterTagsTextsProps;
}

export const ProductTags = (
  { tags, discount, texts, class: _class = "" }: ProductTagsProps,
) => {
  const newProduct = tags.find((collection) => collection === "new") &&
    texts.newProduct;
  const bestSeller = tags.find((collection) => collection === "best-seller") &&
    texts.bestSeller;

  const clusterbg = "bg-gray-200";

  const discountbg = "bg-red-300";

  const tagBaseStyle =
    "flex items-center justify-center h-6 px-1.5 md:px-2 font-body-3xs-bold md:font-body-2xs-bold";

  // ADICIONAR CLASSES ESPECÍFICAS BASEADAS NA POSIÇÃO DA TAG NA PÁGINA, ex.: rounded-t para primeira tag da pdp e rounded para tag na área do preço
  return (
    <>
      {(newProduct || bestSeller) && (
        <span
          class={clx(
            _class,
            tagBaseStyle,
            "text-gray-500 uppercase",
            clusterbg,
          )}
        >
          {newProduct || bestSeller}
        </span>
      )}
      {discount > 0 && (
        <span
          class={clx(_class, tagBaseStyle, "text-white", discountbg)}
        >
          {discount}% OFF
        </span>
      )}
    </>
  );
};
