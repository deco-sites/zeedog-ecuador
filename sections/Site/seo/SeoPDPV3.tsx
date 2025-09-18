import Seo from "$components/seo/SeoV3.tsx";
import {
  AlternateLanguageLink,
  renderTemplateString,
  SEOSection,
} from "$components/seo/SeoV3.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { addLanguageToUrl } from "$sdk/global/formatUrls.ts";
import { useLanguage } from "site/sdk/hooks/useLanguage.ts";
import { AppContext } from "apps/website/mod.ts";
import { AppContext as ShopifyAppContext } from "apps/shopify/mod.ts";
import { AppContext as SiteAppContext } from "site/apps/site.ts";
import {
  CountryCode,
  LanguageCode,
} from "apps/shopify/utils/storefront/storefront.graphql.gen.ts";
import { LANGUAGE_MAP_BY_URL } from "site/components/ui/LanguageSelector.tsx";
import { AvailableLanguages } from "site/sdk/hooks/useLanguage.ts";

export interface Props {
  /** @title Data Source */
  jsonLD: ProductDetailsPage | null;
  omitVariants?: boolean;
  /** @title Title Override */
  title?: string;
  /** @title Description Override */
  description?: string;
  /**
   * @title Disable indexing
   * @description In testing, you can use this to prevent search engines from indexing your site
   */
  noIndexing?: boolean;
  /**
   * @title Ignore Structured Data
   * @description By default, Structured Data is sent to everyone. Use this to prevent Structured Data from being sent to your customers, it will still be sent to crawlers and bots. Be aware that some integrations may not work if Structured Data is not sent.
   */
  ignoreStructuredData?: boolean;
}

const AVAILABLE_LANGUAGES = Object.keys(
  LANGUAGE_MAP_BY_URL,
) as AvailableLanguages[];

async function fetchProductUrl(
  ctx: AppContext & ShopifyAppContext & SiteAppContext,
  productId: string | undefined,
  lang: AvailableLanguages,
): Promise<string | null> {
  const formattedLanguageMap = LANGUAGE_MAP_BY_URL[lang ?? "en"];
  const [languageCode, countryCode] = formattedLanguageMap.split("-");

  const { url } = await ctx.invoke.site.loaders.shopify.product.getUrlById({
    productId,
    countryCode: countryCode as CountryCode,
    languageCode: languageCode.toUpperCase() as LanguageCode,
  });

  return url ?? null;
}

function buildAlternateLanguages(
  urls: Record<AvailableLanguages, string | null>,
): AlternateLanguageLink[] {
  return AVAILABLE_LANGUAGES
    .map((lang) => {
      const url = urls[lang];
      if (!url) return null;

      return {
        hreflang: lang,
        href: addLanguageToUrl({ url, language: lang }),
      };
    })
    .filter(Boolean) as AlternateLanguageLink[];
}

/** @title Product details */
export async function loader(
  _props: Props,
  req: Request,
  ctx: AppContext & ShopifyAppContext & SiteAppContext,
) {
  const props = _props as Partial<Props>;
  const { titleTemplate = "", descriptionTemplate = "", ...seoSiteProps } =
    ctx.seo ?? {};
  const {
    title: titleProp,
    description: descriptionProp,
    jsonLD,
    omitVariants,
    ignoreStructuredData,
    noIndexing: noIndexingProp,
  } = props;

  const url = new URL(req.url);
  const language = useLanguage(url) as AvailableLanguages;

  const productId = jsonLD?.product?.isVariantOf?.productGroupID;

  const title = renderTemplateString(
    titleTemplate,
    titleProp || jsonLD?.seo?.title || ctx.seo?.title || "",
  );

  const description = renderTemplateString(
    descriptionTemplate,
    descriptionProp || jsonLD?.seo?.description || ctx.seo?.description ||
      "",
  );

  const image = jsonLD?.product?.image?.[0]?.url;

  const productID = jsonLD?.product.productID.split("/").pop();
  const canonicalBase = jsonLD?.seo?.canonical.replace(`-${productID}`, "");
  const canonical = canonicalBase
    ? addLanguageToUrl({ url: canonicalBase, language })
    : undefined;

  const noIndexing = noIndexingProp || !jsonLD || jsonLD.seo?.noIndexing;

  if (omitVariants && jsonLD?.product?.isVariantOf?.hasVariant) {
    jsonLD.product.isVariantOf.hasVariant = [];
  }

  const jsonLDs = (!jsonLD || (ignoreStructuredData && !ctx.isBot))
    ? []
    : [jsonLD];

  const urlsByLang: Record<AvailableLanguages, string | null> = {
    es: null,
  };

  const langFetches = AVAILABLE_LANGUAGES
    .filter((lang) => lang !== language)
    .map(async (lang) => {
      urlsByLang["es"] = await fetchProductUrl(ctx, productId, lang);
    });

  await Promise.all(langFetches);

  // Usa a canonical "base" (sem linguagem) para o idioma atual
  urlsByLang[language] = canonicalBase ?? null;

  const alternateLanguages = buildAlternateLanguages(urlsByLang);

  return {
    ...seoSiteProps,
    title,
    description,
    image,
    canonical,
    noIndexing,
    jsonLDs: jsonLDs.map((ld) => ({
      ...ld,
      product: {
        ...ld.product,
        name: ld.product.isVariantOf?.name || title,
        url: canonicalBase,
        isVariantOf: {
          ...ld.product.isVariantOf,
          productGroupID: productId,
          url: addLanguageToUrl({
            url: ld.product.isVariantOf?.url || "",
            language,
          }),
          hasVariant: ld.product.isVariantOf?.hasVariant.map((variant) => ({
            ...variant,
            isVariantOf: {
              // @ts-ignore it exists in the type
              ...variant.isVariantOf,
              url: addLanguageToUrl({
                // @ts-ignore it exists in the type
                url: variant.isVariantOf?.url || "",
                language,
              }),
            },
            name: ld.product.isVariantOf?.name || title,
            url: addLanguageToUrl({
              url: variant.url,
              language,
            }),
          })),
        },
      },
      seo: {
        ...ld.seo,
        canonical,
      },
    })),
    alternateLanguages: [
      {
        hreflang: "x-default",
        href: alternateLanguages.find((lang) => lang.hreflang === "en")?.href ||
          "",
      },
      ...alternateLanguages,
    ],
  };
}

function Section(props: Props): SEOSection {
  return <Seo {...props} />;
}

export function LoadingFallback(props: Partial<Props>) {
  return <Seo {...props} />;
}

export { default as Preview } from "apps/website/components/_seo/Preview.tsx";

export default Section;
