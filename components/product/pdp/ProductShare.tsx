import LazyIcon from "$components/ui/LazyIcon.tsx";
import { Tooltip } from "$components/ui/Tooltip.tsx";
import { TooltipContent } from "$components/ui/Tooltip.tsx";
import ProductCopyLink from "$islands/product/pdp/ProductCopyLink.tsx";
import { Device } from "@deco/deco/utils";

export interface ProductShareTextsProps {
  shareText: string;
  sharedText: string;
  copyText: string;
  linkCopiedText: string;
  sendByEmailText: string;
}

export interface ProductShareProps {
  productName: string;
  productUrl: string;
  mainImage: string;
  device: Device;
  texts: ProductShareTextsProps;
}

export const ProductShare = (
  { productName, productUrl, device, texts }: ProductShareProps,
) => {
  const isDesktop = device === "desktop";
  const url = productUrl?.replace(/skuId=\d+/, "") || "";
  const name = productName;
  const separator = url.includes("?") ? "%26" : "?";
  const copySeparator = url.includes("?") ? "&" : "?";

  const linksList = {
    mobile:
      `${url}${separator}utm_source=share%26utm_medium=mobile%26utm_campaign=share_pag_prod%26utm_term=social_media`,
    facebook:
      `${url}${separator}utm_source=share%26utm_medium=facebook%26utm_campaign=share_pag_prod%26utm_term=facebook`,
    whatsapp:
      `${url}${separator}utm_source=share%26utm_medium=whatsapp%26utm_campaign=share_pag_prod%26utm_term=whatsapp`,
    email:
      `${url}${separator}utm_source=share%26utm_medium=email%26utm_campaign=share_pag_prod%26utm_term=email`,
    copy:
      `${url}${copySeparator}utm_source=share&utm_medium=copy&utm_campaign=share_pag_prod&utm_term=copy_link`,
  };

  let shareUrl;

  if (isDesktop) {
    shareUrl = {
      facebook:
        `https://www.facebook.com/sharer/sharer.php?u=${linksList.facebook}&title=${name}`,
      email:
        `mailto:?subject=${name} - Zee.Dog&body=${texts.sharedText}:%0A%0A${name}%0A${linksList.email}`,
      whatsapp:
        `https://api.whatsapp.com/send?text=${texts.sharedText}: ${linksList.whatsapp}`,
    };
  } else {
    shareUrl = {
      facebook:
        `https://www.facebook.com/sharer/sharer.php?u=${linksList.mobile}&title=${name}`,
      email:
        `mailto:?subject=${name} - Zee.Dog&body=${texts.sharedText}:%0A%0A${name}%0A${linksList.mobile}`,
      whatsapp:
        `https://api.whatsapp.com/send?text=${texts.sharedText}: ${linksList.mobile}`,
    };
  }

  const componentsInfo = [
    {
      href: shareUrl.whatsapp,
      titleContent: "WhatsApp",
      icon: (
        <LazyIcon
          name="Whatsapp"
          class="text-gray-700"
          width={24}
          height={24}
        />
      ),
    },
    {
      href: shareUrl.facebook,
      titleContent: "Facebook",
      icon: (
        <LazyIcon
          name="Facebook"
          class="text-gray-700"
          width={24}
          height={24}
        />
      ),
    },
    {
      href: linksList.copy,
      titleContent: texts.copyText,
      icon: (
        <LazyIcon
          name="Copy"
          class="text-gray-700"
          width={24}
          height={24}
        />
      ),
    },
    {
      href: shareUrl.email,
      titleContent: texts.sendByEmailText,
      icon: (
        <LazyIcon name="Email" class="text-gray-700" width={24} height={24} />
      ),
    },
  ];

  return (
    <div class="flex items-center justify-between h-16 border-b border-gray-200 pr-2">
      <span class="font-body-xs-bold text-black">{texts.shareText}</span>
      <div class="flex items-center justify-center gap-2 mr-5">
        {componentsInfo.map((item) => {
          const isCopy = item.titleContent === texts.copyText;

          return (
            <a
              class="size-6 flex items-center justify-center cursor-pointer"
              key={item.titleContent}
              {...isCopy ? "" : { href: item.href }}
              target={isCopy ? "_self" : "_blank"}
            >
              <Tooltip class="flex items-center justify-center" // tooltipCSS={{
              >
                {!isCopy
                  ? (
                    <>
                      {item.icon}
                      <TooltipContent
                        mode="default"
                        class="flex items-center bg-white h-7 rounded-md font-body-2xs-regular dropdown-content-tooltip-arrow-white"
                      >
                        {item.titleContent}
                      </TooltipContent>
                    </>
                  )
                  : (
                    <ProductCopyLink
                      url={productUrl}
                      texts={texts}
                    >
                      {item.icon}
                    </ProductCopyLink>
                  )}
              </Tooltip>
            </a>
          );
        })}
      </div>
    </div>
  );
};
