import Seo from "$components/seo/SeoV3.tsx";
import {
  AlternateLanguageLink,
  renderTemplateString,
  SEOSection,
} from "$components/seo/SeoV3.tsx";
import { ProductListingPage } from "apps/commerce/types.ts";
import { canonicalFromBreadcrumblist } from "apps/commerce/utils/canonical.ts";
import { AppContext } from "apps/website/mod.ts";
import { AppContext as ShopifyAppContext } from "apps/shopify/mod.ts";
import { AppContext as SiteAppContext } from "site/apps/site.ts";
import {
  CountryCode,
  LanguageCode,
} from "apps/shopify/utils/storefront/storefront.graphql.gen.ts";
import { LANGUAGE_MAP_BY_URL } from "site/components/ui/LanguageSelector.tsx";
import { AvailableLanguages, useLanguage } from "site/sdk/hooks/useLanguage.ts";
import { addLanguageToUrl } from "site/sdk/global/formatUrls.ts";

export interface ConfigJsonLD {
  /**
   * @title Remove videos
   * @description Remove product videos from structured data
   */
  removeVideos?: boolean;
  /**
   * @title Ignore Structured Data
   * @description By default, Structured Data is sent to everyone. Use this to prevent Structured Data from being sent to your customers, it will still be sent to crawlers and bots. Be aware that some integrations may not work if Structured Data is not sent.
   */
  ignoreStructuredData?: boolean;
}

export interface Props {
  /** @title Data Source */
  jsonLD: ProductListingPage | null;
  /** @title Title Override */
  title?: string;
  /** @title Description Override */
  description?: string;
  /** @hide true */
  canonical?: string;
  /**
   * @title Disable indexing
   * @description In testing, you can use this to prevent search engines from indexing your site
   */
  noIndexing?: boolean;
  configJsonLD?: ConfigJsonLD;
}

const AVAILABLE_LANGUAGES = Object.keys(
  LANGUAGE_MAP_BY_URL,
) as AvailableLanguages[];

async function fetchCollectionUrl(
  ctx: AppContext & ShopifyAppContext & SiteAppContext,
  collectionId: string | undefined,
  lang: AvailableLanguages,
): Promise<string | null> {
  const formattedLanguageMap = LANGUAGE_MAP_BY_URL[lang ?? "en"];
  const [languageCode, countryCode] = formattedLanguageMap.split("-");

  const { url } = await ctx.invoke.site.loaders.shopify.collection.getUrlById(
    {
      collectionId,
      countryCode: countryCode as CountryCode,
      languageCode: languageCode.toUpperCase() as LanguageCode,
    },
  );

  return url ?? null;
}

function buildAlternateLanguages(
  urls: Record<AvailableLanguages, string | null>,
  origin: string,
  language: AvailableLanguages,
): AlternateLanguageLink[] {
  return AVAILABLE_LANGUAGES
    .map((lang) => {
      const url = urls[lang];
      if (!url) return null;

      return {
        hreflang: lang,
        href: language === lang
          ? url
          : `${origin}${addLanguageToUrl({ url, language: lang })}`,
      };
    })
    .filter(Boolean) as AlternateLanguageLink[];
}

/** @title Product listing */
export async function loader(
  _props: Props,
  req: Request,
  ctx: AppContext & ShopifyAppContext & SiteAppContext,
) {
  const props = _props as Partial<Props>;
  const {
    titleTemplate = "",
    descriptionTemplate = "",
    ...seoSiteProps
  } = ctx.seo ?? {};
  const {
    title: titleProp,
    description: descriptionProp,
    jsonLD,
    configJsonLD,
  } = props;

  const url = new URL(req.url);
  const language = useLanguage(url) as AvailableLanguages;

  const title = renderTemplateString(
    titleTemplate,
    titleProp || jsonLD?.seo?.title || ctx.seo?.title || "",
  );
  const description = renderTemplateString(
    descriptionTemplate,
    descriptionProp || jsonLD?.seo?.description || ctx.seo?.description ||
      "",
  );
  const canonical = props.canonical
    ? props.canonical
    : jsonLD?.seo?.canonical
    ? jsonLD.seo.canonical
    : jsonLD?.breadcrumb
    ? canonicalFromBreadcrumblist(jsonLD?.breadcrumb)
    : undefined;

  const noIndexing = props.noIndexing ||
    !jsonLD ||
    !jsonLD.products.length ||
    jsonLD.seo?.noIndexing;

  if (props.configJsonLD?.removeVideos) {
    jsonLD?.products.forEach((product) => {
      product.video = undefined;
      product.isVariantOf?.hasVariant.forEach((variant) => {
        variant.video = undefined;
      });
    });
  }

  const jsonLDs = (configJsonLD?.ignoreStructuredData && !ctx.isBot) || !jsonLD
    ? []
    : [jsonLD];

  const urlsByLang: Record<AvailableLanguages, string | null> = {
    es: null,
  };

  const collectionId = jsonLD?.breadcrumb["@id"];

  const langFetches = AVAILABLE_LANGUAGES
    .filter((lang) => lang !== language)
    .map(async (lang) => {
      urlsByLang["es"] = await fetchCollectionUrl(
        ctx,
        collectionId,
        lang,
      );
    });

  await Promise.all(langFetches);

  // Usa a canonical "base" (sem linguagem) para o idioma atual
  urlsByLang[language] = canonical ?? null;

  const alternateLanguages = buildAlternateLanguages(
    urlsByLang,
    url.origin,
    language,
  );

  return {
    ...seoSiteProps,
    title,
    description,
    canonical,
    jsonLDs: jsonLDs.map((ld) => ({
      ...ld,
      seo: {
        ...ld.seo,
        title,
        description,
        canonical: canonical ?? undefined,
      },
      products: ld.products.map((product) => ({
        ...product,
        name: product.isVariantOf?.name,
        url: addLanguageToUrl({
          url: product.url,
          language,
        }),
        isVariantOf: {
          ...product.isVariantOf,
          url: addLanguageToUrl({
            url: product.isVariantOf?.url || "",
            language,
          }),
          name: product.isVariantOf?.name,
          hasVariant: product.isVariantOf?.hasVariant.map((
            variant,
          ) => ({
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
            name: product.isVariantOf?.name,
            url: addLanguageToUrl({
              url: variant.url,
              language,
            }),
          })),
        },
      })),
    })),
    noIndexing,
    alternateLanguages: [
      {
        hreflang: "x-default",
        href: alternateLanguages.find((lang) => lang.hreflang === "es")
          ?.href ||
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
