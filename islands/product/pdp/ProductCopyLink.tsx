import { ComponentChildren } from "preact";
import useClipboard from "$sdk/hooks/useClipboard.ts";
import { useSignal } from "@preact/signals";
import { TooltipContent } from "$components/ui/Tooltip.tsx";

interface ProductCopyLinkTexts {
  copyText: string;
  linkCopiedText: string;
}

export interface ProductCopyLinkProps {
  url: string;
  class?: string;
  children: ComponentChildren;
  texts: ProductCopyLinkTexts;
}

export default function ProductCopyLink(
  { url, class: _class = "", children, texts }: ProductCopyLinkProps,
) {
  const copyUrl = useSignal(false);
  const copyToClipBoard = useClipboard();

  const shareUrl = url +
    "&utm_source=share&utm_medium=copy&utm_campaign=share_pag_prod&utm_term=copy_link";

  return (
    <>
      <button
        class={_class}
        onClick={() => {
          copyToClipBoard(shareUrl);
          copyUrl.value = true;
          setTimeout(() => {
            copyUrl.value = false;
          }, 3000);
        }}
      >
        {children}
      </button>
      <TooltipContent
        mode="copy"
        class={`flex items-center ${
          copyUrl.value
            ? "bg-blue-400 dropdown-content-tooltip-arrow-blue-400 text-white"
            : "bg-white dropdown-content-tooltip-arrow-white text-gray-500"
        } h-7 rounded-md font-body-2xs-regular`}
      >
        {copyUrl.value ? `${texts.linkCopiedText}` : `${texts.copyText}`}
      </TooltipContent>
    </>
  );
}
