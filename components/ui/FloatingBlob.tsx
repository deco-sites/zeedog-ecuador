import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { generateSrcSet } from "site/sdk/generateSrcSet.ts";

/** @title {{name}} */
export interface FloatingBlobProps {
  name: string;
  imageSrc: ImageWidget;
  size: {
    mobile: { width: number; height: number };
    desktop: { width: number; height: number };
  };
  alt: string;
  position: {
    top: string;
    left: string;
    right: string;
    bottom: string;
  };
  /**
   * @hide true
   * @ignore true
   */
  device: "mobile" | "desktop";
}

export default function FloatingBlob(
  { name, imageSrc, size, alt, position, device }: FloatingBlobProps,
) {
  const width = size[device].width;
  const height = size[device].height;
  return (width > 0 && height > 0)
    ? (
      <div
        id={name}
        class="absolute z-20 pointer-events-none animate-smooth-slide"
        style={{
          top: position?.top,
          left: position?.left,
          right: position?.right,
          bottom: position?.bottom,
        }}
      >
        <Image
          src={imageSrc}
          srcSet={generateSrcSet(
            imageSrc,
            width,
            height,
          )}
          width={width}
          height={height}
          alt={alt}
          class=""
        />
      </div>
    )
    : <></>;
}
