import { AvailableLazyIcons } from "$components/ui/LazyIcon.tsx";
import { Faq } from "$loaders/faq.ts";
import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import { AthenaContentTextsProps } from "site/components/athena/AthenaContent.tsx";

/**
 * @title {{{title}}}
 */
interface LinkMenuProps {
  title: string;
  url: string;
  openNewTab?: boolean;
}

/**
 * @title {{{title}}}
 */
interface LinksMenuProps {
  title: string;
  children: LinkMenuProps[];
}

/**
 * @title {{{alt}}}
 */
interface SocialMediaContentProps {
  icon: AvailableLazyIcons;
  url: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * @title {{{title}}}
 */
interface SocialMediaProps {
  title?: string;
  children: SocialMediaContentProps[];
}

/**
 * @title {{{title}}}
 */
interface InstitutionalProps {
  title: string;
  url: string;
}

export interface CompanyProps {
  name: string;
  cnpj: string;
  address: string;
}

/**
 * @titleBy icon
 */
export interface PaymentMethodItemProps {
  icon: AvailableLazyIcons;
  width: number;
  height: number;
}

export interface PaymentMethodProps {
  title: string;
  items: PaymentMethodItemProps[];
  mode: "white" | "gray";
}

export interface WhatsappContentProps {
  assistanceMessage: string;
  cta: { link: string; label: string };
  qrCodeImage?: {
    src?: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  /**
   * @description Ex.: (21) 9 9992-8839
   */
  phoneNumber: string;
  qrCodeInstruction: string;
}

export interface AthenaContentProps {
  faqContent: Faq[];
  department: string;
  isBlackFriday?: boolean;
  whatsappContent?: WhatsappContentProps;
}

export interface TalkToUsProps {
  title: string;
  email: string;
  openingHours: {
    label: string;
    result: RichText;
  };
}

export interface ComplaintsBookProps {
  title: string;
  url: string;
  image: {
    source: ImageWidget;
    alt: string;
    width?: number;
    height?: number;
  };
}

export interface MenuFooterProps {
  menu?: LinksMenuProps[];
  socialMedia?: SocialMediaProps[];
  institutionalLinks?: InstitutionalProps[];
  paymentMethods?: PaymentMethodProps;
  complaintsBook?: ComplaintsBookProps;
  talkToUs?: TalkToUsProps;
  company?: CompanyProps;
  athenaContent?: AthenaContentProps;
  isMenuOpened?: boolean;
  selectedMenuItem?: "chat" | "whatsapp" | "sizes" | "orders" | "faq";
  highlight?: string;
  texts: AthenaContentTextsProps & { connectingDogsAndPeopleText: string };
}
