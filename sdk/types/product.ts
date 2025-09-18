import { ImageWidget } from "apps/admin/widgets.ts";
import { ImageObject } from "apps/commerce/types.ts";

/** @title {{sku}} */
export interface SizeImage {
  sku: string;
  url: ImageWidget;
  /** @hide true */
  urlImagem?: string;
}

/** @title Measurement Table */
export type SizeTable = string[][];

/** @title {{subcategory}} { */
export interface SizeTableInfo {
  subcategory?: string;
  /** @description for when the product belongs to the same category but has different sizes in different products, such as tuff bowl feeders */
  skuCheck?: string;
  images?: SizeImage[];
  table: SizeTable;
}

/** @title {{category}} */
export interface SizesList {
  category: string;
  sizeTables: SizeTableInfo[];
}

/** @title {{productTypeName}} */
export interface CMSProducType {
  /** @description How the type was registered */
  productTypeName: string;
  typeFilter?: CMSTypeFilter;
  sizeTable?: CMSSizeTable;
}

export interface CMSTypeFilter {
  /** @description How the type will appear on the site */
  productTypeLabel?: string;
  filterImage?: ImageWidget;
  description?: string;
}

export interface CMSSizeTable {
  sizeImages?: SizeImage[];
  table: SizeTable;
}

export interface ProductTypeFilter
  extends Pick<CMSProducType, "productTypeName" | "typeFilter"> {}

export interface BundleItem {
  image: string;
  productId: string;
  skuId: string;
  price: number;
  url: string;
  skuSelected?: boolean;
}
