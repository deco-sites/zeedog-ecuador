import {
  Filter,
  FilterToggle,
  FilterToggleValue,
} from "apps/commerce/types.ts";
import { colorTranslator } from "$sdk/hooks/useFilters.ts";
import { Device } from "@deco/deco/utils";
import { useId } from "preact/hooks";
import { usePartialSection } from "@deco/deco/hooks";
import { clx } from "$sdk/clx.ts";
import { isToggleFilter } from "site/sdk/utils/verifyToggleFilter.ts";

interface FilterValues {
  label: string;
  values?: FilterToggleValue[];
  device: Device;
  currentSort?: string | null;
  id: string;
}

const SkuFilter = ({ values, device, id }: FilterValues) => {
  if (!values || values.length === 0) return null;

  return (
    <div class="collapse-content flex flex-wrap gap-x-2 gap-y-3 mt-0 peer-checked:mt-5 transition-all">
      {values.map(({ label, url, selected, value }) => {
        const text = label === "U" ? "Único" : label;
        const groupId = useId();

        return device !== "mobile"
          ? (
            <button
              {...usePartialSection({
                href: url,
              })}
              class={clx(
                "relative sku-filter-button flex items-center justify-center min-w-10 h-10 px-1.5 border rounded font-body-2xs-regular lg:hover:bg-black lg:hover:bg-opacity-10",
                selected
                  ? "border-black bg-black bg-opacity-10 text-black"
                  : "border-gray-300 hover:border-black text-gray-500 hover:text-black",
              )}
            >
              <span class={clx("absolute", selected && "hidden")} />
              {text}
            </button>
          )
          : (
            <div class="relative flex items-center justify-center">
              <input
                type="checkbox"
                id={groupId + "-filter-" + label}
                value={`${id}=${value}`}
                class="mobile-filter invisible opacity-0 w-0 h-0 peer"
                checked={selected}
              />
              <label
                class={clx(
                  "relative flex items-center justify-center min-w-10 h-10 px-1.5 border rounded font-body-2xs-regular border-gray-300 text-gray-500",
                  "peer-checked:border-black peer-checked:bg-black peer-checked:bg-opacity-10 peer-checked:text-black",
                )}
                htmlFor={groupId + "-filter-" + label}
              >
                {label}
              </label>
            </div>
          );
      })}
    </div>
  );
};

const ColorFilter = ({ values, device, id }: FilterValues) => {
  if (!values || values.length === 0) return null;

  return (
    <div class="collapse-content flex flex-wrap gap-x-6 gap-y-4 mt-0 peer-checked:mt-5 transition-all">
      {values.map(({ label, url, selected, value }) => {
        const groupId = useId();

        return device !== "mobile"
          ? (
            <button
              {...usePartialSection({
                href: url,
              })}
              class="color-filter-button relative flex flex-col items-center justify-center gap-y-1.5 w-10"
              aria-label={label}
            >
              <span
                class={clx(
                  "relative w-8 h-8 flex items-center justify-center rounded-full border border-gray-200",
                  selected &&
                    "after:content-[''] after:absolute after:w-9 after:h-9 after:border after:border-black after:rounded-full",
                )}
                style={`background-color: ${colorTranslator(label)}`}
              >
              </span>
              <span class="font-body-2xs-regular text-gray-500">{label}</span>
            </button>
          )
          : (
            <div class="relative flex flex-col items-center justify-center w-10">
              <input
                type="checkbox"
                id={groupId + "-filter-" + label}
                value={`${id}=${value}`}
                class="mobile-filter invisible opacity-0 w-0 h-0 peer"
                checked={selected}
              />
              <label
                class={clx(
                  "relative w-8 h-8 flex items-center justify-center rounded-full border border-gray-200",
                  "peer-checked:after:content-[''] peer-checked:after:absolute peer-checked:after:w-9 peer-checked:after:h-9 peer-checked:after:border peer-checked:after:border-black peer-checked:after:rounded-full",
                )}
                style={`background-color: ${colorTranslator(label)}`}
                htmlFor={groupId + "-filter-" + label}
              >
              </label>
            </div>
          );
      })}
    </div>
  );
};

const DefaultFilter = ({ values, device, id }: FilterValues) => {
  if (!values || values.length === 0) return null;

  return (
    <div class="collapse-content flex flex-wrap gap-x-2 gap-y-3 mt-0 peer-checked:mt-5 transition-all">
      {values.map(({ label, url, selected, value }) => {
        const selectedStyles = selected ? "border-black" : "border-gray-300";
        const groupId = useId();

        return device !== "mobile"
          ? (
            <button
              {...usePartialSection({
                href: url,
              })}
              class={clx(
                "default-filter-button group relative flex flex-nowrap items-center w-full gap-2 font-body-2xs-regular hover:text-black",
                selected ? "text-black" : "text-gray-500",
              )}
            >
              <span
                class={clx(
                  "relative flex items-center justify-center w-5 h-5 rounded border text-gray-500 lg:hover:border-black",
                  "before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-[3px] before:transition-all before:z-10",
                  "after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:w-4 after:h-4 after:origin-top-left",
                  selectedStyles,
                  "overflow-hidden",
                )}
              >
                <span
                  class={clx(
                    "absolute w-3 h-3 rounded-[3px] z-20",
                    selected ? "bg-black" : "bg-white",
                  )}
                />
              </span>
              <span class="text-start flex-1">
                {label}
              </span>
            </button>
          )
          : (
            <div
              class={clx(
                "default-filter-button group relative flex flex-nowrap items-center w-full font-body-2xs-regular hover:text-black",
                selected ? "text-black" : "text-gray-500",
              )}
            >
              <input
                type="checkbox"
                id={groupId + "-filter-" + label}
                value={`${id}=${value}`}
                class="mobile-filter invisible opacity-0 w-0 h-0 peer"
                checked={selected}
              />
              <label
                class={clx(
                  "flex items-center gap-x-2",
                  "peer-checked:text-black peer-checked:children:border-black peer-checked:children:after:content-[''] peer-checked:children:after:bg-black",
                )}
                htmlFor={groupId + "-filter-" + label}
              >
                <span
                  class={clx(
                    "relative flex items-center justify-center w-5 h-5 rounded border text-gray-500 lg:hover:border-black border-gray-200",
                    "after:relative after:w-3 after:h-3 after:rounded-[3px]",
                  )}
                >
                </span>
                {label}
              </label>
            </div>
          );
      })}
    </div>
  );
};

interface FilterListProps extends Pick<FilterToggle, "label" | "values"> {
  device: Device;
  currentSort?: string | null;
  id: string;
}

const FilterList = (
  { label, values, device, currentSort, id }: FilterListProps,
) => {
  if (["Size", "Misurare", "Measure", "Medida", "Talla"].includes(label)) {
    return (
      <SkuFilter
        label={label}
        values={values}
        device={device}
        currentSort={currentSort}
        id={id}
      />
    );
  }
  if (["Color", "Colore"].includes(label)) {
    return (
      <ColorFilter
        label={label.toLocaleLowerCase()}
        values={values}
        device={device}
        currentSort={currentSort}
        id={id}
      />
    );
  }
  return (
    <DefaultFilter
      label={label}
      values={values}
      device={device}
      currentSort={currentSort}
      id={id}
    />
  );
};

export interface FilterGroupLabels {
  productTypeFilterText: string;
  colorFilterText: string;
  sizeFilterText: string;
}

export interface FilterGroupComponent {
  filters: Filter[];
  device: Device;
  currentSort: string | null;
}

export const Filters = (
  { filters, device, currentSort }: FilterGroupComponent,
) => {
  if (!filters || filters.length === 0) return null;

  return (
    <>
      {filters.map(({ label, values, key }) => (
        <div class="shrink-0 collapse border-b border-white p-5 last-of-type:border-none cursor-pointer">
          <input
            aria-label={label}
            type="checkbox"
            class="peer z-[1] cursor-pointer"
            defaultChecked={true}
          />
          <div class="collapse-title collapse-icon collapse-plus flex items-center font-body-2xs-bold text-gray-600 cursor-pointer">
            {label}
          </div>

          {isToggleFilter(values) && (
            <FilterList
              label={label}
              values={values}
              device={device}
              currentSort={currentSort}
              id={key}
            />
          )}
        </div>
      ))}
    </>
  );
};
