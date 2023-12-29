import { ZigFiltersType } from "../../types";

export type SecondaryFiltersButtonProps = {
  onChange: (value: any) => void;
  resetFilters: () => void;
  filters: ZigFiltersType;
  defaultFilters: ZigFiltersType;
  minSpace?: number;
  mobile: boolean;
  prefixId: string;
};
