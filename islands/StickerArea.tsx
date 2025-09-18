import { IS_BROWSER } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import Image from "apps/website/components/Image.tsx";
import { useEffect, useRef } from "preact/hooks";
import { Sticker } from "site/sections/Home/FarmStickerEmailCapture.tsx";
import LazyIcon from "site/components/ui/LazyIcon.tsx";

export interface PastedSticker {
  x: number;
  y: number;
  rotation?: number;
  sticker: Sticker; // Optional src for image stickers
}

export interface StickerTexts {
  paste: string;
  remove: string;
  erase: string;
}

export interface StickerAreaProps {
  stickersImages: Sticker[];
  texts: StickerTexts;
  device: "mobile" | "desktop";
}

export default function StickerArea(
  { stickersImages, device, texts }: StickerAreaProps,
) {
  const mouse = useSignal<{ x: number; y: number } | null>(null);
  const stickers = useSignal<PastedSticker[]>([]);
  const nextNum = useSignal(0);
  const areaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!IS_BROWSER) return;
    const area = areaRef.current;
    if (!area) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = area.getBoundingClientRect();
      mouse.value = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    const handleMouseLeave = () => {
      mouse.value = null;
    };

    area.addEventListener("mousemove", handleMouseMove);
    area.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      area.removeEventListener("mousemove", handleMouseMove);
      area.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleClick = () => {
    if (!mouse.value) return;
    const { x, y } = mouse.value;
    const rotation = Math.random() * 360; // Random rotation
    stickers.value = [
      ...stickers.value,
      { x, y, rotation, sticker: stickersImages[nextNum.value] },
    ];
    let randomNum = Math.floor(Math.random() * 9);
    // tenta de novo caso randomNum acabe igual ao último stick
    while (randomNum === nextNum.value) {
      randomNum = Math.floor(Math.random() * 9);
    }
    nextNum.value = randomNum;
  };

  return (
    <>
      <div
        id="sticker-area"
        ref={areaRef}
        class="relative flex items-center justify-center w-full h-full z-20"
        onClick={handleClick}
        style={{ cursor: mouse.value ? "none" : "default" }}
      >
        {/* Render floating indicator */}
        {(mouse.value && device !== "mobile") && (
          <div
            style={{
              position: "absolute",
              left: mouse.value.x,
              top: mouse.value.y,
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
            class="flex items-center justify-center w-24 h-24 bg-white bg-opacity-60 rounded-full text-black font-title-md-bold text-center cursor-none z-20"
          >
            {texts.paste}
          </div>
        )}
        {/* Render stickers */}
        {stickers.value.map((pasteSticker, idx) => (
          <Image
            key={idx}
            class="absolute pointer-events-none z-10"
            style={{
              left: pasteSticker.x,
              top: pasteSticker.y,
              transform:
                `translate(-50%, -50%) rotate(${pasteSticker.rotation}deg)`,
            }}
            src={pasteSticker.sticker.image}
            width={pasteSticker.sticker[device].width}
            height={pasteSticker.sticker[device].height}
          />
        ))}
      </div>
      {(device === "mobile" && stickers.value.length === 0) && (
        <div class="absolute bottom-4 flex items-center justify-center w-24 h-24 bg-white bg-opacity-60 rounded-full text-black font-title-md-bold text-center cursor-none z-20 pointer-events-none">
          {texts.paste}
        </div>
      )}
      {stickers.value.length > 0 && (
        <button
          class="group absolute bottom-6 lg:bottom-16 left-6 lg:left-16 flex items-center justify-center w-14 hover:w-32 h-14 bg-white rounded-full border border-gray-200 transition-all duration-300 z-30 overflow-hidden"
          onClick={(event) => {
            event.stopPropagation();
            stickers.value = [];
          }}
          title={texts.remove}
        >
          <span class="sr-only">{texts.remove}</span>
          <LazyIcon
            name="Eraser"
            width={24}
            height={24}
            class="text-gray-700"
          />
          <span class="w-0 group-hover:w-14 ml-0 group-hover:ml-3 invisible opacity-0 group-hover:opacity-100 group-hover:visible font-body-sm-bold text-gray-700 transition-all duration-300">
            {texts.erase}
          </span>
        </button>
      )}
    </>
  );
}
