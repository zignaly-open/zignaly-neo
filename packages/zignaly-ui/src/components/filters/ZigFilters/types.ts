export type ZigFiltersProps = {
  onChange: (filters: ZigFiltersType) => void;
  search?: string;
  onSearchChange?: (search: string) => void;
  filters: ZigFiltersSavedValues;
  defaultFilters: ZigFiltersType;
  label?: string;
};

export type ZigFiltersSavedValue = {
  id: string;
  type: ZigFilter["type"];
  value: ZigFilter["value"];
};
export type ZigFiltersSavedValues = ZigFiltersSavedValue[];

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
  }[];
  value: [string];
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
