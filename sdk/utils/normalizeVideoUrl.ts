export const normalizeVideoURL = (url?: string) => {
  if (!url) return url;

  try {
    const parsedURL = new URL(url);
    const shopifyDomain = "https://k38vhs-hm.myshopify.com";

    return `${shopifyDomain}${parsedURL.pathname}`;
  } catch (error) {
    console.error("Invalid URL provided: ", url);
    return undefined;
  }
};
