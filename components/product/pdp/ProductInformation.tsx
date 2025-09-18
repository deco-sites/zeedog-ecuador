import { Device } from "@deco/deco/utils";
import { ProductShare, ProductShareTextsProps } from "./ProductShare.tsx";
import { richTextToHTML } from "site/sdk/utils/shopify.ts";
import LazyIcon from "site/components/ui/LazyIcon.tsx";

export type ProductDescriptionTextsProps = {
  detailsText: string;
  descriptionText: string;
  talkToUsText: string;
  needHelpText: string;
} & ProductShareTextsProps;

export interface ProductInformationProps {
  productName: string;
  productUrl: string;
  mainImage: string;
  details?: string;
  description?: string;
  device: Device;
  texts: ProductDescriptionTextsProps;
}

export const ProductInformation = (
  {
    productName,
    productUrl,
    mainImage,
    details,
    description,
    device,
    texts,
  }: ProductInformationProps,
) => {
  return (
    <div class="flex flex-col px-6 py-8 lg:px-10 2xl:px-14 order-2">
      <ProductDescription
        details={details}
        description={description}
        {...texts}
      />
      <ProductShare
        productName={productName}
        productUrl={productUrl}
        mainImage={mainImage}
        device={device}
        texts={texts}
      />
      <div class="flex flex-col justify-center items-center gap-y-5 w-full mt-8 py-10 bg-gray-100 rounded-3xl">
        <span class="font-body-xs-bold">{texts.needHelpText}</span>
        <a
          class="group flex items-center justify-center gap-x-2 w-64 h-12 border border-black rounded-full text-black lg:hover:bg-black lg:hover:bg-opacity-10 transition-all"
          href="mailto:info@zeedog.pe"
        >
          <LazyIcon
            name="Email"
            width={20}
            height={20}
          />
          <span class="font-body-xs-bold">
            {texts.talkToUsText}
          </span>
        </a>
      </div>
    </div>
  );
};

const ProductDescription = (
  { details, description, descriptionText, detailsText }: {
    details?: string;
    detailsText: string;
    description?: string;
    descriptionText: string;
  },
) => {
  return (
    <div class="flex flex-col border-t border-black">
      {description && (
        <div class="collapse mr-2">
          <input
            aria-label={descriptionText}
            type="checkbox"
            class="peer z-[1]"
            defaultChecked={true}
          />
          <div class="collapse-title collapse-icon collapse-plus flex items-center h-16 font-body-xs-bold border-b border-gray-200">
            {descriptionText}
          </div>
          <div
            class="collapse-content flex flex-col px-6 peer-checked:py-6 font-body-xs-regular border-b border-gray-200 children:list-disc children:space-y-1 transition-all whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: description }}
          >
          </div>
        </div>
      )}
      {details && (
        <div class="collapse mr-2">
          <input
            aria-label={detailsText}
            type="checkbox"
            class="peer z-[1]"
          />
          <div class="collapse-title collapse-icon collapse-plus flex items-center h-16 font-body-xs-bold border-b border-gray-200">
            {detailsText}
          </div>
          <div
            class="collapse-content flex flex-col peer-checked:py-6 font-body-xs-regular border-b border-gray-200 transition-all whitespace-pre-line"
            dangerouslySetInnerHTML={{
              __html: richTextToHTML(details),
            }}
          >
          </div>
        </div>
      )}
    </div>
  );
};
