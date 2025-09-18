export const athenaButton =
  "group/athena relative w-11 transition-all duration-200 border border-gray-700 cursor-pointer children:cursor-pointer bg-white/30 flex items-center justify-center backdrop-blur-xxl xl:hover:bg-black";

export const athenaContentButtonHover = "contrast-[.85]";

export const athenaContentButton =
  `flex flex-shrink-0 items-center justify-center bg-black font-body-xs-bold text-white rounded-3xl w-full h-11 transition-all duration-300 xl:hover:${athenaContentButtonHover}`;

export type AthenaContent =
  | "vet"
  | "whatsapp"
  | "sizes"
  | "orders"
  | "exchange"
  | "faq";
