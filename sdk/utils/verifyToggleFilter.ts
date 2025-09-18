import { FilterRangeValue, FilterToggleValue } from "apps/commerce/types.ts";

export function isToggleFilter(
  values: FilterToggleValue[] | FilterRangeValue,
): values is FilterToggleValue[] {
  return Array.isArray(values);
}
