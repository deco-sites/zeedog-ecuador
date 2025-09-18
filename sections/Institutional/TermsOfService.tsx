import { SectionProps } from "@deco/deco";
import { AppContext } from "site/apps/deco/shopify.ts";
import {
  CountryCode,
  LanguageCode,
} from "apps/shopify/utils/storefront/storefront.graphql.gen.ts";

interface Props {
  /**
   * @description If you need to override the title, you can use the `title` prop.
   */
  title?: string;
  languageCode?: LanguageCode;
  countryCode?: CountryCode;
}

export default function PrivacyPolicy(
  { termsOfService, title }: SectionProps<typeof loader>,
) {
  if (!termsOfService || !termsOfService.body) return null;

  return (
    <div class="flex flex-col gap-6 lg:gap-10 items-center justify-center container max-w-3xl mx-auto px-4 py-8">
      <h1 class="font-bold text-2xl text-center">
        {title || termsOfService.title}
      </h1>

      <div
        class="formatted-html"
        dangerouslySetInnerHTML={{
          __html: termsOfService.body.replace(/\s{2,}|\n/g, "<br>"),
        }}
      />
    </div>
  );
}

export const loader = async (props: Props, _req: Request, ctx: AppContext) => {
  const shopInfo = await ctx.invoke.shopify.loaders.shop({
    languageCode: props.languageCode,
    countryCode: props.countryCode,
  });

  return {
    ...props,
    termsOfService: shopInfo.termsOfService,
  };
};
