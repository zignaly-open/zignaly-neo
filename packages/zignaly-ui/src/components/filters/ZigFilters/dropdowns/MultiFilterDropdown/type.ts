import { ZigFiltersType } from "../../types";

export type MultiFilterDropdownProps = {
  onChange: (value: any) => void;
  resetFilters: () => void;
  filters: ZigFiltersType;
  defaultFilters: ZigFiltersType;
  minSpace?: number;
};
