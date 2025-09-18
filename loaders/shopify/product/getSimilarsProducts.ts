import {
  CountryCode,
  LanguageCode,
} from "apps/shopify/utils/storefront/storefront.graphql.gen.ts";
import { AppContext } from "apps/shopify/mod.ts";

export interface Props {
  similarProductsIds: string[] | string;
  languageCode?: LanguageCode;
  countryCode?: CountryCode;
}

export interface SimilarProduct {
  title: string;
  handle: string;
  featuredImage: {
    url: string;
    altText: string;
  };
  availableForSale: boolean;
  current: boolean;
  max_sale_discount?: number;
}

interface ProductNode {
  title: string;
  handle: string;
  availableForSale: boolean;
  featuredImage: {
    url: string;
    altText: string | null;
  } | null;
  variants: {
    nodes: Array<{
      priceV2: {
        amount: string;
      };
      compareAtPriceV2?: {
        amount: string;
      } | null;
    }>;
  };
}

const loader = async (
  props: Props,
  req: Request,
  ctx: AppContext,
): Promise<SimilarProduct[]> => {
  let { similarProductsIds, languageCode = "ES", countryCode = "ES" } = props;

  if (typeof similarProductsIds === "string") {
    try {
      similarProductsIds = JSON.parse(similarProductsIds);
    } catch {
      similarProductsIds = [];
    }
  }

  const pathname = new URL(req.url).pathname;
  const handleByPathname = pathname.split("/").filter(Boolean).pop();

  const { storefront } = await ctx.invoke.shopify.loaders.config();

  const data = await storefront.query<{
    nodes: ProductNode[];
    errors?: unknown[];
  }, { ids: string | string[]; country: CountryCode; language: LanguageCode }>({
    query: `query GetSimilarProducts(
      $ids: [ID!]!
      $country: CountryCode
      $language: LanguageCode
    ) @inContext(country: $country, language: $language) {
      nodes(ids: $ids) {
        ... on Product {
          title
          handle
          availableForSale
          featuredImage {
            url
            altText
          }
          variants(first: 100) {
            nodes {
              priceV2 {
                amount
              }
              compareAtPriceV2 {
                amount
              }
            }
          }
        }
      }
    }
  `,
    variables: {
      ids: Array.isArray(similarProductsIds)
        ? similarProductsIds
        : [similarProductsIds],
      country: countryCode,
      language: languageCode,
    },
  });

  if (!data.nodes) {
    console.error("GraphQL errors: ", data);
  }

  const nodes: ProductNode[] = data?.nodes ?? [];

  if (!nodes) return [];

  const products: SimilarProduct[] = nodes
    .filter((p) => p && p.handle && p.title)
    .map((p) => {
      let maxDiscount = 0;

      for (const v of p.variants.nodes) {
        const price = parseFloat(v.priceV2.amount);
        const compareAtPrice = parseFloat(v.compareAtPriceV2?.amount ?? "0");
        if (compareAtPrice > price) {
          const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
          if (discount > maxDiscount) maxDiscount = discount;
        }
      }

      return {
        title: p.title,
        handle: p.handle,
        availableForSale: p.availableForSale,
        featuredImage: {
          url: p.featuredImage?.url ?? "",
          altText: p.featuredImage?.altText ?? `${p.title} Image`,
        },
        current: handleByPathname === p.handle,
        max_sale_discount: Math.round(maxDiscount),
      };
    });

  return products;
};

export default loader;
