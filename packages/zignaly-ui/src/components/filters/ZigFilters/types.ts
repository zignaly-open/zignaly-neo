export type ZigFiltersProps = {
  onChange: (id: string, value: any) => void;
  filters: ZigFiltersType;
  defaultFilters: ZigFiltersType;
};

export type ZigFilter = (SliderFilter | CheckboxFilter | SelectFilter) & {
  id: string;
  showInBar?: boolean;
};

export type ZigFiltersType = ZigFilter[];

export type SliderFilter = {
  type: "slider";
  value: number | [number, number];
  label: string;
  min?: number;
  max?: number;
  step?: number;
  allowNoMin?: boolean;
  allowNoMax?: boolean;
};

export type CheckboxFilter = {
  type: "checkbox";
  label: string;
  options: {
    value: string;
    label: string;
    checked: boolean;
  }[];
};

export type SelectFilter = {
  type: "select";
  label: string;
  options: {
    value: string;
    label: string;
    checked: boolean;
  }[];
};
