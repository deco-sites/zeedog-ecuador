import { AggregateOffer, PropertyValue } from "apps/commerce/types.ts";
import { SKU } from "$sdk/types/global.ts";
import { Product } from "apps/commerce/types.ts";
import {
  PRODUCT_METAFIELDS,
  ZEEDOGSKUSIZESORDER,
} from "$sdk/global/constants.ts";

// const usedProperties = [
//   "Fotos_Produto",
//   "Imagem_Disclaimer",
//   "Descricao_Produto",
//   "Atributos_Especiais",
//   "Estampas_Relacionadas",
//   "Kitchen_Toggle",
//   "Fotos_Lifestyle",
//   "Conteudo_Extra_1",
//   "Conteudo_Extra_2",
//   "Bundle_Recomendacao",
// ];

// const getUsefulProperties = (product?: Product) => {
//   if (!product) return;
//   const { isVariantOf } = product;
//   const additionalProperty = isVariantOf?.additionalProperty.filter((
//     property,
//   ) => property && usedProperties.includes(property.name!));
//   console.log("PROPERTIES", additionalProperty);
//   return additionalProperty;
// };

export interface Availability {
  available: boolean;
  firstAvailableSku: number;
  hasStartingAt?: boolean;
}

// export interface PropertyEntity {
//   id?: string;
//   name?: string | number;
// }

// export type Category = PropertyEntity;
// export type Cluster = PropertyEntity;

export type ConditionalCategory =
  | "Human"
  | "Roupas"
  | "Topper"
  | "Refeição Natural"
  | "";

export const getConditionalCategory = (categories: string[]) => {
  const desiredCategories = ["Roupas", "Topper", "Refeição Natural"];
  let conditionalCategory: ConditionalCategory = "";
  categories.forEach((category) => {
    if (typeof category !== "string") return;

    if (desiredCategories.includes(category)) {
      conditionalCategory = category as ConditionalCategory;
    }
  });
  return conditionalCategory;
};

export const getPrices = (priceSpecifications: AggregateOffer) => {
  const highPrice = priceSpecifications.highPrice;
  const lowPrice = priceSpecifications.lowPrice;
  const suggestedPrice = priceSpecifications.lowPrice ||
    priceSpecifications.highPrice;

  return { lowPrice, highPrice, suggestedPrice };
};

// QUANDO UMA PROPRIEDADE TEM MULTIPLOS RESULTADOS TIPO CATEGORY E CLUSTER
// export const formatArrayOfProperty = (
//   propertyName: string,
//   productProperties?: PropertyValue[],
// ): PropertyEntity[] => {
//   if (!productProperties) return [];
//   const filteredProperties = productProperties.filter((property) =>
//     property && property.name === propertyName
//   );
//   const properties = filteredProperties.map((property) => ({
//     id: property.propertyID,
//     name: property.value.toString(),
//   }));
//   return properties;
// };

// export const formatProperties = (
//   propertyNames: string | string[],
//   productProperties?: PropertyValue[],
// ) => {
//   if (!productProperties) return;
//   const additionalProperty = productProperties.filter((
//     property,
//   ) => property && propertyNames.includes(property.name!));

//   const minifiedProperties: Record<string, string | number | undefined> = {};
//   additionalProperty?.forEach((property) => {
//     if (property.name) {
//       minifiedProperties[property.name] = property.value.toString();
//     }
//   });
//   return minifiedProperties;
// };

export const getSkusData = (hasVariants: Product[]) => {
  // TODO: checar se tem cupom aplicado

  const skus = hasVariants.map((product) => {
    //   const hasRecurrence = product.additionalProperty!.find((property) =>
    //   property.name === "vtex.subscription.assinatura"
    // );

    //   zeeDogProduct.recurrenceFrequencyOptions = getRecurrenceOptions(
    //     hasRecurrence,
    //   );

    const discount = (product.offers?.highPrice ?? 0) -
      (product.offers?.lowPrice ?? 0);

    const dimension = product.additionalProperty?.[0]?.value;
    const priceSpecifications = product.offers;
    const prices = priceSpecifications
      ? getPrices(priceSpecifications)
      : { lowPrice: 0, highPrice: 0, suggestedPrice: 0 };

    const sku: SKU = {
      id: product.sku || "",
      dimension: dimension || "",
      inventoryLevel: product.offers?.offers?.[0]?.inventoryLevel.value ?? 0,
      lowPrice: prices.lowPrice, // bestPrice
      highPrice: prices.highPrice, // priceWithoutDiscount
      suggestedPrice: prices.suggestedPrice, // listPrice
      discount: discount,
    };

    return sku;
  });

  skus.sort((a, b) => {
    const indexA = ZEEDOGSKUSIZESORDER.indexOf(a.dimension);
    const indexB = ZEEDOGSKUSIZESORDER.indexOf(b.dimension);

    // Handle cases where dimension is not in the list
    if (indexA === -1) return 1; // a.dimension is not in the order list, so it should come last
    if (indexB === -1) return -1; // b.dimension is not in the order list, so it should come last

    return indexA - indexB;
  });

  return skus;
};

export const getAvailability = (skus: SKU[]) => {
  const availability: Availability = {
    available: false,
    firstAvailableSku: -1,
    hasStartingAt: false,
  };

  skus.forEach((sku, index) => {
    if (
      availability.firstAvailableSku === -1 && sku.inventoryLevel > 0
    ) {
      availability.available = true;
      availability.firstAvailableSku = index;
    }
  });
  if (
    skus.length > 1 &&
    skus[0].highPrice !== skus[1].highPrice
  ) availability.hasStartingAt = true;
  return availability;
};

export const getProductMetafields = (
  productAdditionalProperty: PropertyValue[] | undefined,
) => {
  if (!productAdditionalProperty) return {};

  const productMetafields =
    productAdditionalProperty?.filter(({ name }) =>
      name && Object.values(PRODUCT_METAFIELDS).includes(name)
    ) || [];

  const metafieldsMap: Record<string, string | string[] | undefined> = {};

  productMetafields.forEach(({ name, value }) => {
    if (name) {
      metafieldsMap[name] = value;
    }
  });

  return metafieldsMap;
};

export const parseSizeChartMetafield = (sizeChart: string[]) => {
  const sizeChartJSON = sizeChart.map((item) => {
    // Envolve a string em colchetes para formar um JSON válido
    const jsonString = `[${item}]`;
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error(
        `Check 'size chart' value registered in the product. The table registered in size chart must be in this format: "Altezza","Larghezza","Lunghezza" or "13 cm","13 cm","6 cm". Failed to parse JSON string:`,
        jsonString,
        error,
      );
      return undefined;
    }
  });
  const validSizeChart = sizeChartJSON.filter((item) => item);
  console.log("SIZE CHART FILTERED", validSizeChart);
  return validSizeChart;
};

// export const hasBreedSelector = (
//   categories: string[],
//   productName: string,
// ): boolean => {
//   let res = false;
//   const guiaSubcategories = ["airleash", "corda", "mãos", "unificada"];
//   const additionalCategories = ["2000110", "2000104", "4000175"];
//   categories.forEach((category) => {
//     if (res) return;
//     const id = category; // TODO: precisamos passar o id das categorias?
//     if (id === "2000100") { // GUIAS
//       res = !guiaSubcategories.some((sub) =>
//         productName.toLowerCase().includes(sub)
//       );
//     }

//     if (additionalCategories.includes(id)) {
//       res = true;
//     }
//   });

//   return res;
// };
