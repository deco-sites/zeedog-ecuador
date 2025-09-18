import type { Filter } from "apps/commerce/types.ts";
import {
  ZEEDOGSHELFILTERTOGGLEEXCLUDE,
  ZEEDOGSHELFILTERTOGGLEORDER,
  ZEEDOGSKUSIZESORDER,
} from "$sdk/global/constants.ts";

export default function useFilters(filters?: Filter[]) {
  const filtered = filters?.filter((filter) => {
    if (["Misurare", "Medida", "Measure"].includes(filter.label)) {
      try {
        if (!Array.isArray(filter.values)) return;
        filter.values.sort((a, b) =>
          ZEEDOGSKUSIZESORDER.indexOf(a.label) -
          ZEEDOGSKUSIZESORDER.indexOf(b.label)
        );
      } catch (error) {
        console.error(error);
      }
    }

    return !ZEEDOGSHELFILTERTOGGLEEXCLUDE.includes(filter.label);
  });

  const filteredFilters: Filter[] | undefined = filtered?.sort((a, b) =>
    ZEEDOGSHELFILTERTOGGLEORDER.indexOf(a.label) -
    ZEEDOGSHELFILTERTOGGLEORDER.indexOf(b.label)
  );

  let selectedFiltersCount = 0;
  filteredFilters?.forEach((filter) => {
    if (Array.isArray(filter.values)) {
      filter.values.forEach((value) => {
        if (typeof value === "object" && value?.selected) {
          selectedFiltersCount++;
        }
      });
    }
  });

  return {
    filteredFilters: filteredFilters,
    selectedFiltersCount: selectedFiltersCount,
  };
}

export function colorTranslator(term: string): string {
  const colorMap: Record<string, string> = {
    black: "#1A1A1A",
    negro: "#1A1A1A",
    nero: "#1A1A1A",
    pink: "#F9B9C4",
    rosa: "#F9B9C4",
    blue: "#1B6DBF",
    blu: "#1B6DBF",
    azul: "#1B6DBF",
    green: "#94C358",
    verde: "#94C358",
    red: "#BF291E",
    rosso: "#BF291E",
    rose: "#BF291E",
    purple: "#6E3FAB",
    rojo: "#6E3FAB",
    viola: "#6E3FAB",
    violet: "#6E3FAB",
    orange: "#F49C35",
    naranja: "#F49C35",
    laranja: "#F49C35",
    arancione: "#F49C35",
    yellow: "#FFD15D",
    amarillo: "#FFD15D",
    giallo: "#FFD15D",
    brown: "#956943",
    marrone: "#956943",
    marrón: "#956943",
    beige: "#EEDAB7",
    gray: "#C7C7C7",
    grey: "#C7C7C7",
    grigio: "#C7C7C7",
    gris: "#C7C7C7",
    white: "#FFFFFF",
    blanco: "#FFFFFF",
  };

  return colorMap[term.toLowerCase()] || "unknown";
}
