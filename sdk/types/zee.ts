import type {
  ImageObject,
  ItemAvailability,
  ItemList as DecoItemList,
  ListItem as DecoListItem,
  OfferItemCondition,
  PriceTypeEnumeration,
  ProductDetailsPage as DecoProductDetailsPage,
  ProductListingPage as DecoProductListingPage,
} from "apps/commerce/types.ts";
import type { CatalogProduct, CatalogSku } from "zee/sdk/types/catalog.ts";

export type Cookies = Record<string, string>;

interface JsonObject {
  [key: string]: any;
}
export interface RequestError {
  error: string;
  requestId?: string;
  status?: string;
}

export type ProductCard =
  & Pick<Product, "name" | "image" | "url">
  & Pick<ProductGroup, "hasVariant" | "productGroupID" | "pageData">;

export type ProductToggle =
  & Pick<CatalogProduct, "available" | "max_sale_discount" | "thumb">
  & Pick<Product, "url">
  & {
    name_highlight: string;
    current: boolean;
    // kitchen_division?: string;
  };

export interface ImageMetadata {
  url: string;
  alt?: string;
  metadata?: {
    // alt?: string;
    video?: string;
    disclaimer?: string;
    position?: string;
    hover?: boolean;
    image_on_sku?: string;
    image_index_on_sku?: number;
  };
}

// propriedades de PDP e PLP não relevantes para SEO
export type PageData =
  & Partial<
    Pick<
      CatalogProduct,
      | "available"
      | "rating"
      | "max_sale_discount"
      | "extra_information"
    >
  >
  & {
    category?: string;
    // extra_categories?: string[]; // necessário em zeedog?
    name_highlight?: string; // attributes
    toggle?: ProductToggle[];
    // kitchen_division?: string;
    images?: ImageMetadata[]; // main images
    thumb_hover?: string; // large_images
    experience_images?: ImageMetadata[]; // lifestyle images
    sku_sale_discount?: CatalogSku["sale_discount"];
    sku_promotions?: CatalogSku["promotions"];
    sku_subscritable?: CatalogSku["subscriptable"];
    sku_subscription_price?: number;
    sku_subscription_discount?: number;
    breed_size_suggestion?: string; // attributes
    social_proof?: JsonObject; // custom_fields
    bundle?: JsonObject; // custom_fields
    size_chart?: JsonObject; // custom_fields
    size_disclaimer?: JsonObject; // custom_fields
    fitting_room?: JsonObject; // custom_fields
    reviews?: ProductReview;
    tags?: string[];
    legacy_id?: string; // custom_fields
    type_filter?: string[];
  };

export interface Product {
  "@type": "Product";
  name: string;
  image: ImageObject | string;
  offers: Offer;

  url?: string;
  sku?: string;
  gtin?: string;
  description?: string;
  size?: string; // nome do sku
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: number;
  };
  // review
  pageData?: PageData;
}

export interface ProductGroup {
  "@type": "ProductGroup";
  name: string;
  image: ImageObject | string;
  description: string;
  url: string;
  brand: {
    "@type": "Brand";
    name: string;
  };
  productGroupID: string;
  hasVariant: Product[];
  pageData: PageData;
}

export interface Offer {
  "@type": "Offer";
  url: string;
  priceCurrency: string;
  price: number;
  itemCondition: OfferItemCondition;
  availability: ItemAvailability;
  priceSpecification: {
    "@type": "UnitPriceSpecification";
    price: number;
    priceType: PriceTypeEnumeration;
  }[];
  seller: {
    "@type": "Organization";
    name: string;
  };
  // inventoryLevel?: QuantitativeValue;
}

// export interface AggregateOffer extends Omit<DecoAggregateOffer, "offers"> {
//   offers: Offer[];
// }

export interface ListItem extends Omit<DecoListItem, "item"> {
  item: ProductGroup;
}

export interface ItemList extends Omit<DecoItemList, "itemListElement"> {
  itemListElement: ListItem[];
}

export interface ProductDetailsPage
  extends Omit<DecoProductDetailsPage, "product"> {
  product: ProductGroup;
}

export interface ProductListingPage
  extends Omit<DecoProductListingPage, "products"> {
  products: ItemList;
}

export interface QueryProps {
  include?: string;
  fields?: string[];
  extra_fields?: string[];
  per_page?: number;
  sort?: string;
  filters?: string[];

  // parâmetros abaixo são enviados apenas em ações do front, portanto não precisam estar visíveis no CMS
  /** @hide true */
  apply_wallet?: boolean;
  /** @hide true */
  checkout?: boolean;
  /** @hide true */
  zipcode?: string;
  /** @hide true */
  shipping_code?: string;
  /** @hide true */
  remove_shipping?: boolean;
  /** @hide true */
  mtags?: string[]; // TODO: específica do cart, precisa aparecer no cms?
}

// product reviews
export interface SplitAverage {
  rateText: string;
  quantity: number;
  percentage: string;
}

export interface Average {
  count?: string;
  rate?: string;
}
export interface Review {
  rate: string;
  publish_date: string; // "2023-05-24 17:30:00",
  order_ref: string; // "1329753249300-01",
  id_product: string; // "5031313",
  review: string; // "Gostei da ergonomia. Meu cachorro pareceu se sentir muito confortável",
  lastname: string; // "A",
  firstname: string; // "Iêda",
}

export interface ProductReview {
  average: Average;
  reviews: Review[];
  splitAverage: SplitAverage[];
}

// payment
export interface PagarmePayload {
  number: string;
  holder_name?: string;
  holder_document?: string;
  exp_month: string;
  exp_year: string;
  cvv?: string;
  brand?: string;
  label?: string;
}

export interface PagarmeResponse {
  id: string;
  type: string;
  created_at: string;
  expires_at: string;
  card: {
    first_six_digits: string;
    last_four_digits: string;
    holder_name: string;
    exp_month: number;
    exp_year: number;
    brand: string;
  };
}

// salesforce
export type CartAction =
  | "add" // adicionar item compra única
  | "remove" // remover item compra única
  | "add-sub" // adicionar item assinatura
  | "remove-sub" // remover item assinatura
  | "up-sub" // atualizar item de compra única para assinatura
  | "down-sub" // atualizar item de assinatura para compra única
  | "purchase";
