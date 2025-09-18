import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags({ revision }: { revision: string | undefined }) {
  return (
    <>
      <Head>
        {/* Shopify Customer Privacy API */}
        {
          /* <script async src="https://st.pandect.es/hundogzd/pandectes-rules.js" />
        <script
          defer
          src="https://cdn.shopify.com/shopifycloud/consent-tracking-api/v0.1/consent-tracking-api.js"
        /> */
        }

        {/* <!-- Pandectes GDPR Compliance --> */}
        {
          /* <script defer src="https://s.pandect.es/scripts/pandectes-core.js" />
        <script
          defer
          src="https://gdpr-static.s3.us-east-1.amazonaws.com/c/pandectes-core.js?storeId=70892126454"
        /> */
        }
        {/* End Pandectes GDPR Compliance */}

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/image/apple-touch-icon.png"
        >
        </link>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/image/favicon-32x32.png"
        >
        </link>
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/image/android-chrome-192x192.png"
        >
        </link>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/image/favicon-16x16.png"
        >
        </link>

        <link
          rel="mask-icon"
          href="/safari-pinned-tab.svg"
          // @ts-ignore Ignore mask-icon color property not existing in HTMLAttributes<HTMLLinkElement>
          color="#848889"
        >
        </link>

        {/* Enable View Transitions API */}
        <meta name="view-transition" content="same-origin" />

        {/* Tailwind v3 CSS file */}
        <link
          href={asset(`/styles.css?revision=${revision}`)}
          rel="stylesheet"
        />

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />

        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/image/mstile-144x144.png"
        />

        {/* Google Ownership Verification */}
        {
          /* <meta
          name="google-site-verification"
          content="49hVaj2d7w_Sy4DHVfzlB241hs-gW4nB36_CB7t8QMQ"
        /> */
        }

        {/* Facebook Meta */}
        <meta
          name="facebook-domain-verification"
          content="1rw5x1fqikjnrh5an6ukaw49707z73"
        />
      </Head>
    </>
  );
}

export default GlobalTags;
