import { ImageWidget } from "apps/admin/widgets.ts";

/** @title {{{filterName}}} */
export interface CMSTypeFilter {
  image?: ImageWidget;
  /** @description How the filter was registered */
  filterName: string;
  /** @description How the filter will appear on the site */
  filterLabel: string;
  description?: string;
}

export interface TypeFilter extends Omit<CMSTypeFilter, "filterName"> {
  url: string;
  selected: boolean;
}
