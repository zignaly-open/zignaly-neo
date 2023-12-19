import { ZigFiltersType } from "../../types";

export type SecondaryFiltersButtonProps = {
  onChange: (value: any) => void;
  resetFilters: () => void;
  filters: ZigFiltersType;
  filtersChangedCount: number;
  minSpace?: number;
  mobile: boolean;
  prefixId: string;
};
