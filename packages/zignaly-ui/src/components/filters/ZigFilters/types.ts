export type ZigFiltersProps = {
  onChange: (filters: ZigFiltersType) => void;
  filters: ZigFiltersType;
  defaultFilters: ZigFiltersType;
};

export type BaseFilter = {
  id: string;
  showInBar?: boolean;
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
    checked: boolean;
  }[];
};

export type SelectFilter = BaseFilter & {
  type: "select";
  label: string;
  value: string;
  options: {
    value: string;
    label: string;
  }[];
};
