export interface CatalogSearchPayload {
  search_slug?: string;
  search_term?: string;
  product_ids?: number[];
  hub_id?: number;
  price_table?: number;
  page?: number;
  per_page?: number;
  filterable?: boolean;
  category_id?: number;
  aisle_id?: number;
  manufacturer_id?: number;
  search_filters?: {
    name: string;
    value_sentence: string;
  }[];
  sort_options?: {
    option: string;
    value: string;
  }[];
  promotions?: CatalogPromotionPayload[];
}

export interface CatalogPromotionPayload {
  name: string;
  discounts: number[];
  applicability?: {
    type: string;
    id: number;
  }[];
}

export interface CatalogSearchResponse {
  meta: {
    page: number;
    per_page: number;
    page_number: number;
    count: number;
  };
  products: CatalogProduct[];
  filters?: CatalogFilter[];
}

export interface CatalogFilter {
  values_sentence: string;
  item_qtt: number;
  name: string;
  // property_id?: number;
}

export interface CatalogProduct {
  id: number;
  name: string;
  slug: string;
  base_price: number;
  sale_price: number;
  max_sale_discount: number;
  available: boolean;
  deeplink: string;
  description: string;
  title: string;
  meta_title: string;
  meta_description: string;
  images: CatalogImage[];
  thumb: CatalogImage;
  large_images: CatalogImage[];
  experience_images: CatalogImage[];
  extra_information: string;
  rating: number;
  created_at: string;
  updated_at: string;
  upsells: number[];
  cross_sell: number[];
  combinations: number[];
  collections: CatalogCollection[];
  skus: CatalogSku[];
  manufacturer: CatalogManufacturer;
  categories: CatalogCategory[];
  aisles: CatalogAisle[];
  properties: CatalogProperty[];
  attributes: CatalogAttribute[];
  custom_fields: CatalogCustomField[];
  promotions: CatalogPromotion[];
  sort: number;
  source: string;
  v: number;
}

export interface CatalogImage {
  url: string;
  value: string;
}

export interface CatalogSku {
  id: number;
  external_id: string;
  name: string;
  subscriptable: boolean;
  full_name: string;
  available: boolean;
  hub_sku_id: number;
  sale_discount: number;
  base_price: number;
  sale_price: number;
  weight: string;
  created_at: string;
  promotions: CatalogPromotion[];
}

interface CatalogManufacturer {
  id: number;
  name: string;
  slug: string;
  image: string;
  title: string;
  description: string;
  meta_title: string;
  meta_description: string;
  images: CatalogImage[];
}

interface CatalogAisle {
  id: number;
  name: string;
  slug: string;
  sort: number;
  active: boolean;
  title: string;
  description: string;
  meta_title: string;
  meta_description: string;
  images: CatalogImage[];
  subcategory: boolean;
}

interface CatalogCollection {
  id: number;
  name: string;
  description: string;
  created_at: string;
  search_slug: string;
  display_mode: string;
  active: boolean;
  title: string;
  meta_title: string;
  meta_description: string;
  images: CatalogImage[];
  sort: number;
}
interface CatalogCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  title?: string;
  meta_title?: string;
  meta_description?: string;
  images?: CatalogImage[];

  // endpoint /categories/by_department
  // parent_id?: number;
  // created_at?: string;
  // sort?: number;
  // source?: string;
  // aisles?: CatalogAisle[];
}

export interface CatalogProperty {
  name: string;
  values_sentence: string;
  values: {
    name: string;
  };
}

export interface CatalogPromotion {
  name: string;
  discounts: number[];
  sale_prices: number[];
}

export interface CatalogCustomField {
  name: string;
  value: string;
  type: "text" | "json";
  media_type: "web" | "mobile"[];
}

export interface CatalogAttribute {
  name: string;
  value: string;
}

export interface CatalogAutocomplete {
  suggestions: string[];
  products: string[];
}

export interface CatalogDepartment {
  departments: {
    name: string;
    categories: CatalogCategory[];
  }[];
}

export type CatalogSuggestions = string[];
