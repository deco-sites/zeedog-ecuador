import {
  CountryCode,
  LanguageCode,
} from "apps/shopify/utils/storefront/storefront.graphql.gen.ts";
import { AppContext } from "apps/shopify/mod.ts";

export interface Props {
  /** @title Product ID */
  collectionId: string;
  languageCode?: LanguageCode;
  countryCode?: CountryCode;
}

const loader = async (
  props: Props,
  _req: Request,
  ctx: AppContext,
): Promise<{ url?: string }> => {
  const {
    collectionId,
    languageCode = "ES", // valor padrão
    countryCode = "ES", // valor padrão
  } = props;

  const { storefront } = await ctx.invoke.shopify.loaders.config();

  const data = await storefront.query<{
    collection: { handle: string };
  }, {
    id: string;
    country: CountryCode;
    language: LanguageCode;
  }>({
    query:
      `query GetCollectionByID($id: ID!, $country: CountryCode, $language: LanguageCode) @inContext(country: $country, language: $language) { collection(id: $id) { handle } }`,
    variables: {
      id: collectionId,
      country: countryCode,
      language: languageCode,
    },
  });

  return {
    url: `/collections/${data.collection.handle}`,
  };
};

export default loader;
