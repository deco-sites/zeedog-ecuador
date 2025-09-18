import Seo, { Props as SeoProps } from "$components/seo/SeoV3.tsx";
import { renderTemplateString, SEOSection } from "$components/seo/SeoV3.tsx";
import { AppContext } from "apps/website/mod.ts";

type Props = Pick<
  SeoProps,
  | "title"
  | "description"
  | "type"
  | "favicon"
  | "image"
  | "themeColor"
  | "noIndexing"
  | "alternateLanguages"
>;

export function loader(props: Props, _req: Request, ctx: AppContext) {
  const {
    titleTemplate = "",
    descriptionTemplate = "",
    title: appTitle = "",
    description: appDescription = "",
    ...seoSiteProps
  } = ctx.seo ?? {};
  const { title: _title, description: _description, ...seoProps } = props;
  const title = renderTemplateString(
    (titleTemplate ?? "").trim().length === 0 ? "%s" : titleTemplate,
    _title ?? appTitle,
  );
  const description = renderTemplateString(
    (descriptionTemplate ?? "").trim().length === 0
      ? "%s"
      : descriptionTemplate,
    _description ?? appDescription,
  );
  return { ...seoSiteProps, ...seoProps, title, description };
}

function Section(props: Props): SEOSection {
  return <Seo {...props} />;
}

export { default as Preview } from "apps/website/components/_seo/Preview.tsx";

export default Section;
