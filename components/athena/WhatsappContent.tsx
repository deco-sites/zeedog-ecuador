import LazyIcon from "$components/ui/LazyIcon.tsx";
import { athenaContentButton } from "$sdk/athena.ts";
import { WhatsappContentProps } from "$sdk/types/footer.ts";
import Image from "apps/website/components/Image.tsx";

const DEFAULT_PROPS: WhatsappContentProps = {
  assistanceMessage: "Precisa de ajuda? Fale com a gente.",
  cta: {
    label: "Abrir o WhatsApp",
    link: "https://wa.me/5521999928839",
  },
  phoneNumber: "(21) 9 9992-8839",
  qrCodeInstruction:
    "Ou escaneie o QR code abaixo com a câmera do seu celular para abrir o aplicativo:",
};

export function WhatsappContent(props: WhatsappContentProps) {
  const {
    assistanceMessage,
    cta,
    phoneNumber,
    qrCodeInstruction,
    qrCodeImage = "",
  } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  return (
    <>
      <p class="font-body-xs-regular text-gray-600 w-full">
        {assistanceMessage}
      </p>

      <a
        class={`bg-green-400 hover:bg-green-400/90 my-4 ${athenaContentButton}`}
        href={cta?.link}
        rel="noopener noreferrer"
        target="_blank"
      >
        <LazyIcon name="Whatsapp" size={16} fill="#ffffff" />
        <span class="ml-2">{cta?.label}</span>
      </a>

      <p class="font-body-xs-regular text-gray-600">
        {qrCodeInstruction}
      </p>

      <div class="flex flex-col items-center">
        {qrCodeImage && (
          <div class="flex items-center justify-center mt-4 mb-2">
            <Image
              src={qrCodeImage.src ?? ""}
              alt={qrCodeImage.alt ?? "QR Code"}
              width={qrCodeImage.width || 100}
              height={qrCodeImage.height || 100}
              loading="lazy"
            />
          </div>
        )}

        <span class="font-body-2xs-bold text-black">
          {phoneNumber}
        </span>
      </div>
    </>
  );
}
