import { Brand } from "apps/commerce/types.ts";
// import { ImageWidget } from "apps/admin/widgets.ts";

export type Department = "zeedog" | "human";

export interface SlimCartItem {
  sku_id: string;
  product_id: number;
  quantity: number;
  seller: string;
  index: number;
}

export interface SKU {
  id: string;
  dimension: string;
  inventoryLevel: number;
  lowPrice: number; // price with discount
  highPrice: number; // default price
  suggestedPrice: number; // price with table discount
  discount: number;
}

export interface Category {
  id?: string;
  name: string;
}

export interface ZeeDogProduct {
  productId: string;
  productName: string;
  nome_produto: string;
  url: string;
  image: Record<string, string>;
  category: Category[];
  clusters: string[];
  hasBreedSelect: boolean;
  available: boolean;
  skus: SKU[];
  firstAvailableSkuArrayPosition: number;
  hasStartingAt: boolean;
  brand?: Brand | string;
  medidas: {
    TableSizeChart: string;
    Imagens_Medidas: string;
  };
  kitchen?: {
    ageDivision: string;
    Quantidade_Diaria: any;
    Info_Nutricional: string;
    Ingredientes: string;
  };
  recurrenceFrequencyOptions?: Record<any, any>;
}

// export interface ZeeDogProductPDP extends ZeeDogProduct {
//   Fotos_Produto: ProductImage[];
//   Imagem_Disclaimer: ProductImageDisclaimer | undefined;
//   Descricao_Produto: string;
//   Atributos_Especiais: string;
//   Estampas_Relacionadas: VariationTransformedData[] | undefined;
//   Kitchen_Toggle: string;
//   Fotos_Lifestyle: IImage[] | undefined;
//   Conteudo_Extra_1: string;
//   Conteudo_Extra_2: string | any[];
//   Bundle_Recomendacao: string;
//   SocialProof: string;
//   Review_Opinioes_Verificadas: {
//     average: {
//       count: string;
//       rate: string;
//     };
//     reviews: Review[];
//     splitAverage: SplitAverage[];
//   };
// }
