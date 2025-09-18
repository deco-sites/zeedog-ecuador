import Video from "apps/website/components/Video.tsx";
import Image from "apps/website/components/Image.tsx";
import { useId } from "preact/hooks";
import { Device } from "@deco/deco/utils";
import { ImageObject, VideoObject } from "apps/commerce/types.ts";
import { HandleModalProductMedias } from "../../../islands/product/pdp/HandleModalProductMedias.tsx";
import { normalizeVideoURL } from "site/sdk/utils/normalizeVideoUrl.ts";

interface ComposedImagesProps {
  mainVideo: VideoObject[];
  mainImages: ImageObject[];
  whereabout: "pdp" | "modal";
}

export const ComposedImages = (
  { mainVideo, mainImages, whereabout }: ComposedImagesProps,
) => {
  const imageId = useId();
  const imageSize = whereabout === "pdp"
    ? 420
    : whereabout === "modal"
    ? 800
    : 300;

  const pdpImageClasses =
    "pdp-main-img snap-start relative size-full lg:size-[22vw] lg:max-w-[450px] lg:max-h-[450px] overflow-hidden md:border md:border-gray-200 md:rounded-md flex-shrink-0 cursor-pointer";

  const modalImageClasses =
    "modal-pdp-main-img snap-start relative w-screen h-[100vw] lg:w-full lg:h-full overflow-hidden md:border md:border-gray-200 md:rounded flex-shrink-0 cursor-pointer";

  const whereaboutClass = whereabout === "pdp"
    ? pdpImageClasses
    : modalImageClasses;

  const mediaItems = [
    ...mainImages.map((item) => ({ ...item, isVideo: false })),
    ...mainVideo.map((item) => ({ ...item, isVideo: true })),
  ];

  const videoItem = mediaItems.find((item) => item.isVideo);
  const filteredMediaItems = mediaItems.filter((item) => !item.isVideo);
  if (videoItem) filteredMediaItems.splice(1, 0, videoItem);

  return (
    <>
      {filteredMediaItems.map(
        (item, index) => {
          const { alternateName: alt, "@type": type } = item;
          const isVideo = type !== "ImageObject";
          const url = "url" in item ? item.url : item.contentUrl;

          return (
            <div
              class={whereaboutClass}
              key={`${imageId}-${index}`}
              data-img-index={index}
            >
              {isVideo
                ? (
                  <Video
                    class="w-full h-full object-cover"
                    media=""
                    src={normalizeVideoURL(url) || ""}
                    poster={normalizeVideoURL(url) || ""}
                    loop={true}
                    playsInline={true}
                    width={imageSize}
                    height={imageSize}
                    autoPlay={true}
                    muted={true}
                    loading="lazy"
                  />
                )
                : (
                  <Image
                    class="absolute top-0 left-0 w-full h-full object-cover z-0"
                    src={url || ""}
                    alt={alt}
                    width={imageSize}
                    height={imageSize}
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "low"}
                  />
                )}

              {
                // TODO: O que é o disclaimer?
                /* {(metadata && metadata.disclaimer) && (
                                <ImageDisclaimer
                                    text={metadata.disclaimer}
                                    position={metadata
                                        .position as DisclaimerPosition}
                                />
                            )} */
              }
            </div>
          );
        },
      )}
    </>
  );
};

export const ImageDisclaimer = (
  { text, position }: ProductImageDisclaimer,
) => {
  const disclaimerPosition = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-right": "bottom-0 right-0",
    "bottom-left": "bottom-0 left-0",
  };

  return (
    <div
      class={`absolute ${
        disclaimerPosition[position]
      } font-body-2xs-regular py-1 px-2.5 m-2.5 bg-white bg-opacity-80 rounded z-20`}
    >
      {text}
    </div>
  );
};

type DisclaimerPosition =
  | "top-left"
  | "top-right"
  | "bottom-right"
  | "bottom-left";

export interface ProductImageDisclaimer {
  text: string;
  position: DisclaimerPosition;
}
export interface ProductImagesProps {
  images?: ImageObject[];
  video?: VideoObject[];
  productName?: string;
  device?: Device;
}

export default function ProductImages({
  images,
  video,
  productName = "",
  device = "mobile",
}: ProductImagesProps) {
  if (!images) return <>Something went wrong!</>;

  // const mainImages = images.filter((image) => image.url?.includes("main-"));

  return (
    <>
      <div
        class="relative lg:sticky lg:top-[150px] flex lg:justify-center lg:gap-2.5 lg:flex-wrap w-full h-[100vw] lg:h-auto overflow-x-auto lg:w-[45vw] snap-x snap-mandatory scrollbar-none"
        id="pdp-main-images"
      >
        {/* Images */}
        {images && (
          <ComposedImages
            mainVideo={video ?? []}
            mainImages={images}
            whereabout="pdp"
          />
        )}
      </div>

      {/* <HandleImageSwap /> */}

      <HandleModalProductMedias
        mainVideo={video ?? []}
        mainImages={images}
        productName={productName}
      />

      {/* Image Bullets Mobile */}
      {device === "mobile" && (
        <ul class="absolute top-7 flex items-center gap-2 lg:hidden">
          <li
            id="main-image-marker"
            class="absolute bg-black w-2 h-2 rounded-full transition-all"
          >
          </li>
          {images.map(() => (
            <li class="flex items-center justify-center w-2 h-2">
              <span class="border border-black w-1.5 h-1.5 rounded-full" />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
