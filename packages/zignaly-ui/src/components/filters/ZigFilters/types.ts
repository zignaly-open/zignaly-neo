import { SxProps } from "@mui/system";

export type ZigFiltersProps = {
  onChange: (filters: ZigFiltersType) => void;
  search?: string;
  onSearchChange?: (search: string) => void;
  filters: ZigFiltersType;
  defaultFilters: ZigFiltersType;
  label?: string;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  sx?: SxProps;
  prefixId?: string;
};

export type ZigFilterPruned = {
  id: string;
  type: ZigFilter["type"];
  value: ZigFilter["value"];
};
export type ZigFiltersPruned = ZigFilterPruned[];

export type BaseFilter = {
  id: string;
  showInBar?: boolean;
  /**
   * Special filter to display on mobile only. Pass "md" to also display it on md screen size.
   *  */
  mobile?: boolean | "md";
};

export type ZigFilter = SliderFilter | CheckboxFilter | SelectFilter;

export type ZigFiltersType = ZigFilter[];

export type SliderFilter = BaseFilter & {
  type: "slider";
  value: number | [number | null, number | null];
  label: string;
  min?: number;
  max?: number;
  step?: number;
  allowNoMin?: boolean;
  allowNoMax?: boolean;
};

export type CheckboxFilter = BaseFilter & {
  type: "checkbox";
  label: string;
  options: {
    value: string;
    label: string;
  }[];
  value: string[] | null;
};

export type SelectFilter = BaseFilter & {
  type: "select";
  label: string;
  value: string | null;
  options: {
    value: string | null;
    label: string;
  }[];
};
