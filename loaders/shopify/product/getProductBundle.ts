import {
  CountryCode,
  LanguageCode,
} from "apps/shopify/utils/storefront/storefront.graphql.gen.ts";
import { AppContext } from "apps/shopify/mod.ts";
import { Product } from "apps/commerce/types.ts";
import {
  ProductFragment as ProductShopify,
} from "apps/shopify/utils/storefront/storefront.graphql.gen.ts";
import { toProduct } from "apps/shopify/utils/transform.ts";

export interface Props {
  /** @title Metaobject ID */
  metaobjectId: string | null;
  languageCode?: LanguageCode;
  countryCode?: CountryCode;
}

interface LoaderResponse {
  product_bundle_one: Product[];
  product_bundle_two: Product[];
}

/** Parse seguro para arrays de GIDs vindos do metaobject */
const safeParse = (value: string | null | undefined): string[] => {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const loader = async (
  { metaobjectId, languageCode = "ES", countryCode = "ES" }: Props,
  req: Request,
  ctx: AppContext,
): Promise<LoaderResponse> => {
  if (!metaobjectId) {
    return { product_bundle_one: [], product_bundle_two: [] };
  }

  const { storefront } = await ctx.invoke.shopify.loaders.config();

  /** 1. Buscar metaobject */
  const metaobjectData = await storefront.query<{
    metaobject: { fields: { key: string; value: string }[] } | null;
  }, { id: string; country: CountryCode; language: LanguageCode }>({
    query: `query GetMetaobject(
      $id: ID!
      $country: CountryCode
      $language: LanguageCode
    ) @inContext(country: $country, language: $language) {
      metaobject(id: $id) {
        fields {
          key
          value
        }
      }
    }`,
    variables: {
      id: metaobjectId,
      country: countryCode,
      language: languageCode,
    },
  });

  if (!metaobjectData?.metaobject) {
    return { product_bundle_one: [], product_bundle_two: [] };
  }

  /** 2. Extrair bundles */
  const fields = metaobjectData.metaobject.fields;
  const bundleOneIds = safeParse(fields.find((f) => f.key === "one")?.value);
  const bundleTwoIds = safeParse(
    fields.find((f) => f.key === "second")?.value,
  );

  const allIds = [...bundleOneIds, ...bundleTwoIds];
  if (allIds.length === 0) {
    return { product_bundle_one: [], product_bundle_two: [] };
  }

  /** 3. Buscar produtos (com nodes) */
  const productsData = await storefront.query<{
    nodes: (ProductShopify | null)[];
  }, { ids: string[]; country: CountryCode; language: LanguageCode }>({
    query: `query GetBundleProducts(
      $ids: [ID!]!
      $country: CountryCode
      $language: LanguageCode
    ) @inContext(country: $country, language: $language) {
      nodes(ids: $ids) {
        ... on Product {
          availableForSale
          createdAt
          description
          descriptionHtml
          featuredImage {
            altText
            url
          }
          handle
          id
          images(first: 10) {
            nodes {
              altText
              url
            }
          }
          isGiftCard
          media(first: 10) {
            nodes {
              alt
              previewImage {
                altText
                url
              }
              mediaContentType
              ... on Video {
                alt
                sources {
                  url
                }
              }
            }
          }
          onlineStoreUrl
          options {
            name
            values
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          productType
          publishedAt
          requiresSellingPlan
          seo {
            title
            description
          }
          tags
          title
          totalInventory
          updatedAt
          variants(first: 250) {
            nodes {
              availableForSale
              barcode
              compareAtPrice {
                amount
                currencyCode
              }
              currentlyNotInStock
              id
              image {
                altText
                url
              }
              price {
                amount
                currencyCode
              }
              quantityAvailable
              requiresShipping
              selectedOptions {
                name
                value
              }
              sku
              title
              unitPrice {
                amount
                currencyCode
              }
              unitPriceMeasurement {
                measuredType
                quantityValue
                referenceUnit
                quantityUnit
              }
              weight
              weightUnit
            }
          }
          vendor
          collections(first: 250) {
            nodes {
              description
              descriptionHtml
              handle
              id
              image {
                altText
                url
              }
              title
              updatedAt
            }
          }
        }
      }
    }`,
    variables: {
      ids: allIds,
      country: countryCode,
      language: languageCode,
    },
  });

  const nodes = productsData?.nodes?.filter(Boolean) as ProductShopify[];

  /** 4. Mapear produtos por ID */
  const productMap = new Map<string, Product>(
    nodes.map((product) => {
      const skuId = product.variants?.nodes[0]?.id;
      let sku = product.variants?.nodes.find((node) => node.id === skuId);

      if (!sku) {
        sku = product.variants?.nodes[0];
      }

      return [
        product.id,
        toProduct(product, sku, new URL(req.url)),
      ];
    }),
  );

  /** 5. Recriar arrays na ordem original */
  const mapIds = (ids: string[]) =>
    ids.map((id) => productMap.get(id)).filter(Boolean) as Product[];

  return {
    product_bundle_one: mapIds(bundleOneIds),
    product_bundle_two: mapIds(bundleTwoIds),
  };
};

export default loader;
