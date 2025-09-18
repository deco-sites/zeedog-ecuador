import {
  CountryCode,
  LanguageCode,
} from "apps/shopify/utils/storefront/storefront.graphql.gen.ts";
import { AppContext } from "apps/shopify/mod.ts";

export interface Props {
  /** @title Product ID */
  productId: string;
  skuValue?: string;
  languageCode?: LanguageCode;
  countryCode?: CountryCode;
}

const getPath = (handle: string, sku?: string) =>
  sku ? `/products/${handle}-${sku}` : `/products/${handle}`;

const loader = async (
  props: Props,
  req: Request,
  ctx: AppContext,
): Promise<{ url?: string }> => {
  const {
    productId,
    skuValue,
    languageCode = "ES", // valor padrão
    countryCode = "ES", // valor padrão
  } = props;

  const url = new URL(req.url);

  const { storefront } = await ctx.invoke.shopify.loaders.config();

  const data = await storefront.query<{
    product: { handle: string };
  }, {
    id: string;
    country: CountryCode;
    language: LanguageCode;
  }>({
    query:
      `query GetProductByID($id: ID!, $country: CountryCode, $language: LanguageCode) @inContext(country: $country, language: $language) { product(id: $id) { handle } }`,
    variables: {
      id: productId,
      country: countryCode,
      language: languageCode,
    },
  });

  return {
    url: `${url.origin}${getPath(data.product.handle, skuValue)}`,
  };
};

export default loader;
