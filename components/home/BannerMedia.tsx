import Video from "apps/website/components/Video.tsx";
import Image from "apps/website/components/Image.tsx";

export interface BannerMediaProps {
  image?: string;
  video?: string;
  alt: string;
  aspectRatio: string;
  preload: boolean;
  class?: string;
}
// mobile https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/942/4ca0e124-dfc6-41e8-b2ff-cec38dc4d662
// desktop https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/942/eaa15064-2bdf-426e-bdd7-b0578e6ed802

export default function BannerMedia(
  { image, video, alt, aspectRatio, preload, class: _class = "" }:
    BannerMediaProps,
) {
  const [width, height] = aspectRatio.split("/");

  return (
    <>
      {(image && !video) &&
        (
          <Image
            class={`${_class}-img w-full h-full object-cover transition-all`}
            src={image}
            width={Number(width)}
            height={Number(height)}
            alt={alt}
            decoding="async"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            fetchPriority={preload ? "high" : "auto"}
          />
        )}
      {video &&
        (
          <Video
            class={`${_class}-video w-full h-full object-cover transition-all`}
            src={video}
            poster={image}
            width={Number(width)}
            height={Number(height)}
            alt={alt}
            loop={true}
            muted={true}
            autoPlay={true}
            playsInline={true}
          />
        )}
    </>
  );
}
