import { Head } from "$fresh/runtime.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { stripHTML } from "apps/website/utils/html.ts";
import { JSX } from "preact";

export const renderTemplateString = (template: string, value: string) =>
  template.replace("%s", value);

export type SEOSection = JSX.Element;
export type OGType = "website" | "article";

/** @titleBy href */
export interface AlternateLanguageLink {
  hreflang: string;
  href: string;
}

export interface Props {
  title?: string;
  titleTemplate?: string;
  description?: string;
  descriptionTemplate?: string;
  type?: OGType;
  image?: ImageWidget;
  favicon?: ImageWidget;
  themeColor?: string;
  canonical?: string;
  noIndexing?: boolean;
  jsonLDs?: unknown[];

  /**
   * @title Alternate Language Links
   * @description Array of objects to render <link rel="alternate" hreflang="..." href="..." />
   */
  alternateLanguages?: AlternateLanguageLink[];
}

function Component({
  title: t = "",
  titleTemplate = "%s",
  description: desc,
  descriptionTemplate = "%s",
  type,
  image,
  favicon,
  themeColor,
  canonical,
  noIndexing,
  jsonLDs = [],
  alternateLanguages = [],
}: Props) {
  const twitterCard = type === "website" ? "summary" : "summary_large_image";
  const description = stripHTML(desc || "");
  const title = stripHTML(t);

  return (
    <Head>
      <title>{renderTemplateString(titleTemplate, title)}</title>
      <meta
        name="description"
        content={renderTemplateString(descriptionTemplate, description)}
      />
      <meta name="theme-color" content={themeColor} />
      {favicon && <link rel="icon" href={favicon} />}

      {/* Twitter tags */}
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:card" content={twitterCard} />

      {/* OpenGraph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* No index, no follow */}
      {noIndexing
        ? <meta name="robots" content="noindex, nofollow" />
        : <meta name="robots" content="index, follow" />}

      {/* Hreflang alternate language links */}
      {alternateLanguages.map(({ hreflang, href }) => (
        <link rel="alternate" hreflang={hreflang} href={href} />
      ))}

      {/* Structured Data */}
      {jsonLDs.map((json) => (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              // @ts-expect-error Trust me, I'm an engineer
              ...json,
            }),
          }}
        />
      ))}
    </Head>
  );
}

export default Component;
